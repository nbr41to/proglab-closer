import { VFC, ReactNode } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useListenAuth } from 'src/recoil/authState';
import { singOut } from 'src/firebase/auth';

type LayoutProps = {
  className?: string;
  children: ReactNode;
};

export const Layout: VFC<LayoutProps> = ({ className, children }) => {
  const user = useListenAuth();

  return (
    <StyledLayout className={`${className}`}>
      <header>
        <h1>progLab closer</h1>
        {user.id && (
          <>
            <nav>
              <Link href='/'>
                <a>HOME</a>
              </Link>
              <Link href='/weekly'>
                <a>WEEKLY</a>
              </Link>
              <Link href='/games'>
                <a>GAME村</a>
              </Link>
              <Link href='/mypage'>
                <a>MYPAGE</a>
              </Link>
              <Link href='/admin'>
                <a>ADMIN</a>
              </Link>
            </nav>
            <button onClick={singOut}>ログアウト</button>
          </>
        )}
      </header>
      <main>{children}</main>
    </StyledLayout>
  );
};

const StyledLayout = styled.div`
  header {
    display: flex;
    align-items: center;
    background-color: aquamarine;
    padding: 12px 0;
    h1 {
      font-size: 24px;
      margin: 0 32px;
    }
    nav {
      display: flex;
      a {
        padding: 4px;
        cursor: pointer;
      }
    }
  }
  main {
    padding: 16px;
  }
`;
