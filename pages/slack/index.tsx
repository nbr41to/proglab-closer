import { VFC } from 'react';
import { Gallery } from 'src/components/Game/Gallery';
import { PostForm } from 'src/components/Game/PostForm';
import { useAuthCheck } from 'src/recoil/authState/hook';
import styled from 'styled-components';

type SlackPageProps = {
  className?: string;
};

const SlackPage: VFC<SlackPageProps> = ({ className }) => {
  useAuthCheck();
  return (
    <StyledSlackPage className={`${className}`}>
      <h2>Slackのスタンプ追加/更新/削除の機能をここに追加したい</h2>
    </StyledSlackPage>
  );
};

const StyledSlackPage = styled.div``;

export default SlackPage;
