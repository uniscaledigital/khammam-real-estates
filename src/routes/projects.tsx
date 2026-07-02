import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone, MessageCircle, ChevronRight, Download, Maximize, Share2 } from "lucide-react";
import { mockProjects, ExtendedProject } from "@/lib/mock-data";
import { ProjectCard } from "@/components/site/ProjectCard";
import { useState } from "react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Khammam Real Estates" },
      { name: "description", content: "Premier residential and commercial projects by Khammam across Khammam." },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: Projects,
});



function Projects() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-secondary">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/projects_hero_bg.png" 
            alt="Luxury Villa Background" 
            className="h-full w-full object-cover object-center opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/50 via-transparent to-secondary/50"></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center animate-fade-up">
          <span className="mb-4 inline-block rounded-full border border-primary/30 bg-secondary/50 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-primary backdrop-blur-md">
            OUR PROJECT PORTFOLIO
          </span>
          <h1 className="font-display text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Our Preferred <span className="text-primary">Projects</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-white/80 md:text-xl">
            Explore our verified DTCP layouts, residential ventures, premium townships, and investment opportunities across Khammam.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="mx-auto -mt-16 max-w-7xl px-4 relative z-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {mockProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Brochure Section */}
      <section className="mx-auto mt-24 max-w-[1000px] px-6">
        <div className="text-center mb-10">
           <h2 className="font-display text-3xl font-bold text-secondary md:text-4xl">
             Official Project <span className="text-primary">Brochure</span>
           </h2>
           <p className="mt-3 text-secondary/70 font-medium max-w-xl mx-auto">
             Complete project list and price details released by Khammam Real Estates.
           </p>
        </div>
        
        <div className="relative group overflow-hidden rounded-[20px] border-[3px] border-primary bg-[#FAF7EF] p-4 shadow-[0_10px_40px_rgba(212,175,55,0.15)]">
           <div className="relative overflow-hidden rounded-xl bg-muted aspect-[3/4] md:aspect-auto md:h-[800px]">
             {/* Using a placeholder for now since no poster was identified */}
             <img 
               src="/images/project-brochure.jpg" 
               alt="Official Project Brochure" 
               className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
               onClick={() => setIsFullscreen(true)}
             />
             
             {/* Overlay Actions */}
             <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-secondary/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-sm">
                <button 
                  onClick={() => setIsFullscreen(true)}
                  className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-secondary transition-transform hover:scale-105"
                >
                  <Maximize className="h-5 w-5" /> View Fullscreen
                </button>
                <div className="flex gap-4 mt-2">
                  <a href="/images/project-brochure.jpg" download className="flex items-center justify-center h-12 w-12 rounded-full bg-white text-secondary hover:bg-primary transition-colors">
                    <Download className="h-5 w-5" />
                  </a>
                  <button className="flex items-center justify-center h-12 w-12 rounded-full bg-white text-secondary hover:bg-primary transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <a href="https://wa.me/918186871820" target="_blank" rel="noreferrer" className="flex items-center justify-center h-12 w-12 rounded-full bg-[#25D366] text-white hover:scale-105 transition-transform">
                    <MessageCircle className="h-5 w-5" />
                  </a>
                  <a href="tel:+918186871820" className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary border border-primary text-primary hover:bg-primary hover:text-secondary transition-colors">
                    <Phone className="h-5 w-5" />
                  </a>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl">
          <button 
            onClick={() => setIsFullscreen(false)}
            className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
          >
            ✕
          </button>
          <img 
            src="/images/project-brochure.jpg" 
            alt="Official Project Brochure Fullscreen" 
            className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
