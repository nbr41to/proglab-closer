import { useEffect, useState, VFC } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { updateUserName } from 'src/firebase/firestore/user';
import styled from 'styled-components';

import { withAuthInfo } from '../../recoil/authState/selector';

type EditNameFormProps = {
  className?: string;
};

export const EditNameForm: VFC<EditNameFormProps> = ({ className }) => {
  const user = useRecoilValueLoadable(withAuthInfo);
  const [name, setName] = useState(user?.contents?.name || '');

  useEffect(() => {
    setName(user?.contents?.name || '');
  }, [user]);

  const submit = async () => {
    if (!name) return;
    await updateUserName(name);
  };

  return (
    <StyledEditNameForm className={`${className}`}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={submit}>変更</button>
    </StyledEditNameForm>
  );
};

const StyledEditNameForm = styled.div``;
