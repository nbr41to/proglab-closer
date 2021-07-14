import { atom } from 'recoil';
import { User } from '../types';

export const userInfo = atom<User>({
  key: 'user-info-state',
  default: null,
});

export const postChatHistory = atom<string[]>({
  key: 'post-chat-history-state',
  default: [],
});
export const postReportHistory = atom<string[]>({
  key: 'post-report-history-state',
  default: [],
});
export const postNextHistory = atom<string[]>({
  key: 'post-next-history-state',
  default: [],
});
