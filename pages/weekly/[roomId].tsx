import { useRouter } from 'next/router';
import { useEffect, useState, VFC } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { ContentForm } from 'src/components/Room/ContentForm';
import { ContentList } from 'src/components/Room/ContentList';
import { db } from 'src/firebase';
import { achievedRoom } from 'src/firebase/firestore/room';
import { useAuthCheck } from 'src/recoil/authState/hook';
import { Room } from 'src/types';

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
    <div>
      <h2>
        {room?.title} の
        <br />
        今週どうでしょう
      </h2>
      {!room?.achieved && <ContentForm roomId={roomId} />}
      <ContentList room={room} />
      {user.state === 'hasValue' && user.contents?.role === 'admin' && (
        <button disabled={room?.achieved} onClick={() => achievedRoom(roomId)}>
          Achieve
        </button>
      )}
    </div>
  );
};

export default RoomPage;
