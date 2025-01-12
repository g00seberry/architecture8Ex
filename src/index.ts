import { CommandIoCBootstrap } from "./IoC/IoC";
import { IoCDependencyContainer } from "./IoC/IoCDependencyContainer";
import { IoCResolveStrategyStd } from "./IoC/IoCResolveStrategyStd";
import { IoCScopeTreeContainer } from "./IoC/IoCScopeTreeContainer";
import { bootIoC4Server, IoCResolveServer } from "./server/bootIoC4Server";

new CommandIoCBootstrap(
  new IoCScopeTreeContainer(new IoCDependencyContainer(), "root"),
  new IoCResolveStrategyStd()
).execute();

bootIoC4Server();

const init = async () => {
  try {
    IoCResolveServer("games.init")();
    await IoCResolveServer<Promise<void>>("gate.init")();
    await IoCResolveServer<Promise<void>>("rest.init")();
  } catch (error) {
    console.error(error);
  }
};

init();
