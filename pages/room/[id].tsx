import { useEffect, useState, VFC } from 'react';
import { Box } from '@fower/react';
import { db } from 'src/firebase/config';
import { firebase } from 'src/firebase/config';
import { ContentType, Room } from 'src/types';
import { Button } from '../../src/components/Button';
import Router from 'next/router';
import { ArrowShuffle, Send } from 'akar-icons';
import { ContentCard } from 'src/components/ContentCard';
import { PostForm } from 'src/components/PostForm';
import { updateTitle } from 'src/firebase/firestore';
import { Roulette } from 'src/components/Roulette';

type RoomPageProps = {
  params: { id: string };
};

const RoomPage: VFC<RoomPageProps> = () => {
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
        console.log(result);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  const changeTitle = (e) => {
    const roomId = Router.query.id as string;
    if (!(e.key == 'Enter' && (e.metaKey == true || e.ctrlKey == true))) return;
    const title = e.target.innerText;
    console.log(title);
    updateTitle(roomId, title);
  };

  const startRoulette = (key: ContentType) => {
    if (roomInfo.content[key].length === 0) return alert('投稿がありません');
    setRouletteContent(roomInfo.content[key]);
    setVisibleRoulette(true);
  };

  console.log(roomInfo);
  return (
    <Box>
      <PostForm
        open={visiblePostForm}
        close={() => setVisiblePostForm(false)}
      />
      {visibleRoulette && (
        <Roulette
          close={() => setVisibleRoulette(false)}
          content={rouletteContent}
        />
      )}
      <Box flex toBetween>
        <Box>
          <h1
            contentEditable
            suppressContentEditableWarning
            onKeyDown={(e) => changeTitle(e)}
          >
            {roomInfo?.title}
          </h1>
          <p>{roomInfo?.date}</p>
        </Box>
        <Button
          label='post'
          icon={<Send />}
          bgTeal400
          white
          ml={16}
          onClick={() => setVisiblePostForm(true)}
        />
      </Box>
      <Box>
        <Box flex my={20}>
          <h2>今週を振り返る</h2>
          <Button
            label=''
            icon={<ArrowShuffle />}
            bgBlue400
            white
            ml={16}
            onClick={() => startRoulette('chat')}
          />
        </Box>
        <Box border={2} minH={200} rounded={8} flex p={12}>
          {roomInfo?.content?.chat?.map((content, index) => (
            <ContentCard key={index} text={content.text} name={content.name} />
          ))}
        </Box>
      </Box>
      <Box>
        <Box flex my={20}>
          <h2>今週に学んだこと</h2>
          <Button
            label=''
            icon={<ArrowShuffle />}
            bgBlue400
            white
            ml={16}
            onClick={() => startRoulette('report')}
          />
        </Box>
        <Box border={2} minH={200} rounded={8} flex p={12}>
          {roomInfo?.content?.report?.map((content, index) => (
            <ContentCard key={index} text={content.text} name={content.name} />
          ))}
        </Box>
      </Box>
      <Box>
        <Box flex my={20}>
          <h2>次週の取り組み</h2>
          <Button
            label=''
            icon={<ArrowShuffle />}
            bgBlue400
            white
            ml={16}
            onClick={() => startRoulette('next')}
          />
        </Box>
        <Box border={2} minH={200} rounded={8} flex p={12}>
          {roomInfo?.content?.next?.map((content, index) => (
            <ContentCard key={index} text={content.text} name={content.name} />
          ))}
        </Box>
      </Box>
      <Button label='finish room' onClick={() => {}} />
    </Box>
  );
};

export default RoomPage;
