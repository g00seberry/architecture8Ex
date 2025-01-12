"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandLog = exports.SimpleLogger = void 0;
var SimpleLogger = /** @class */ (function () {
    function SimpleLogger() {
        this.logReg = [];
    }
    SimpleLogger.prototype.log = function (data) {
        var strData = JSON.stringify(data);
        this.logReg.push(strData);
        console.log("SimpleLogger:", strData);
    };
    return SimpleLogger;
}());
exports.SimpleLogger = SimpleLogger;
var CommandLog = /** @class */ (function () {
    function CommandLog(logger) {
        this.logger = logger;
    }
    CommandLog.prototype.log = function (data) {
        this.data = data;
        return this;
    };
    CommandLog.prototype.execute = function () {
        this.logger.log(this.data);
    };
    return CommandLog;
}());
exports.CommandLog = CommandLog;
