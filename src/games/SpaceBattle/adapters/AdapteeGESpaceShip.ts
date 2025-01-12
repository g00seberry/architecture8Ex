import { GameEntity } from "../../../gameCore/Entity";
import { IFuelTank } from "../common/IFuelTank";
import { IRotationVelocity } from "../common/IRotationVelocity";
import { IVector } from "../common/IVector";
import { IVelocity } from "../common/IVelocity";

type SpaceShipDef = {
  location: IVector;
  velocity: IVelocity;
  rotationVelocity: IRotationVelocity;
  fuelTank: IFuelTank;
};

const cast = (e: GameEntity) => {
  if (
    !("fuelTank" in e) ||
    !("location" in e) ||
    !("velocity" in e) ||
    !("rotationVelocity" in e)
  )
    throw Error("unconsistent entity");
  return e as SpaceShipDef;
};

export class AdapteeGESpaceShip {
  constructor(public entity: GameEntity) {}

  get fuelTank() {
    return cast(this.entity).fuelTank as IFuelTank;
  }
  get location() {
    return cast(this.entity).location as IVector;
  }
  get velocity() {
    return cast(this.entity).velocity as IVelocity;
  }
  get rotationVelocity() {
    return cast(this.entity).rotationVelocity as IRotationVelocity;
  }

  setLocation(location: IVector) {
    cast(this.entity).location = location;
  }
  setVelocity(velocity: IVelocity) {
    cast(this.entity).velocity = velocity;
  }
  setFuelTank(fuelTank: IFuelTank): void {
    cast(this.entity).fuelTank = fuelTank;
  }

  setRotationVelocity(v: IRotationVelocity) {
    cast(this.entity).rotationVelocity = v;
  }
}
