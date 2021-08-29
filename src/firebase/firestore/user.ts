import { User } from 'src/types';
import { db, auth } from '../';

const usersRef = db.collection('users');

export const getUser = async (): Promise<User> => {
  try {
    const authId = auth.currentUser?.uid;
    if (!authId) throw new Error('Not authenticated');
    const userDoc = await usersRef.doc(authId).get();
    return userDoc.data() as User;
  } catch (error) {
    console.error('getUser', error);
  }
};

export const updateUserName = (name: string) => {
  const authId = auth.currentUser?.uid;
  if (!authId) throw new Error('Not authenticated');
  usersRef.doc(authId).update({ name });
};
