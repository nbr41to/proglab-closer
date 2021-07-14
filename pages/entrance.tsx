import { Box } from '@fower/react';
import { ChatAdd, Pencil } from 'akar-icons';
import { VFC, useEffect, useState } from 'react';
import { createRoom } from 'src/firebase/firestore';
import { Room } from 'src/types';
import { Button } from '../src/components/Button';
import { db } from '../src/firebase/config';
import Router from 'next/router';
import { RegistrationUserName } from 'src/components/RegistrationUserName';

type EntranceProps = {};

const Entrance: VFC<EntranceProps> = () => {
  const [roomList, setRoomList] = useState<Room[]>([]);
  const [visibleNameForm, setVisibleNameForm] = useState(false);

  useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot((querySnapshot) => {
      const result = querySnapshot.docs.map((doc) => doc.data() as Room);
      setRoomList(result);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Entrance</h1>
      <Box flex mb={24}>
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
      <Box maxW={600}>
        {roomList.map((room) => (
          <Box
            key={room.id}
            flex
            toCenterY
            toBetween
            borderB={2}
            p={12}
            cursorPointer
            onClick={() => Router.push(`room/${room.id}`)}
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
