import { VFC } from 'react';
import { Gallery } from 'src/components/Game/Gallery';
import { PostForm } from 'src/components/Game/PostForm';
import { useAuthCheck } from 'src/recoil/authState/hook';
import styled from 'styled-components';

type GameListPageProps = {
  className?: string;
};

const GameListPage: VFC<GameListPageProps> = ({ className }) => {
  useAuthCheck();
  return (
    <StyledGameListPage className={`${className}`}>
      <h2>ゲーム村</h2>
      <PostForm />
      <Gallery />
    </StyledGameListPage>
  );
};

const StyledGameListPage = styled.div``;

export default GameListPage;
