import { IStrategy } from "../../common/IStrategy";
import { GameEntity, getEntityRegister } from "../Entity";

export class StrategyGetEntity implements IStrategy<GameEntity | undefined> {
  entityId: string = "";
  bind(entityId: string): IStrategy<GameEntity | undefined> {
    this.entityId = entityId;
    return this;
  }
  execute() {
    const reg = getEntityRegister();
    return reg.getEntity(String(this.entityId));
  }
}
