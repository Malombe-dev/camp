import React, { useState, useEffect } from "react";
import { FiExternalLink, FiGithub, FiFilter, FiLoader } from "react-icons/fi";
import { getProjects } from "../api";

const categories = ["All", "Web", "Mobile", "SaaS"];

export default function Projects() {
  const [active, setActive] = useState("All");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getProjects(active)
      .then((data) => {
        if (isMounted) setProjects(data || []);
      })
      .catch((err) => {
        console.error("Error loading projects:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [active]);

  return (
    <main className="pt-28 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-accentGreen font-mono text-sm mb-4 tracking-widest uppercase">Portfolio</p>
          <h1 className="font-display font-black text-5xl md:text-7xl text-white mb-6">
            Our <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-textSecondary text-lg max-w-2xl mx-auto">
            Real products built for real clients — from startups to enterprise applications.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center justify-center gap-3 mb-12 flex-wrap">
          <FiFilter className="text-textSecondary" size={16} />
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-5 py-2 rounded-full text-sm font-medium font-mono transition-all duration-300 ${
                active === c
                  ? "bg-accent/20 text-accent border border-accent/50"
                  : "text-textSecondary border border-borderColor/30 hover:border-accent/30 hover:text-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-accent gap-3">
            <FiLoader className="animate-spin text-3xl" />
            <p className="text-sm font-mono text-textSecondary">Loading projects from API...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 glass-card rounded-2xl">
            <p className="text-textSecondary text-lg">No projects found for category "{active}".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(({ _id, title, category, description, tags = [], color = "#00d4ff", year = "2024", liveUrl, githubUrl }) => (
              <div
                key={_id || title}
                className="glass-card rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-500 hover:shadow-xl"
              >
                {/* Card Header */}
                <div className="h-44 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${color}18, ${color}05)` }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-xl border flex items-center justify-center font-mono text-lg font-bold mx-auto mb-2" style={{ borderColor: `${color}60`, color }}>
                        {"</>"}
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-mono" style={{ background: `${color}20`, color }}>
                        {category}
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 text-xs font-mono text-textSecondary bg-black/30 px-2 py-1 rounded">
                    {year}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <h3 className="font-display font-bold text-lg text-white mb-2">{title}</h3>
                  <p className="text-textSecondary text-sm mb-4 leading-relaxed">{description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-textSecondary">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    {liveUrl && (
                      <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-medium transition-colors" style={{ color }}>
                        <FiExternalLink size={14} /> Live Demo
                      </a>
                    )}
                    {githubUrl && (
                      <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-textSecondary hover:text-white transition-colors">
                        <FiGithub size={14} /> Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}