import { FormEvent, useState, VFC } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { postReport } from 'src/firebase/firestore/room';
import { ContentType } from 'src/types';
import styled from 'styled-components';

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
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) return;
    if (user.state !== 'hasValue') return;
    await postReport({
      content: { type, text, name: user.contents.name },
      roomId,
    });
    setText('');
  };
  return (
    <StyledContentFormInput
      className={`${className}`}
      onSubmit={(e) => submit(e)}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">送信</button>
    </StyledContentFormInput>
  );
};

const StyledContentFormInput = styled.form``;
