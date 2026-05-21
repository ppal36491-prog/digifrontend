import { API_BASE_URL } from '../config/api';

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },
};

// Pages API
export const pagesAPI = {
  getPublished: async () => {
    const response = await fetch(`${API_BASE_URL}/pages/public`);
    return response.json();
  },

  getByRoute: async (route: string) => {
    const response = await fetch(`${API_BASE_URL}/pages/public/${route}`);
    return response.json();
  },

  getAll: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/pages`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  getById: async (id: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/pages/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  create: async (data: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/pages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  update: async (id: string, data: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/pages/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async (id: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/pages/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },
};
