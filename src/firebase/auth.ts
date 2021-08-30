import { User } from 'src/types';
import { auth, firebase, db } from '.';

export const googleSignIn = async (): Promise<string> => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    const user = result.user;
    const userRef = db.collection('users').doc(user.uid);
    const userInfo = await userRef.get();
    /* firestoreにユーザのデータがなかった場合 */
    if (!userInfo.data()) {
      userRef.set({
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
    const userDoc = await db.collection('users').doc(user.uid).get();
    return !((userDoc.data() as User).role === 'unauthenticated');
  } catch (error) {
    console.error(error);
    return false;
  }
};
