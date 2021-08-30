import { Content } from '../types';

export const roulette = (contents: Content[]) => {
  const members: string[] = [];
  contents.forEach((content) => {
    if (!members.includes(content.name)) {
      members.push(content.name);
    }
  });
  console.log(members);
  const diceMember = Math.floor(Math.random() * members.length);
  const chooseContents = contents.filter(
    (content) => content.name === members[diceMember]
  );
  const diceContent = Math.floor(Math.random() * chooseContents.length);
  return chooseContents[diceContent];
};
