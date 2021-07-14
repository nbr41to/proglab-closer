import { ContentType, Content, Room } from 'src/types';
import { dateFormat } from 'src/utils/dateFormat';
import { db, firebase } from './config';

export const updateUserName = (uid: string, name: string) => {
  db.collection('users').doc(uid).update({ name });
};

export const createRoom = async () => {
  const ref = db.collection('rooms').doc();
  await ref.set({
    id: ref.id,
    title: 'untitled',
    date: dateFormat(new Date()),
    member: [],
    content: {
      chat: [],
      report: [],
      next: [],
    },
  });
};
export const joinRoom = async (roomId: string, name: string) => {
  await db
    .collection('rooms')
    .doc(roomId)
    .update({
      member: firebase.firestore.FieldValue.arrayUnion(name),
    });
};
export const achieveRoom = async (roomInfo: Room) => {
  const roomId = roomInfo.id;
  /* Slack API */
  await db.collection('rooms').doc(roomId).delete();
  await db.collection('records').doc(roomId).set(roomInfo);
};

export const updateTitle = async (roomId: string, title: string) => {
  await db.collection('rooms').doc(roomId).update({ title });
};

export const postContent = async (
  roomId: string,
  to: ContentType,
  content: Content
) => {
  const key = `content.${to}`;
  await db
    .collection('rooms')
    .doc(roomId)
    .update({
      [key]: firebase.firestore.FieldValue.arrayUnion(content),
    });
  if (to === 'chat') {
  }
  if (to === 'report') {
  }
  if (to === 'next') {
  }
};
