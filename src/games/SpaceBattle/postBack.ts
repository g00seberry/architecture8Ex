import { parentPort } from "worker_threads";

export const postBack = (data: unknown) => {
  parentPort.postMessage(data);
};
