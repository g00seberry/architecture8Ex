import axios from "axios";
import { GameMessage } from "../../types";

export type GameInfo = {
  gId: string;
};

export const runGame = async (id: string) => {
  const res = await axios.post(`http://localhost:3000/game/${id}/run`);
  return res;
};
export const sendMessage2Game = async (id: string, data: GameMessage) => {
  const res = await axios.post(
    `http://localhost:3000/game/${id}/message`,
    data
  );
  return res;
};
