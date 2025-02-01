import { Response } from "express";
import { TokenPayload } from "../../types/TokenPair";

export const getTokenPayloadFromResponse = (res: Response): TokenPayload =>
  res.locals.tokenPayload;
