"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeExceptionCmd = exports.makeExceptionCmdKey = exports.ExceptionCmd = exports.ExceptionCmdType = void 0;
var ExceptionCmdType;
(function (ExceptionCmdType) {
    ExceptionCmdType["unconsistent data"] = "unconsistent data";
    ExceptionCmdType["fuel is expended"] = "fuel is expended";
})(ExceptionCmdType || (exports.ExceptionCmdType = ExceptionCmdType = {}));
var ExceptionCmd = /** @class */ (function () {
    function ExceptionCmd(msg, type, key) {
        this.msg = msg;
        this.type = type;
        this.key = key;
    }
    return ExceptionCmd;
}());
exports.ExceptionCmd = ExceptionCmd;
var makeExceptionCmdKey = function (cmdName, errType) {
    return "".concat(cmdName, "_").concat(errType);
};
exports.makeExceptionCmdKey = makeExceptionCmdKey;
var makeExceptionCmd = function (msg, type, cmd) {
    return new ExceptionCmd(msg, type, (0, exports.makeExceptionCmdKey)(cmd.constructor.name, type));
};
exports.makeExceptionCmd = makeExceptionCmd;
