import { useEffect, useState, VFC } from 'react';
import { Box } from '@fower/react';
import { db } from 'src/firebase/config';
import { Room } from 'src/types';
import Router from 'next/router';

const AchievePage: VFC = () => {
  const [achieveInfo, setAchieveInfo] = useState<Room>();

  useEffect(() => {
    if (!process.browser) return;
    const roomId = Router.query.id as string;
    if (!roomId) return;
    db.collection('records')
      .doc(roomId)
      .get()
      .then((doc) => setAchieveInfo(doc.data() as Room));
  }, []);

  return (
    <Box>
      <Box>
        <h1>{achieveInfo?.title}</h1>
        <p>日付：{achieveInfo?.date}</p>
        <p>
          参加者：
          {achieveInfo?.member?.map((name, index) => (
            <span key={index}>{name}, </span>
          ))}
        </p>
      </Box>
      <Box>
        <h2>今週を振り返る</h2>
        <Box border={2} minH={200} rounded={8} flex p={12}>
          {achieveInfo?.content?.chat?.map((content, index) => (
            <span key={index}>
              {content.text}({content.name}),
            </span>
          ))}
        </Box>
      </Box>
      <Box>
        <h2>今週に学んだこと</h2>
        <Box border={2} minH={200} rounded={8} flex p={12}>
          {achieveInfo?.content?.report?.map((content, index) => (
            <span key={index}>
              {content.text}({content.name}),
            </span>
          ))}
        </Box>
      </Box>
      <Box>
        <h2>次週の取り組み</h2>
        <Box border={2} minH={200} rounded={8} flex p={12}>
          {achieveInfo?.content?.next?.map((content, index) => (
            <span key={index}>
              {content.text}({content.name}),
            </span>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AchievePage;
