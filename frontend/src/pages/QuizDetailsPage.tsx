import { useEffect, useState, type FC } from 'react';
import { ArrowLeft, CheckCheck, Clock3, FileText, Play, RotateCcw } from 'lucide-react';
import {
  QuestionCard,
  selfPointsKey,
} from '../components/quiz/QuestionCard';
import {
  quizzesService,
  type QuizDetails,
  type QuizQuestion,
  type QuizResult,
  type SubmitQuizAnswer,
} from '../services/quizzesService';

interface QuizDetailsPageProps {
  quizId: string;
  onBack: () => void;
  isQuestionBank: boolean;
}

interface QuizDraft {
  responses: Record<string, string>;
  isStarted: boolean;
}

const quizDraftKey = (quizId: string) => `quiz-progress:${quizId}`;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isStringRecord = (value: unknown): value is Record<string, string> =>
  isRecord(value) && Object.values(value).every((item) => typeof item === 'string');

const readQuizDraft = (quizId: string): QuizDraft | null => {
  const key = quizDraftKey(quizId);
  const savedDraft = localStorage.getItem(key);
  if (!savedDraft) return null;

  let parsedDraft: unknown;
  try {
    parsedDraft = JSON.parse(savedDraft);
  } catch {
    localStorage.removeItem(key);
    return null;
  }

  if (
    !isRecord(parsedDraft) ||
    !isStringRecord(parsedDraft.responses) ||
    typeof parsedDraft.isStarted !== 'boolean'
  ) {
    localStorage.removeItem(key);
    return null;
  }

  return {
    responses: parsedDraft.responses,
    isStarted: parsedDraft.isStarted,
  };
};

/** Zamienia stan formularza na format oczekiwany przez API */
const buildAnswer = (
  question: QuizQuestion,
  responses: Record<string, string>
): SubmitQuizAnswer => {
  const groups = Array.from(
    new Set(question.quizAnswers.map((a) => a.subQuestionGroup))
  ).sort((a, b) => a - b);

  let selectedAnswers: string[] = [];
  let selfAssessedPoints: number | null = null;

  switch (question.questionType) {
    case 'TRUE_FALSE':
      // wysyłamy ID zdań oznaczonych jako "Prawda"
      selectedAnswers = groups.flatMap((group) =>
        responses[`${question.id}-${group}`] === 'P'
          ? question.quizAnswers
              .filter((a) => a.subQuestionGroup === group)
              .map((a) => a.id)
          : []
      );
      break;
    case 'DOUBLE_CHOICE':
    case 'YES_NO_REASON':
      selectedAnswers = groups
        .map((group) => responses[`${question.id}-${group}`])
        .filter(Boolean);
      break;
    case 'SELF_CHECK': {
      const raw = responses[selfPointsKey(question.id)];
      if (raw !== undefined && raw !== '') {
        selfAssessedPoints = Math.min(
          Math.max(Math.round(Number(raw)) || 0, 0),
          question.points
        );
      }
      break;
    }
    default:
      if (responses[question.id]) selectedAnswers = [responses[question.id]];
  }

  return { questionId: question.id, selectedAnswers, selfAssessedPoints };
};

export const QuizDetailsPage: FC<QuizDetailsPageProps> = ({
  quizId,
  onBack,
  isQuestionBank,
}) => {
  const [quiz, setQuiz] = useState<QuizDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [isStarted, setIsStarted] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const totalPoints =
    quiz?.quizQuestions.reduce((sum, question) => sum + question.points, 0) ?? 0;

  const handleAnswerChange = (key: string, value: string) => {
    setResponses((currentResponses) => ({
      ...currentResponses,
      [key]: value,
    }));
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSubmit = async () => {
    if (!quiz) return;
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      const checked = await quizzesService.submitQuiz({
        quizId: quiz.id,
        answers: quiz.quizQuestions.map((q) => buildAnswer(q, responses)),
      });
      localStorage.removeItem(quizDraftKey(quizId));
      setResult(checked);
      scrollToTop();
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Nie udało się sprawdzić egzaminu.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    localStorage.removeItem(quizDraftKey(quizId));
    setResult(null);
    setResponses({});
    setSubmitError(null);
    if (!isQuestionBank) setIsStarted(false);
    scrollToTop();
  };

  useEffect(() => {
    let isMounted = true;

    const loadQuiz = async () => {
      setIsStarted(false);
      setResponses({});
      setResult(null);
      setSubmitError(null);
      setQuiz(null);
      try {
        setIsLoading(true);
        setError(null);
        const details = await quizzesService.getQuizById(quizId);
        if (isMounted) {
          const draft = readQuizDraft(quizId);
          setResponses(draft?.responses ?? {});
          setIsStarted(draft?.isStarted ?? false);
          setQuiz(details);
        }
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

  useEffect(() => {
    if (!quiz) return;

    const key = quizDraftKey(quizId);
    if (result) {
      localStorage.removeItem(key);
      return;
    }

    const hasProgress =
      isStarted || Object.values(responses).some((value) => value.length > 0);

    if (hasProgress) {
      localStorage.setItem(key, JSON.stringify({ responses, isStarted }));
    } else {
      localStorage.removeItem(key);
    }
  }, [isStarted, quiz, quizId, responses, result]);

  const passed = result
  ? (result.isPassed ?? result.percentage >= (quiz?.passingScore ?? 0))
  : false;

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-white px-4 py-2.5 text-sm font-extrabold text-ink shadow-pop-sm transition-colors hover:bg-paper"
      >
        <ArrowLeft className="h-4 w-4" />
        {isQuestionBank ? 'Wróć do bazy zadań' : 'Wróć do arkuszy'}
      </button>

      {isLoading ? (
        <div className="rounded-3xl border-[2.5px] border-ink bg-white p-8 text-center text-sm font-bold text-content-secondary">
          {isQuestionBank ? 'Ładowanie zestawu…' : 'Ładowanie arkusza…'}
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
              {isQuestionBank ? 'Rozwiąż zadania' : 'Rozwiąż arkusz'}
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

          {result && (
            <section
              role="status"
              className={`rounded-3xl border-[3px] border-ink p-6 text-ink shadow-pop-lg sm:p-8 ${
                passed ? 'bg-mint' : 'bg-red-300'
              }`}
            >
              <p className="text-xs font-extrabold uppercase tracking-wider">
                {passed ? 'Egzamin zaliczony 🎉' : 'Egzamin niezaliczony'}
              </p>
              <div className="mt-2 flex flex-wrap items-end gap-x-6 gap-y-1">
                <span className="font-display text-4xl font-extrabold sm:text-5xl">
                  {result.totalPointsEarned} / {result.maxPossiblePoints} pkt
                </span>
                <span className="font-display text-3xl font-extrabold sm:text-4xl">
                  {result.percentage}%
                </span>
              </div>
              {result.xpEarned > 0 && (
              <p className="mt-3 text-sm font-extrabold">
                +{result.xpEarned} XP
                {result.isLevelUp && ` · Nowy poziom: ${result.newLevel} 🎉`}
              </p>
        )}
              <button
                type="button"
                onClick={handleRetry}
                className="mt-5 inline-flex items-center gap-2 rounded-xl border-[2.5px] border-ink bg-white px-4 py-2.5 text-sm font-extrabold shadow-pop-sm transition-transform hover:-translate-y-0.5"
              >
                <RotateCcw className="h-4 w-4" />
                Spróbuj ponownie
              </button>
            </section>
          )}

          {!isQuestionBank && !isStarted && (
            <div className="flex flex-col items-center gap-3 rounded-3xl border-[2.5px] border-ink bg-white p-8 text-center shadow-pop-sm">
              <p className="text-sm font-bold text-content-secondary">
                Zadania będą widoczne po rozpoczęciu egzaminu.
              </p>
              <button
                type="button"
                onClick={() => setIsStarted(true)}
                className="inline-flex items-center gap-2 rounded-xl border-[2.5px] border-ink bg-sun px-5 py-3 font-display text-sm font-extrabold text-ink shadow-pop-sm transition-transform hover:-translate-y-0.5"
              >
                <Play className="h-4 w-4 fill-current" />
                Start egzaminu
              </button>
            </div>
          )}

          {(isQuestionBank || isStarted) && (
            <>
              <div className="space-y-5">
                {quiz.quizQuestions.map((question, index) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    index={index}
                    responses={responses}
                    onAnswerChange={handleAnswerChange}
                    sourceTitle={isQuestionBank ? quiz.title : undefined}
                    result={result?.questionResults.find(
                      (r) => r.questionId === question.id
                    )}
                  />
                ))}
              </div>

              {!result && (
                <div className="flex flex-col items-center gap-3 pb-6">
                  {submitError && (
                    <div
                      role="alert"
                      className="rounded-2xl border-2 border-red-400 bg-red-50 px-4 py-3 text-sm font-extrabold text-red-700"
                    >
                      {submitError}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-xl border-[2.5px] border-ink bg-sun px-6 py-3.5 font-display text-base font-extrabold text-ink shadow-pop-sm transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    <CheckCheck className="h-5 w-5" />
                    {isSubmitting ? 'Sprawdzanie…' : 'Sprawdź egzamin'}
                  </button>
                </div>
              )}
            </>
          )}
        </>
      ) : null}
    </div>
  );
};