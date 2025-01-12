import { ICommand } from "../../../common/ICommand";
import { GameEntity } from "../../../gameCore/Entity";
import {
  ExceptionCmdType,
  makeExceptionCmd,
} from "../../../gameCore/ExceptionHandlerCmd/ExceptionCmd";
import { AdapteeGERotatable } from "../adapters/AdapteeGERotatable";
/**
 * пока что объект представлен в виде положения в пространстве и скорости,
 * поэтому вращение есть смысл производить только в контексте поворота направления движения,
 * то есть поворачивать вектор скорости
 */
export class CommandRotateVelocity implements ICommand {
  entity: AdapteeGERotatable | null = null;
  rotateVelocity(gameEnt: GameEntity) {
    this.entity = new AdapteeGERotatable(gameEnt);
    return this;
  }
  execute() {
    if (!this.entity)
      throw makeExceptionCmd(
        "Entity is empty. Can`t perform CommandRotateVelocity command.",
        ExceptionCmdType["unconsistent data"],
        this
      );
    const { rotationVelocity, velocity } = this.entity;
    this.entity.setVelocity(rotationVelocity.rotate(velocity));
  }
}
