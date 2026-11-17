export interface QuizCard {
  id: string; // Guid z C# w JSON przychodzi jako string
  title: string;
  year: number | null;
  quizType: string;
  timeLimitMinutes: number | null;
  passingScore: number | null;
}

export interface QuizAnswer {
  id: string;
  answerText: string;
  subQuestionGroup: number;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  questionType: string;
  points: number;
  imageUrl: string | null;
  quizAnswers: QuizAnswer[];
}

export interface QuizDetails {
  id: string;
  title: string;
  year: number | null;
  timeLimitMinutes: number | null;
  passingScore: number;
  quizQuestions: QuizQuestion[];
}

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');



export const quizzesService = {
  async getQuizzes(): Promise<QuizCard[]> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

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

  async getQuizById(id: string): Promise<QuizDetails> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    const response = await fetch(`${API_URL}/api/quizzes/${encodeURIComponent(id)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      throw new Error('Nie udało się pobrać arkusza.');
    }

    return response.json();
  },

  getImageUrl(imageUrl: string | null): string | null {
  if (!imageUrl) return null;
  // Jeśli w bazie jest już pełny link (np. https://...), zwróć go bez zmian
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  // Doklej adres API i upewnij się, że jest dokładnie jeden ukośnik pośrodku
  const cleanPath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  return `${API_URL}${cleanPath}`;
}
};