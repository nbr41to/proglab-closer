import { useEffect, useState, VFC } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { updateUserName } from 'src/firebase/firestore/user';

import { withAuthInfo } from '../../recoil/authState/selector';
import { Button } from '../commons/button/Button';
import { Input } from '../commons/inputText/Input';

export const EditNameForm: VFC = () => {
  const user = useRecoilValueLoadable(withAuthInfo);
  const [name, setName] = useState(user?.contents?.name || '');

  useEffect(() => {
    setName(user?.contents?.name || '');
  }, [user]);

  const submit = async () => {
    if (!name) return;
    await updateUserName(name);
  };

  return (
    <div className="flex gap-2 justify-center items-center">
      <Input
        className="p-2 rounded border border-gray-500"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={submit}>変更</Button>
    </div>
  );
};
