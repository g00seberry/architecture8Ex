"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandRepeat = void 0;
var CommandRepeat = /** @class */ (function () {
    function CommandRepeat() {
        this.cmd = null;
        this.core = null;
    }
    CommandRepeat.prototype.repeat = function (cmd, core) {
        this.cmd = cmd;
        this.core = core;
        return this;
    };
    CommandRepeat.prototype.execute = function () {
        if (this.core && this.cmd)
            this.core.config.cmdQueue.enqueue(this.cmd);
    };
    return CommandRepeat;
}());
exports.CommandRepeat = CommandRepeat;
