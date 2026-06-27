import { z } from "zod";

export const pilotLeadSchema = z.object({
  schoolName: z.string().min(2, "Please enter your school name."),
  contactName: z.string().min(2, "Please enter a contact name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  city: z.string().optional(),
  schoolType: z.enum(["established_ib", "transforming"]).optional(),
  message: z.string().optional(),
});

export type PilotLeadValues = z.infer<typeof pilotLeadSchema>;
