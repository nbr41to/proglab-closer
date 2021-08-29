import { VFC } from 'react';
import { EditNameForm } from 'src/components/MyPage/EditNameForm';
import { useAuthCheck } from 'src/recoil/authState/hook';
import styled from 'styled-components';

type MyPageProps = {
  className?: string;
};

const MyPage: VFC<MyPageProps> = ({ className }) => {
  useAuthCheck();
  return (
    <StyledMyPage className={`${className}`}>
      <h2>MyPage</h2>
      <EditNameForm />
    </StyledMyPage>
  );
};

const StyledMyPage = styled.div``;

export default MyPage;
