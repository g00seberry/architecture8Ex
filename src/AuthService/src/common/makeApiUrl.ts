import { config } from "../config";

export const makeApiUrl = (urlPart: string) =>
  `${config.clientUrl}/api${urlPart}`;
