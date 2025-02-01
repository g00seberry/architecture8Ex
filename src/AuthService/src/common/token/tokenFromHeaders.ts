import { Request } from "express";

export const tokenFromHeaders = (req: Request) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return undefined;
  const accessToken = authHeader?.split(" ")[1];
  if (!accessToken) return undefined;
  return accessToken;
};
