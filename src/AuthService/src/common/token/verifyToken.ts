import jwt from "jsonwebtoken";
export const verifyToken = <T>(
  token: string,
  key: string,
  options?: jwt.VerifyOptions
): T | null => {
  try {
    return jwt.verify(token, key, options) as T;
  } catch {
    return null;
  }
};
