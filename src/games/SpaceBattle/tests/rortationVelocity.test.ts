import { isAbout, isZero } from "../../../gameCore/utils";
import { AdapteeGERotatable } from "../adapters/AdapteeGERotatable";
import { CommandRotateVelocity } from "../commands/CommandRotateVelocity";
import { RotationVelocity2D } from "../common/IRotationVelocity";
import { Velocity2D } from "../common/IVelocity";

const rotateVelocityCommand = new CommandRotateVelocity();
test("После поворота на 90 градусов вектор скорости (1,0) === (0,1)", () => {
  const ent = {
    rotationVelocity: new RotationVelocity2D([90]),
    velocity: new Velocity2D(1, 0),
  };
  rotateVelocityCommand.rotateVelocity(ent).execute();
  console.log(ent);
  const newX = ent.velocity.getVelocityVector().coords[0];
  const newY = ent.velocity.getVelocityVector().coords[1];
  expect(isZero(newX) && isAbout(newY, 1)).toBe(true);
});

test("Попытка сдвинуть объект, у которого невозможно прочитать значение поворота, приводит к ошибке", () => {
  const ent = new AdapteeGERotatable({
    rotationVelocity: new RotationVelocity2D([90]),
    velocity: new Velocity2D(1, 0),
  });
  ent.setRotationVelocity(null);
  expect(() => {
    rotateVelocityCommand.rotateVelocity(ent).execute();
  }).toThrow();
});
test("Попытка сдвинуть объект, у которого невозможно прочитать значение мгновенной скорости, приводит к ошибке", () => {
  const ent = new AdapteeGERotatable({
    rotationVelocity: new RotationVelocity2D([90]),
    velocity: new Velocity2D(1, 0),
  });
  ent.setVelocity(null);
  expect(() => {
    rotateVelocityCommand.rotateVelocity(ent).execute();
  }).toThrow();
});
