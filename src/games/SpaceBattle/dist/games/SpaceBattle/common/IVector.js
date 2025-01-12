"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector2 = void 0;
var Vector2 = /** @class */ (function () {
    function Vector2(data) {
        this.coords = data;
    }
    Vector2.prototype.add = function (b) {
        var _a = this.coords, x = _a[0], y = _a[1];
        var _b = b.coords, xInc = _b[0], yInc = _b[1];
        return new Vector2([x + xInc, y + yInc]);
    };
    Vector2.prototype.mod = function () {
        var _a = this.coords, x = _a[0], y = _a[1];
        return Math.sqrt(x * x + y * y);
    };
    Vector2.prototype.scal = function (b) {
        var _a = this.coords, x = _a[0], y = _a[1];
        var _b = b.coords, x2 = _b[0], y2 = _b[1];
        return x * x2 + y * y2;
    };
    return Vector2;
}());
exports.Vector2 = Vector2;
