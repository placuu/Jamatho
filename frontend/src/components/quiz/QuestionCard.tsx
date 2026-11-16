import type { FC } from 'react';
import { quizzesService, type QuizQuestion } from '../../services/quizzesService';
import { ChoiceOption } from './ChoiceOption';
import { QuestionText } from './QuestionText';

/** Polska odmiana: 1 punkt, 2–4 punkty, 5+ punktów (z wyjątkiem 12–14) */
export const formatPoints = (points: number): string => {
  if (points === 1) return 'punkt';

  const lastDigit = points % 10;
  const lastTwoDigits = points % 100;
  const isPlural2to4 =
    lastDigit >= 2 && lastDigit <= 4 && !(lastTwoDigits >= 12 && lastTwoDigits <= 14);

  return isPlural2to4 ? 'punkty' : 'punktów';
};

interface QuestionCardProps {
  question: QuizQuestion;
  index: number;
  responses: Record<string, string>;
  onAnswerChange: (key: string, value: string) => void;
}

export const QuestionCard: FC<QuestionCardProps> = ({
  question,
  index,
  responses,
  onAnswerChange,
}) => {
  const answerGroups = Array.from(
    new Set(question.quizAnswers.map((answer) => answer.subQuestionGroup))
  ).sort((a, b) => a - b);

  return (
    <article className="rounded-3xl border-[2.5px] border-ink bg-white p-5 sm:p-7 shadow-pop-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-display text-lg sm:text-xl font-extrabold text-ink">
          Zadanie {index + 1}
        </h2>
        <span className="shrink-0 rounded-full border border-ink bg-sun px-3 py-1 text-xs font-extrabold text-ink">
          {question.points} {formatPoints(question.points)}
        </span>
      </div>

      <QuestionText text={question.questionText} />

      {question.imageUrl && (
        <img
          src={quizzesService.getImageUrl(question.imageUrl) || undefined}
          alt={`Ilustracja do zadania ${index + 1}`}
          className="mt-5 h-auto max-w-full rounded-2xl border-2 border-ink"
        />
      )}

      {question.questionType === 'TRUE_FALSE' ? (
        <div className="mt-5 space-y-4">
          {answerGroups.map((group) => (
            <section key={group} className="rounded-2xl bg-paper p-4">
              <h3 className="mb-3 text-xs font-extrabold uppercase tracking-wide text-content-secondary">
                Zestaw {group}
              </h3>
              <div className="space-y-3">
                {question.quizAnswers
                  .filter((answer) => answer.subQuestionGroup === group)
                  .map((answer, answerIndex) => (
                    <ChoiceOption
                      key={answer.id}
                      name={`question-${question.id}-group-${group}`}
                      badge={String.fromCharCode(65 + answerIndex)}
                      checked={responses[`${question.id}-${group}`] === answer.id}
                      onChange={() => onAnswerChange(`${question.id}-${group}`, answer.id)}
                    >
                      <QuestionText text={answer.answerText} />
                    </ChoiceOption>
                  ))}
              </div>
            </section>
          ))}
        </div>
      ) : question.questionType === 'SELF_CHECK' ? (
        <textarea
          value={responses[question.id] ?? ''}
          onChange={(event) => onAnswerChange(question.id, event.target.value)}
          aria-label={`Odpowiedź do zadania ${index + 1}`}
          placeholder="Wpisz odpowiedź lub obliczenia…"
          rows={5}
          className="mt-5 w-full resize-y rounded-2xl border-2 border-border-light bg-paper p-4 text-sm font-semibold text-ink placeholder:text-content-muted focus:border-brand focus:outline-none"
        />
      ) : (
        <ol className="mt-5 space-y-3">
          {question.quizAnswers.map((answer, answerIndex) => (
            <li key={answer.id}>
              <ChoiceOption
                name={`question-${question.id}`}
                badge={String.fromCharCode(65 + answerIndex)}
                checked={responses[question.id] === answer.id}
                onChange={() => onAnswerChange(question.id, answer.id)}
              >
                <QuestionText text={answer.answerText} />
              </ChoiceOption>
            </li>
          ))}
        </ol>
      )}
    </article>
  );
};