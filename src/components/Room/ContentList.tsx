import { VFC } from 'react';
import { Room } from 'src/types';
import styled from 'styled-components';

type ContentListProps = {
  className?: string;
  room: Room;
};

export const ContentList: VFC<ContentListProps> = ({ className, room }) => {
  return (
    <StyledContentList className={`${className}`}>
      <h3>今週の出来事</h3>
      {room?.contents
        ?.filter((content) => content.type === 'doing')
        .map((content) => (
          <li key={`${content.text}_${content.name}`} title={content.name}>
            {content.text}
          </li>
        ))}
      <h3>今週学んだこと</h3>
      {room?.contents
        ?.filter((content) => content.type === 'learned')
        .map((content) => (
          <li key={`${content.text}_${content.name}`} title={content.name}>
            {content.text}
          </li>
        ))}
      <h3>来週学ぶこと</h3>
      {room?.contents
        ?.filter((content) => content.type === 'willLearn')
        .map((content) => (
          <li key={`${content.text}_${content.name}`} title={content.name}>
            {content.text}
          </li>
        ))}
    </StyledContentList>
  );
};

const StyledContentList = styled.div``;
