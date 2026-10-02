import { apiRequest } from '@/services/api';

export type LoginResponse = {
  userId: string;
  token: string;
  username: string;
  email: string;
};

export async function loginUser(email: string, password: string) {
  return apiRequest<LoginResponse>('/user/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function registerUser(username: string, email: string, password: string) {
  return apiRequest('/user/registerNewUser', {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
  });
}
