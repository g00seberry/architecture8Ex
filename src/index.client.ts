import { bootIoC4Client, IoCResolveClient } from "./client/bootIoC4Client";
import { AuthData } from "./client/doLogin";
import { GameMessage } from "./types";

bootIoC4Client();
const init = async () => {
  const authData = await IoCResolveClient<Promise<AuthData>>("app.init")();
  await IoCResolveClient<Promise<void>>("connection.init")(authData);
  await IoCResolveClient<Promise<void>>("game.run")("SpaceBattle");

  setInterval(() => {
    IoCResolveClient("game.message")("SpaceBattle", {
      data: {
        cmdName: "CommandLog",
        payload: JSON.stringify({ test: "logTest" }),
      },
      type: "std",
    } as GameMessage);
  }, 1000);
};

init();
