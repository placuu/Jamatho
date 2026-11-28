export interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string | null;
  level: number;
  experience: number;
  streak: number;
}

export interface UpdateUserProfileDto {
  username?: string;
  email?: string;
}

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const getToken = () => localStorage.getItem('token') || sessionStorage.getItem('token');

const authHeaders = (): Record<string, string> => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const usersService = {
  async getMe(): Promise<UserProfile> {
    const response = await fetch(`${API_URL}/api/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(errorText || 'Nie udało się pobrać profilu użytkownika.');
    }

    return response.json();
  },

  async updateMe(dto: UpdateUserProfileDto): Promise<UserProfile> {
    const response = await fetch(`${API_URL}/api/users/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(errorText || 'Nie udało się zaktualizować profilu.');
    }

    return response.json();
  },
};
