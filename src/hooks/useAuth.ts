import { useState } from "react";
import type { Session, User } from "@supabase/supabase-js";

export function useAuth() {
  // Return a mock admin user immediately
  const mockUser: User = {
    id: "admin-123",
    app_metadata: {},
    user_metadata: {},
    aud: "authenticated",
    created_at: new Date().toISOString(),
  };

  const mockSession: Session = {
    access_token: "mock-token",
    refresh_token: "mock-refresh",
    expires_in: 3600,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    token_type: "bearer",
    user: mockUser,
  };

  const [session] = useState<Session | null>(mockSession);
  const [user] = useState<User | null>(mockUser);
  const [loading] = useState(false);

  return { session, user, loading };
}
