import { ReactNode, VFC } from 'react';

type ButtonProps = {
  className?: string;
  children: ReactNode;
  onClick: () => void;
};

export const Button: VFC<ButtonProps> = ({ className, children, onClick }) => {
  const bgColor = className || 'bg-amber-400 text-white';

  return (
    <button
      className={`${bgColor} flex justify-center items-center py-2 px-4 rounded-md font-bold shadow hover:brightness-95`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
