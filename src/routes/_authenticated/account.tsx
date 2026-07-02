import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { claimAdminIfFirst, getMyRole } from "@/lib/admin.functions";
import { LayoutDashboard, LogOut, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({ meta: [{ title: "My Account — Khammam Real Estates" }] }),
  component: Account,
});

function Account() {
  const { user } = Route.useRouteContext();
  const nav = useNavigate();
  const getRole = useServerFn(getMyRole);
  const claim = useServerFn(claimAdminIfFirst);
  const { data: role, refetch } = useQuery({ queryKey: ["my-role"], queryFn: () => getRole() });

  async function signOut() {
    await supabase.auth.signOut();
    nav({ to: "/" });
  }
  async function bootstrap() {
    try {
      const r = await claim();
      if (r.claimed) { toast.success("You are now an admin."); refetch(); }
      else toast.info("An admin already exists. Contact us if you need access.");
    } catch (e: any) { toast.error(e.message); }
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-primary">My Account</h1>
      <p className="mt-1 text-muted-foreground">Signed in as <span className="font-medium text-foreground">{user.email}</span></p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="font-display text-lg font-semibold">Your role</h2>
          <p className="mt-1 text-sm text-muted-foreground">{role?.isAdmin ? "You are an administrator." : "Standard user account."}</p>
          {!role?.isAdmin && (
            <Button variant="outline" className="mt-4 gap-2" onClick={bootstrap}>
              <ShieldCheck className="h-4 w-4" /> Claim admin (first user only)
            </Button>
          )}
          {role?.isAdmin && (
            <Link to="/admin"><Button className="mt-4 gap-2"><LayoutDashboard className="h-4 w-4" /> Open Admin Dashboard</Button></Link>
          )}
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="font-display text-lg font-semibold">Session</h2>
          <p className="mt-1 text-sm text-muted-foreground">Sign out of this device.</p>
          <Button variant="outline" className="mt-4 gap-2" onClick={signOut}><LogOut className="h-4 w-4" /> Sign out</Button>
        </div>
      </div>
    </section>
  );
}
