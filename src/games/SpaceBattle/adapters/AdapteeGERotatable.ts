import { GameEntity } from "../../../gameCore/Entity";
import { IRotationVelocity } from "../common/IRotationVelocity";
import { IVelocity } from "../common/IVelocity";

type RotatableDef = {
  rotationVelocity: IRotationVelocity;
  velocity: IVelocity;
};

const cast = (e: GameEntity) => {
  if (!("rotationVelocity" in e) || !("rotationVelocity" in e))
    throw Error("unconsistent entity");
  return e as RotatableDef;
};

export class AdapteeGERotatable {
  constructor(public entity: GameEntity) {}
  get rotationVelocity() {
    return cast(this.entity).rotationVelocity;
  }
  get velocity() {
    return cast(this.entity).velocity;
  }

  setRotationVelocity(rotationVelocity: IRotationVelocity) {
    cast(this.entity).rotationVelocity = rotationVelocity;
  }
  setVelocity(velocity: IVelocity) {
    cast(this.entity).velocity = velocity;
  }
}
