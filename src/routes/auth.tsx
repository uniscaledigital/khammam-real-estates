import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/auth")({
  component: AuthRoute,
});

function AuthRoute() {
  const navigate = useNavigate();
  useEffect(() => {
    // Auth is bypassed. Go directly to admin dashboard.
    navigate({ to: "/admin" });
  }, [navigate]);

  return <div className="p-8 text-center">Redirecting to Admin Dashboard...</div>;
}
