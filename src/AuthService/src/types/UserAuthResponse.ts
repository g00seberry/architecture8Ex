export type UserAuthResponse = {
  user: { login; password };
  refreshToken: string;
  accessToken: string;
};
