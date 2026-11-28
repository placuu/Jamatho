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

export interface SubmitQuizAnswer {
  questionId: string;
  selectedAnswers: string[];
  selfAssessedPoints: number | null;
}

export interface SubmitQuizPayload {
  quizId: string;
  answers: SubmitQuizAnswer[];
}

export interface QuestionResult {
  questionId: string;
  isCorrect: boolean;
  pointsEarned: number;
  maxPoints: number;
  explanation: string | null;
  selectedAnswerIds: string[];
  correctAnswerIds: string[];
}

export interface QuizResult {
  totalPointsEarned: number;
  maxPossiblePoints: number;
  percentage: number;
  isPassed: boolean | null;
  xpEarned: number;
  totalXp: number;
  isLevelUp: boolean;
  newLevel: number;
  questionResults: QuestionResult[];
}

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');


const authHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const quizzesService = {
  async getQuizzes(): Promise<QuizCard[]> {
    const response = await fetch(`${API_URL}/api/quizzes`, {
      method: 'GET',
      headers: authHeaders(),
    });
    if (!response.ok) throw new Error('Nie udało się pobrać listy arkuszy.');
    return response.json();
  },

  async getQuizById(id: string): Promise<QuizDetails> {
    const response = await fetch(`${API_URL}/api/quizzes/${encodeURIComponent(id)}`, {
      method: 'GET',
      headers: authHeaders(),
    });
    if (!response.ok) throw new Error('Nie udało się pobrać arkusza.');
    return response.json();
  },

  async submitQuiz(payload: SubmitQuizPayload): Promise<QuizResult> {
    // TODO: dopasuj endpoint do swojego API
    const response = await fetch(
      `${API_URL}/api/quizzes/submit`,
      {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(payload),
      }
    );
    if (!response.ok) throw new Error('Nie udało się sprawdzić egzaminu.');
    return response.json();
  },

  getImageUrl(imageUrl: string | null): string | null {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    const cleanPath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
    return `${API_URL}${cleanPath}`;
  },
};