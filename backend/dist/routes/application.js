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
const validate_1 = __importDefault(require("../middleware/validate"));
const applicationValidator_1 = require("../validators/applicationValidator");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.post("/:jobId", authenticate_1.default, upload_1.uploadCV.single("cv"), (0, asyncHandler_1.default)(async (req, res, next) => {
    if (req.userRole !== "JOB_SEEKER") {
        return next(new AppError_1.default("Only job seekers can apply", 403));
    }
    if (!req.file) {
        return next(new AppError_1.default("CV is required", 400));
    }
    const jobId = +req.params.jobId;
    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
        return next(new AppError_1.default("Job not found", 404));
    }
    const existingApplication = await prisma.application.findFirst({
        where: { jobId, userId: req.userId },
    });
    if (existingApplication) {
        return next(new AppError_1.default("You have already applied for this job", 400));
    }
    const cvUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary_1.default.uploader.upload_stream({ folder: "jobflow/cvs" }, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result.secure_url);
        });
        stream.end(req.file.buffer);
    });
    const application = await prisma.application.create({
        data: {
            jobId,
            userId: req.userId,
            cvUrl,
        },
    });
    res.respond(201, true, "Application submitted successfully", application);
}));
router.get("/my", authenticate_1.default, (0, asyncHandler_1.default)(async (req, res, next) => {
    if (req.userRole !== "JOB_SEEKER") {
        return next(new AppError_1.default("Only job seekers can view applications", 403));
    }
    const applications = await prisma.application.findMany({
        where: { userId: req.userId },
        include: {
            job: {
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
            },
        },
    });
    res.respond(200, true, "Applications fetched successfully", applications);
}));
router.get("/job/:jobId", authenticate_1.default, (0, asyncHandler_1.default)(async (req, res, next) => {
    if (req.userRole !== "EMPLOYER") {
        return next(new AppError_1.default("Only employers can view job applications", 403));
    }
    const jobId = +req.params.jobId;
    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
        return next(new AppError_1.default("Job not found", 404));
    }
    if (job.employerId !== req.userId) {
        return next(new AppError_1.default("You are not authorized to view these applications", 403));
    }
    const applications = await prisma.application.findMany({
        where: { jobId },
        include: {
            user: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            },
        },
    });
    res.respond(200, true, "Applications fetched successfully", applications);
}));
router.put("/:id/status", authenticate_1.default, (0, validate_1.default)(applicationValidator_1.updateApplicationSchema), (0, asyncHandler_1.default)(async (req, res, next) => {
    if (req.userRole !== "EMPLOYER") {
        return next(new AppError_1.default("Only employers can update application status", 403));
    }
    const id = +req.params.id;
    const { status } = req.body;
    const application = await prisma.application.findUnique({
        where: { id },
        include: { job: true },
    });
    if (!application) {
        return next(new AppError_1.default("Application not found", 404));
    }
    if (application.job.employerId !== req.userId) {
        return next(new AppError_1.default("You are not authorized to update this application", 403));
    }
    const updated = await prisma.application.update({
        where: { id },
        data: { status },
    });
    res.respond(200, true, "Application status updated successfully", updated);
}));
exports.default = router;
