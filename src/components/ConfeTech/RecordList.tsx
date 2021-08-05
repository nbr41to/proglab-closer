import { useEffect, useState, VFC } from 'react';
import { useRecoilValue } from 'recoil';
import { db } from 'src/firebase/config';
import { userInfo } from 'src/recoil/atom';
import { Room } from 'src/types';
import styled from 'styled-components';
import { TrashCan } from 'akar-icons';
import { StyledRoomList } from './RoomList';

type RecordListProps = {
  selectRecord: (recordId: string) => void;
};

export const RecordList: VFC<RecordListProps> = ({ selectRecord }) => {
  const [recordList, setRecordList] = useState<Room[]>([]);

  const user = useRecoilValue(userInfo);

  useEffect(() => {
    db.collection('records')
      .get()
      .then((snapshot) => {
        const result = snapshot.docs.map((doc) => doc.data() as Room);
        setRecordList(result);
      });
  }, []);

  return (
    <StyledRecordList>
      <h2>Record List</h2>
      <div className='list'>
        {recordList.map((record) => (
          <div className='item' key={record.id}>
            <div className='toCenter' onClick={() => selectRecord(record.id)}>
              <div className='title'>{record.title}</div>
              <div className='date'>{record.date}</div>
            </div>
            {user?.role === 'author' && (
              <div className='delete'>
                <TrashCan size={24} />
              </div>
            )}
          </div>
        ))}
      </div>
    </StyledRecordList>
  );
};

const StyledRecordList = styled(StyledRoomList)``;
