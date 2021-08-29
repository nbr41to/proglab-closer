import { useRouter } from 'next/router';
import { VFC } from 'react';
import { googleSignIn } from 'src/firebase/auth';
import styled from 'styled-components';

type GameListPageProps = {
  className?: string;
};

const GameListPage: VFC<GameListPageProps> = ({ className }) => {
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
    <StyledGameListPage className={`${className}`}>
      <h2>ログインページ</h2>
      <button onClick={login}>Googleでログイン</button>
    </StyledGameListPage>
  );
};

const StyledGameListPage = styled.div``;

export default GameListPage;
