"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdapteeGEMovable = void 0;
var cast = function (e) {
    if (!("location" in e) || !("velocity" in e))
        throw Error("unconsistent entity");
    return e;
};
var AdapteeGEMovable = /** @class */ (function () {
    function AdapteeGEMovable(entity) {
        this.entity = entity;
    }
    Object.defineProperty(AdapteeGEMovable.prototype, "location", {
        get: function () {
            return cast(this.entity).location;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AdapteeGEMovable.prototype, "velocity", {
        get: function () {
            return cast(this.entity).velocity;
        },
        enumerable: false,
        configurable: true
    });
    AdapteeGEMovable.prototype.setLocation = function (location) {
        cast(this.entity).location = location;
    };
    AdapteeGEMovable.prototype.setVelocity = function (velocity) {
        cast(this.entity).velocity = velocity;
    };
    return AdapteeGEMovable;
}());
exports.AdapteeGEMovable = AdapteeGEMovable;
