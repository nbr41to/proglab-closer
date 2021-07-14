import { VFC, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { db } from '../firebase/config';
import { userInfo } from './atom';

type FirestoreToRecoilProps = {};

export const FirestoreToRecoil: VFC<FirestoreToRecoilProps> = () => {
  const setUserInfo = useSetRecoilState(userInfo);
  useEffect(() => {
    db.collection('user');
  }, []);
  return null;
};
