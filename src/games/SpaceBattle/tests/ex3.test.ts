import { ICommand } from "../../../common/ICommand";
import { CommandQueue } from "../../../gameCore/CommandQueue";
import {
  CommandLog,
  CommandRepeat,
  SimpleLogger,
  enqueueLogOnFail,
  enqueueRepeatOnFail,
  trySomeTimesAndLog,
} from "../../../gameCore/commands";
import {
  ExceptionCmdType,
  makeExceptionCmd,
  makeExceptionCmdKey,
} from "../../../gameCore/ExceptionHandlerCmd/ExceptionCmd";
import { makeExceptionHadlerContextCmd } from "../../../gameCore/ExceptionHandlerCmd/ExceptionHandlerCmd";
import { AdapteeGEMovable } from "../adapters/AdapteeGEMovable";
import { Vector2 } from "../common/IVector";
import { VelocityVec } from "../common/IVelocity";
import { gameLoopStep, getInitedCore } from "./common";

class CmdWithError implements ICommand {
  execute() {
    throw makeExceptionCmd("test", ExceptionCmdType["unconsistent data"], this);
  }
}

test("Реализовать Команду, которая записывает информацию о выброшенном исключении в лог.", () => {
  const logCmd = new CommandLog(new SimpleLogger());
  logCmd.log(1).execute();
  expect((logCmd.logger as SimpleLogger).logReg.length).toEqual(1);
});

test("Реализовать обработчик исключения, который ставит Команду, пишущую в лог в очередь Команд.", async () => {
  const core = await getInitedCore();
  const cmd = new CommandLog(new SimpleLogger());
  enqueueLogOnFail(core)(
    makeExceptionHadlerContextCmd(
      cmd,
      makeExceptionCmd("test", ExceptionCmdType["unconsistent data"], cmd)
    )
  );
  expect(core.config.cmdQueue.isEmpty()).toEqual(false);
});

test("Реализовать Команду, которая повторяет Команду, выбросившую исключение.", async () => {
  const core = await getInitedCore();
  while (core.config.cmdQueue.dequeue());
  const { cmdQueue, cmdExceptionHandler } = core.config;
  cmdExceptionHandler.register(
    makeExceptionCmdKey(
      CmdWithError.name,
      ExceptionCmdType["unconsistent data"]
    ),
    enqueueRepeatOnFail(core)
  );
  const cmdWithErr = new CmdWithError();
  cmdQueue.enqueue(cmdWithErr);

  gameLoopStep(core);
  expect(
    (cmdQueue as CommandQueue).list[0].constructor.name === CommandRepeat.name
  ).toEqual(true);
  gameLoopStep(core);
  expect(
    (cmdQueue as CommandQueue).list[0].constructor.name === CmdWithError.name
  ).toEqual(true);
});

test("Реализовать обработчик исключения, который ставит в очередь Команду - повторитель команды, выбросившей исключение.", async () => {
  const core = await getInitedCore();
  while (core.config.cmdQueue.dequeue());
  const cmd = new CommandLog(new SimpleLogger());
  enqueueRepeatOnFail(core)(
    makeExceptionHadlerContextCmd(
      cmd,
      makeExceptionCmd("test", ExceptionCmdType["unconsistent data"], cmd)
    )
  );
  expect(core.config.cmdQueue.isEmpty()).toEqual(false);
});

test("При первом выбросе исключения повторить команду, при повторном выбросе исключения записать информацию в лог.", async () => {
  const core = await getInitedCore();
  while (core.config.cmdQueue.dequeue());
  const { cmdQueue, entityRegister, cmdExceptionHandler } = core.config;
  cmdExceptionHandler.register(
    makeExceptionCmdKey(
      CmdWithError.name,
      ExceptionCmdType["unconsistent data"]
    ),
    trySomeTimesAndLog(core, 1)
  );
  const ent = new AdapteeGEMovable({
    location: new Vector2([12, 5]),
    velocity: new VelocityVec(new Vector2([-7, 3])),
  });
  entityRegister.registerEntity(ent);
  const cmdWithErr = new CmdWithError();
  cmdQueue.enqueue(cmdWithErr);
  gameLoopStep(core);
  expect(
    (cmdQueue as CommandQueue).list[0].constructor.name === CommandRepeat.name
  ).toEqual(true);
  gameLoopStep(core);
  expect(
    (cmdQueue as CommandQueue).list[0].constructor.name === CmdWithError.name
  ).toEqual(true);
  gameLoopStep(core);
  expect(
    (cmdQueue as CommandQueue).list[0].constructor.name === CommandLog.name
  ).toEqual(true);
  gameLoopStep(core);
  expect(cmdQueue.isEmpty()).toEqual(true);
});

test("Реализовать стратегию обработки исключения - повторить два раза, потом записать в лог.", async () => {
  const core = await getInitedCore();
  while (core.config.cmdQueue.dequeue());
  const { cmdQueue, cmdExceptionHandler } = core.config;
  cmdExceptionHandler.register(
    makeExceptionCmdKey(
      CmdWithError.name,
      ExceptionCmdType["unconsistent data"]
    ),
    trySomeTimesAndLog(core, 2)
  );
  const cmdWithErr = new CmdWithError();
  cmdQueue.enqueue(cmdWithErr);
  gameLoopStep(core);
  expect(
    (cmdQueue as CommandQueue).list[0].constructor.name === CommandRepeat.name
  ).toEqual(true);
  gameLoopStep(core);
  expect(
    (cmdQueue as CommandQueue).list[0].constructor.name === CmdWithError.name
  ).toEqual(true);
  gameLoopStep(core);
  expect(
    (cmdQueue as CommandQueue).list[0].constructor.name === CommandRepeat.name
  ).toEqual(true);
  gameLoopStep(core);
  expect(
    (cmdQueue as CommandQueue).list[0].constructor.name === CmdWithError.name
  ).toEqual(true);
  gameLoopStep(core);
  expect(
    (cmdQueue as CommandQueue).list[0].constructor.name === CommandLog.name
  ).toEqual(true);
  gameLoopStep(core);
  expect(cmdQueue.isEmpty()).toEqual(true);
});
