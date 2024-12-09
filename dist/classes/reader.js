"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reader = void 0;
var Reader = /** @class */ (function () {
    function Reader(state) {
        this.transitionTo(state);
    }
    Reader.prototype.transitionTo = function (state) {
        this.state = state;
        this.state.setReader(this);
    };
    Reader.prototype.getRowNumberRequest = function () {
        var _a;
        (_a = this.state) === null || _a === void 0 ? void 0 : _a.getRowNumber();
    };
    Reader.prototype.getColumnNumberRequest = function () {
        var _a;
        (_a = this.state) === null || _a === void 0 ? void 0 : _a.getColumnNumber();
    };
    return Reader;
}());
exports.Reader = Reader;
