import { VFC } from 'react';
import { Box } from '@fower/react';
import { AtomicProps } from '@fower/types';

type ContentCardProps = Omit<AtomicProps, 'color'> & {
  text: string;
  name: string;
};

export const ContentCard: VFC<ContentCardProps> = ({
  text,
  name,
  ...props
}) => {
  const randomBgColor = () => {
    const colors = [
      { bgBrand600: true },
      { bgGray600: true },
      { bgPink600: true },
      { bgFuchsia600: true },
      { bgPurple600: true },
      { bgIndigo600: true },
      { bgBlue600: true },
      { bgCyan600: true },
      { bgGreen600: true },
      { bgLime600: true },
      { bgYellow600: true },
      { bgOrange600: true },
      { bgRed600: true },
    ];
    const dice = Math.floor(Math.random() * 12);
    return colors[dice];
  };

  return (
    <Box
      title={name}
      white
      text={20}
      px={16}
      py={12}
      m={4}
      h={60}
      toCenter
      rounded={8}
      {...randomBgColor()}
      {...props}
    >
      {text}
    </Box>
  );
};
