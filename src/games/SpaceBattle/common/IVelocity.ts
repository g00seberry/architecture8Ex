import { degrees2Radians } from "../../../gameCore/utils";
import { IVector, Vector2 } from "./IVector";

export interface IVelocity {
  getVelocityVector(): IVector;
}

export class Velocity2D implements IVelocity {
  velocityMod: number;
  angleDeg: number;
  constructor(mod: number, deg: number) {
    this.velocityMod = mod;
    this.angleDeg = deg;
  }
  getVelocityVector() {
    return new Vector2([
      this.velocityMod * Math.cos(degrees2Radians(this.angleDeg)),
      this.velocityMod * Math.sin(degrees2Radians(this.angleDeg)),
    ]);
  }
}

export class VelocityVec implements IVelocity {
  velocity: IVector;
  constructor(_velocity: IVector) {
    this.velocity = _velocity;
  }
  getVelocityVector() {
    return this.velocity;
  }
}
