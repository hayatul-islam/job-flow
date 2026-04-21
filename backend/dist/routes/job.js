"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const pagination_1 = require("../lib/pagination");
const AppError_1 = __importDefault(require("../middleware/AppError"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const authenticate_1 = __importDefault(require("../middleware/authenticate"));
const validate_1 = __importDefault(require("../middleware/validate"));
const jobValidator_1 = require("../validators/jobValidator");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get("/", (0, asyncHandler_1.default)(async (req, res) => {
    const { q, location, jobType, catId, page, limit } = req.query;
    const { currentPage, pageSize, skip } = (0, pagination_1.getPagination)(page, limit);
    const locations = location
        ? location.split(",").map((l) => l
            .trim()
            .toLowerCase()
            .replace(/\b\w/g, (c) => c.toUpperCase()))
        : [];
    const jobTypes = jobType ? jobType.split(",") : [];
    const filters = [];
    if (q) {
        filters.push({
            OR: [
                { title: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
            ],
        });
    }
    if (locations.length) {
        filters.push({ location: { in: locations } });
    }
    if (jobTypes.length) {
        filters.push({ jobType: { in: jobTypes } });
    }
    if (catId) {
        filters.push({ categoryId: Number(catId) });
    }
    const where = { AND: filters };
    const [total, jobs] = await prisma.$transaction([
        prisma.job.count({ where }),
        prisma.job.findMany({
            where,
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
            orderBy: { createdAt: "desc" },
            skip,
            take: pageSize,
        }),
    ]);
    const pagination = (0, pagination_1.getPaginationMeta)(total, currentPage, pageSize);
    res.respond(200, true, "Jobs fetched successfully", jobs, pagination);
}));
router.get("/my-jobs", authenticate_1.default, (0, asyncHandler_1.default)(async (req, res, next) => {
    if (req.userRole !== "EMPLOYER") {
        return next(new AppError_1.default("Only employers can view their jobs", 403));
    }
    const { page, limit } = req.query;
    const { currentPage, pageSize, skip } = (0, pagination_1.getPagination)(page, limit);
    const where = { employerId: req.userId };
    const [total, jobs] = await prisma.$transaction([
        prisma.job.count({ where }),
        prisma.job.findMany({
            where,
            include: {
                category: true,
                _count: {
                    select: { applications: true },
                },
            },
            orderBy: { createdAt: "desc" },
            skip,
            take: pageSize,
        }),
    ]);
    const pagination = (0, pagination_1.getPaginationMeta)(total, currentPage, pageSize);
    res.respond(200, true, "Jobs fetched successfully", jobs, pagination);
}));
router.get("/:id", (0, asyncHandler_1.default)(async (req, res, next) => {
    const id = +req.params.id;
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
    let isApplied = false;
    const token = req.headers.authorization;
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const application = await prisma.application.findFirst({
                where: {
                    jobId: id,
                    userId: decoded.userId,
                },
            });
            isApplied = !!application;
        }
        catch {
            isApplied = false;
        }
    }
    res.respond(200, true, "Job fetched successfully", {
        ...job,
        isApplied,
    });
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
