"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("./AppError"));
const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return next(new AppError_1.default("Token is required", 401));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        req.userRole = decoded.role;
        next();
    }
    catch (err) {
        if (err.name === "TokenExpiredError") {
            return next(new AppError_1.default("Token expired, please refresh", 401));
        }
        return next(new AppError_1.default("Invalid token", 401));
    }
};
exports.default = authenticate;
