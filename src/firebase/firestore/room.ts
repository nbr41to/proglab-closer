import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { Room } from 'src/types';

import { Content } from '../../types';
import { dateFormatted } from '../../utils/dateFormatted';
import { auth, db } from '..';

const roomsRef = collection(db, 'rooms');

/* ルームの作成 */
export const createRoom = async (title: string) => {
  const roomDoc = doc(roomsRef);
  await setDoc(roomDoc, {
    title,
    id: roomDoc.id,
    date: dateFormatted(),
    members: [],
    content: [],
    achieved: false,
  } as Room);
  return roomDoc.id;
};

/* ルームの削除 */
export const removeRoom = async (roomId: string) => {
  deleteDoc(doc(roomsRef, roomId));
};

/* ルームをアーカイブ状態へする */
export const achievedRoom = async (roomId: string) => {
  updateDoc(doc(roomsRef, roomId), { achieved: true });
};

/* ルームに参加する */
export const joinRoom = async (input: { roomId: string; userName: string }) => {
  const { roomId, userName } = input;
  await updateDoc(doc(roomsRef, roomId), {
    members: arrayUnion(userName),
  });
};

/* テーマの投稿 */
export const postReport = async (input: {
  roomId: string;
  content: Content;
}) => {
  const { roomId, content } = input;
  content.id = nanoid();
  await updateDoc(doc(roomsRef, roomId), {
    contents: arrayUnion(content),
  });
};

/* テーマの削除 */
export const removeReport = async (input: {
  roomId: string;
  content: Content;
}) => {
  const { roomId, content } = input;
  await updateDoc(doc(roomsRef, roomId), {
    contents: arrayRemove(content),
  });
};

/* ルーム一覧の取得 */
export const getRooms = async () => {
  try {
    if (!auth.currentUser) return [];
    const snapshot = await getDocs(roomsRef);
    const rooms = snapshot.docs.map((doc) => doc.data() as Room);
    return rooms;
  } catch (error) {
    console.error(error);
  }
};
