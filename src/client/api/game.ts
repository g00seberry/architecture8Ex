import axios from "axios";
import { GameMessage } from "../../types";
import { AuthData, GameAuthInfo } from "./types";

export const runGame = async (id: string) => {
  const res = await axios.post(`http://localhost:3000/game/${id}/run`);
  return res;
};

export const signUpInGame = async (data: GameAuthInfo) => {
  const res = await axios.post<AuthData>(
    `http://localhost:3000/game/${data.gId}/sign-up`,
    data
  );
  return res.data;
};

export const authInGame = async (data: GameAuthInfo) => {
  const res = await axios.post<AuthData>(
    `http://localhost:3000/game/${data.gId}/login`,
    data
  );
  return res.data;
};

export const sendMessage2Game = async (id: string, data: GameMessage) => {
  const res = await axios.post(
    `http://localhost:3000/game/${id}/message`,
    data
  );
  return res;
};
