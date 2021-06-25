import { auth, firebase } from './config';

export const googleLogin = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    const user = result.user;
    console.log('success google login!!');
    return user.uid;
  } catch (error) {
    console.log('failed google login', error);
  }
};
