import { degrees2Radians } from "../../../gameCore/utils";
import { Vector2 } from "./IVector";
import { IVelocity, Velocity2D, VelocityVec } from "./IVelocity";

export interface IRotationVelocity {
  rotate(velocity: IVelocity): IVelocity;
}

export class RotationVelocity2D implements IRotationVelocity {
  eul: [number];
  constructor(newEul: [number]) {
    this.eul = newEul;
  }
  rotate(src: Velocity2D) {
    return new Velocity2D(src.velocityMod, src.angleDeg + this.eul[0]);
  }
}

export class RotationVelocityVec implements IRotationVelocity {
  eul: [number];
  constructor(newEul: [number]) {
    this.eul = newEul;
  }
  private get rotationMtx(): number[][] {
    const { eul } = this;
    return [
      [Math.cos(degrees2Radians(eul[0])), -Math.sin(degrees2Radians(eul[0]))],
      [Math.sin(degrees2Radians(eul[0])), Math.cos(degrees2Radians(eul[0]))],
    ];
  }
  rotate(src: VelocityVec) {
    const mtx = this.rotationMtx;
    const { coords } = src.getVelocityVector();
    return new VelocityVec(
      new Vector2([
        coords[0] * mtx[0][0] + coords[1] * mtx[0][1],
        coords[0] * mtx[1][0] + coords[1] * mtx[1][1],
      ])
    );
  }
}
