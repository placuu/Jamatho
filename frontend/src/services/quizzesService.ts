export interface QuizCard {
  id: string; // Guid z C# w JSON przychodzi jako string
  title: string;
  year: number | null;
  quizType: string;
  timeLimitMinutes: number | null;
  passingScore: number | null;
}

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export const quizzesService = {
  async getQuizzes(): Promise<QuizCard[]> {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/api/quizzes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      throw new Error('Nie udało się pobrać listy arkuszy.');
    }

    return response.json();
  },
};