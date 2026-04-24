"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const cloudinary_1 = require("cloudinary");
const express_1 = __importDefault(require("express"));
const cloudinary_2 = __importDefault(require("../config/cloudinary"));
const pagination_1 = require("../lib/pagination");
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
        const stream = cloudinary_2.default.uploader.upload_stream({ folder: "jobflow/cvs", resource_type: "raw" }, (error, result) => {
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
    const { page, limit } = req.query;
    const { currentPage, pageSize, skip } = (0, pagination_1.getPagination)(page, limit);
    const where = { userId: req.userId };
    const [total, applications] = await prisma.$transaction([
        prisma.application.count({ where }),
        prisma.application.findMany({
            where,
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
            orderBy: { createdAt: "desc" },
            skip,
            take: pageSize,
        }),
    ]);
    const pagination = (0, pagination_1.getPaginationMeta)(total, currentPage, pageSize);
    res.respond(200, true, "Applications fetched successfully", applications, pagination);
}));
router.get("/job/:jobId", authenticate_1.default, (0, asyncHandler_1.default)(async (req, res, next) => {
    if (req.userRole !== "EMPLOYER") {
        return next(new AppError_1.default("Only employers can view job applications", 403));
    }
    const jobId = +req.params.jobId;
    const { page, limit } = req.query;
    const { currentPage, pageSize, skip } = (0, pagination_1.getPagination)(page, limit);
    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
        return next(new AppError_1.default("Job not found", 404));
    }
    if (job.employerId !== req.userId) {
        return next(new AppError_1.default("You are not authorized to view these applications", 403));
    }
    const where = { jobId };
    const [total, applications] = await prisma.$transaction([
        prisma.application.count({ where }),
        prisma.application.findMany({
            where,
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
            orderBy: { createdAt: "desc" },
            skip,
            take: pageSize,
        }),
    ]);
    const pagination = (0, pagination_1.getPaginationMeta)(total, currentPage, pageSize);
    res.respond(200, true, "Applications fetched successfully", applications, pagination);
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
router.get("/:id/cv", authenticate_1.default, (0, asyncHandler_1.default)(async (req, res, next) => {
    const id = +req.params.id;
    const application = await prisma.application.findUnique({
        where: { id },
        include: { job: true },
    });
    if (!application) {
        return next(new AppError_1.default("Application not found", 404));
    }
    if (req.userRole === "EMPLOYER" &&
        application.job.employerId !== req.userId) {
        return next(new AppError_1.default("You are not authorized to download this CV", 403));
    }
    if (req.userRole === "JOB_SEEKER" && application.userId !== req.userId) {
        return next(new AppError_1.default("You are not authorized to download this CV", 403));
    }
    const urlParts = application.cvUrl.split("/");
    const resourceType = urlParts.includes("image") ? "image" : "raw";
    const uploadIndex = urlParts.indexOf("upload");
    const afterUpload = urlParts.slice(uploadIndex + 1);
    const publicIdParts = afterUpload[0]?.startsWith("v")
        ? afterUpload.slice(1)
        : afterUpload;
    const publicId = publicIdParts.join("/");
    const signedUrl = cloudinary_1.v2.url(publicId, {
        resource_type: resourceType,
        type: "upload",
        sign_url: true,
        expires_at: Math.floor(Date.now() / 1000) + 300,
    });
    const response = await fetch(signedUrl);
    if (!response.ok) {
        return next(new AppError_1.default(`Failed to fetch CV: ${response.status} ${response.statusText}`, 500));
    }
    const fileName = `cv-${application.userId}-${application.id}.pdf`;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    const { Readable } = await Promise.resolve().then(() => __importStar(require("stream")));
    const readable = Readable.fromWeb(response.body);
    readable.pipe(res);
}));
exports.default = router;
