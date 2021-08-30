import { VFC } from 'react';
import styled from 'styled-components';
import { User } from 'src/types';
import { authenticateUser } from 'src/firebase/firestore/user';

type AuthenticateButtonProps = {
  className?: string;
  user: User;
};

export const AuthenticateButton: VFC<AuthenticateButtonProps> = ({
  className,
  user,
}) => {
  return (
    <StyledAuthenticateButton className={`${className}`}>
      <p>id: {user?.id}</p>
      <p>name: {user?.name}</p>
      <button onClick={() => authenticateUser(user?.id)}>承認</button>
    </StyledAuthenticateButton>
  );
};

const StyledAuthenticateButton = styled.div`
  padding: 12px;
  border-bottom: 1px solid #444;
`;
