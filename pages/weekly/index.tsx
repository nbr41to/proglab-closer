import { useEffect, useState, VFC } from 'react';
import { getRooms } from 'src/firebase/firestore/room';
import { useAuthCheck } from 'src/recoil/authState/hook';
import { Room } from 'src/types';
import styled from 'styled-components';

import { CreateForm } from '@/components/Weekly/CreateForm';
import { ListItem } from '@/components/Weekly/ListItem';

type WeeklyPageProps = {
  className?: string;
};

const WeeklyPage: VFC<WeeklyPageProps> = ({ className }) => {
  const auth = useAuthCheck();
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    getRooms().then((res) => setRooms(res));
  }, [auth]);

  return (
    <StyledWeeklyPage className={`${className}`}>
      <h2>【日曜定例】今週どうでしょう</h2>
      <CreateForm />
      <h3>◆公開中のお部屋</h3>
      {rooms
        ?.filter((room) => !room.achieved)
        .map((room) => (
          <ListItem key={room.id} room={room} />
        ))}
      <h3>◆これまでのお部屋</h3>
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
    </StyledWeeklyPage>
  );
};

const StyledWeeklyPage = styled.div`
  h3 {
    margin-top: 20px;
    font-size: 20px;
  }
`;

export default WeeklyPage;
