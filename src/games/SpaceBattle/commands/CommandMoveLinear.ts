import { ICommand } from "../../../common/ICommand";
import { GameEntity } from "../../../gameCore/Entity";
import {
  ExceptionCmdType,
  makeExceptionCmd,
} from "../../../gameCore/ExceptionHandlerCmd/ExceptionCmd";
import { AdapteeGEMovable } from "../adapters/AdapteeGEMovable";

export class CommandMoveLinear implements ICommand {
  entity: AdapteeGEMovable | null = null;
  moveLinear(gameEnt: GameEntity) {
    this.entity = new AdapteeGEMovable(gameEnt);
    return this;
  }
  execute() {
    if (!this.entity)
      throw makeExceptionCmd(
        "Unconsistent data. Can`t perform CommandMoveLinear command.",
        ExceptionCmdType["unconsistent data"],
        this
      );
    const { location, velocity } = this.entity;
    this.entity.setLocation(location.add(velocity.getVelocityVector()));
  }
}
