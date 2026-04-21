"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseHandler = (req, res, next) => {
    res.respond = (status, success, message, data = null, pagination) => {
        const response = {
            status,
            success,
            message,
            data,
        };
        if (pagination) {
            response.pagination = pagination;
        }
        res.status(status).json(response);
    };
    next();
};
exports.default = responseHandler;
