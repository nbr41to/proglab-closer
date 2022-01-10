import { PageTitle } from '../commons/title/PageTitle';
import { EditNameForm } from './EditNameForm';

export const UserSettingPage = () => {
  return (
    <div className="p-4 space-y-4">
      <PageTitle title="自宅" paragraph="ユーザ設定をすることができます" />
      <h2 className="text-center">ユーザ設定</h2>
      <h2 className="text-center">ユーザ名の変更</h2>
      <EditNameForm />
      <h2 className="text-center">カスタマイズ</h2>
      <p>Slackの絵文字スタンプの編集昨日</p>
      <h2>お支払い状況</h2>
    </div>
  );
};
