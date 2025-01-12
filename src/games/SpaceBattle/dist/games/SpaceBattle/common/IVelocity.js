"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VelocityVec = exports.Velocity2D = void 0;
var utils_1 = require("../../../gameCore/utils");
var IVector_1 = require("./IVector");
var Velocity2D = /** @class */ (function () {
    function Velocity2D(mod, deg) {
        this.velocityMod = mod;
        this.angleDeg = deg;
    }
    Velocity2D.prototype.getVelocityVector = function () {
        return new IVector_1.Vector2([
            this.velocityMod * Math.cos((0, utils_1.degrees2Radians)(this.angleDeg)),
            this.velocityMod * Math.sin((0, utils_1.degrees2Radians)(this.angleDeg)),
        ]);
    };
    return Velocity2D;
}());
exports.Velocity2D = Velocity2D;
var VelocityVec = /** @class */ (function () {
    function VelocityVec(_velocity) {
        this.velocity = _velocity;
    }
    VelocityVec.prototype.getVelocityVector = function () {
        return this.velocity;
    };
    return VelocityVec;
}());
exports.VelocityVec = VelocityVec;
