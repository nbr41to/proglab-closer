import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { auth } from 'src/firebase';
import { authenticatedCheck } from 'src/firebase/auth';

import { authState } from './atom';

export const useAuthCheck = () => {
  const auth = useRecoilValue(authState);
  const router = useRouter();

  useEffect(() => {
    if (auth.loading) return;
    if (!auth.id) router.push('/login');
    authenticatedCheck().then((res) => {
      if (!res) router.push('/unauthenticated');
    });
  }, [auth]);
  return auth;
};

export const useListenAuth = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(authState);

  useEffect(() => {
    if (user.id) return;
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({ loading: false, id: user.uid });
      } else {
        setUser((prev) => ({ ...prev, loading: false }));
        router.push('/login');
      }
    });
    return () => {
      unsubscribe();
      setUser((prev) => ({ ...prev, id: '' }));
    };
  }, []);
  return user;
};
