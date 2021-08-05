import { useEffect, useState, VFC } from 'react';
import { db } from 'src/firebase/config';
import { Room } from 'src/types';
import styled from 'styled-components';
import { TrashCan } from 'akar-icons';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'src/recoil/atom';

type RoomListProps = {
  selectRoom: (roomId: string) => void;
};

export const RoomList: VFC<RoomListProps> = ({ selectRoom }) => {
  const user = useRecoilValue(userInfo);
  const [roomList, setRoomList] = useState<Room[]>([]);

  useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot((querySnapshot) => {
      const result = querySnapshot.docs.map((doc) => doc.data() as Room);
      setRoomList(result);
    });

    return () => unsubscribe();
  }, []);

  return (
    <StyledRoomList>
      <h2>Room List</h2>
      <div className='list'>
        {roomList.map((room) => (
          <div className='item' key={room.id}>
            <div className='toCenter' onClick={() => selectRoom(room.id)}>
              <div className='title'>{room.title}</div>
              <div className='date'>{room.date}</div>
            </div>
            {user?.role === 'author' && (
              <div className='delete'>
                <TrashCan size={24} />
              </div>
            )}
          </div>
        ))}
      </div>
    </StyledRoomList>
  );
};

export const StyledRoomList = styled.div`
  > h2 {
    font-size: 20px;
    font-weight: bold;
    padding: 12px;
    border-bottom: 1px solid #333;
  }

  > .list {
    > .item {
      padding: 12px;

      display: flex;
      justify-content: space-between;
      align-items: center;

      cursor: pointer;

      &:hover {
        background-color: #eee;
      }

      .title {
        font-weight: bold;
        margin-right: 16px;
      }
      > .delete {
        padding: 8px;
        &:hover {
          transform: scale(1.15);
          background-color: #ccc;
          border-radius: 50%;
        }
      }
    }
  }
`;
