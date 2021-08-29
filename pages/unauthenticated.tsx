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

const StyledUnauthenticatedPage = styled.div``;

export default UnauthenticatedPage;
