import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { User } from 'src/types';

import { auth, db } from '.';

const usersRef = collection(db, 'users');

export const googleSignIn = async (): Promise<string> => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const userRef = doc(usersRef, user.uid);
    const userInfo = await getDoc(userRef);
    /* firestoreにユーザのデータがなかった場合 */
    if (!userInfo.data()) {
      setDoc(userRef, {
        id: user.uid,
        name: user.displayName || 'マイページから名前を変更してください',
        role: 'unauthenticated',
      } as User);
    }
    return user.uid;
  } catch (error) {
    console.error('googleSignIn', error);
  }
};

export const singOut = async (): Promise<void> => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error(error);
  }
};

export const authenticatedCheck = async (): Promise<boolean> => {
  try {
    const user = auth.currentUser;
    if (!user) return true; // fix
    const userDoc = await getDoc(doc(usersRef, user.uid));
    return !((userDoc.data() as User).role === 'unauthenticated');
  } catch (error) {
    console.error(error);
    return false;
  }
};
