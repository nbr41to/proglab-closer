import { ChangeEvent, useState, VFC } from 'react';
import { Box } from '@fower/react';
import { useSetRecoilState } from 'recoil';
import { userInfo } from 'src/recoil/atom';
import { Button } from './Button';

type RegistrationUserNameProps = {
  open: boolean;
  close: () => void;
};

export const RegistrationUserName: VFC<RegistrationUserNameProps> = ({
  open,
  close,
}) => {
  const [name, setName] = useState('');
  const setUser = useSetRecoilState(userInfo);

  const decided = () => {
    setUser((prev) => ({ ...prev, name }));
    close();
  };

  if (open) {
    return (
      <Box>
        <Box toCenter>
          <Box
            fixed
            top0
            left0
            w='100vw'
            h='100vh'
            opacity={50}
            bgGray600
            onClick={close}
          />
          <Box
            toCenter
            column
            absolute
            top40
            bgWhite
            zIndex={99}
            p={20}
            borderBlack
            border={2}
            rounded={8}
          >
            <Box>呼ばれたい名前を入力してください！</Box>
            <Box
              as='input'
              type='text'
              border={2}
              borderGray600
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
            <Button label='決定' onClick={decided} />
          </Box>
        </Box>
      </Box>
    );
  } else return null;
};
