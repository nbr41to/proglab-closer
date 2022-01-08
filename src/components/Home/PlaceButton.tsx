import { VFC } from 'react';

type PlaceButtonProps = {
  className?: string;
  label: string;
  onClick: () => void;
};

export const PlaceButton: VFC<PlaceButtonProps> = ({
  className,
  label,
  onClick,
}) => {
  return (
    <div
      className={`${className} w-32 h-32 absolute rounded-full hover:scale-110 transition-all flex justify-center items-center cursor-pointer text-lg font-bold tracking-widest border-2 border-white/70`}
      onClick={onClick}
    >
      {label}
    </div>
  );
};
