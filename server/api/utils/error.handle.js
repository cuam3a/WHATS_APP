"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (res, error, errorRaw) => {
    var _a, _b;
    console.log((_a = errorRaw === null || errorRaw === void 0 ? void 0 : errorRaw.message) !== null && _a !== void 0 ? _a : "");
    const response = {
        status: error == "SESSION_NO_VALIDA" ? 401 : 500,
        error: error,
        errorDetail: (_b = errorRaw === null || errorRaw === void 0 ? void 0 : errorRaw.message) !== null && _b !== void 0 ? _b : ""
    };
    res.send(response);
};
exports.handleError = handleError;
