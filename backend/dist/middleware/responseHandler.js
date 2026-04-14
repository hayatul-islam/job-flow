"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseHandler = (req, res, next) => {
    res.respond = (status, success, message, data = null) => {
        res.status(status).json({
            status,
            success,
            message,
            data,
        });
    };
    next();
};
exports.default = responseHandler;
