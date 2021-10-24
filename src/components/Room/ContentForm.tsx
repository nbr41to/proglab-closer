import { VFC } from 'react';
import styled from 'styled-components';

import { ContentFormInput } from './ContentFormInput';

type ContentFormProps = {
  className?: string;
  roomId: string;
};

export const ContentForm: VFC<ContentFormProps> = ({ className, roomId }) => {
  return (
    <StyledContentForm className={`${className}`}>
      <p>今週の出来事</p>
      <ContentFormInput type="doing" roomId={roomId} />
      <p>今週に学んだこと</p>
      <ContentFormInput type="learned" roomId={roomId} />
      <p>来週に学ぶこと</p>
      <ContentFormInput type="willLearn" roomId={roomId} />
    </StyledContentForm>
  );
};

const StyledContentForm = styled.div``;
