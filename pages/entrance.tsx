import { Box } from '@fower/react';
import { ChatAdd, Pencil } from 'akar-icons';
import { VFC, useEffect, useState } from 'react';
import { createRoom, joinRoom } from 'src/firebase/firestore';
import { Room } from 'src/types';
import { Button } from '../src/components/Button';
import { db } from '../src/firebase/config';
import Router from 'next/router';
import { RegistrationUserName } from 'src/components/RegistrationUserName';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'src/recoil/atom';

type EntranceProps = {};

const Entrance: VFC<EntranceProps> = () => {
  const [roomList, setRoomList] = useState<Room[]>([]);
  const [recordList, setRecordList] = useState<Room[]>([]);
  const [visibleNameForm, setVisibleNameForm] = useState(false);

  const user = useRecoilValue(userInfo);

  useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot((querySnapshot) => {
      const result = querySnapshot.docs.map((doc) => doc.data() as Room);
      setRoomList(result);
    });
    db.collection('records')
      .get()
      .then((snapshot) => {
        const result = snapshot.docs.map((doc) => doc.data() as Room);
        setRecordList(result);
      });
    return () => unsubscribe();
  }, []);

  const selectRoom = async (roomId: string) => {
    if (!user?.name) return setVisibleNameForm(true);
    try {
      joinRoom(roomId, user.name);
      Router.push(`room/${roomId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Entrance</h1>
      <p>
        {user?.name}でログイン| {user?.role}
      </p>
      <Box flex my={24}>
        <Button
          label='create room'
          icon={<ChatAdd />}
          white
          bgBlue400
          mr={12}
          onClick={createRoom}
        />
        <Button
          label='update name'
          icon={<Pencil />}
          white
          bgOrange400
          onClick={() => setVisibleNameForm(true)}
        />
      </Box>
      <RegistrationUserName
        open={visibleNameForm}
        close={() => setVisibleNameForm(false)}
      />
      <h2>Room List</h2>
      <Box maxW={600} mb={32}>
        {roomList.map((room) => (
          <Box
            key={room.id}
            flex
            toCenterY
            toBetween
            borderB={2}
            p={12}
            cursorPointer
            onClick={() => selectRoom(room.id)}
            transitionColors
            bgGray200--hover
          >
            <Box>{room.title}</Box>
            <Box>{room.date}</Box>
          </Box>
        ))}
      </Box>
      <h2>Record List</h2>
      <Box maxW={600}>
        {recordList.map((room) => (
          <Box
            key={room.id}
            flex
            toCenterY
            toBetween
            borderB={2}
            p={12}
            cursorPointer
            onClick={() => Router.push(`/achieve/${room.id}`)}
            transitionColors
            bgGray200--hover
          >
            <Box>{room.title}</Box>
            <Box>{room.date}</Box>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default Entrance;
