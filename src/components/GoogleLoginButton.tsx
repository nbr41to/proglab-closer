import { VFC } from 'react';
import styled from 'styled-components';
import google_login from 'src/assets/btn_google_signin_dark_pressed.png';
import Image from 'next/image';

type GoogleLoginButtonProps = {
  onClick: () => void;
};

export const GoogleLoginButton: VFC<GoogleLoginButtonProps> = ({ onClick }) => {
  return (
    <StyledGoogleLoginButton onClick={onClick}>
      <Image src={google_login} alt='google' />
    </StyledGoogleLoginButton>
  );
};

const StyledGoogleLoginButton = styled.div`
  width: 100%;
  cursor: pointer;
  > img {
    width: 100%;
  }
`;
