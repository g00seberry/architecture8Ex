"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MacroCommand = void 0;
var MacroCommand = /** @class */ (function () {
    function MacroCommand() {
        this.commands = [];
    }
    MacroCommand.prototype.bind = function (commands) {
        this.commands = commands;
    };
    MacroCommand.prototype.execute = function () {
        this.commands.forEach(function (cmd) { return cmd.execute(); });
    };
    return MacroCommand;
}());
exports.MacroCommand = MacroCommand;
