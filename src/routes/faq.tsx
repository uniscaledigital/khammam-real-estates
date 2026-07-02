import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  { q: "How do I list my property for sale or rent with Khammam Real Estates?", a: "Simply reach out via Contact or Post Requirement. Our team will visit your property, verify documents, and list it across our channels — no upfront charges." },
  { q: "Do you charge any brokerage fees?", a: "Standard brokerage applies only on successful transactions. We disclose every fee in writing before you commit." },
  { q: "Are the properties on the site verified?", a: "Yes. Every property is visited by our team and legal documents are pre-checked before being listed." },
  { q: "Can you help with home loans?", a: "We work with leading banks and NBFCs and can connect you with loan partners offering competitive rates." },
  { q: "Do you handle rental agreements and registration?", a: "Yes, we manage end-to-end paperwork including rental agreements, sale deeds, and registration." },
  { q: "Which areas of Khammam do you cover?", a: "We work across Khammam with a focus on Gachibowli, Kondapur, Khammam, Hitech City, Kukatpally, Manikonda, Jubilee Hills, and emerging corridors near ORR." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQs — Khammam Real Estates" },
      { name: "description", content: "Common questions about buying, renting, and listing properties with Khammam Real Estates." },
      { property: "og:title", content: "FAQs — Khammam Real Estates" },
      { property: "og:description", content: "Common questions answered." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }),
    }],
  }),
  component: FAQ,
});

function FAQ() {
  return (
    <>
      <section className="bg-primary py-12 md:py-16 lg:py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">Frequently Asked Questions</h1>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 sm:px-6 md:px-8 py-10 md:py-12 lg:py-16">
        <Accordion type="single" collapsible className="rounded-2xl border bg-card shadow-sm">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="px-3 sm:px-5">
              <AccordionTrigger className="text-left font-display text-base font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-foreground/80">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
