import type { FC } from 'react';
import {
  quizzesService,
  type QuestionResult,
  type QuizQuestion,
} from '../../services/quizzesService';
import { ChoiceOption, type ChoiceStatus } from './ChoiceOption';
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

/** Klucz w `responses` dla pola z punktami własnymi (SELF_CHECK) */
export const selfPointsKey = (questionId: string) => `${questionId}-points`;

/** Token wysyłany/odbierany dla pytań TRUE_FALSE */
export const trueFalseToken = (answerId: string, value: string) =>
  `${answerId}:${value}`;

interface QuestionCardProps {
  question: QuizQuestion;
  index: number;
  responses: Record<string, string>;
  onAnswerChange: (key: string, value: string) => void;
  sourceTitle?: string;
  result?: QuestionResult;
}

export const QuestionCard: FC<QuestionCardProps> = ({
  question,
  index,
  responses,
  onAnswerChange,
  sourceTitle,
  result,
}) => {
  const answerGroups = Array.from(
    new Set(question.quizAnswers.map((answer) => answer.subQuestionGroup))
  ).sort((a, b) => a - b);
  const isGroupedChoice =
    question.questionType === 'DOUBLE_CHOICE' ||
    question.questionType === 'YES_NO_REASON';
  const isChecked = !!result;

  /** Zielone = poprawna odpowiedź, czerwone = zaznaczona, ale błędna */
  const correctIds = new Set(result?.correctAnswerIds ?? []);

/** Zielone = poprawna opcja, czerwone = zaznaczona, ale błędna */
const getStatus = (
  isCorrectOption: boolean,
  checked: boolean
): ChoiceStatus | undefined => {
  if (!result) return undefined;
  if (isCorrectOption) return 'correct';
  if (checked) return 'wrong';
  return undefined;
};

  return (
    <article
      className={`rounded-3xl border-[2.5px] bg-white p-5 sm:p-7 shadow-pop-sm ${
        result
          ? result.isCorrect
            ? 'border-emerald-500'
            : 'border-red-400'
          : 'border-ink'
      }`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-display text-lg sm:text-xl font-extrabold text-ink">
          Zadanie {index + 1}
        </h2>
        <div className="flex min-w-0 items-center justify-end gap-2">
          {sourceTitle && (
            <span
              className="truncate text-right text-xs font-bold text-content-secondary"
              title={sourceTitle}
            >
              {sourceTitle}
            </span>
          )}
          <span
            className={`shrink-0 rounded-full border border-ink px-3 py-1 text-xs font-extrabold text-ink ${
              result ? (result.isCorrect ? 'bg-mint' : 'bg-red-300') : 'bg-sun'
            }`}
          >
            {result
              ? `${result.pointsEarned}/${result.maxPoints} ${formatPoints(result.maxPoints)}`
              : `${question.points} ${formatPoints(question.points)}`}
          </span>
        </div>
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
              {question.quizAnswers
                .filter((answer) => answer.subQuestionGroup === group)
                .map((answer) => (
                  <div key={answer.id} className="space-y-3">
                    <QuestionText text={answer.answerText} />
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: 'P', label: 'Prawda' },
                        { value: 'F', label: 'Fałsz' },
                      ].map(({ value, label }) => {
                        const checked = responses[`${question.id}-${group}`] === value;
                        return (
                          <ChoiceOption
                            key={value}
                            name={`question-${question.id}-group-${group}`}
                            badge={value}
                            checked={checked}
                            disabled={isChecked}
                            status={getStatus(
                              value === 'P' ? correctIds.has(answer.id) : !correctIds.has(answer.id),
                              checked
                            )}
                            onChange={() =>
                              onAnswerChange(`${question.id}-${group}`, value)
                            }
                          >
                            {label}
                          </ChoiceOption>
                        );
                      })}
                    </div>
                  </div>
                ))}
            </section>
          ))}
        </div>
      ) : isGroupedChoice ? (
        <div className="mt-5 space-y-4">
          {answerGroups.map((group) => (
            <section key={group} className="rounded-2xl bg-paper p-4">
              <h3 className="mb-3 text-xs font-extrabold uppercase tracking-wide text-content-secondary">
                {question.questionType === 'YES_NO_REASON'
                  ? group === 1
                    ? 'Odpowiedź'
                    : 'Uzasadnienie'
                  : `Zestaw ${group}`}
              </h3>
              <div className="space-y-3">
                {question.quizAnswers
                  .filter((answer) => answer.subQuestionGroup === group)
                  .map((answer, answerIndex) => {
                    const checked = responses[`${question.id}-${group}`] === answer.id;
                    return (
                      <ChoiceOption
                        key={answer.id}
                        name={`question-${question.id}-group-${group}`}
                        badge={String.fromCharCode(65 + answerIndex)}
                        checked={checked}
                        disabled={isChecked}
                        status={getStatus(correctIds.has(answer.id), checked)}
                        onChange={() =>
                          onAnswerChange(`${question.id}-${group}`, answer.id)
                        }
                      >
                        <QuestionText text={answer.answerText} />
                      </ChoiceOption>
                    );
                  })}
              </div>
            </section>
          ))}
        </div>
      ) : question.questionType === 'SELF_CHECK' ? (
        <div className="mt-5 space-y-3">
          <textarea
            value={responses[question.id] ?? ''}
            onChange={(event) => onAnswerChange(question.id, event.target.value)}
            disabled={isChecked}
            aria-label={`Odpowiedź do zadania ${index + 1}`}
            placeholder="Wpisz odpowiedź lub obliczenia…"
            rows={5}
            className="w-full resize-y rounded-2xl border-2 border-border-light bg-paper p-4 text-sm font-semibold text-ink placeholder:text-content-muted focus:border-brand focus:outline-none disabled:opacity-70"
          />
          <label className="flex items-center gap-3 text-sm font-extrabold text-ink">
            Ile punktów sobie przyznajesz?
            <input
              type="number"
              min={0}
              max={question.points}
              step={1}
              value={responses[selfPointsKey(question.id)] ?? ''}
              onChange={(event) =>
                onAnswerChange(selfPointsKey(question.id), event.target.value)
              }
              disabled={isChecked}
              className="w-20 rounded-xl border-2 border-ink bg-white px-3 py-1.5 text-center focus:border-brand focus:outline-none disabled:opacity-70"
            />
            <span className="text-content-secondary">/ {question.points}</span>
          </label>
        </div>
      ) : (
        <ol className="mt-5 space-y-3">
          {question.quizAnswers.map((answer, answerIndex) => {
            const checked = responses[question.id] === answer.id;
            return (
              <li key={answer.id}>
                <ChoiceOption
                  name={`question-${question.id}`}
                  badge={String.fromCharCode(65 + answerIndex)}
                  checked={checked}
                  disabled={isChecked}
                  status={getStatus(correctIds.has(answer.id), checked)}
                  onChange={() => onAnswerChange(question.id, answer.id)}
                >
                  <QuestionText text={answer.answerText} />
                </ChoiceOption>
              </li>
            );
          })}
        </ol>
      )}
      {result?.explanation && (
        <div className="mt-5 rounded-2xl border-2 border-ink bg-brand-light p-4">
          <p className="mb-1 text-xs font-extrabold uppercase tracking-wide text-content-secondary">
            Wyjaśnienie
          </p>
          <QuestionText text={result.explanation} />
        </div>
      )}
    </article>
  );
};