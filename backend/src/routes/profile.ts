import { PrismaClient } from "@prisma/client";
import express from "express";
import cloudinary from "../config/cloudinary";
import AppError from "../middleware/AppError";
import asyncHandler from "../middleware/asyncHandler";
import authenticate from "../middleware/authenticate";
import { uploadImage } from "../middleware/upload";

const router = express.Router();
const prisma = new PrismaClient();

router.get(
  "/",
  authenticate,
  asyncHandler(async (req: any, res, next) => {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        avatar: true,
        createdAt: true,
      },
    });

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.respond(200, true, "Profile fetched successfully", user);
  }),
);

router.put(
  "/",
  authenticate,
  uploadImage.single("avatar"),
  asyncHandler(async (req: any, res, next) => {
    const { firstName, lastName } = req.body;

    let avatarUrl;

    if (req.file) {
      avatarUrl = await new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "jobflow/avatars" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result!.secure_url);
          },
        );
        stream.end(req.file.buffer);
      });
    }

    const user = await prisma.user.update({
      where: { id: req.userId },
      data: {
        firstName,
        lastName,
        ...(avatarUrl && { avatar: avatarUrl }),
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        avatar: true,
      },
    });

    res.respond(200, true, "Profile updated successfully", user);
  }),
);

router.put(
  "/avatar",
  authenticate,
  uploadImage.single("avatar"),
  asyncHandler(async (req: any, res, next) => {
    if (!req.file) {
      return next(new AppError("Image is required", 400));
    }

    const avatarUrl = await new Promise<string>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "jobflow/avatars" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result!.secure_url);
        },
      );
      stream.end(req.file.buffer);
    });

    const user = await prisma.user.update({
      where: { id: req.userId },
      data: { avatar: avatarUrl },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        avatar: true,
      },
    });

    res.respond(200, true, "Avatar updated successfully", user);
  }),
);

export default router;
