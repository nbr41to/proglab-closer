import router from 'next/router';
import { VFC } from 'react';
import { Room } from 'src/types';
import styled from 'styled-components';
import { useRouter } from 'next/router';

type ListItemProps = {
  className?: string;
  room: Room;
};

export const ListItem: VFC<ListItemProps> = ({ className, room }) => {
  const router = useRouter();
  return (
    <StyledListItem className={`${className}`}>
      <p onClick={() => router.push(`/weekly/${room?.id}`)}>
        {room?.title} [{room?.date}]
      </p>
    </StyledListItem>
  );
};

const StyledListItem = styled.div`
  p {
    cursor: pointer;
    padding: 8px;
    border-bottom: 1px solid #444;
  }
`;
