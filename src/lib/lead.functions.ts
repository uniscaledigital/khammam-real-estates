import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const RequirementSchema = z.object({
  name: z.string().min(1).max(120),
  phone: z.string().min(6).max(20),
  email: z.string().email().max(160).optional().or(z.literal("")),
  requirement_type: z.enum(["buy", "rent", "sell"]).default("buy"),
  budget: z.string().max(80).optional(),
  location: z.string().max(120).optional(),
  notes: z.string().max(2000).optional(),
});

const ContactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(160).optional().or(z.literal("")),
  phone: z.string().max(20).optional(),
  subject: z.string().max(160).optional(),
  message: z.string().min(1).max(4000),
});

export const submitRequirement = createServerFn({ method: "POST" })
  .validator((input: unknown) => RequirementSchema.parse(input))
  .handler(async ({ data }) => {
    const { mockRequirements } = await import("@/lib/mock-data");
    mockRequirements.push({
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      requirement_type: data.requirement_type,
      budget: data.budget || null,
      location: data.location || null,
      notes: data.notes || null,
      created_at: new Date().toISOString(),
    });
    return { ok: true };
  });

export const submitContact = createServerFn({ method: "POST" })
  .validator((input: unknown) => ContactSchema.parse(input))
  .handler(async ({ data }) => {
    const { mockContactMessages } = await import("@/lib/mock-data");
    mockContactMessages.push({
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      email: data.email || null,
      phone: data.phone || null,
      subject: data.subject || null,
      message: data.message,
      created_at: new Date().toISOString(),
    });
    return { ok: true };
  });
