export const config = {
  refreshTokenKey: "refresh-token-key",
  refreshTokenExpiresIn: "7d",
  accessTokenKey: "access-token-key",
  accessTokenExpiresIn: "3h",
  clientUrl: "http://localhost:8080",
  apiUrl: "http://localhost:4020",
};

export const getTokensKeyPair = () => ({
  refreshTokenKey: config.refreshTokenKey,
  accessTokenKey: config.accessTokenKey,
});
