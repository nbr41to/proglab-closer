import { firebase } from '../firebase/config';
import { VFC, createContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';

type AuthContextProps = {
  currentUser: firebase.User | null;
};

const AuthContext = createContext<AuthContextProps>({ currentUser: null });

const AuthProvider: VFC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const router = useRouter();
  console.log(currentUser);

  useEffect(() => {
    const unscribe = firebase.auth().onAuthStateChanged((user) => {
      // ログイン状態が変化すると呼ばれる
      if (!user) {
        router.push('/');
      } else {
        setCurrentUser(user);
        router.push(`/mypage/${user.uid}`);
      }
    });
    return () => {
      unscribe();
    };
  }, []);
  return <AuthContext.Provider value={{ currentUser: currentUser }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
