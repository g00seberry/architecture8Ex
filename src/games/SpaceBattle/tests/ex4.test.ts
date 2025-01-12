import { AdapteeGESpaceShip } from "../adapters/AdapteeGESpaceShip";
import { CommandBurnFuel } from "../commands/CommandBurnFuel";
import { CommandCheckFuel } from "../commands/CommandCheckFuel";
import { SpaceshipFuelTank } from "../common/fuelTanks";
import { RotationVelocityVec } from "../common/IRotationVelocity";
import { Vector2 } from "../common/IVector";
import { VelocityVec } from "../common/IVelocity";
import { seedEx4 } from "../seeds/seedEx4";
import { SpaceshipFuelTankBurnStrategy } from "../strategies";
import { getInitedCore, gameLoopStep } from "./common";

test("Написаны тесты к CheckFuelComamnd: выполняется без ошибок", async () => {
  const simpleSpaceShip = new AdapteeGESpaceShip({
    fuelTank: new SpaceshipFuelTank(10, new SpaceshipFuelTankBurnStrategy()),
    location: new Vector2([0, 0]),
    rotationVelocity: new RotationVelocityVec([0]),
    velocity: new VelocityVec(new Vector2([1, 0])),
  });
  const cmd = new CommandCheckFuel().checkFuel(simpleSpaceShip);
  expect(cmd.execute()).toBe(undefined);
});

test("Написаны тесты к CheckFuelComamnd: ошибка, если бак пуст или сломан", async () => {
  const simpleSpaceShip = new AdapteeGESpaceShip({
    fuelTank: new SpaceshipFuelTank(0, new SpaceshipFuelTankBurnStrategy()),
    location: new Vector2([0, 0]),
    rotationVelocity: new RotationVelocityVec([0]),
    velocity: new VelocityVec(new Vector2([1, 0])),
  });

  const cmd = new CommandCheckFuel().checkFuel(simpleSpaceShip);
  expect(() => {
    cmd.execute();
  }).toThrow();

  simpleSpaceShip.setFuelTank(null);
  expect(() => {
    cmd.execute();
  }).toThrow();
});

test("Написаны тесты к BurnFuelComamnd: выполняется без ошибок", async () => {
  const strat = new SpaceshipFuelTankBurnStrategy();
  const tank = new SpaceshipFuelTank(10, strat);
  strat.bind(tank);
  const simpleSpaceShip = new AdapteeGESpaceShip({
    fuelTank: tank,
    location: new Vector2([0, 0]),
    rotationVelocity: new RotationVelocityVec([0]),
    velocity: new VelocityVec(new Vector2([1, 0])),
  });
  const cmd = new CommandBurnFuel().burnFuel(simpleSpaceShip);
  cmd.execute();
  expect(simpleSpaceShip.fuelTank.getFuelLevel() === 9).toBe(true);
});
test("Написаны тесты к BurnFuelComamnd: ошибка, если бак сломан", async () => {
  const strat = new SpaceshipFuelTankBurnStrategy();
  const tank = new SpaceshipFuelTank(10, strat);
  strat.bind(tank);
  const simpleSpaceShip = new AdapteeGESpaceShip({
    fuelTank: tank,
    location: new Vector2([0, 0]),
    rotationVelocity: new RotationVelocityVec([0]),
    velocity: new VelocityVec(new Vector2([1, 0])),
  });
  const cmd = new CommandBurnFuel().burnFuel(simpleSpaceShip);
  simpleSpaceShip.setFuelTank(null);
  expect(() => {
    cmd.execute();
  }).toThrow();
});

test("Реализована макрокоманда движения по прямой с расходом топлива и тесты к ней", async () => {
  getInitedCore().then((core) => {
    const { cmdQueue, entityRegister } = core.config;
    seedEx4(core);
    gameLoopStep(core);
    const simpleSpaceShip = entityRegister.list()[0] as AdapteeGESpaceShip;
    expect(
      simpleSpaceShip.fuelTank.getFuelLevel() === 9 &&
        simpleSpaceShip.location.coords[0] === 1 &&
        cmdQueue.isEmpty()
    ).toBe(true);
  });
});
