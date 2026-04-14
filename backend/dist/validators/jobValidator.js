"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateJobSchema = exports.createJobSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.createJobSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, "Title must be at least 3 characters"),
    description: zod_1.z.string().min(10, "Description must be at least 10 characters"),
    location: zod_1.z.string().min(2, "Location must be at least 2 characters"),
    salary: zod_1.z.string().min(1, "Salary is required"),
    jobType: zod_1.z.nativeEnum(client_1.JobType),
    categoryId: zod_1.z.number(),
});
exports.updateJobSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, "Title must be at least 3 characters").optional(),
    description: zod_1.z
        .string()
        .min(10, "Description must be at least 10 characters")
        .optional(),
    location: zod_1.z
        .string()
        .min(2, "Location must be at least 2 characters")
        .optional(),
    salary: zod_1.z.string().min(1, "Salary is required").optional(),
    jobType: zod_1.z.nativeEnum(client_1.JobType).optional(),
    categoryId: zod_1.z.number().optional(),
});
