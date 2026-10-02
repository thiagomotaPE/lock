import { apiRequest } from '@/services/api';

export type CredentialFieldPayload = {
  key: string;
  type: 'TEXT' | 'EMAIL' | 'PASSWORD' | 'NUMBER';
  value: string;
  sensitive?: boolean;
};

export type CredentialListItem = {
  id: string;
  credentialName: string;
  userId: string;
  categoryId: string;
  categoryName: string;
};

export type CredentialDetails = {
  id?: string;
  credentialName: string;
  categoryName: string;
  credentialCategoryId?: string;
  fields: Array<{
    key: string;
    label: string;
    type: string;
    value: string;
    sensitive?: boolean;
  }>;
};

export async function getCredentialsForUser(userId: string, token: string): Promise<CredentialListItem[]> {
  return apiRequest<CredentialListItem[]>(`/credential/getAllCredentials/${userId}`, {
    method: 'GET',
    token,
  });
}

export async function getCredentialDetails(credentialId: string, token: string): Promise<CredentialDetails> {
  return apiRequest<CredentialDetails>(`/credential/getCredentialDetails/${credentialId}`, {
    method: 'GET',
    token,
  });
}

export async function createCredential(
  payload: {
    credentialName: string;
    userId: string;
    category: string;
    fields: CredentialFieldPayload[];
  },
  token: string,
) {
  return apiRequest('/credential/registerNewCredential', {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
  });
}

export async function updateCredential(
  payload: {
    id?: string;
    credentialName: string;
    credentialCategoryId?: string;
    fields: CredentialFieldPayload[];
  },
  token: string,
) {
  return apiRequest('/credential/editCredential', {
    method: 'PUT',
    token,
    body: JSON.stringify(payload),
  });
}

export async function deleteCredential(credentialId: string, token: string) {
  return apiRequest(`/credential/deleteCredential/${credentialId}`, {
    method: 'DELETE',
    token,
  });
}
