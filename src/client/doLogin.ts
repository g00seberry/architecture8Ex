export type AuthData = {
  accessToken: string;
  refreshToken: string;
};

export const doLogin = async (): Promise<AuthData> => {
  return { accessToken: "1", refreshToken: "1" };
};
