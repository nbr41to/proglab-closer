import { useRouter } from 'next/router';
import { VFC } from 'react';
import { Room } from 'src/types';
import styled from 'styled-components';

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
    padding: 8px;
    cursor: pointer;
    border-bottom: 1px solid #ccc;

    &:hover {
      background-color: #ccc;
      transition: background-color 0.2s ease-in-out;
    }
  }
`;
