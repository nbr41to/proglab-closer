import { atom } from 'recoil';

export const authState = atom({
  key: 'auth-state',
  default: {
    loading: true,
    id: '',
  },
});
