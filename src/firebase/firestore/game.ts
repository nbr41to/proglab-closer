import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { Game } from 'src/types';
import { dateFormatted } from 'src/utils/dateFormatted';

import { db } from '..';

const gamesRef = collection(db, 'games');

export const createGame = async (input: Game) => {
  const gameDoc = doc(gamesRef);
  await setDoc(gameDoc, {
    ...input,
    id: gameDoc.id,
    createdAt: dateFormatted(),
    reviews: [],
  } as Game);
};

export const getGameList = async () => {
  const snapshot = await getDocs(gamesRef);
  const gameList = snapshot.docs.map((doc) => doc.data() as Game);
  return gameList;
};
