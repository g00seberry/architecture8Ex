"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionHandlerCmd = exports.makeExceptionHadlerContextCmd = exports.ExceptionHandlerContextCmd = void 0;
var ExceptionHandlerContextCmd = /** @class */ (function () {
    function ExceptionHandlerContextCmd(newCmd, newErr) {
        this.cmd = newCmd;
        this.err = newErr;
    }
    return ExceptionHandlerContextCmd;
}());
exports.ExceptionHandlerContextCmd = ExceptionHandlerContextCmd;
var makeExceptionHadlerContextCmd = function (newCmd, newErr) { return new ExceptionHandlerContextCmd(newCmd, newErr); };
exports.makeExceptionHadlerContextCmd = makeExceptionHadlerContextCmd;
var ExceptionHandlerCmd = /** @class */ (function () {
    function ExceptionHandlerCmd() {
        // пока что пусть будет один обработчик на исключение
        this.handlers = new Map();
    }
    ExceptionHandlerCmd.prototype.handle = function (ctx) {
        var key = ctx.err.key;
        var handler = this.handlers.get(key);
        // должно быть исклчение или дефолтная обработка ?
        handler === null || handler === void 0 ? void 0 : handler(ctx);
    };
    ExceptionHandlerCmd.prototype.register = function (key, cb) {
        // тут нужны проверки
        this.handlers.set(key, cb);
    };
    return ExceptionHandlerCmd;
}());
exports.ExceptionHandlerCmd = ExceptionHandlerCmd;
