import { selector } from 'recoil';
import { getUser } from 'src/firebase/firestore/user';

import { authState } from './atom';

export const withAuthInfo = selector({
  key: 'with-auth-info-selector',
  get: async ({ get }) => {
    const auth = get(authState);
    if (!auth.id) return null;
    return await getUser();
  },
});
