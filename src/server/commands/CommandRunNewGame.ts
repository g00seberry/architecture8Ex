import path from "path";
import { ICommand } from "../../common/ICommand";
import { Worker } from "worker_threads";
import { getThreadContainer } from "../ThreadContainer";
import { IoCResolveServer } from "../bootIoC4Server";
import { IContainer } from "../../IoC/types";
import { GameInfo } from "../games/GamesRepo";
import { CommandServerConnectionSend } from "./CommandServerConnectionSend";

export class CommandRunNewGame implements ICommand {
  constructor(readonly gameId: string) {}
  worker: Worker | null = null;
  async execute() {
    return new Promise((res, rej) => {
      try {
        const gamesRepo =
          IoCResolveServer<IContainer<GameInfo>>("gamesRepo.get")();
        const gameInfo = gamesRepo.get(this.gameId);
        const { id, src, status } = gameInfo;
        // значит, что игра уже запущена
        if (status !== "stop") {
          res(true);
        } else {
          const workerPath = path.resolve(__dirname, `../../${src}`);
          this.worker = new Worker(workerPath, {
            workerData: { threadId: id },
          });
          const threadReg = getThreadContainer();
          threadReg.add(this.gameId, this.worker);
          this.worker.addListener("message", (msg) => {
            // управляющее сообщение, что поток запущен
            if (msg === "inited") {
              res(true);
              return;
            }
            new CommandServerConnectionSend(msg).execute();
          });
        }
      } catch (error) {
        rej(error);
      }
    });
  }
}
