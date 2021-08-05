import { useContext, VFC } from 'react';
import { AuthContext } from '../../src/context/Auth';

const MyPage: VFC = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <h1>MyPage</h1>
      <p>{currentUser?.displayName}さんでログイン中</p>
    </div>
  );
};

export default MyPage;
