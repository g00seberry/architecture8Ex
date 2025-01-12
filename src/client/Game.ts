import { GameInfo, runGame } from "./api/game";

class Game {
  constructor(readonly info: GameInfo) {}
}

let g: Game | null = null;

export const getGame = () => {
  if (!g) throw Error("game is not defined");
  return g;
};
