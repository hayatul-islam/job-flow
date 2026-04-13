import { JobType } from "@prisma/client";
import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  salary: z.string().min(1, "Salary is required"),
  jobType: z.nativeEnum(JobType),
  categoryId: z.number(),
});

export const updateJobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .optional(),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .optional(),
  salary: z.string().min(1, "Salary is required").optional(),
  jobType: z.nativeEnum(JobType).optional(),
  categoryId: z.number().optional(),
});
