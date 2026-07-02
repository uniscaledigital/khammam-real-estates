import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    // Authentication is bypassed for the mock implementation.
    return { user: { id: "admin-123" } };
  },
  component: () => <Outlet />,
});
