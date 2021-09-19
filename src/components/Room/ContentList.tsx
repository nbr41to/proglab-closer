import { useState, VFC, useRef } from "react";
import { Room, ContentType } from "src/types";
import styled from "styled-components";
import { roulette } from "src/utils/roulette";
import { Content } from "src/types";
import { RouletteAnimation } from "../Weekly/RouletteAnimation";

type ContentListProps = {
  className?: string;
  room: Room;
};

export const ContentList: VFC<ContentListProps> = ({ className, room }) => {
  const [selectedContents, setSelectedContents] = useState<Content[]>([]);
  const [resultRoulette, setResultRoulette] = useState<Content>(null);
  const [rouletteCircle, setRouletteCircle] = useState<string[]>([]);
  const [rouletteIsOpen, setRouletteIsOpen] = useState<boolean>(false);

  const startRoulette = (type: ContentType) => {
    const selectedContent = roulette(
      room.contents
        .filter((content) => content.type === type)
        .filter((content) => !selectedContents.includes(content))
    );
    setResultRoulette(selectedContent);
    console.log(resultRoulette);
    setSelectedContents([...selectedContents, selectedContent]);
    arraySetting(type);
  };

  const arraySetting = (type: ContentType) => {
    let rouletteArray = room.contents
      .filter((content) => content.type === type)
      .map((set) => {
        return set.text;
      });
    setRouletteCircle(rouletteArray);
    console.log(rouletteArray);
  };

  return (
    <StyledContentList className={`${className}`}>
      <h3>今週の出来事</h3>
      <p>{resultRoulette?.text || "-"}</p>
      <button onClick={() => startRoulette("doing")}>ルーレット1</button>
      <button onClick={() => startRoulette("learned")}>ルーレット2</button>
      <button onClick={() => startRoulette("willLearn")}>ルーレット3</button>

      {room?.contents
        ?.filter((content) => content.type === "doing")
        .map((content) => (
          <li
            key={`${content.text}_${content.name}`}
            title={content.name}
            className={`${
              selectedContents.includes(content) ? "selected" : ""
            }`}
          >
            {content.text}
          </li>
        ))}
      <h3>今週学んだこと</h3>
      {room?.contents
        ?.filter((content) => content.type === "learned")
        .map((content) => (
          <li
            key={`${content.text}_${content.name}`}
            title={content.name}
            className={`${
              selectedContents.includes(content) ? "selected" : ""
            }`}
          >
            {content.text}
          </li>
        ))}
      <h3>来週学ぶこと</h3>
      {room?.contents
        ?.filter((content) => content.type === "willLearn")
        .map((content) => (
          <li
            key={`${content.text}_${content.name}`}
            title={content.name}
            className={`${
              selectedContents.includes(content) ? "selected" : ""
            }`}
          >
            {content.text}
          </li>
        ))}
      {/* {rouletteIsOpen ? ( */}
      <RouletteAnimation
        rouletteCircle={rouletteCircle}
        rouletteIsOpen={rouletteIsOpen}
        setRouletteIsOpen={setRouletteIsOpen}
        resultRoulette={resultRoulette}
      />
    </StyledContentList>
  );
};

const StyledContentList = styled.div`
  .selected {
    text-decoration: line-through;
  }
`;
