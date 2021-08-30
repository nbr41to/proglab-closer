import { useState, VFC } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';
import { withAuthInfo } from '../../recoil/authState';
import { createRoom } from 'src/firebase/firestore/room';

type CreateFormProps = {
  className?: string;
};

export const CreateForm: VFC<CreateFormProps> = ({ className }) => {
  const [input, setInput] = useState('');
  const user = useRecoilValueLoadable(withAuthInfo);

  const submit = async () => {
    if (!input) return;
    await createRoom(input);
    setInput('');
  };

  if (user.state === 'hasValue' && user.contents?.role === 'admin') {
    return (
      <StyledCreateForm className={`${className}`}>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={submit}>作成</button>
      </StyledCreateForm>
    );
  } else {
    return null;
  }
};

const StyledCreateForm = styled.div``;
