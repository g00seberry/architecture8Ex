import { IContainer } from "../../IoC/types";

export type GameInfo = {
  id: string;
  name: string;
  src: string;
  status: "active" | "stop" | "pause";
};

class GamesRepo implements IContainer<GameInfo> {
  reg = new Map<string, GameInfo>();
  add(name: string, data: GameInfo) {
    this.reg.set(name, data);
  }
  get(name: string): GameInfo | undefined {
    return this.reg.get(name);
  }
  remove(name: string): GameInfo | undefined {
    const g = this.get(name);
    this.reg.delete(name);
    return g;
  }
}

const gamesRepo = new GamesRepo();

export const getGamesRepo = () => gamesRepo;
