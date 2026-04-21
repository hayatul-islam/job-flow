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

export const createJobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  salary: z.string().min(1, "Salary is required"),
  jobType: z.enum(["FULL_TIME", "PART_TIME", "REMOTE", "HYBRID", "INTERNSHIP"]),
  categoryId: z.number(),
});

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string(),
});

export type ProfileForm = z.infer<typeof profileSchema>;

export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
export type CreateJobForm = z.infer<typeof createJobSchema>;
