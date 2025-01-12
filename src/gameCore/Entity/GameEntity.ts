export type GameEntity<T extends Object = {}> = {
  [K in keyof T]: T[K];
};

export class WithIdGameEntity {
  constructor(readonly id: string) {}
}
