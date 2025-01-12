"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdapteeEntityWithId = void 0;
var AdapteeEntityWithId = /** @class */ (function () {
    function AdapteeEntityWithId(e) {
        this.e = e;
    }
    AdapteeEntityWithId.prototype.getId = function () {
        if (typeof this.e !== "object" ||
            !("id" in this.e) ||
            this.e.id !== "string")
            return undefined;
        return this.e.id;
    };
    return AdapteeEntityWithId;
}());
exports.AdapteeEntityWithId = AdapteeEntityWithId;
