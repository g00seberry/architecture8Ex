import { makeUrlWithParams } from "../common/makeUrlWithParams";

export type RedirectActionTypes = "resetPassword" | "activateUser";
export type RedirectParam = "action";
export type RedirectParamConfig = Record<RedirectParam, RedirectActionTypes>;
export const makeUrlWithRedirectParams = (
  url: string,
  params: RedirectParamConfig
) => makeUrlWithParams(url, params);
