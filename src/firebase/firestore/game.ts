import { Game } from 'src/types';
import { dateFormatted } from 'src/utils/dateFormatted';
import { db } from '..';

const gamesRef = db.collection('games');

export const createGame = async (input: Game) => {
  const gameDoc = gamesRef.doc();
  await gameDoc.set({
    ...input,
    id: gameDoc.id,
    createdAt: dateFormatted(),
    reviews: [],
  } as Game);
};
export const getGameList = async () => {
  const snapshot = await gamesRef.get();
  const gameList = snapshot.docs.map((doc) => doc.data() as Game);
  return gameList;
};
