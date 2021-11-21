import { useRouter } from 'next/router';
import { useEffect, useState, VFC } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { ContentForm } from 'src/components/Room/ContentForm';
import { ContentList } from 'src/components/Room/ContentList';
import { db } from 'src/firebase';
import { achievedRoom } from 'src/firebase/firestore/room';
import { useAuthCheck } from 'src/recoil/authState/hook';
import { Room } from 'src/types';
import styled from 'styled-components';

import { withAuthInfo } from '../../src/recoil/authState';

const RoomPage: VFC = () => {
  useAuthCheck();
  const user = useRecoilValueLoadable(withAuthInfo);
  const router = useRouter();
  const { roomId } = router.query as { roomId: string };
  const [room, setRoom] = useState<Room>(null);

  useEffect(() => {
    db.collection('rooms')
      .doc(roomId)
      .onSnapshot((doc) => {
        if (!doc) return;
        setRoom(doc.data() as Room);
      });
  }, [router]);

  return (
    <StyledRoomPage>
      <h2>
        <span>🎉 {room?.title} の 今週どうでしょう会 🎊</span>
      </h2>
      {!room?.achieved && <ContentForm roomId={roomId} />}
      <ContentList room={room} />
      {user.state === 'hasValue' && user.contents?.role === 'admin' && (
        <button disabled={room?.achieved} onClick={() => achievedRoom(roomId)}>
          Achieve
        </button>
      )}
    </StyledRoomPage>
  );
};
const StyledRoomPage = styled.div`
  > h2 {
    font-size: 32px;
    font-weight: bold;
    text-align: center;

    > span {
      color: #ff8c00;
      background: -webkit-linear-gradient(0deg, #40e0d0, #ff8c00, #ff0080);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`;

export default RoomPage;
