import type { FC } from 'react';
import { MathView } from '../MathView';

interface QuestionTextProps {
  text: string;
  className?: string;
}

/** Tekst z API: zwykłe fragmenty + wzory w $...$ renderowane przez KaTeX */
export const QuestionText: FC<QuestionTextProps> = ({ text, className = '' }) => (
  <span
    className={`block text-sm sm:text-base font-semibold leading-relaxed whitespace-pre-line ${className}`}
  >
    {text.split(/(\$[^$\n]+\$)/g).map((part, index) =>
      part.length > 2 && part.startsWith('$') && part.endsWith('$') ? (
        <MathView key={index} math={part.slice(1, -1)} />
      ) : (
        <span key={index}>{part}</span>
      )
    )}
  </span>
);