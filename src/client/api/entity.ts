import { getConnectionWithServer } from "../createConnectionWithServer";

type TypeMsgStd = {
  eId: string;
  gId: string;
  cmdName: string;
  payload: string;
};

const makeMsgStd = (params: Partial<TypeMsgStd>) => ({
  type: "std",
  data: { ...params },
});

export const entityMove = (eId: string, gId: string) => {
  const conn = getConnectionWithServer();
  conn.send(
    JSON.stringify(
      makeMsgStd({
        eId,
        gId,
        cmdName: "CommandMoveLinear",
      })
    )
  );
};
