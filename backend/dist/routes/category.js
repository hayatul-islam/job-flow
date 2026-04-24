"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const AppError_1 = __importDefault(require("../middleware/AppError"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const authenticate_1 = __importDefault(require("../middleware/authenticate"));
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get("/", (0, asyncHandler_1.default)(async (req, res) => {
    const categories = await prisma.category.findMany({
        include: {
            _count: {
                select: { jobs: true },
            },
        },
    });
    res.respond(200, true, "Categories fetched successfully", categories);
}));
router.post("/", authenticate_1.default, (0, asyncHandler_1.default)(async (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return next(new AppError_1.default("Name is required", 400));
    }
    const category = await prisma.category.create({
        data: { name },
    });
    res.respond(201, true, "Category created successfully", category);
}));
router.put("/:id", authenticate_1.default, (0, asyncHandler_1.default)(async (req, res, next) => {
    if (req.userRole !== "EMPLOYER") {
        return next(new AppError_1.default("Only employers can update categories", 403));
    }
    const id = +req.params.id;
    const cat = await prisma.category.findUnique({ where: { id } });
    if (!cat) {
        return next(new AppError_1.default("Category not found", 404));
    }
    const updated = await prisma.category.update({
        where: { id },
        data: req.body,
    });
    res.respond(200, true, "Category updated successfully", updated);
}));
exports.default = router;
