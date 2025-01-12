"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandPush2CmdQueue = void 0;
var CommandQueue_1 = require("../CommandQueue");
var CommandPush2CmdQueue = /** @class */ (function () {
    function CommandPush2CmdQueue(cmd) {
        this.cmd = cmd;
    }
    CommandPush2CmdQueue.prototype.execute = function () {
        var q = (0, CommandQueue_1.getCommandQueue)();
        q.enqueue(this.cmd);
    };
    return CommandPush2CmdQueue;
}());
exports.CommandPush2CmdQueue = CommandPush2CmdQueue;
