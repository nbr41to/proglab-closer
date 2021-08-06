import { ChatAdd } from 'akar-icons';
import { VFC } from 'react';
import { createRoom, joinRoom } from 'src/firebase/firestore';
import { Button } from '../../src/components/atoms/Button';
import Router from 'next/router';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'src/recoil/atom';
import styled from 'styled-components';
import { RoomList } from 'src/components/ConfeTech/RoomList';
import { RecordList } from 'src/components/ConfeTech/RecordList';

const ConfeTechPage: VFC = () => {
  const user = useRecoilValue(userInfo);

  const selectRoom = async (roomId: string) => {
    if (!user?.name) return alert('名前を決めてください');
    try {
      joinRoom(roomId, user.name);
      Router.push(`/confetech/room/${roomId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const selectRecord = (recordId: string) => {
    Router.push(`/confetech/achieve/${recordId}`);
  };

  return (
    <StyledConfeTechPage>
      {user?.role === 'author' && (
        <Button
          className='create_button'
          label='create room'
          icon={<ChatAdd />}
          onClick={createRoom}
        />
      )}
      <RoomList selectRoom={selectRoom} />
      <RecordList selectRecord={selectRecord} />
    </StyledConfeTechPage>
  );
};

const StyledConfeTechPage = styled.div`
  > .create_button {
    width: 220px;
    margin: 12px;
  }
`;

export default ConfeTechPage;
