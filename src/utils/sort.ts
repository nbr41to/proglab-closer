/* そのうち削除 */
import { Post, PostInfo, RoomInfo, Message } from 'src/types';

export const sortPosts = (posts: Post[] | PostInfo[]): Post[] | PostInfo[] =>
  posts.sort((a, b) => {
    if (a.updatedAt > b.updatedAt) return -1;
    if (a.updatedAt < b.updatedAt) return 1;
    return 0;
  });

export const sortRoomInfo = (roomInfos: RoomInfo[]): RoomInfo[] =>
  roomInfos.sort((a, b) => {
    if (a.updatedAt > b.updatedAt) return -1;
    if (a.updatedAt < b.updatedAt) return 1;
    return 0;
  });

export const sortMessages = (messages: Message[]): Message[] => {
  const _messages = messages.slice();
  return _messages.sort((a, b) => {
    if (a.sendAt > b.sendAt) return 1;
    if (a.sendAt < b.sendAt) return -1;
    return 0;
  });
};
