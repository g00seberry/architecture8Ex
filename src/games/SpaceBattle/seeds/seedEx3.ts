import { CoreCmd } from "../../../gameCore/CoreCmd";
import { AdapteeGEMovable } from "../adapters/AdapteeGEMovable";
import { AdapteeGERotatable } from "../adapters/AdapteeGERotatable";
import { CommandMoveLinear } from "../commands/CommandMoveLinear";
import { CommandProduceEntities } from "../commands/CommandProduceEntities";
import { CommandRotateVelocity } from "../commands/CommandRotateVelocity";
import {
  FactoryMovableEntity,
  FactoryRotatableEntity,
} from "../common/factories";
import {
  RotationVelocity2D,
  RotationVelocityVec,
} from "../common/IRotationVelocity";
import { Vector2 } from "../common/IVector";
import { Velocity2D, VelocityVec } from "../common/IVelocity";

export const seedEx3 = (core: CoreCmd) => {
  const { cmdQueue, entityRegister } = core.config;
  const fctyMovableEntities = new FactoryMovableEntity([
    [new Vector2([12, 5]), new VelocityVec(new Vector2([-7, 3]))],
    [new Vector2([11, 5]), new VelocityVec(new Vector2([-7, 3]))],
  ]);
  const fctyRotatableEntities = new FactoryRotatableEntity([
    [new RotationVelocity2D([45]), new Velocity2D(1, 0)],
    [new RotationVelocityVec([45]), new VelocityVec(new Vector2([1, 1]))],
  ]);
  /**
   * создадим сущности, которые можно двигать
   */
  cmdQueue.enqueue(
    new CommandProduceEntities().produceEntities(
      fctyMovableEntities,
      entityRegister
    )
  );
  /**
   * создадим сущности, которые можно поворачивать
   */
  cmdQueue.enqueue(
    new CommandProduceEntities().produceEntities(
      fctyRotatableEntities,
      entityRegister
    )
  );
  /**
   * достанем сущности, которые можно двигать из регистра и двинем
   */
  entityRegister
    .list()
    .filter((e) => e instanceof AdapteeGEMovable)
    .filter(Boolean)
    .forEach((e) => cmdQueue.enqueue(new CommandMoveLinear().moveLinear(e)));

  /**
   * достанем сущности, которые можно поворачивать из регистра и повернем
   */
  entityRegister
    .list()
    .filter((e) => e instanceof AdapteeGERotatable)
    .filter(Boolean)
    .forEach((e) =>
      cmdQueue.enqueue(new CommandRotateVelocity().rotateVelocity(e))
    );
};
