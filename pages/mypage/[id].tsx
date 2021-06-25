import { useContext, useEffect, VFC } from 'react';
import { AuthContext } from '../../src/context/Auth';
import { Box } from '@fower/react';

const MyPage: VFC = () => {
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);
  return (
    <Box px8>
      <h1>MyPage</h1>
      <p>{currentUser?.displayName}さんでログイン中</p>
    </Box>
  );
};

export default MyPage;
