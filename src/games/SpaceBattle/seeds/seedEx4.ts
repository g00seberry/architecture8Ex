import { MacroCommand } from "../../../gameCore/commands/MacroCommand";
import { CoreCmd } from "../../../gameCore/CoreCmd";
import { CommandBurnFuel } from "../commands/CommandBurnFuel";
import { CommandCheckFuel } from "../commands/CommandCheckFuel";
import { CommandMoveLinear } from "../commands/CommandMoveLinear";
import { SpaceshipFuelTank } from "../common/fuelTanks";
import { RotationVelocityVec } from "../common/IRotationVelocity";
import { Vector2 } from "../common/IVector";
import { VelocityVec } from "../common/IVelocity";
import { SpaceshipFuelTankBurnStrategy } from "../strategies/SpaceshipFuelTankBurnStrategy";

export const seedEx4 = (core: CoreCmd) => {
  const { cmdQueue, entityRegister } = core.config;
  const strat = new SpaceshipFuelTankBurnStrategy();
  const tank = new SpaceshipFuelTank(10, strat);
  strat.bind(tank);
  const simpleSpaceShipE = {
    id: "1",
    fuelTank: tank,
    location: new Vector2([0, 0]),
    rotationVelocity: new RotationVelocityVec([0]),
    velocity: new VelocityVec(new Vector2([1, 0])),
  };
  entityRegister.registerEntity(simpleSpaceShipE);
  const moveMacroCmd = new MacroCommand();
  moveMacroCmd.bind([
    new CommandCheckFuel().checkFuel(simpleSpaceShipE),
    new CommandMoveLinear().moveLinear(simpleSpaceShipE),
    new CommandBurnFuel().burnFuel(simpleSpaceShipE),
  ]);
  cmdQueue.enqueue(moveMacroCmd);
};
