import { auth, firebase, db } from './config';

export const googleLogin = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    const user = result.user;
    const userRef = db.collection('users').doc(user.uid);
    const userInfo = await userRef.get();
    console.log(userInfo.data());
    if (!userInfo.data()) {
      userRef.set({ id: user.uid, name: user.displayName, role: 'closer' });
    }
    console.log('success google login!!');
    return user.uid;
  } catch (error) {
    console.log('failed google login', error);
  }
};
