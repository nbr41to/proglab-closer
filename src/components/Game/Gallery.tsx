import { VFC, useEffect, useState } from 'react';
import { getGameList } from 'src/firebase/firestore/game';
import { Game } from 'src/types';
import styled from 'styled-components';

type GalleryProps = {
  className?: string;
};

export const Gallery: VFC<GalleryProps> = ({ className }) => {
  const [gameList, setGameList] = useState<Game[]>([]);
  useEffect(() => {
    getGameList().then((gameList) => setGameList(gameList));
  }, []);
  return (
    <StyledGallery className={`${className}`}>
      {gameList.map((game) => (
        <div key={game.id} className="gallery_item">
          {/* <img src={game.imageUrl} alt='game thumbnail image' /> */}
          <h3>{game.title}</h3>
          <p>{game.description}</p>
          <p>製作者：{game.createdBy}</p>
          <p>投稿日：{game.createdAt}</p>
          <a href={game.gameUrl} target="_blank" rel="noopener noreferrer">
            🎮 このゲームで遊ぶ 🃏
          </a>
          <br />
          <a href={game.githubUrl} target="_blank" rel="noopener noreferrer">
            👩‍💻 このゲームのソースコードを見る 🧑‍💻
          </a>
        </div>
      ))}
    </StyledGallery>
  );
};

const StyledGallery = styled.div`
  .gallery_item {
    border: 1px solid #444;
    border-radius: 8px;
    margin: 12px;
    padding: 12px 20px;
    h3 {
      font-size: 20px;
      border-bottom: 1px solid #444;
      margin-bottom: 8px;
      padding-bottom: 4px;
    }
    a {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;
