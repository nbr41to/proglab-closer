import { Box } from '@fower/react';
import Router from 'next/router';
import { googleLogin } from '../src/firebase/auth';

export default function Home() {
  const login = () => {
    googleLogin().then((id) => Router.push(`/mypage/${id}`));
  };

  return (
    <Box toCenter column h='100vh' bgOrange300>
      <Box borderOrange400 bgWhite rounded={12} p={32} toCenter column>
        <Box maxW='360px'>
          <Box as='img' src='/logo.png' w='100%' rounded={8} />
        </Box>
        <Box as='button' onClick={login} bgOrange400 bgOrange400--L10--hover white textLG fontBold rounded={8} py4 px6 mt6 outlineNone cursorPointer>
          Googleログイン
        </Box>
      </Box>
    </Box>
  );
}
