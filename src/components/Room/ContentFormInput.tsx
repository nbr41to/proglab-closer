import { useState, VFC } from 'react';
import styled from 'styled-components';
import { ContentType } from 'src/types';
import { postReport } from 'src/firebase/firestore/room';
import { useRecoilValueLoadable } from 'recoil';
import { withAuthInfo } from '../../recoil/authState/selector';

type ContentFormInputProps = {
  className?: string;
  type: ContentType;
  roomId: string;
};

export const ContentFormInput: VFC<ContentFormInputProps> = ({
  className,
  type,
  roomId,
}) => {
  const user = useRecoilValueLoadable(withAuthInfo);
  const [text, setText] = useState('');
  const submit = async () => {
    if (!text) return;
    if (user.state !== 'hasValue') return;
    await postReport({
      content: { type, text, name: user.contents.name },
      roomId,
    });
    setText('');
  };
  return (
    <StyledContentFormInput className={`${className}`}>
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={submit}>送信</button>
    </StyledContentFormInput>
  );
};

const StyledContentFormInput = styled.div``;
