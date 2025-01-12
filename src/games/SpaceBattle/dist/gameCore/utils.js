"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.degrees2Radians = exports.correct = exports.isAbout = exports.isZero = exports.EPS = void 0;
exports.parseWSData = parseWSData;
exports.EPS = 10e-7;
var isZero = function (d, e) {
    if (e === void 0) { e = exports.EPS; }
    return d < Math.abs(e) && d > -Math.abs(e);
};
exports.isZero = isZero;
var isAbout = function (src, target, e) {
    if (e === void 0) { e = exports.EPS; }
    return src < target + Math.abs(e) && src > target - Math.abs(e);
};
exports.isAbout = isAbout;
var correct = function (x, e) {
    if (e === void 0) { e = exports.EPS; }
    return ((0, exports.isZero)(x, e) ? 0 : x);
};
exports.correct = correct;
var degrees2Radians = function (degrees) { return degrees * (Math.PI / 180); };
exports.degrees2Radians = degrees2Radians;
function parseWSData(data) {
    var jsonData = null;
    if (Buffer.isBuffer(data)) {
        var stringData = data.toString("utf-8");
        try {
            jsonData = JSON.parse(stringData);
        }
        catch (error) {
            console.error("Error parsing JSON:", error);
        }
    }
    else if (typeof data === "string") {
        try {
            jsonData = JSON.parse(data);
        }
        catch (error) {
            console.error("Error parsing JSON:", error);
        }
    }
    else {
        console.error("Unexpected data format received:", data);
    }
    return jsonData;
}
