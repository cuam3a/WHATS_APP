"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const error_handle_1 = require("../utils/error.handle");
const jwt_handle_1 = require("../utils/jwt.handle");
const checkJwt = (req, res, next) => {
    try {
        const jwtByUser = "";
        const jwt = jwtByUser.split(" ").pop(); // 11111
        const jwtUser = (0, jwt_handle_1.verifyToken)(`${jwt}`);
        if (!jwtUser) {
            res.status(401);
            res.send("NO_TIENES_UN_JWT_VALIDO");
            res.end();
        }
        else {
            req.idUser = jwtUser;
            next();
        }
    }
    catch (e) {
        (0, error_handle_1.handleError)(res, "SESSION_NO_VALIDA", e.message);
    }
};
exports.checkJwt = checkJwt;
