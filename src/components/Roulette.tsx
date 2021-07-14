import { VFC, useState, useEffect } from 'react';
import { Box } from '@fower/react';
import { Content, ContentType } from 'src/types';
import { ContentCard } from './ContentCard';

type RouletteProps = {
  close: () => void;
  content: Content[];
};

export const Roulette: VFC<RouletteProps> = ({ close, content }) => {
  const [dice, setDice] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (content.length < 2) return;
    if (count >= 8) return;
    setTimeout(() => {
      let nextDice = Math.floor(Math.random() * content.length);
      while (nextDice === dice) {
        nextDice = Math.floor(Math.random() * content.length);
      }
      setCount((prev) => prev + 1);
      if (count === 7 && nextDice % 2 === 1) return;
      setDice(nextDice);
    }, 300 + count * 60);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <Box toCenter>
      <Box
        fixed
        top0
        left0
        w='100vw'
        h='100vh'
        opacity={50}
        bgGray600
        onClick={close}
      />
      <Box
        toCenter
        column
        absolute
        top40
        bgWhite
        zIndex={99}
        p={20}
        borderBlack
        border={2}
        rounded={8}
        w={300}
        h={300}
      >
        <Box bgRed700={count === 8} p={2} rounded={12}>
          <ContentCard content={content[dice]} />
        </Box>
      </Box>
    </Box>
  );
};
