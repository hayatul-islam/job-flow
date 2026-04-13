import { PrismaClient } from "@prisma/client";
import express from "express";
import cloudinary from "../config/cloudinary";
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
        { folder: "jobflow/cvs" },
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

    const job = await prisma.job.findUnique({ where: { id: jobId } });

    if (!job) {
      return next(new AppError("Job not found", 404));
    }

    if (job.employerId !== req.userId) {
      return next(
        new AppError("You are not authorized to view these applications", 403),
      );
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

export default router;
