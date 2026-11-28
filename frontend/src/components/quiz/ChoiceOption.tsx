import type { FC, ReactNode } from 'react';
import { Check, X } from 'lucide-react';

export type ChoiceStatus = 'correct' | 'wrong';

interface ChoiceOptionProps {
  name: string;
  checked: boolean;
  onChange: () => void;
  badge: string;
  children: ReactNode;
  status?: ChoiceStatus;
  disabled?: boolean;
}

export const ChoiceOption: FC<ChoiceOptionProps> = ({
  name,
  checked,
  onChange,
  badge,
  children,
  status,
  disabled = false,
}) => {
  const surface = status === 'correct'
    ? 'bg-mint translate-y-0.75 shadow-[0_1px_0_0_#1E1B4B]'
    : status === 'wrong'
      ? 'bg-red-300 translate-y-0.75 shadow-[0_1px_0_0_#1E1B4B]'
      : checked
        ? 'bg-sun translate-y-0.75 shadow-[0_1px_0_0_#1E1B4B]'
        : `bg-white shadow-[0_4px_0_0_#1E1B4B] ${
            disabled ? '' : 'hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_#1E1B4B]'
          }`;

  return (
    <label
      className={`block select-none ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="peer sr-only"
      />
      <span
        className={`flex items-center gap-3.5 min-h-15 rounded-2xl border-[2.5px] border-ink px-3.5 py-2.5 transition-all duration-150 peer-focus-visible:ring-4 peer-focus-visible:ring-brand/40 ${surface}`}
      >
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-2 border-ink font-sans text-base font-extrabold leading-none ${
            checked || status ? 'bg-ink text-white' : 'bg-paper text-ink'
          }`}
        >
          {badge}
        </span>

        <span className="min-w-0 flex-1 text-left text-ink">{children}</span>

        <span
          aria-hidden="true"
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
            checked || status ? 'border-ink bg-white' : 'border-ink/25 bg-transparent'
          }`}
        >
          {status === 'wrong' ? (
            <X className="h-4 w-4 stroke-[3.5] text-red-600" />
          ) : status === 'correct' ? (
            <Check className="h-4 w-4 stroke-[3.5] text-emerald-600" />
          ) : (
            checked && <Check className="h-4 w-4 stroke-[3.5] text-ink" />
          )}
        </span>
      </span>
    </label>
  );
};