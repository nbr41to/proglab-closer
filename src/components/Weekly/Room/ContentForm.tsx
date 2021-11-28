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
      <div className="form_input_wrapper">
        <p>今週の出来事</p>
        <ContentFormInput type="doing" roomId={roomId} />
        <p className="hint_message">
          今週の出来事に関するキーワードを送信しよう！学習に関係なくてもOK！
        </p>
      </div>
      <div className="form_input_wrapper">
        <p>今週に学んだこと</p>
        <ContentFormInput type="learned" roomId={roomId} />
        <p className="hint_message">
          今週に学んだ内容に関するキーワードを送信しよう！
        </p>
      </div>
      <div className="form_input_wrapper">
        <p>来週に学ぶこと</p>
        <ContentFormInput type="willLearn" roomId={roomId} />
        <p className="hint_message">
          来週の学びや活動の予定に関するキーワードを送信しよう！
        </p>
      </div>
    </StyledContentForm>
  );
};

const StyledContentForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;

  > .form_input_wrapper {
    width: 420px;
    padding: 12px 24px;
    margin-bottom: 12px;
    text-align: center;
    background-color: #ffde9d;
    border-radius: 999px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);

    > .hint_message {
      font-size: 12px;
      color: #444;
    }

    > input {
      background-color: #fff;
    }
  }
`;
