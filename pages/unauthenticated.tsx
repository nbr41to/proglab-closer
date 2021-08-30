import { VFC } from 'react';
import { useAuthCheck } from 'src/recoil/authState/hook';
import styled from 'styled-components';

type UnauthenticatedPageProps = {
  className?: string;
};

const UnauthenticatedPage: VFC<UnauthenticatedPageProps> = ({ className }) => {
  useAuthCheck();
  return (
    <StyledUnauthenticatedPage className={`${className}`}>
      <p>認証されるのをお待ちください</p>
    </StyledUnauthenticatedPage>
  );
};

const StyledUnauthenticatedPage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    background-color: #fff;
    padding: 20px 16px;
    border-radius: 8px;
  }
`;

export default UnauthenticatedPage;
