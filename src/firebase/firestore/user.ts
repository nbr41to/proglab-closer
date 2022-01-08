import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { User } from 'src/types';

import { auth, db } from '..';

const usersRef = collection(db, 'users');

export const getUser = async (): Promise<User> => {
  try {
    const authId = auth.currentUser?.uid;
    if (!authId) throw new Error('Not authenticated');
    const userDoc = await getDoc(doc(usersRef, authId));
    return userDoc.data() as User;
  } catch (error) {
    console.error('getUser', error);
  }
};

export const updateUserName = async (name: string) => {
  const authId = auth.currentUser?.uid;
  if (!authId) throw new Error('Not authenticated');
  await updateDoc(doc(usersRef, authId), { name });
};

export const authenticateUser = async (userId: string) => {
  await updateDoc(doc(usersRef, userId), {
    role: 'closer',
  });
};

export const getUnauthenticatedUser = async (): Promise<User[]> => {
  try {
    const q = query(usersRef, where('role', '==', 'unauthenticated'));
    const users = await getDocs(q);
    return users.docs.map((doc) => doc.data() as User);
  } catch (error) {
    console.error('getUnauthenticatedUser', error);
  }
};
