import { ICommand } from "../../../common/ICommand";
import { IFactory } from "../../../common/IFactory/IFactory";
import { GameEntity, IGameEntityRegister } from "../../../gameCore/Entity";
import {
  makeExceptionCmd,
  ExceptionCmdType,
} from "../../../gameCore/ExceptionHandlerCmd/ExceptionCmd";

export class CommandProduceEntities implements ICommand {
  factory: IFactory<GameEntity[]> | null = null;
  entityReg: IGameEntityRegister | null = null;
  produceEntities(
    newFactory: IFactory<GameEntity[]>,
    newEntityReg: IGameEntityRegister
  ) {
    this.factory = newFactory;
    this.entityReg = newEntityReg;
    return this;
  }
  execute() {
    if (!this.factory || !this.entityReg)
      throw makeExceptionCmd(
        "factory or entityReg is null. Can`t perform CommandProduceMovableEntities command.",
        ExceptionCmdType["unconsistent data"],
        this
      );

    this.factory.produce().forEach((e) => this.entityReg.registerEntity(e));
  }
}
