import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import AppError from "../middleware/AppError";
import asyncHandler from "../middleware/asyncHandler";
import validate from "../middleware/validate";
import { loginSchema, registerSchema } from "../validators/authValidator";

const router = express.Router();
const prisma = new PrismaClient();

const ACCESS_SECRET = process.env.JWT_SECRET as string;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, password, role } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return next(new AppError("Email already exists", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { firstName, lastName, email, password: hashedPassword, role },
    });

    res.respond(201, true, "Register successfully", {
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      role: user.role,
    });
  }),
);

router.post(
  "/login",
  validate(loginSchema),
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return next(new AppError("Invalid credentials", 401));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new AppError("Invalid credentials", 401));
    }

    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      ACCESS_SECRET,
      { expiresIn: "3d" },
    );

    const refreshToken = jwt.sign(
      { userId: user.id, role: user.role },
      REFRESH_SECRET,
      { expiresIn: "7d" },
    );

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    res.respond(200, true, "Login successfully", {
      accessToken,
      refreshToken,
    });
  }),
);

router.post(
  "/refresh",
  asyncHandler(async (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return next(new AppError("Refresh token is required", 400));
    }

    const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as {
      userId: number;
      role: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user || user.refreshToken !== refreshToken) {
      return next(new AppError("Invalid refresh token", 401));
    }

    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      ACCESS_SECRET,
      { expiresIn: "15m" },
    );

    res.respond(200, true, "Token refreshed successfully", { accessToken });
  }),
);

router.post(
  "/logout",
  asyncHandler(async (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return next(new AppError("Refresh token is required", 400));
    }

    await prisma.user.updateMany({
      where: { refreshToken },
      data: { refreshToken: null },
    });

    res.respond(200, true, "Logout successfully");
  }),
);

export default router;
