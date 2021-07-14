import { VFC, ReactNode } from 'react';
import { Box } from '@fower/react';
import Image from 'next/image';
import logo2 from 'src/assets/logo2.png';
import Router from 'next/router';

type LayoutProps = {
  children: ReactNode;
};

export const Layout: VFC<LayoutProps> = ({ children }) => {
  return (
    <Box>
      <Box as='header' bgTeal400 w={'100vw'} px={20} py={8}>
        <Box cursorPointer inline>
          <Image
            src={logo2}
            width={64}
            height={60}
            alt='logo'
            onClick={() => Router.push('/entrance')}
          />
        </Box>
      </Box>
      <Box p={20}>{children}</Box>
    </Box>
  );
};
