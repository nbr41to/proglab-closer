import { FormEvent, useState, VFC } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { postReport } from 'src/firebase/firestore/room';
import { ContentType } from 'src/types';

import { withAuthInfo } from '../../../recoil/authState/selector';

type ContentFormInputProps = {
  type: ContentType;
  roomId: string;
};

export const ContentFormInput: VFC<ContentFormInputProps> = ({
  type,
  roomId,
}) => {
  const user = useRecoilValueLoadable(withAuthInfo);
  const [text, setText] = useState('');

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) return;
    if (user.state !== 'hasValue') return;
    await postReport({
      content: {
        type,
        text,
        userId: user.contents.id,
        name: user.contents.name,
      },
      roomId,
    });
    setText('');
  };
  return (
    <form
      className="flex gap-2 justify-center items-center py-2"
      onSubmit={(e) => submit(e)}
    >
      <input
        className="py-1 px-2 bg-white rounded border border-gray-500"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="flex justify-center items-center py-1 px-2 w-10 h-10 active:text-red-600 bg-white rounded-full border border-gray-500"
        type="submit"
      >
        <i className="bx bxs-send te"></i>
      </button>
    </form>
  );
};
