import { bootIoC4Client, IoCResolveClient } from "./client/bootIoC4Client";

bootIoC4Client();
const init = async () => {
  await IoCResolveClient<Promise<void>>("game.sign-up")({
    gId: "SpaceBattle",
    login: "test",
    pass: "123",
  });
  await IoCResolveClient<Promise<void>>("game.auth")({
    gId: "SpaceBattle",
    login: "test",
    pass: "123",
  });
  await IoCResolveClient<Promise<void>>("connection.init")();
  await IoCResolveClient<Promise<void>>("game.run")("SpaceBattle");
  await IoCResolveClient("game.battle.create")({
    gId: "SpaceBattle",
    login: "test",
    pass: "123",
  });
};

init();
