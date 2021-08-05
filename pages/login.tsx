import Router from 'next/router';
import { googleLogin } from '../src/firebase/auth';
import logo from 'public/logo.png';
import Image from 'next/image';
import { GoogleLoginButton } from 'src/components/GoogleLoginButton';
import styled from 'styled-components';

export default function Login() {
  const login = () => {
    googleLogin().then(() => Router.push(`/`));
  };

  return (
    <StyledLogin>
      <div className='container'>
        <div className='logo'>
          <Image src={logo} alt='logo' />
        </div>
        <GoogleLoginButton onClick={login} />
      </div>
    </StyledLogin>
  );
}

const StyledLogin = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: orange;

  display: flex;
  justify-content: center;
  align-items: center;

  > .container {
    width: 360px;
    padding: 32px 24px;
    background-color: white;
    border-radius: 12px;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    > .logo {
      margin-bottom: 12px;
      padding: 0 4px;
      img {
        border-radius: 4px;
      }
    }
  }
`;
