import { db, firebase } from '../firebase/config';
import { VFC, createContext, useEffect, useState, ReactNode } from 'react';
import Router from 'next/router';
import { userInfo } from 'src/recoil/atom';
import { useSetRecoilState } from 'recoil';
import { User } from 'src/types';

type AuthContextProps = {
  currentUser: firebase.User | null;
};

const AuthContext = createContext<AuthContextProps>({ currentUser: null });

const AuthProvider: VFC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const setUser = useSetRecoilState(userInfo);

  useEffect(() => {
    if (!process.browser) return;
    let unscribe: firebase.Unsubscribe;
    const currentPath = Router.pathname;

    unscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        Router.push('/login');
      } else {
        setCurrentUser(user);
        Router.push(currentPath);
      }
    });

    return () => {
      unscribe();
    };
  }, []);

  useEffect(() => {
    db.collection('users')
      .doc(currentUser?.uid)
      .onSnapshot((doc) => {
        setUser(doc.data() as User);
      });
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
