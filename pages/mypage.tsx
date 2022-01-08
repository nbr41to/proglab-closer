import { VFC } from 'react';
import { EditNameForm } from 'src/components/MyPage/EditNameForm';
import { useAuthCheck } from 'src/recoil/authState/hook';

type MyPageProps = {
  className?: string;
};

const MyPage: VFC<MyPageProps> = () => {
  useAuthCheck();
  return (
    <div>
      <h1>MyPage</h1>
      <h2>ユーザ設定</h2>
      <EditNameForm />
      <h2>カスタマイズ</h2>
      <p>Slackの絵文字スタンプの編集昨日</p>
      <h2>お支払い状況</h2>
    </div>
  );
};

export default MyPage;
