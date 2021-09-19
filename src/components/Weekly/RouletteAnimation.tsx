import { useState, VFC, useRef, SetStateAction, Dispatch } from "react";
import styled from "styled-components";
import { Content } from "src/types";

type RouletteAnimationProps = {
  className?: string;
  rouletteCircle: string[];
  rouletteIsOpen: boolean;
  resultRoulette: Content;
  setRouletteIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const RouletteAnimation: VFC<RouletteAnimationProps> = ({
  className,
  rouletteCircle,
  rouletteIsOpen,
  setRouletteIsOpen,
  resultRoulette,
}) => {
  let red: number;
  let circle_r: number;
  let item_num = rouletteCircle.length;

  const [items, setItems] = useState([]);
  const [animationToggle, setAnimationToggle] = useState(false);
  const [resultIsOpen, setResultIsOpen] = useState(false);

  const roulettePlay = () => {
    setAnimationToggle(true);
    setTimeout(() => {
      setAnimationToggle(false);
      setItems([]);
      red = 0;
      circle_r = 0;
      item_num = 0;
      setRouletteIsOpen(false);
      setResultIsOpen(true);
    }, 2500);
    setTimeout(() => {
      setResultIsOpen(false);
    }, 4000);
  };

  const rouletteSetting = () => {
    const circle = document.getElementById("circle");
    let deg = 360.0 / item_num;
    red = (deg * Math.PI) / 180.0;
    circle_r = circle.getBoundingClientRect().width * 2.5;

    for (let i = 0; i < item_num; i++) {
      let x1 = (Math.cos(red * i) * circle_r + circle_r) / 10;
      let y1 = (Math.sin(red * i) * circle_r + circle_r) / 10;
      items.push(
        <li
          id="items"
          className="items_animation"
          style={{ position: "absolute", left: x1, top: y1 }}
        >
          {rouletteCircle[i]}
        </li>
      );
    }
    setRouletteIsOpen(true);
    roulettePlay();
  };

  return (
    <StyledRouletteAnimation className={`${className}`}>
      <button className="start_button" onClick={() => rouletteSetting()}>
        ルーレットスタート
      </button>
      <div id="circle" className={animationToggle ? "circle_animation" : ""}>
        {rouletteIsOpen ? (
          <ul
            id="roulette_list"
            className={animationToggle ? "list_animation" : ""}
          >
            {items.map((item, index) => {
              return item;
            })}
          </ul>
        ) : (
          <></>
        )}
        {resultIsOpen && <div className="result">{resultRoulette.text}</div>}
      </div>
    </StyledRouletteAnimation>
  );
};

const StyledRouletteAnimation = styled.div`
  .start_button {
    position: absolute;
    top: 390px;
    left: 370px;
  }
  #circle {
    width: 1500px;
    display: block;
    position: absolute;
    top: 100px;
    left: 100px;
  }
  .circle_animation {
    width: 1500px;
    display: block;
    position: absolute;
    top: 100px;
    left: 100px;
    animation: circle 2.6s linear infinite;
  }
  #roulette_list {
    position: relative;
    list-style: none;
    width: 900px;
    height: 900px;
    margin: 0 auto;
    padding: 0;
  }

  .list_animation {
    animation: rotate 3s linear infinite;
  }
  #items,
  .result {
    width: 150px;
    height: 150px;
    border: solid 1px black;
    border-radius: 50%;
    text-align: center;
    line-height: 70px;
    background-color: blue;
    color: white;
  }
  .items_animation {
    animation: rotate-item 3s linear infinite;
  }

  ul li {
    position: absolute;
    width: 100px;
    height: 100px;
    margin: 0;
    padding: 30px 0 0;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    box-sizing: border-box;
  }
  .result {
    position: absolute;
    top: 350px;
    left: 680px;
    animation: result_animation 1s linear both;
  }

  @keyframes rotate-item {
    30% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }
  @keyframes rotate {
    30% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes circle {
    0% {
      transform: scale(1);
    }
    30% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes result_animation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
