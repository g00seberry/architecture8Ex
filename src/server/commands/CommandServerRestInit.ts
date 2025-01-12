import express, { Request, Response } from "express";
import { ICommand } from "../../common/ICommand";
import { IoCResolveServer } from "../bootIoC4Server";

export class CommandServerRestInit implements ICommand {
  execute() {
    const app = express();
    app.use(express.json());
    const port = process.env.PORT || 3000;
    app.post("/game/:id/run", async (req: Request, res: Response) => {
      try {
        const gId = req.params.id;
        await IoCResolveServer<Promise<void>>("game.run")(gId);
        res.json(true);
      } catch (error) {
        res.status(500).json(error);
      }
    });
    app.post("/game/:gameId/message", async (req: Request, res: Response) => {
      try {
        const { gameId } = req.params;
        await IoCResolveServer<Promise<void>>("thread.postMsg")(
          gameId,
          req.body
        );
        res.status(200);
      } catch (error) {
        res.status(500).json(error);
      }
    });
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  }
}
