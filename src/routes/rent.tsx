import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/rent")({
  head: () => ({
    meta: [
      { title: "Rent Property in Khammam — Khammam Real Estates" },
      { name: "description", content: "Find flats, villas and office spaces for rent across Khammam." },
      { property: "og:title", content: "Rent Property in Khammam" },
      { property: "og:description", content: "Premium properties for rent across Khammam." },
      { property: "og:url", content: "/rent" },
    ],
    links: [{ rel: "canonical", href: "/rent" }],
  }),
  component: () => <Navigate to="/properties" search={{ listing_type: "rent" } as any} />,
});
