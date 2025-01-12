import { getCommandQueue } from "../../../gameCore/CommandQueue";
import { CoreCmd, getCoreCmd } from "../../../gameCore/CoreCmd";
import { getEntityRegister } from "../../../gameCore/Entity";
import { getExceptionHadlerCmd } from "../../../gameCore/ExceptionHandlerCmd";
import { makeExceptionHadlerContextCmd } from "../../../gameCore/ExceptionHandlerCmd/ExceptionHandlerCmd";

export const gameLoopStep = (core: CoreCmd) => {
  const { cmdExceptionHandler, cmdQueue } = core.config;
  const cmd = cmdQueue.dequeue();
  try {
    cmd.execute();
  } catch (error) {
    cmdExceptionHandler.handle(makeExceptionHadlerContextCmd(cmd, error));
  }
};

export const getInitedCore = async () => {
  const core = getCoreCmd();
  await core.init({
    cmdQueue: getCommandQueue(),
    cmdExceptionHandler: getExceptionHadlerCmd(),
    entityRegister: getEntityRegister(),
  });
  return core;
};
