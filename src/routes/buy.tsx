import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/buy")({
  head: () => ({
    meta: [
      { title: "Buy Property in Khammam — Khammam Real Estates" },
      { name: "description", content: "Browse flats, villas and plots for sale in Khammam." },
      { property: "og:title", content: "Buy Property in Khammam" },
      { property: "og:description", content: "Premium properties for sale across Khammam." },
      { property: "og:url", content: "/buy" },
    ],
    links: [{ rel: "canonical", href: "/buy" }],
  }),
  component: () => <Navigate to="/properties" search={{ listing_type: "sale" } as any} />,
});
