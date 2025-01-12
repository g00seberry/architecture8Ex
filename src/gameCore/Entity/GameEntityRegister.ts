import { AdapteeEntityWithId } from "./adapters/AdapteeEntityWithId";
import { GameEntity } from "./GameEntity";

export interface IGameEntityRegister {
  registerEntity(ent: GameEntity): void;
  unregister(ent: GameEntity): GameEntity | undefined;
  list(): GameEntity[];
  getEntity(id: string): GameEntity | undefined;
}

/**
 * Хреновое решение, но пока что так, чтобы не задерживаться.
 */
export class GameEntityRegisterList implements IGameEntityRegister {
  pool: GameEntity[] = [];
  registerEntity(ent: GameEntity): void {
    if (this.pool.find((e) => e === ent)) return;
    this.pool.push(ent);
  }
  unregister(ent: GameEntity): GameEntity | undefined {
    const e = this.pool.find((e) => e === ent);
    if (!!e) this.pool = this.pool.filter((e) => e !== ent);
    return e;
  }
  list(): GameEntity[] {
    return this.pool;
  }

  get regMap(): Record<string, GameEntity> {
    return this.pool.reduce((acc, curr) => {
      const id = new AdapteeEntityWithId(curr).getId();
      if (id) acc[id] = curr;
      return acc;
    }, {});
  }

  getEntity(id: string): GameEntity | undefined {
    return this.regMap[id];
  }
}

export const getEntityRegister = () => new GameEntityRegisterList();
