import { IFactory } from "../../../common/IFactory";
import { AdapteeGEMovable } from "../adapters/AdapteeGEMovable";
import { AdapteeGERotatable } from "../adapters/AdapteeGERotatable";

type MovableEntityFactorySrcData = [
  AdapteeGEMovable["location"],
  AdapteeGEMovable["velocity"]
];

export class FactoryMovableEntity implements IFactory<AdapteeGEMovable[]> {
  source: MovableEntityFactorySrcData[];
  constructor(data: MovableEntityFactorySrcData[]) {
    this.source = data;
  }
  produce() {
    return this.source.map(
      ([location, velocity]) => new AdapteeGEMovable({ location, velocity })
    );
  }
}

type RotatableEntityFactorySrcData = [
  AdapteeGERotatable["rotationVelocity"],
  AdapteeGERotatable["velocity"]
];

export class FactoryRotatableEntity implements IFactory<AdapteeGERotatable[]> {
  source: RotatableEntityFactorySrcData[];
  constructor(data: RotatableEntityFactorySrcData[]) {
    this.source = data;
  }
  produce() {
    return this.source.map(
      ([rotationVelocity, velocity]) =>
        new AdapteeGERotatable({ rotationVelocity, velocity })
    );
  }
}
