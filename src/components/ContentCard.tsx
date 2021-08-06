import { VFC } from 'react';
import { AtomicProps } from '@fower/types';
import { Content } from 'src/types';
import styled from 'styled-components';

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

  return (
    <StyledContentCard
      className='toCenter'
      bgColor={colors[colorNum]}
      title={name}
    >
      {text}
    </StyledContentCard>
  );
};

const StyledContentCard = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  color: #fff;
`;
