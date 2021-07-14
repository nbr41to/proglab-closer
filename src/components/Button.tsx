import { ReactNode, VFC } from 'react';
import { Box } from '@fower/react';
import { AtomicProps } from '@fower/types';

type ButtonProps = Omit<AtomicProps, 'color'> & {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
};

export const Button: VFC<ButtonProps> = ({
  label,
  icon,
  onClick,
  ...props
}) => {
  return (
    <Box
      as='button'
      onClick={onClick}
      rounded={8}
      text={20}
      fontBold
      flex
      toCenter
      px={20}
      py={16}
      transitionCommon
      scale--hover={98}
      shadow--active={`inset 0 0 4px #444`}
      {...props}
    >
      {icon && <Box pr={label ? 8 : 0}>{icon}</Box>}
      {label}
    </Box>
  );
};
