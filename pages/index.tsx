import { useAuthCheck } from 'src/recoil/authState/hook';
import styled from 'styled-components';

export default function Home() {
  useAuthCheck();
  return (
    <StyledHome>
      <h2>HOME</h2>
      <a href='https://nobco.notion.site/progLab-Closers-aae9fc9944954d27880d322e167d5215'>
        会員用情報掲載ページ
      </a>
    </StyledHome>
  );
}

const StyledHome = styled.div``;
