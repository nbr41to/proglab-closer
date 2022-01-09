import { NextPage } from 'next';
import { useAuthCheck } from 'src/recoil/authState/hook';

import { UserSettingPage } from '@/components/MyPage';

const MyPage: NextPage = () => {
  useAuthCheck();

  return (
    <>
      <UserSettingPage />
    </>
  );
};

export default MyPage;
