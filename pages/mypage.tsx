import { Pencil } from 'akar-icons';
import { VFC, useState } from 'react';
import { Button } from '../src/components/atoms/Button';
import { RegistrationUserName } from 'src/components/RegistrationUserName';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'src/recoil/atom';
import { Modal } from 'src/components/Modal';

const MyPage: VFC = () => {
  const user = useRecoilValue(userInfo);
  const [visibleNameForm, setVisibleNameForm] = useState(false);

  return (
    <div>
      <h1>MyPage</h1>
      <p>name:{user?.name}</p>
      <p>role:{user?.role}</p>
      <Button
        label='update name'
        icon={<Pencil />}
        onClick={() => setVisibleNameForm(true)}
      />
      <Modal open={visibleNameForm} close={() => setVisibleNameForm(false)}>
        <RegistrationUserName />
      </Modal>
    </div>
  );
};

export default MyPage;
