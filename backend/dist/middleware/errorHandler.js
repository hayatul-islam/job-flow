"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    res.respond(status, false, message);
};
exports.default = errorHandler;
