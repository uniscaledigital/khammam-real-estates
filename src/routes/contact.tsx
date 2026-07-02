import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin, MessageCircle, Phone, Instagram, Youtube, User as UserIcon } from "lucide-react";
import { submitContact } from "@/lib/lead.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Khammam Real Estates" },
      { name: "description", content: "Reach Khammam Real Estates by phone, WhatsApp or email. We're based in Khammam, Telangana." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const submit = useServerFn(submitContact);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const mut = useMutation({
    mutationFn: (d: typeof form) => submit({ data: d }),
    onSuccess: () => { toast.success("Thanks! We'll get back to you shortly."); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); },
    onError: (e: any) => toast.error(e.message ?? "Could not submit"),
  });
  return (
    <>
      <section className="bg-secondary py-16 md:py-20 lg:py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold">Get in Touch</h1>
          <p className="mt-3 sm:mt-4 text-white/80 font-sub text-base sm:text-lg">We respond to most enquiries within an hour during business hours.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10 md:mb-16">
          <a href="https://wa.me/918186871820" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-6 rounded-[20px] bg-green-50 text-green-700 hover:bg-green-600 hover:text-white transition-all duration-300 shadow-sm hover:scale-105 hover:shadow-md">
            <MessageCircle className="h-8 w-8 mb-3" />
            <span className="font-bold text-lg">WhatsApp</span>
            <span className="text-sm opacity-80 font-medium">8186871820</span>
          </a>
          <a href="tel:8186871820" className="flex flex-col items-center justify-center p-6 rounded-[20px] bg-primary/10 text-primary hover:bg-primary hover:text-secondary transition-all duration-300 shadow-sm hover:scale-105 hover:shadow-md">
            <Phone className="h-8 w-8 mb-3" />
            <span className="font-bold text-lg">Call Now</span>
            <span className="text-sm opacity-80 font-medium">8186871820</span>
          </a>
          <a href="https://www.youtube.com/@khammamrealestateofficial" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-6 rounded-[20px] bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm hover:scale-105 hover:shadow-md">
            <Youtube className="h-8 w-8 mb-3" />
            <span className="font-bold text-lg">YouTube</span>
            <span className="text-sm opacity-80 font-medium">Khammam Real Estates</span>
          </a>
          <a href="https://www.instagram.com/khammam_realestates/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-6 rounded-[20px] bg-pink-50 text-pink-600 hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-purple-600 hover:text-white transition-all duration-300 shadow-sm hover:scale-105 hover:shadow-md">
            <Instagram className="h-8 w-8 mb-3" />
            <span className="font-bold text-lg">Instagram</span>
            <span className="text-sm opacity-80 font-medium">@khammam_realestates</span>
          </a>
        </div>

        <div className="grid gap-8 md:gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <InfoCard icon={UserIcon} title="Property Consultant" lines={["Rajesh Gudepu"]} />
            <InfoCard icon={MapPin} title="Office Location" lines={["Khammam, Telangana"]} />
            <InfoCard icon={Phone} title="Direct Line" lines={["8186871820", "Mon–Sat, 9:00 AM – 7:00 PM"]} />
            <InfoCard icon={Mail} title="Email" lines={["gudepurajesh20@gmail.com", "gudepurealestate@gmail.com"]} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); mut.mutate(form); }} className="grid gap-4 sm:gap-6 rounded-[24px] border border-border bg-card p-4 sm:p-6 md:p-8 shadow-xl shadow-black/5">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Name *"><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-xl border-border bg-background py-6" /></Field>
              <Field label="Phone"><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-xl border-border bg-background py-6" /></Field>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Email"><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-xl border-border bg-background py-6" /></Field>
              <Field label="Subject"><Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="rounded-xl border-border bg-background py-6" /></Field>
            </div>
            <Field label="Message *"><Textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="rounded-xl border-border bg-background resize-none" /></Field>
            <Button type="submit" disabled={mut.isPending} size="lg" className="w-full mt-2 rounded-full h-14 text-lg">
              {mut.isPending ? "Sending…" : "Send Message"}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

function InfoCard({ icon: Icon, title, lines }: { icon: any; title: string; lines: string[] }) {
  return (
    <div className="flex gap-4 sm:gap-5 rounded-[20px] border border-border bg-card p-4 sm:p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="grid h-12 w-12 sm:h-14 sm:w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary/20 to-transparent text-primary"><Icon className="h-5 w-5 sm:h-6 sm:w-6 stroke-[1.5]" /></div>
      <div>
        <h3 className="font-display text-lg font-bold text-secondary mb-1">{title}</h3>
        {lines.map((l, i) => <p key={i} className="font-sub text-sm sm:text-base font-medium text-muted-foreground leading-relaxed">{l}</p>)}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-2"><Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">{label}</Label>{children}</div>;
}
