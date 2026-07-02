import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const FiltersSchema = z.object({
  listing_type: z.enum(["sale", "rent"]).optional(),
  property_type: z.string().optional(),
  locality: z.string().optional(),
  min_bedrooms: z.number().optional(),
  max_price: z.number().optional(),
  featured: z.boolean().optional(),
  limit: z.number().min(1).max(60).optional(),
});

export const listProperties = createServerFn({ method: "GET" })
  .validator((input: unknown) => FiltersSchema.parse(input ?? {}))
  .handler(async ({ data }) => {
    const { mockProperties } = await import("@/lib/mock-data");
    let results = [...mockProperties];
    
    if (data.listing_type) results = results.filter(p => p.listing_type === data.listing_type);
    if (data.property_type) results = results.filter(p => p.property_type === data.property_type);
    if (data.locality) results = results.filter(p => p.locality?.toLowerCase().includes(data.locality!.toLowerCase()));
    if (data.min_bedrooms) results = results.filter(p => (p.bedrooms || 0) >= data.min_bedrooms!);
    if (data.max_price) results = results.filter(p => p.price <= data.max_price!);
    if (data.featured) results = results.filter(p => p.featured === true);
    
    // sorting by created_at desc
    results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    
    if (data.limit) results = results.slice(0, data.limit);
    
    return { properties: results };
  });

export const getProperty = createServerFn({ method: "GET" })
  .validator((input: unknown) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    const { mockProperties } = await import("@/lib/mock-data");
    const row = mockProperties.find(p => p.slug === data.slug);
    if (!row) return { property: null, similar: [] };
    
    const similar = mockProperties
      .filter(p => p.listing_type === row.listing_type && p.id !== row.id)
      .slice(0, 4);
      
    return { property: row, similar };
  });

export const listProjects = createServerFn({ method: "GET" })
  .validator((input: unknown) => z.object({ featured: z.boolean().optional(), limit: z.number().optional() }).parse(input ?? {}))
  .handler(async ({ data }) => {
    const { mockProjects } = await import("@/lib/mock-data");
    let projects = [...mockProjects].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    if (data.featured) projects = projects.filter(p => p.featured === true);
    if (data.limit) projects = projects.slice(0, data.limit);
    return { projects };
  });

export const getProject = createServerFn({ method: "GET" })
  .validator((input: unknown) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    const { mockProjects } = await import("@/lib/mock-data");
    const project = mockProjects.find(p => p.slug === data.slug);
    return { project: project || null };
  });

export const listLocalities = createServerFn({ method: "GET" }).handler(async () => {
  const { mockProperties } = await import("@/lib/mock-data");
  const set = new Set<string>();
  mockProperties.forEach((r) => r.locality && set.add(r.locality));
  return { localities: Array.from(set).sort() };
});
