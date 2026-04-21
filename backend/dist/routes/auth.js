"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../middleware/AppError"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const validate_1 = __importDefault(require("../middleware/validate"));
const authValidator_1 = require("../validators/authValidator");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
const ACCESS_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
router.post("/register", (0, validate_1.default)(authValidator_1.registerSchema), (0, asyncHandler_1.default)(async (req, res, next) => {
    const { firstName, lastName, email, password, role } = req.body;
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        return next(new AppError_1.default("Email already exists", 400));
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const user = await prisma.user.create({
        data: { firstName, lastName, email, password: hashedPassword, role },
    });
    res.respond(201, true, "Register successfully", {
        id: user.id,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        role: user.role,
    });
}));
router.post("/login", (0, validate_1.default)(authValidator_1.loginSchema), (0, asyncHandler_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        return next(new AppError_1.default("Invalid credentials", 401));
    }
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        return next(new AppError_1.default("Invalid credentials", 401));
    }
    const accessToken = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, ACCESS_SECRET, { expiresIn: "3d" });
    const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, REFRESH_SECRET, { expiresIn: "7d" });
    await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
    });
    res.respond(200, true, "Login successfully", {
        accessToken,
        refreshToken,
    });
}));
router.post("/refresh", (0, asyncHandler_1.default)(async (req, res, next) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return next(new AppError_1.default("Refresh token is required", 400));
    }
    const decoded = jsonwebtoken_1.default.verify(refreshToken, REFRESH_SECRET);
    const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
    });
    if (!user || user.refreshToken !== refreshToken) {
        return next(new AppError_1.default("Invalid refresh token", 401));
    }
    const accessToken = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, ACCESS_SECRET, { expiresIn: "15m" });
    res.respond(200, true, "Token refreshed successfully", { accessToken });
}));
router.post("/logout", (0, asyncHandler_1.default)(async (req, res, next) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return next(new AppError_1.default("Refresh token is required", 400));
    }
    await prisma.user.updateMany({
        where: { refreshToken },
        data: { refreshToken: null },
    });
    res.respond(200, true, "Logout successfully");
}));
exports.default = router;
