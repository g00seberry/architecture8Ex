"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trySomeTimesAndLog = exports.enqueueRepeatOnFail = exports.enqueueLogOnFail = void 0;
var CommandLog_1 = require("./CommandLog");
var CommandRepeat_1 = require("./CommandRepeat");
// 5.Реализовать обработчик исключения, который ставит Команду, пишущую в лог в очередь Команд.
var enqueueLogOnFail = function (core) {
    return function (ctx) {
        var cmdQueue = core.config.cmdQueue;
        cmdQueue.enqueue(new CommandLog_1.CommandLog(new CommandLog_1.SimpleLogger()).log(ctx));
    };
};
exports.enqueueLogOnFail = enqueueLogOnFail;
// Реализовать обработчик исключения, который ставит в очередь Команду - повторитель команды, выбросившей исключение.
var enqueueRepeatOnFail = function (core) {
    return function (ctx) {
        var cmdQueue = core.config.cmdQueue;
        cmdQueue.enqueue(new CommandRepeat_1.CommandRepeat().repeat(ctx.cmd, core));
    };
};
exports.enqueueRepeatOnFail = enqueueRepeatOnFail;
/**
 * 8.С помощью Команд из пункта 4 и пункта 6 реализовать следующую обработку исключений:
 * при первом выбросе исключения повторить команду, при повторном выбросе исключения записать информацию в лог.
 * 9.Реализовать стратегию обработки исключения - повторить два раза, потом записать в лог.
 */
var trySomeTimesAndLog = function (core, times) {
    var counter = 0;
    return function (ctx) {
        if (counter < times) {
            (0, exports.enqueueRepeatOnFail)(core)(ctx);
        }
        else if (counter === times) {
            (0, exports.enqueueLogOnFail)(core)(ctx);
        }
        counter++;
    };
};
exports.trySomeTimesAndLog = trySomeTimesAndLog;
