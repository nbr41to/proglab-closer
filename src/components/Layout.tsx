import { VFC, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo2 from 'src/assets/logo2.png';
import Router from 'next/router';
import styled from 'styled-components';

type LayoutProps = {
  children: ReactNode;
};

export const Layout: VFC<LayoutProps> = ({ children }) => {
  return (
    <StyledLayout>
      <header>
        <div className='site_logo toCenter' onClick={() => Router.push('/')}>
          <Image src={logo2} alt='logo' />
          <h1>progLearning</h1>
        </div>
        <nav>
          <Link href='/confetech'>
            <a>ConfeTech</a>
          </Link>
          <Link href='/learning'>
            <a>Learning</a>
          </Link>
          <Link href='/mypage'>
            <a>MyPage</a>
          </Link>
        </nav>
      </header>
      <div>{children}</div>
    </StyledLayout>
  );
};

const StyledLayout = styled.div`
  > header {
    color: #fff;
    background-color: aquamarine;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    > .site_logo {
      padding: 8px 12px;
      cursor: pointer;

      img {
        display: block;
        width: 60px;
      }
      > h1 {
        margin-left: 16px;
        font-size: 26px;
        font-weight: bold;
      }
    }

    > nav {
      margin-left: 16px;
      a {
        padding: 12px;
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
`;
