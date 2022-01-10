import { useState, VFC } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { createRoom } from 'src/firebase/firestore/room';

import { withAuthInfo } from '../../recoil/authState';

type CreateFormProps = {
  className?: string;
};

export const CreateForm: VFC<CreateFormProps> = () => {
  const [input, setInput] = useState('');
  const user = useRecoilValueLoadable(withAuthInfo);

  const submit = async () => {
    if (!input) return;
    await createRoom(input);
    setInput('');
  };

  if (user.state === 'hasValue' && user.contents?.role === 'admin') {
    return (
      <div className="flex flex-col gap-2 justify-center items-center">
        <input
          className="p-2 rounded border-2 border-gray-500"
          type="text"
          placeholder="部屋名"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="p-2 rounded border-2 border-gray-500"
          onClick={submit}
        >
          新しい部屋を作成
        </button>
      </div>
    );
  } else {
    return null;
  }
};
