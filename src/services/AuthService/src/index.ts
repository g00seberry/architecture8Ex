import cookieParser from "cookie-parser";
import express, { Express } from "express";
import { router } from "./router";

const port = process.env.PORT || 5000;

const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/", router);

async function main() {
  app.listen(port, async () => {
    console.log("Server works!");
  });
}

main();
