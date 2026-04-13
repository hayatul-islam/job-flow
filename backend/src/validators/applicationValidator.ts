import { ApplicationStatus } from "@prisma/client";
import { z } from "zod";

export const updateApplicationSchema = z.object({
  status: z.nativeEnum(ApplicationStatus),
});
