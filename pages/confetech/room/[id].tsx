import { useEffect, useState, VFC } from 'react';
import { Box } from '@fower/react';
import { db } from 'src/firebase/config';
import { ContentType, Room } from 'src/types';
import { Button } from '../../../src/components/atoms/Button';
import Router from 'next/router';
import { ArrowShuffle, Send } from 'akar-icons';
import { ContentCard } from 'src/components/ContentCard';
import { AgendaForm } from 'src/components/AgendaForm';
import { updateTitle } from 'src/firebase/firestore';
import { Roulette } from 'src/components/Roulette';
import { achieveRoom } from '../../../src/firebase/firestore';
import { Modal } from 'src/components/Modal';

const RoomPage: VFC = () => {
  const [visiblePostForm, setVisiblePostForm] = useState(false);
  const [visibleRoulette, setVisibleRoulette] = useState(false);
  const [rouletteContent, setRouletteContent] = useState([]);
  const [roomInfo, setRoomInfo] = useState<Room>();

  useEffect(() => {
    if (!process.browser) return;
    const roomId = Router.query.id as string;
    if (!roomId) return;
    const unsubscribe = db
      .collection('rooms')
      .doc(roomId)
      .onSnapshot((doc) => {
        const result = doc.data() as Room;
        setRoomInfo(result);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  const changeTitle = (e) => {
    const roomId = Router.query.id as string;
    if (!(e.key == 'Enter' && (e.metaKey == true || e.ctrlKey == true))) return;
    const title = e.target.innerText;
    updateTitle(roomId, title);
  };

  const startRoulette = (key: ContentType) => {
    if (roomInfo.content[key].length === 0) return alert('投稿がありません');
    setRouletteContent(roomInfo.content[key]);
    setVisibleRoulette(true);
  };

  const achieve = () => {
    achieveRoom(roomInfo);
    Router.push('/entrance');
  };

  return (
    <div>
      <Modal open={visiblePostForm} close={() => setVisiblePostForm(false)}>
        {/* <AgendaForm /> */}
        <p>aaaaa</p>
      </Modal>
      {visibleRoulette && (
        <Roulette
          close={() => setVisibleRoulette(false)}
          content={rouletteContent}
        />
      )}
      <div>
        <div>
          <h1
            contentEditable
            suppressContentEditableWarning
            onKeyDown={(e) => changeTitle(e)}
          >
            {roomInfo?.title}
          </h1>
          <p>{roomInfo?.date}</p>
        </div>
        <Button
          label='post'
          icon={<Send />}
          onClick={() => setVisiblePostForm(true)}
        />
      </div>
      <div>
        <div>
          <h2>今週を振り返る</h2>
          <Button
            label=''
            icon={<ArrowShuffle />}
            onClick={() => startRoulette('chat')}
          />
        </div>
        <div>
          {roomInfo?.content?.chat?.map((content, index) => (
            <ContentCard key={index} content={content} />
          ))}
        </div>
      </div>
      <div>
        <div>
          <h2>今週に学んだこと</h2>
          <Button
            label=''
            icon={<ArrowShuffle />}
            onClick={() => startRoulette('report')}
          />
        </div>
        <div>
          {roomInfo?.content?.report?.map((content, index) => (
            <ContentCard key={index} content={content} />
          ))}
        </div>
      </div>
      <div>
        <div>
          <h2>次週の取り組み</h2>
          <Button
            label=''
            icon={<ArrowShuffle />}
            onClick={() => startRoulette('next')}
          />
        </div>
        <div>
          {roomInfo?.content?.next?.map((content, index) => (
            <ContentCard key={index} content={content} />
          ))}
        </div>
      </div>
      <Button label='achieve room' onClick={achieve} />
    </div>
  );
};

export default RoomPage;
