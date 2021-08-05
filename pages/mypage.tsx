import { Pencil } from 'akar-icons';
import { VFC, useState } from 'react';
import { Button } from '../src/components/Atoms/Button';
import { RegistrationUserName } from 'src/components/RegistrationUserName';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'src/recoil/atom';

const MyPage: VFC = () => {
  const user = useRecoilValue(userInfo);
  const [visibleNameForm, setVisibleNameForm] = useState(false);

  return (
    <div>
      <h1>Entrance</h1>
      <p>
        {user?.name}でログイン| {user?.role}
      </p>
      <Button
        label='update name'
        icon={<Pencil />}
        onClick={() => setVisibleNameForm(true)}
      />
      <RegistrationUserName
        open={visibleNameForm}
        close={() => setVisibleNameForm(false)}
      />
    </div>
  );
};

export default MyPage;
