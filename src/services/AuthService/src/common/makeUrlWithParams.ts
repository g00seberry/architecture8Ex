export const makeUrlWithParams = (
  url: string,
  params: Record<string, unknown>
): string =>
  `${url}?${Object.keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== null)
    .map((key) => `${key}=${encodeURIComponent(String(params[key]))}`)
    .join("&")}`;
