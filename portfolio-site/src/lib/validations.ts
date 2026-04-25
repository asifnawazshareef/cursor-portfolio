import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must have at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  subject: z.string().min(5, "Subject is too short"),
  message: z
    .string()
    .min(20, "Message should be at least 20 characters")
    .max(1200, "Message is too long"),
});

export type ContactPayload = z.infer<typeof contactSchema>;
