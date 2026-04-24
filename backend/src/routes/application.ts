import { PrismaClient } from "@prisma/client";
import { v2 as cloud } from "cloudinary";
import express from "express";
import cloudinary from "../config/cloudinary";
import { getPagination, getPaginationMeta } from "../lib/pagination";
import AppError from "../middleware/AppError";
import asyncHandler from "../middleware/asyncHandler";
import authenticate from "../middleware/authenticate";
import { uploadCV } from "../middleware/upload";
import validate from "../middleware/validate";
import { updateApplicationSchema } from "../validators/applicationValidator";

const router = express.Router();
const prisma = new PrismaClient();

router.post(
  "/:jobId",
  authenticate,
  uploadCV.single("cv"),
  asyncHandler(async (req: any, res, next) => {
    if (req.userRole !== "JOB_SEEKER") {
      return next(new AppError("Only job seekers can apply", 403));
    }

    if (!req.file) {
      return next(new AppError("CV is required", 400));
    }

    const jobId = +req.params.jobId;

    const job = await prisma.job.findUnique({ where: { id: jobId } });

    if (!job) {
      return next(new AppError("Job not found", 404));
    }

    const existingApplication = await prisma.application.findFirst({
      where: { jobId, userId: req.userId },
    });

    if (existingApplication) {
      return next(new AppError("You have already applied for this job", 400));
    }

    const cvUrl = await new Promise<string>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "jobflow/cvs", resource_type: "raw" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result!.secure_url);
        },
      );
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
  }),
);

router.get(
  "/my",
  authenticate,
  asyncHandler(async (req: any, res, next) => {
    if (req.userRole !== "JOB_SEEKER") {
      return next(new AppError("Only job seekers can view applications", 403));
    }

    const { page, limit } = req.query;
    const { currentPage, pageSize, skip } = getPagination(page, limit);

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

    const pagination = getPaginationMeta(total, currentPage, pageSize);

    res.respond(
      200,
      true,
      "Applications fetched successfully",
      applications,
      pagination,
    );
  }),
);

router.get(
  "/job/:jobId",
  authenticate,
  asyncHandler(async (req: any, res, next) => {
    if (req.userRole !== "EMPLOYER") {
      return next(
        new AppError("Only employers can view job applications", 403),
      );
    }

    const jobId = +req.params.jobId;
    const { page, limit } = req.query;
    const { currentPage, pageSize, skip } = getPagination(page, limit);

    const job = await prisma.job.findUnique({ where: { id: jobId } });

    if (!job) {
      return next(new AppError("Job not found", 404));
    }

    if (job.employerId !== req.userId) {
      return next(
        new AppError("You are not authorized to view these applications", 403),
      );
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

    const pagination = getPaginationMeta(total, currentPage, pageSize);

    res.respond(
      200,
      true,
      "Applications fetched successfully",
      applications,
      pagination,
    );
  }),
);

router.put(
  "/:id/status",
  authenticate,
  validate(updateApplicationSchema),
  asyncHandler(async (req: any, res, next) => {
    if (req.userRole !== "EMPLOYER") {
      return next(
        new AppError("Only employers can update application status", 403),
      );
    }

    const id = +req.params.id;
    const { status } = req.body;

    const application = await prisma.application.findUnique({
      where: { id },
      include: { job: true },
    });

    if (!application) {
      return next(new AppError("Application not found", 404));
    }

    if (application.job.employerId !== req.userId) {
      return next(
        new AppError("You are not authorized to update this application", 403),
      );
    }

    const updated = await prisma.application.update({
      where: { id },
      data: { status },
    });

    res.respond(200, true, "Application status updated successfully", updated);
  }),
);

router.get(
  "/:id/cv",
  authenticate,
  asyncHandler(async (req: any, res, next) => {
    const id = +req.params.id;

    const application = await prisma.application.findUnique({
      where: { id },
      include: { job: true },
    });

    if (!application) {
      return next(new AppError("Application not found", 404));
    }

    if (
      req.userRole === "EMPLOYER" &&
      application.job.employerId !== req.userId
    ) {
      return next(
        new AppError("You are not authorized to download this CV", 403),
      );
    }

    if (req.userRole === "JOB_SEEKER" && application.userId !== req.userId) {
      return next(
        new AppError("You are not authorized to download this CV", 403),
      );
    }
    const urlParts = application.cvUrl.split("/");
    const resourceType = urlParts.includes("image") ? "image" : "raw";
    const uploadIndex = urlParts.indexOf("upload");
    const afterUpload = urlParts.slice(uploadIndex + 1);
    const publicIdParts = afterUpload[0]?.startsWith("v")
      ? afterUpload.slice(1)
      : afterUpload;
    const publicId = publicIdParts.join("/");

    const signedUrl = cloud.url(publicId, {
      resource_type: resourceType,
      type: "upload",
      sign_url: true,
      expires_at: Math.floor(Date.now() / 1000) + 300,
    });

    const response = await fetch(signedUrl);

    if (!response.ok) {
      return next(
        new AppError(
          `Failed to fetch CV: ${response.status} ${response.statusText}`,
          500,
        ),
      );
    }

    const fileName = `cv-${application.userId}-${application.id}.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    const { Readable } = await import("stream");
    const readable = Readable.fromWeb(response.body as any);
    readable.pipe(res);
  }),
);

export default router;
