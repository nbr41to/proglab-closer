import { VFC } from 'react';
import { AtomicProps } from '@fower/types';
import { Content } from 'src/types';

const colors = [
  'orange',
  'tomato',
  'skyblue',
  'lime',
  'red',
  'purple',
  'darkblue',
];

type ContentCardProps = Omit<AtomicProps, 'color'> & {
  content: Content;
};

export const ContentCard: VFC<ContentCardProps> = ({ content }) => {
  const { text, name, colorNum } = content;

  return <div title={name}>{text}</div>;
};
