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
const validate_1 = __importDefault(require("../middleware/validate"));
const jobValidator_1 = require("../validators/jobValidator");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get("/", (0, asyncHandler_1.default)(async (req, res) => {
    const { q, location, jobType, categoryId } = req.query;
    const jobs = await prisma.job.findMany({
        where: {
            AND: [
                q
                    ? {
                        OR: [
                            {
                                title: { contains: q, mode: "insensitive" },
                            },
                            {
                                description: {
                                    contains: q,
                                    mode: "insensitive",
                                },
                            },
                        ],
                    }
                    : {},
                location
                    ? {
                        location: { contains: location, mode: "insensitive" },
                    }
                    : {},
                jobType ? { jobType: jobType } : {},
                categoryId ? { categoryId: +categoryId } : {},
            ],
        },
        include: {
            category: true,
            employer: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            },
        },
    });
    res.respond(200, true, "Jobs fetched successfully", jobs);
}));
router.get("/:id", (0, asyncHandler_1.default)(async (req, res, next) => {
    const id = parseInt(req.params.id);
    const job = await prisma.job.findUnique({
        where: { id },
        include: {
            category: true,
            employer: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            },
        },
    });
    if (!job) {
        return next(new AppError_1.default("Job not found", 404));
    }
    res.respond(200, true, "Job fetched successfully", job);
}));
router.post("/", authenticate_1.default, (0, validate_1.default)(jobValidator_1.createJobSchema), (0, asyncHandler_1.default)(async (req, res, next) => {
    const { title, description, location, salary, jobType, categoryId } = req.body;
    const job = await prisma.job.create({
        data: {
            title,
            description,
            location,
            salary,
            jobType,
            categoryId,
            employerId: req.userId,
        },
    });
    res.respond(201, true, "Job created successfully", job);
}));
router.put("/:id", authenticate_1.default, (0, validate_1.default)(jobValidator_1.updateJobSchema), (0, asyncHandler_1.default)(async (req, res, next) => {
    const id = parseInt(req.params.id);
    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
        return next(new AppError_1.default("Job not found", 404));
    }
    if (job.employerId !== req.userId) {
        return next(new AppError_1.default("You are not authorized to update this job", 403));
    }
    const updated = await prisma.job.update({ where: { id }, data: req.body });
    res.respond(200, true, "Job updated successfully", updated);
}));
router.delete("/:id", authenticate_1.default, (0, asyncHandler_1.default)(async (req, res, next) => {
    const id = parseInt(req.params.id);
    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
        return next(new AppError_1.default("Job not found", 404));
    }
    if (job.employerId !== req.userId) {
        return next(new AppError_1.default("You are not authorized to delete this job", 403));
    }
    await prisma.job.delete({ where: { id } });
    res.respond(200, true, "Job deleted successfully");
}));
exports.default = router;
