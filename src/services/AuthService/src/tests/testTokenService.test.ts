import { getTokensKeyPair } from "../config";
import { getTokenService } from "../service/TokenService/TokenService";

test("init token service", async () => {
  const keys = getTokensKeyPair();
  const payload = { test: 1 };
  const toks = await getTokenService();
  const tokenPair = toks.generateTokenPair(payload);
  expect(
    "test" in toks.validateToken(tokenPair.refreshToken, keys.refreshTokenKey)
  ).toEqual(true);
  expect(
    "test" in toks.validateToken(tokenPair.accessToken, keys.accessTokenKey)
  ).toEqual(true);
});

test("save and delete", async () => {
  const payload = { test: 1 };
  const toks = await getTokenService();
  const tokenPair = toks.generateTokenPair(payload);
  await toks.saveToken("test", tokenPair.refreshToken);
  const isExist = await toks.checkTokenExist(tokenPair.refreshToken);
  expect(isExist).toEqual(true);
  await toks.removeToken(tokenPair.refreshToken);
  const isExist2 = await toks.checkTokenExist(tokenPair.refreshToken);
  expect(isExist2).toEqual(false);
});
