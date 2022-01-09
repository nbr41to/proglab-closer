import { VFC } from 'react';

type PlaceButtonProps = {
  className?: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export const PlaceButton: VFC<PlaceButtonProps> = ({
  className,
  label,
  onClick,
  disabled = false,
}) => {
  const disabledClasses = disabled
    ? 'grayscale cursor-not-allowed text-gray-600'
    : 'cursor-pointer hover:scale-110 transition-all';

  const handleClick = () => {
    if (disabled) return;
    onClick();
  };

  return (
    <div
      className={`
        ${className}
        ${disabledClasses} 
        flex absolute justify-center items-center 
        w-32 h-32 
        text-lg font-bold tracking-widest 
        rounded-full border-2 border-white/70 
      `}
      onClick={handleClick}
    >
      {label}
    </div>
  );
};
