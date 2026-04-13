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
    const categories = await prisma.category.findMany();
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

export default router;
