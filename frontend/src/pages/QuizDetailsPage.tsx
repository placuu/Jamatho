import { useEffect, useState, type FC } from 'react';
import { ArrowLeft, Clock3, FileText } from 'lucide-react';
import { QuestionCard } from '../components/quiz/QuestionCard';
import { quizzesService, type QuizDetails } from '../services/quizzesService';

interface QuizDetailsPageProps {
  quizId: string;
  onBack: () => void;
}

export const QuizDetailsPage: FC<QuizDetailsPageProps> = ({ quizId, onBack }) => {
  const [quiz, setQuiz] = useState<QuizDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const totalPoints =
    quiz?.quizQuestions.reduce((sum, question) => sum + question.points, 0) ?? 0;

  const handleAnswerChange = (key: string, value: string) => {
    setResponses((currentResponses) => ({
      ...currentResponses,
      [key]: value,
    }));
  };

  useEffect(() => {
    let isMounted = true;

    const loadQuiz = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const details = await quizzesService.getQuizById(quizId);
        if (isMounted) setQuiz(details);
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : 'Nie udało się pobrać arkusza.'
          );
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadQuiz();

    return () => {
      isMounted = false;
    };
  }, [quizId]);

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-white px-4 py-2.5 text-sm font-extrabold text-ink shadow-pop-sm transition-colors hover:bg-paper"
      >
        <ArrowLeft className="h-4 w-4" />
        Wróć do arkuszy
      </button>

      {isLoading ? (
        <div className="rounded-3xl border-[2.5px] border-ink bg-white p-8 text-center text-sm font-bold text-content-secondary">
          Ładowanie arkusza…
        </div>
      ) : error ? (
        <div
          role="alert"
          className="rounded-2xl border-2 border-red-400 bg-red-50 p-4 text-sm font-extrabold text-red-700"
        >
          {error}
        </div>
      ) : quiz ? (
        <>
          <header className="rounded-3xl border-[3px] border-ink bg-brand p-6 text-white shadow-pop-lg sm:p-8">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-100">
              <FileText className="h-4 w-4" />
              Rozwiąż arkusz
            </div>
            <h1 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
              {quiz.title}
            </h1>
            <div className="mt-5 flex flex-wrap gap-3 text-xs font-extrabold">
              {quiz.year != null && (
                <span className="rounded-xl border-2 border-ink bg-white px-3 py-2 text-ink">
                  {quiz.year}
                </span>
              )}
              {quiz.timeLimitMinutes != null && (
                <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-ink bg-white px-3 py-2 text-ink">
                  <Clock3 className="h-4 w-4" />
                  {quiz.timeLimitMinutes} min
                </span>
              )}
              <span className="rounded-xl border-2 border-ink bg-white px-3 py-2 text-ink">
                {quiz.quizQuestions.length} zadań
              </span>
              <span className="rounded-xl border-2 border-ink bg-white px-3 py-2 text-ink">
                {totalPoints} punktów
              </span>
              <span className="rounded-xl border-2 border-ink bg-white px-3 py-2 text-ink">
                Próg zaliczenia: {quiz.passingScore}%
              </span>
            </div>
          </header>


          <div className="space-y-5">
            {quiz.quizQuestions.map((question, index) => (
              <QuestionCard
                key={question.id}
                question={question}
                index={index}
                responses={responses}
                onAnswerChange={handleAnswerChange}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};