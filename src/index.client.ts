import { bootIoC4Client, IoCResolveClient } from "./client/bootIoC4Client";

import { GameMessage } from "./types";

bootIoC4Client();
const init = async () => {
  await IoCResolveClient<Promise<void>>("game.auth")({
    gId: "SpaceBattle",
    login: "test",
    pass: "123",
  });
  await IoCResolveClient<Promise<void>>("connection.init")();
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
