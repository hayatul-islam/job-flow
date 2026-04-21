import { PrismaClient } from "@prisma/client";
import express from "express";
import jwt from "jsonwebtoken";
import { getPagination, getPaginationMeta } from "../lib/pagination";
import AppError from "../middleware/AppError";
import asyncHandler from "../middleware/asyncHandler";
import authenticate from "../middleware/authenticate";
import validate from "../middleware/validate";
import { createJobSchema, updateJobSchema } from "../validators/jobValidator";

const router = express.Router();
const prisma = new PrismaClient();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { q, location, jobType, catId, page, limit } = req.query;
    const { currentPage, pageSize, skip } = getPagination(page, limit);

    const locations: string[] = location
      ? (location as string).split(",").map((l) =>
          l
            .trim()
            .toLowerCase()
            .replace(/\b\w/g, (c) => c.toUpperCase()),
        )
      : [];

    const jobTypes: string[] = jobType ? (jobType as string).split(",") : [];

    const filters: any[] = [];

    if (q) {
      filters.push({
        OR: [
          { title: { contains: q as string, mode: "insensitive" } },
          { description: { contains: q as string, mode: "insensitive" } },
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

    const pagination = getPaginationMeta(total, currentPage, pageSize);

    res.respond(200, true, "Jobs fetched successfully", jobs, pagination);
  }),
);

router.get(
  "/my-jobs",
  authenticate,
  asyncHandler(async (req: any, res, next) => {
    if (req.userRole !== "EMPLOYER") {
      return next(new AppError("Only employers can view their jobs", 403));
    }

    const { page, limit } = req.query;
    const { currentPage, pageSize, skip } = getPagination(page, limit);

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

    const pagination = getPaginationMeta(total, currentPage, pageSize);

    res.respond(200, true, "Jobs fetched successfully", jobs, pagination);
  }),
);

router.get(
  "/:id",
  asyncHandler(async (req: any, res, next) => {
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
      return next(new AppError("Job not found", 404));
    }

    let isApplied = false;
    const token = req.headers.authorization;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
          userId: number;
        };

        const application = await prisma.application.findFirst({
          where: {
            jobId: id,
            userId: decoded.userId,
          },
        });

        isApplied = !!application;
      } catch {
        isApplied = false;
      }
    }

    res.respond(200, true, "Job fetched successfully", {
      ...job,
      isApplied,
    });
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
