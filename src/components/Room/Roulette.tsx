import { VFC, useState, useEffect } from 'react';
import { Content } from 'src/types';

type RouletteProps = {
  content: Content[];
};

export const Roulette: VFC<RouletteProps> = ({ content }) => {
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
  }, [count]);

  return <div>{/* <ContentCard content={content[dice]} /> */}</div>;
};
