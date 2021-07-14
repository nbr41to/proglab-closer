import { VFC } from 'react';
import { Box } from '@fower/react';
import { AtomicProps } from '@fower/types';
import { Content } from 'src/types';

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

type ContentCardProps = Omit<AtomicProps, 'color'> & {
  content: Content;
};

export const ContentCard: VFC<ContentCardProps> = ({ content, ...props }) => {
  const { text, name, colorNum } = content;

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
      cursorPointer
      {...colors[colorNum]}
      {...props}
    >
      {text}
    </Box>
  );
};
