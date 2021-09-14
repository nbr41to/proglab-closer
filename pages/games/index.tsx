import { VFC } from 'react';
import { useAuthCheck } from 'src/recoil/authState/hook';
import styled from 'styled-components';
import { PostForm } from 'src/components/Game/PostForm';
import { Gallery } from 'src/components/Game/Gallery';

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
