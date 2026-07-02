import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getMyRole = createServerFn({ method: "GET" })
  .handler(async () => {
    return { roles: ["admin"], isAdmin: true };
  });

export const claimAdminIfFirst = createServerFn({ method: "POST" })
  .handler(async () => {
    return { claimed: true };
  });

const PropertyInput = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/),
  listing_type: z.enum(["sale", "rent"]),
  property_type: z.string().min(1).max(60),
  status: z.enum(["ready_to_move", "under_construction", "new_launch"]),
  price: z.number().min(0),
  area_sqft: z.number().min(0).optional(),
  bedrooms: z.number().min(0).max(20).optional(),
  bathrooms: z.number().min(0).max(20).optional(),
  address: z.string().max(300).optional(),
  locality: z.string().max(120).optional(),
  pincode: z.string().max(20).optional(),
  description: z.string().max(4000).optional(),
  amenities: z.array(z.string().max(80)).max(40).default([]),
  images: z.array(z.string().url().max(500)).max(20).default([]),
  featured: z.boolean().default(false),
  video_url: z.string().url().optional().or(z.literal("")),
  map_url: z.string().url().optional().or(z.literal("")),
  title_te: z.string().max(200).optional(),
  description_te: z.string().max(4000).optional(),
  amenities_te: z.array(z.string().max(80)).max(40).default([]),
});

export const upsertProperty = createServerFn({ method: "POST" })
  .validator((input: unknown) => PropertyInput.parse(input))
  .handler(async ({ data }) => {
    const { mockProperties } = await import("@/lib/mock-data");
    const payload: any = { 
      ...data, 
      created_by: null,
      city: "Unknown", 
      state: "Unknown",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    if (data.id) {
      const idx = mockProperties.findIndex(p => p.id === data.id);
      if (idx !== -1) {
        mockProperties[idx] = { ...mockProperties[idx], ...payload, updated_at: new Date().toISOString() };
      }
      return { ok: true, id: data.id };
    } else {
      payload.id = Math.random().toString(36).substr(2, 9);
      mockProperties.unshift(payload);
      return { ok: true, id: payload.id };
    }
  });

export const deleteProperty = createServerFn({ method: "POST" })
  .validator((input: unknown) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data }) => {
    const { mockProperties } = await import("@/lib/mock-data");
    const idx = mockProperties.findIndex(p => p.id === data.id);
    if (idx !== -1) mockProperties.splice(idx, 1);
    return { ok: true };
  });

export const adminListRequirements = createServerFn({ method: "GET" })
  .handler(async () => {
    const { mockRequirements } = await import("@/lib/mock-data");
    return { items: [...mockRequirements].reverse() };
  });

export const adminListContacts = createServerFn({ method: "GET" })
  .handler(async () => {
    const { mockContactMessages } = await import("@/lib/mock-data");
    return { items: [...mockContactMessages].reverse() };
  });
