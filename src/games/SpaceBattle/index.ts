import { parentPort, workerData } from "node:worker_threads";
import {
  bootIoC4GameCore,
  IoCResolveGameCore,
} from "../../gameCore/bootIoC4GameCore";
import { CommandIoCBootstrap } from "../../IoC/IoC";
import { IoCDependencyContainer } from "../../IoC/IoCDependencyContainer";
import { IoCResolveStrategyStd } from "../../IoC/IoCResolveStrategyStd";
import { IoCScopeTreeContainer } from "../../IoC/IoCScopeTreeContainer";
import { ICommand } from "../../common/ICommand";

new CommandIoCBootstrap(
  new IoCScopeTreeContainer(new IoCDependencyContainer(), "root"),
  new IoCResolveStrategyStd()
).execute();

let { threadId } = workerData;

const postBack = (data: unknown) => {
  parentPort.postMessage(data);
};

bootIoC4GameCore();

IoCResolveGameCore<Promise<void>>("core.init")().then(() => {
  postBack("inited");
  IoCResolveGameCore("loop.start")();
  IoCResolveGameCore("loop.run")();
});

parentPort?.on("message", (msg: string) => {
  try {
    const cmd = IoCResolveGameCore<ICommand>("interpretCommand")(
      JSON.parse(msg)
    );
    if (cmd) IoCResolveGameCore("cmdQueue.push")(cmd);
  } catch (error) {
    console.error(error);
  }
});
