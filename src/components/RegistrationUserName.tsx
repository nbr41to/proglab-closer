import { ChangeEvent, useContext, useState, VFC } from 'react';
import { Button } from './atoms/Button';
import { AuthContext } from 'src/context/Auth';
import { updateUserName } from 'src/firebase/firestore';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'src/recoil/atom';

type RegistrationUserNameProps = {};

export const RegistrationUserName: VFC<RegistrationUserNameProps> = ({}) => {
  const { currentUser } = useContext(AuthContext);
  const user = useRecoilValue(userInfo);
  const [name, setName] = useState(user?.name);

  const decided = () => {
    updateUserName(currentUser.uid, name);
    close();
  };

  return (
    <div>
      <div>呼ばれたい名前を入力します</div>
      <input
        type='text'
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <Button label='決定' onClick={decided} />
    </div>
  );
};
