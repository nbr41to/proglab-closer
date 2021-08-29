import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { auth } from 'src/firebase';
import { authState } from './atom';
import { useRouter } from 'next/router';

export const useAuthCheck = () => {
  const auth = useRecoilValue(authState);
  const router = useRouter();

  useEffect(() => {
    if (auth.loading) return;
    if (!auth.id) router.push('/login');
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
