import { VFC, useState, useEffect } from 'react';
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
    <div>
      <ContentCard content={content[dice]} />
    </div>
  );
};
