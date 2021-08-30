import { useEffect, useState, VFC } from 'react';
import { CreateForm } from 'src/components/Room/CreateForm';
import { ListItem } from 'src/components/Room/ListItem';
import { getRooms } from 'src/firebase/firestore/room';
import { useAuthCheck } from 'src/recoil/authState/hook';
import { Room } from 'src/types';
import styled from 'styled-components';

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
      <p>公開中のお部屋</p>
      {rooms
        ?.filter((room) => !room.achieved)
        .map((room) => (
          <ListItem key={room.id} room={room} />
        ))}
      <p>これまでのお部屋</p>
      {rooms
        ?.filter((room) => room.achieved)
        .map((room) => (
          <ListItem key={room.id} room={room} />
        ))}
    </StyledWeeklyPage>
  );
};

const StyledWeeklyPage = styled.div``;

export default WeeklyPage;
