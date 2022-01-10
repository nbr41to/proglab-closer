import { ReactNode, VFC } from 'react';

type BoardProps = {
  className?: string;
  children: ReactNode;
};

export const Board: VFC<BoardProps> = ({ children, className }) => {
  return (
    <div
      className={`bg-teal-50 rounded-lg border-2 border-slate-600 ${className}`}
    >
      {children}
    </div>
  );
};
