type MsgStd = {
  type: "std";
  data: {
    eId: string; // entity Id
    gId: string; // game Id
    cmdName: string; // command name
    payload: string; // some payload
  };
};

type MsgWithErr = {
  type: "error";
  data: {
    code: string;
    msg: string;
    payload: string; // some payload
  };
};

export type GameMessage = MsgStd | MsgWithErr;
