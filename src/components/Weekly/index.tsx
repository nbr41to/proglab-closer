import { useEffect, useState, VFC } from 'react';
import { getRooms } from 'src/firebase/firestore/room';
import { useAuthCheck } from 'src/recoil/authState/hook';
import { Room } from 'src/types';

import { Board } from '../commons/frame/Board';
import { PageTitle } from '../commons/title/PageTitle';
import { CreateForm } from './CreateForm';
import { ListItem } from './ListItem';

export const WeeklyPage: VFC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const auth = useAuthCheck();

  useEffect(() => {
    getRooms().then((res) => setRooms(res));
  }, [auth]);

  return (
    <div className="p-4 space-y-4">
      <PageTitle
        title="集会場"
        paragraph="【日曜20時定例】今週どうでしょう会の会場です"
      />
      <CreateForm />
      <h3>◆公開中のお部屋</h3>
      {rooms?.filter((room) => !room.achieved).length ? (
        <Board className="p-4">
          {rooms
            ?.filter((room) => !room.achieved)
            .map((room) => (
              <ListItem key={room.id} room={room} />
            ))}
        </Board>
      ) : (
        <p>公開中のお部屋はありません</p>
      )}
      <h3>◆これまでのお部屋</h3>
      <Board className="p-4">
        {rooms
          ?.filter((room) => room.achieved)
          .sort((a, b) => {
            if (b.date < a.date) return -1;
            if (b.date > a.date) return 1;
            return 0;
          })
          .map((room) => (
            <ListItem key={room.id} room={room} />
          ))}
      </Board>
    </div>
  );
};
