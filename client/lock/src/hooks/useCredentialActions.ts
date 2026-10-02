import { useAuth } from '@/auth/AuthContext';
import { useSessionGuard } from '@/hooks/useSessionGuard';
import {
    createCredential as createCredentialService,
    updateCredential as updateCredentialService,
    type CredentialFieldPayload,
} from '@/services/credentialService';
import { useCallback } from 'react';

type FieldType = 'Texto' | 'E-mail' | 'Senha' | 'Numero';

type CredentialFieldInput = {
  label: string;
  type: FieldType;
  value: string;
};

type SaveCredentialInput = {
  credentialId?: string;
  isEditing: boolean;
  name: string;
  category: string;
  categoryId?: string;
  fields: CredentialFieldInput[];
};

export function useCredentialActions() {
  const { userId, token } = useAuth();
  const { sessionRef, isCurrentSession } = useSessionGuard();

  const normalizeFields = useCallback((fields: CredentialFieldInput[]): CredentialFieldPayload[] => {
    return fields.map((field) => {
      const label = field.label.trim();

      if (!label) {
        throw new Error('Revise os nomes dos campos antes de salvar.');
      }

      const type = field.type === 'Senha'
        ? 'PASSWORD'
        : field.type === 'E-mail'
          ? 'EMAIL'
          : field.type === 'Numero'
            ? 'NUMBER'
            : 'TEXT';

      return {
        key: label,
        type,
        value: field.value,
        sensitive: field.type === 'Senha',
      };
    });
  }, []);

  const saveCredential = useCallback(async ({
    credentialId,
    isEditing,
    name,
    category,
    categoryId,
    fields,
  }: SaveCredentialInput) => {
    if (!userId || !token) {
      throw new Error('Sessão expirada.');
    }

    const normalizedName = name.trim();
    if (!normalizedName) {
      throw new Error('Dê um nome para esta credencial antes de salvar.');
    }

    const activeSessionId = sessionRef.current;
    const mappedFields = normalizeFields(fields);

    if (isEditing) {
      if (!credentialId) {
        throw new Error('Credencial inválida para edição.');
      }

      await updateCredentialService({
        id: credentialId,
        credentialName: normalizedName,
        credentialCategoryId: categoryId,
        fields: mappedFields,
      }, token);
    } else {
      await createCredentialService({
        credentialName: normalizedName,
        userId,
        category,
        fields: mappedFields,
      }, token);
    }

    if (!isCurrentSession(activeSessionId)) {
      return false;
    }

    return true;
  }, [isCurrentSession, normalizeFields, sessionRef, token, userId]);

  return {
    saveCredential,
  };
}
