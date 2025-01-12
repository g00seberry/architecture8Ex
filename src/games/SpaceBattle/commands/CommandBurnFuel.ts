import { ICommand } from "../../../common/ICommand";
import { GameEntity } from "../../../gameCore/Entity";
import { IFuelTank } from "../common/IFuelTank";
import {
  makeExceptionCmd,
  ExceptionCmdType,
} from "../../../gameCore/ExceptionHandlerCmd/ExceptionCmd";

export class CommandBurnFuel implements ICommand {
  entity: GameEntity | null = null;
  burnFuel(gameEnt: GameEntity) {
    this.entity = gameEnt;
    return this;
  }
  execute() {
    if (!this.entity)
      throw makeExceptionCmd(
        "Unconsistent data. Can`t perform CommandBurnFuel command.",
        ExceptionCmdType["unconsistent data"],
        this
      );
    if (!("fuelTank" in this.entity))
      throw makeExceptionCmd(
        "Wrong entity type. Can`t perform CommandBurnFuel command.",
        ExceptionCmdType["unconsistent data"],
        this
      );
    const fuelTank = this.entity.fuelTank as IFuelTank;
    if (!fuelTank)
      throw makeExceptionCmd(
        "Wrong fuelTank",
        ExceptionCmdType["unconsistent data"],
        this
      );
    fuelTank.burn();
  }
}
