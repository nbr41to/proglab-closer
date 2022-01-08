import { useAuthCheck } from 'src/recoil/authState/hook';

import { HomePage } from '@/components/Home';

export default function Home() {
  useAuthCheck();
  return (
    <>
      <HomePage />
    </>
  );
}
