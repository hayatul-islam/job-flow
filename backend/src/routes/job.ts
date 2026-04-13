import { PrismaClient } from "@prisma/client";
import express from "express";
import AppError from "../middleware/AppError";
import asyncHandler from "../middleware/asyncHandler";
import authenticate from "../middleware/authenticate";
import validate from "../middleware/validate";
import { createJobSchema, updateJobSchema } from "../validators/jobValidator";

const router = express.Router();
const prisma = new PrismaClient();

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const jobs = await prisma.job.findMany({
      include: {
        category: true,
        employer: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });
    res.respond(200, true, "Jobs fetch successfully", jobs);
  }),
);

router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id as string);
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
      return next(new AppError("Job not found", 404));
    }

    res.respond(200, true, "Job fetched successfully", job);
  }),
);

router.post(
  "/",
  authenticate,
  validate(createJobSchema),
  asyncHandler(async (req: any, res, next) => {
    const { title, description, location, salary, jobType, categoryId } =
      req.body;

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
  }),
);

router.put(
  "/:id",
  authenticate,
  validate(updateJobSchema),
  asyncHandler(async (req: any, res, next) => {
    const id = parseInt(req.params.id as string);
    const job = await prisma.job.findUnique({ where: { id } });

    if (!job) {
      return next(new AppError("Job not found", 404));
    }
    if (job.employerId !== req.userId) {
      return next(
        new AppError("You are not authorized to update this job", 403),
      );
    }

    const updated = await prisma.job.update({ where: { id }, data: req.body });

    res.respond(200, true, "Job updated successfully", updated);
  }),
);

router.delete(
  "/:id",
  authenticate,
  asyncHandler(async (req: any, res, next) => {
    const id = parseInt(req.params.id as string);

    const job = await prisma.job.findUnique({ where: { id } });

    if (!job) {
      return next(new AppError("Job not found", 404));
    }

    if (job.employerId !== req.userId) {
      return next(
        new AppError("You are not authorized to delete this job", 403),
      );
    }

    await prisma.job.delete({ where: { id } });

    res.respond(200, true, "Job deleted successfully");
  }),
);

export default router;
