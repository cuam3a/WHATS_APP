"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const error_handle_1 = require("../utils/error.handle");
const auth_service_1 = require("../services/auth.service");
const login = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, password } = body;
    try {
        const userToken = yield (0, auth_service_1.loginService)({ user, password });
        const response = {
            status: 200,
            token: userToken,
        };
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleError)(res, "ERROR LOGIN", e);
    }
});
exports.login = login;
