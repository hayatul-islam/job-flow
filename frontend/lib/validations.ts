import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .optional(),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6),
    role: z.enum(["EMPLOYER", "JOB_SEEKER"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string(),
});

export const createJobSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  salary: z
    .string()
    .min(1, "Salary is required")
    .regex(/^\d+$/, "Enter a valid number"),
  jobType: z.string().min(1, "Job type is required"),
  categoryId: z.string().min(1, "Category is required"),
});

export type JobForm = z.infer<typeof jobSchema>;
export type ProfileForm = z.infer<typeof profileSchema>;
export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
