export interface IVector {
  coords: unknown;
  add(b: IVector): IVector;
  mod(): number;
  scal(b: IVector): number;
}

export class Vector2 implements IVector {
  coords: [number, number];
  constructor(data: [number, number]) {
    this.coords = data;
  }
  add(b: Vector2): Vector2 {
    const [x, y] = this.coords;
    const [xInc, yInc] = b.coords;
    return new Vector2([x + xInc, y + yInc]);
  }
  mod(): number {
    const [x, y] = this.coords;
    return Math.sqrt(x * x + y * y);
  }
  scal(b: Vector2): number {
    const [x, y] = this.coords;
    const [x2, y2] = b.coords;
    return x * x2 + y * y2;
  }
}
