import { Box } from '@fower/react';
import { Door, GoogleContainedFill } from 'akar-icons';
import Router from 'next/router';
import { Button } from '../src/components/Button';
import { googleLogin } from '../src/firebase/auth';

export default function Home() {
  const login = () => {
    googleLogin().then(() => Router.push(`/entrance`));
  };

  return (
    <Box toCenter h='100vh' bgOrange300>
      <Box maxW='360px' bgWhite rounded={12} p={32} toCenter column>
        <Box>
          <Box as='img' src='/logo.png' w='100%' rounded={8} />
        </Box>
        <Button
          label='Googleログイン'
          icon={<GoogleContainedFill />}
          onClick={login}
          bgOrange400
          white
          mt={10}
        />
        <Button
          label='ログイン済みの方'
          icon={<Door />}
          onClick={() => Router.push(`/entrance`)}
          bgOrange400
          white
          mt={10}
        />
      </Box>
    </Box>
  );
}
