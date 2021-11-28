import { useMemo, useState, VFC } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { removeReport } from 'src/firebase/firestore/room';
import { withAuthInfo } from 'src/recoil/authState';
import { ContentType, Room } from 'src/types';
import { Content } from 'src/types';
import { roulette } from 'src/utils/roulette';
import styled, { css } from 'styled-components';

type ContentListProps = {
  className?: string;
  room: Room;
};

export const ContentList: VFC<ContentListProps> = ({ className, room }) => {
  const user = useRecoilValueLoadable(withAuthInfo);
  const [selectedContents, setSelectedContents] = useState<string[]>([]);
  const [resultRoulette, setResultRoulette] = useState<Content>(null);

  const startRoulette = (type: ContentType) => {
    const selectedContent = roulette(
      room.contents
        .filter((content) => content.type === type)
        .filter((content) => !selectedContents.includes(content.id)),
    );
    setResultRoulette(selectedContent);
    setSelectedContents([...selectedContents, selectedContent.id]);
  };

  const myUserId = useMemo(
    () => (user.state === 'hasValue' ? user.contents?.id : ''),
    [user],
  );

  const deleteCard = async (content: Content) => {
    try {
      if (myUserId !== content.userId) return;
      if (window.confirm(`${content.text}を削除しますか？`)) {
        await removeReport({ roomId: room.id, content });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <StyledContentList className={`${className}`}>
      <div className="roulette_wrapper">
        <button onClick={() => startRoulette('doing')}>
          今週の出来事ルーレット
        </button>
        <button onClick={() => startRoulette('learned')}>
          今週に学んだことルーレット
        </button>
        <button onClick={() => startRoulette('willLearn')}>
          来週に学ぶことルーレット
        </button>
      </div>
      <h3>今のテーマ</h3>
      <div className="current_theme_card" title={resultRoulette?.name}>
        {resultRoulette?.text || 'ルーレットを回してください😋'}
      </div>
      <h3>今週の出来事</h3>
      <div className="theme_card_list">
        {room?.contents
          ?.filter((content) => content.type === 'doing')
          .map((content) => (
            <div
              key={`${content.text}_${content.name}`}
              className={`theme_card ${
                selectedContents.includes(content.id) ? 'selected' : ''
              }`}
            >
              {content.text}
              {myUserId === content.userId && (
                <button
                  className="delete_button"
                  onClick={() => deleteCard(content)}
                >
                  ×
                </button>
              )}
            </div>
          ))}
      </div>
      <h3>今週学んだこと</h3>
      <div className="theme_card_list">
        {room?.contents
          ?.filter((content) => content.type === 'learned')
          .map((content) => (
            <div
              key={`${content.text}_${content.name}`}
              className={`theme_card ${
                selectedContents.includes(content.id) ? 'selected' : ''
              }`}
            >
              {content.text}
              {myUserId === content.userId && (
                <button
                  className="delete_button"
                  onClick={() => deleteCard(content)}
                >
                  ×
                </button>
              )}
            </div>
          ))}
      </div>
      <h3>来週学ぶこと</h3>
      <div className="theme_card_list">
        {room?.contents
          ?.filter((content) => content.type === 'willLearn')
          .map((content) => (
            <div
              key={`${content.text}_${content.name}`}
              className={`theme_card ${
                selectedContents.includes(content.id) ? 'selected' : ''
              }`}
            >
              {content.text}
              {myUserId === content.userId && (
                <button
                  className="delete_button"
                  onClick={() => deleteCard(content)}
                >
                  ×
                </button>
              )}
            </div>
          ))}
      </div>
    </StyledContentList>
  );
};

const themeCardStyle = css`
  width: fit-content;
  padding: 16px 28px;
  margin: 8px;
  font-size: 20px;
  border: 1px solid #444;
  border-radius: 999px;
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.6);
`;

const StyledContentList = styled.div`
  > h3 {
    padding-bottom: 4px;
    margin: 24px 0 12px;
    font-size: 18px;
    border-bottom: #ccc 1px solid;
  }

  > .roulette_wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > button {
      width: 240px;
      text-align: center;
    }
  }

  .current_theme_card {
    ${themeCardStyle}

    cursor: pointer;
  }

  > .theme_card_list {
    display: flex;
    flex-wrap: wrap;

    .theme_card {
      ${themeCardStyle}

      position: relative;

      > .delete_button {
        display: none;
      }

      &:hover {
        > .delete_button {
          position: absolute;
          top: -4px;
          right: -4px;
          box-sizing: border-box;
          display: block;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          padding: 0;
          margin: 0;
          font-size: 16px;
          color: #444;
          border-color: #444;
          border-radius: 50%;
        }
      }
    }

    > .selected {
      background-color: #ccc;
      box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.4);
    }
  }
`;
