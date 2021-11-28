import { VFC, ReactNode } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useListenAuth } from "src/recoil/authState";
import { singOut } from "src/firebase/auth";
import Image from "next/image";
import logo from "../../public/20210123.png";

type LayoutProps = {
  className?: string;
  children: ReactNode;
};

export const Layout: VFC<LayoutProps> = ({ className, children }) => {
  const user = useListenAuth();

  return (
    <StyledLayout className={`${className}`}>
      <header>
        {/* <h1>progLab closer</h1> */}
        <div className="logo_container">
          <div className="min_circle"></div>
          <div className="logo_circle">
            <Image src={logo} width={50} height={50} alt="logo" />
          </div>
          <div className="logo_text">
            <span>p</span>
            <span>r</span>
            <span>o</span>
            <span>g</span>
            <span>L</span>
            <span>a</span>
            <span>b </span>
            <span>c</span>
            <span>l</span>
            <span>o</span>
            <span>s</span>
            <span>e</span>
            <span className="logo_last_text">r</span>
          </div>
        </div>
        {user.id && (
          <>
            <nav>
              <Link href="/">
                <a>HOME</a>
              </Link>
              <Link href="/weekly">
                <a>WEEKLY</a>
              </Link>
              <Link href="/games">
                <a>GAME村</a>
              </Link>
              <Link href="/mypage">
                <a>MYPAGE</a>
              </Link>
              <Link href="/admin">
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
    width: 100%;
    display: flex;
    align-items: center;
    background-color: aquamarine;
    padding: 12px 0;
    // h1 {
    //   font-size: 24px;
    //   margin: 0 32px;
    // }
    img {
      width: 60px;
      height: 50px;
    }
    .logo_container {
      font-size: 25px;
      font-family: "MSゴシック";
      font-weight: 400;
      color: white;
      margin: 0 32px;
      .min_circle {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: pink;
        position: absolute;
        top: 38px;
        z-index: 300;
      }
      .logo_circle {
        z-index: 200;
        width: 54px;
        height: 50px;
        position: relative;
      }
      .logo_text {
        font-weight: bold;
        font-size: 22px;
        position: absolute;
        top: 25px;
        left: 85px;
        z-index: 300;
      }
      :hover {
        .logo_circle {
          animation: circle_rotate 1s linear infinite;
        }
        // .logo_last_text {
        //   color: red;
        // }
      }
    }
    nav {
      display: flex;
      margin-left: 160px;
      a {
        padding: 4px;
        cursor: pointer;
      }
    }
  }
  main {
    padding: 16px;
  }

  @keyframes circle_rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
