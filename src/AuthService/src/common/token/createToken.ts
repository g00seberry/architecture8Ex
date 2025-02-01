import jwt from "jsonwebtoken";
export const createToken = (
  payload: string | Buffer | object,
  key: string,
  options?: jwt.SignOptions
): string => jwt.sign(payload, key, options);
