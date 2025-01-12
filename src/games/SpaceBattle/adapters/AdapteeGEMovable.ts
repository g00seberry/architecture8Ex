import { GameEntity } from "../../../gameCore/Entity";
import { IVector } from "../common/IVector";
import { IVelocity } from "../common/IVelocity";

type MovableDef = {
  location: IVector;
  velocity: IVelocity;
};

const cast = (e: GameEntity) => {
  if (!("location" in e) || !("velocity" in e))
    throw Error("unconsistent entity");
  return e as MovableDef;
};

export class AdapteeGEMovable {
  constructor(public entity: GameEntity) {}
  get location() {
    return cast(this.entity).location;
  }
  get velocity() {
    return cast(this.entity).velocity;
  }

  setLocation(location: IVector) {
    cast(this.entity).location = location;
  }
  setVelocity(velocity: IVelocity) {
    cast(this.entity).velocity = velocity;
  }
}
