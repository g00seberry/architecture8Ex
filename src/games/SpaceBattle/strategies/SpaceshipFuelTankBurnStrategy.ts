import { IStrategy } from "../../../common/IStrategy/IStrategy";
import { IFuelTank } from "../common/IFuelTank";
import {
  ExceptionCmdType,
  makeExceptionCmd,
} from "../../../gameCore/ExceptionHandlerCmd/ExceptionCmd";

export class SpaceshipFuelTankBurnStrategy implements IStrategy<number> {
  tank: IFuelTank;
  bind(tank: IFuelTank) {
    this.tank = tank;
    return this;
  }
  execute(): number {
    if (!this.tank)
      throw makeExceptionCmd(
        "Can`t execute SpaceshipFuelTankBurnStrategy",
        ExceptionCmdType["unconsistent data"],
        this
      );

    const fuel = this.tank.getFuelLevel();
    if (fuel > 0) return fuel - 1;
    return fuel;
  }
}
