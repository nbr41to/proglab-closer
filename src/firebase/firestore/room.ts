import { auth } from 'src/firebase';
import { ContentType, Room } from 'src/types';

import { Content } from '../../types';
import { dateFormatted } from '../../utils/dateFormatted';
import { db, firebase } from '..';

const roomsRef = db.collection('rooms');

export const createRoom = async (title: string) => {
  const roomDoc = roomsRef.doc();
  await roomDoc.set({
    title,
    id: roomDoc.id,
    date: dateFormatted(),
    members: [],
    content: [],
    achieved: false,
  } as Room);
  return roomDoc.id;
};
export const removeRoom = async (roomId: string) => {
  roomsRef.doc(roomId).delete();
};
export const achievedRoom = async (roomId: string) => {
  roomsRef.doc(roomId).update({ achieved: true });
};

export const joinRoom = async (input: { roomId: string; userName: string }) => {
  const { roomId, userName } = input;
  await roomsRef.doc(roomId).update({
    members: firebase.firestore.FieldValue.arrayUnion(userName),
  });
};

export const postReport = async (input: {
  roomId: string;
  content: Content;
}) => {
  const { roomId, content } = input;
  await roomsRef.doc(roomId).update({
    contents: firebase.firestore.FieldValue.arrayUnion(content),
  });
};

export const getRooms = async () => {
  try {
    if (!auth.currentUser) return [];
    const snapshot = await roomsRef.get();
    const rooms = snapshot.docs.map((doc) => doc.data() as Room);
    return rooms;
  } catch (error) {
    console.error(error);
  }
};
