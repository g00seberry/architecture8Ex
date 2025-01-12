"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommandQueue = exports.CommandQueue = void 0;
var CommandQueue = /** @class */ (function () {
    function CommandQueue() {
        this.list = [];
    }
    CommandQueue.prototype.enqueue = function (item) {
        this.list.push(item);
    };
    CommandQueue.prototype.dequeue = function () {
        return this.list.shift();
    };
    CommandQueue.prototype.isEmpty = function () {
        return this.list.length === 0;
    };
    return CommandQueue;
}());
exports.CommandQueue = CommandQueue;
// только одна очередь команд на игру
var cmdQueue = new CommandQueue();
var getCommandQueue = function () { return cmdQueue; };
exports.getCommandQueue = getCommandQueue;
