export const EPS = 10e-7;
export const isZero = (d: number, e = EPS) =>
  d < Math.abs(e) && d > -Math.abs(e);
export const isAbout = (src: number, target: number, e = EPS) =>
  src < target + Math.abs(e) && src > target - Math.abs(e);
export const correct = (x: number, e = EPS) => (isZero(x, e) ? 0 : x);

export const degrees2Radians = (degrees: number) => degrees * (Math.PI / 180);

export function parseWSData(data: unknown) {
  let jsonData = null;
  if (Buffer.isBuffer(data)) {
    const stringData = data.toString("utf-8");
    try {
      jsonData = JSON.parse(stringData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  } else if (typeof data === "string") {
    try {
      jsonData = JSON.parse(data);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  } else {
    console.error("Unexpected data format received:", data);
  }
  return jsonData;
}
