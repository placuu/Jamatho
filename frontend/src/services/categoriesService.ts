export interface Category {
  id: string;
  name: string;
  description: string | null;
  lessonsCount: number;
  completedLessons: number;
}

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export const categoriesService = {
  async getCategories(): Promise<Category[]> {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/api/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Token jest kluczowy, żeby GetCurrentUserId() w kontrolerze zwróciło CompletedLessons dla ucznia
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      throw new Error('Nie udało się pobrać listy tematów.');
    }

    return response.json();
  },
};