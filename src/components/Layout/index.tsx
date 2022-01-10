import { useRouter } from 'next/router';
import { ReactNode, VFC } from 'react';
import { useListenAuth } from 'src/recoil/authState';

import { Menu } from './Menu';

type LayoutProps = {
  children: ReactNode;
};

export const Layout: VFC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const user = useListenAuth();

  return (
    <div>
      <header className="flex justify-between p-4 bg-amber-400">
        <h1
          className="text-3xl font-bold text-white cursor-pointer"
          onClick={() => router.push('/')}
        >
          progLab closer
        </h1>
        {user.id && <Menu />}
      </header>
      <main>{children}</main>
    </div>
  );
};
