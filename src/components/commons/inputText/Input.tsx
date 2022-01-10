import { InputHTMLAttributes, VFC } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export const Input: VFC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`${className} p-2 rounded border border-gray-500`}
      {...props}
    />
  );
};
