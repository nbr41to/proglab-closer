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
  } as Game);
};
