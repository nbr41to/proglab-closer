import { ReactNode, VFC } from 'react';

type CardProps = {
  className?: string;
  children: ReactNode;
};

export const Card: VFC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`bg-teal-50 rounded-lg border-2 border-slate-600 ${className}`}
    >
      {children}
    </div>
  );
};
