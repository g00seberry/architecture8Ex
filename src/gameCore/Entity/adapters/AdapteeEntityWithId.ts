import { GameEntity } from "../GameEntity";

export class AdapteeEntityWithId {
  constructor(readonly e: GameEntity) {}

  getId(): string | undefined {
    if (
      typeof this.e !== "object" ||
      !("id" in this.e) ||
      this.e.id !== "string"
    )
      return undefined;
    return this.e.id;
  }
}
