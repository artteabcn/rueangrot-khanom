import { z } from "zod";

const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;

export const BookingSchema = z.object({
  name: z.string().trim().min(2, "validation.name").max(80),
  phone: z.string().trim().regex(phoneRegex, "validation.phone").max(20),
  email: z
    .string()
    .trim()
    .email("validation.email")
    .max(120)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  partySize: z.coerce.number().int().min(1, "validation.partySize").max(20, "validation.partySize"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "validation.date"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "validation.time"),
  notes: z
    .string()
    .trim()
    .max(500)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  locale: z.enum(["en", "fr", "th"]).default("en"),
  // honeypot — bots fill it, humans leave it empty
  website: z.string().max(0).optional(),
});

export type BookingInput = z.infer<typeof BookingSchema>;
