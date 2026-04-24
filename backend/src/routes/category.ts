import { PrismaClient } from "@prisma/client";
import express from "express";
import AppError from "../middleware/AppError";
import asyncHandler from "../middleware/asyncHandler";
import authenticate from "../middleware/authenticate";

const router = express.Router();
const prisma = new PrismaClient();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { jobs: true },
        },
      },
    });
    res.respond(200, true, "Categories fetched successfully", categories);
  }),
);

router.post(
  "/",
  authenticate,
  asyncHandler(async (req: any, res, next) => {
    const { name } = req.body;

    if (!name) {
      return next(new AppError("Name is required", 400));
    }

    const category = await prisma.category.create({
      data: { name },
    });

    res.respond(201, true, "Category created successfully", category);
  }),
);

router.put(
  "/:id",
  authenticate,
  asyncHandler(async (req: any, res, next) => {
    if (req.userRole !== "EMPLOYER") {
      return next(new AppError("Only employers can update categories", 403));
    }

    const id = +req.params.id;

    const cat = await prisma.category.findUnique({ where: { id } });

    if (!cat) {
      return next(new AppError("Category not found", 404));
    }

    const updated = await prisma.category.update({
      where: { id },
      data: req.body,
    });

    res.respond(200, true, "Category updated successfully", updated);
  }),
);

export default router;
