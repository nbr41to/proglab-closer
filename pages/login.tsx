import { useRouter } from 'next/router';
import { VFC } from 'react';
import { googleSignIn } from 'src/firebase/auth';
import styled from 'styled-components';

type LoginPageProps = {
  className?: string;
};

const LoginPage: VFC<LoginPageProps> = ({ className }) => {
  const router = useRouter();
  const login = async () => {
    try {
      await googleSignIn();
      router.push('/');
    } catch (error) {
      alert(error);
    }
  };
  return (
    <StyledLoginPage className={`${className}`}>
      <h2>ログインページ</h2>
      <button onClick={login}>Googleでログイン</button>
    </StyledLoginPage>
  );
};

const StyledLoginPage = styled.div``;

export default LoginPage;
