"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const AppError_1 = __importDefault(require("../middleware/AppError"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const authenticate_1 = __importDefault(require("../middleware/authenticate"));
const upload_1 = require("../middleware/upload");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get("/", authenticate_1.default, (0, asyncHandler_1.default)(async (req, res, next) => {
    const user = await prisma.user.findUnique({
        where: { id: req.userId },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            avatar: true,
            createdAt: true,
        },
    });
    if (!user) {
        return next(new AppError_1.default("User not found", 404));
    }
    res.respond(200, true, "Profile fetched successfully", user);
}));
router.put("/", authenticate_1.default, upload_1.uploadImage.single("avatar"), (0, asyncHandler_1.default)(async (req, res, next) => {
    const { firstName, lastName } = req.body;
    let avatarUrl;
    if (req.file) {
        avatarUrl = await new Promise((resolve, reject) => {
            const stream = cloudinary_1.default.uploader.upload_stream({ folder: "jobflow/avatars" }, (error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result.secure_url);
            });
            stream.end(req.file.buffer);
        });
    }
    const user = await prisma.user.update({
        where: { id: req.userId },
        data: {
            firstName,
            lastName,
            ...(avatarUrl && { avatar: avatarUrl }),
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            avatar: true,
        },
    });
    res.respond(200, true, "Profile updated successfully", user);
}));
router.put("/avatar", authenticate_1.default, upload_1.uploadImage.single("avatar"), (0, asyncHandler_1.default)(async (req, res, next) => {
    if (!req.file) {
        return next(new AppError_1.default("Image is required", 400));
    }
    const avatarUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary_1.default.uploader.upload_stream({ folder: "jobflow/avatars" }, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result.secure_url);
        });
        stream.end(req.file.buffer);
    });
    const user = await prisma.user.update({
        where: { id: req.userId },
        data: { avatar: avatarUrl },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            avatar: true,
        },
    });
    res.respond(200, true, "Avatar updated successfully", user);
}));
exports.default = router;
