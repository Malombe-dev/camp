import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as FiIcons from "react-icons/fi";
import { getServices } from "../api";

export default function Services() {
  const [active, setActive] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices()
      .then((data) => setServices(data || []))
      .catch((err) => console.error("Error loading services:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="pt-28 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-accent font-mono text-sm mb-4 tracking-widest uppercase">What We Offer</p>
          <h1 className="font-display font-black text-5xl md:text-7xl text-white mb-6">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-textSecondary text-lg max-w-2xl mx-auto">
            End-to-end digital solutions — we handle the technology so you can focus on scaling your business.
          </p>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-accent gap-3">
            <FiIcons.FiLoader className="animate-spin text-3xl" />
            <p className="text-sm font-mono text-textSecondary">Loading services from API...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {services.map(({ _id, icon, title, tagline, desc, color = "#00d4ff", features = [], highlight }) => {
              const IconComponent = FiIcons[icon] || FiIcons.FiCode;
              return (
                <div
                  key={_id || title}
                  className={`glass-card rounded-2xl p-8 group transition-all duration-500 hover:-translate-y-1 cursor-pointer ${highlight ? "border border-accentPurple/30" : ""}`}
                  style={{ boxShadow: active === title ? `0 0 30px ${color}20` : "" }}
                  onClick={() => setActive(active === title ? null : title)}
                >
                  {highlight && (
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-mono bg-accentPurple/20 text-accentPurple border border-accentPurple/30">
                        🎓 Coaching Program
                      </span>
                    </div>
                  )}

                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border" style={{ background: `${color}15`, borderColor: `${color}40`, color }}>
                      <IconComponent size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-xl text-white mb-1">{title}</h3>
                      <p className="text-xs font-mono mb-4" style={{ color }}>{tagline}</p>
                      <p className="text-textSecondary text-sm leading-relaxed mb-6">{desc}</p>

                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-textSecondary">
                            <FiIcons.FiCheck className="shrink-0" style={{ color }} size={14} />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6">
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-3"
                          style={{ color }}
                        >
                          Get Started <FiIcons.FiArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Process */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl text-white mb-4">Our <span className="gradient-text">Process</span></h2>
            <p className="text-textSecondary">How we take your idea from concept to launch</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery", desc: "We understand your goals, users, and technical requirements." },
              { step: "02", title: "Design", desc: "We create wireframes, prototypes, and system architecture." },
              { step: "03", title: "Build", desc: "We develop, test, and iterate with full transparency." },
              { step: "04", title: "Launch", desc: "We deploy, monitor, and support your product post-launch." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="glass-card rounded-2xl p-6 text-center relative">
                <div className="font-mono text-5xl font-bold text-accent/10 mb-4">{step}</div>
                <h3 className="font-display font-bold text-lg text-white mb-2">{title}</h3>
                <p className="text-textSecondary text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="font-display font-bold text-3xl text-white mb-4">Ready to get started?</h2>
          <p className="text-textSecondary mb-8">Let's talk about your project — free consultation, no commitment.</p>
          <Link to="/contact" className="animated-border inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-accent/10 text-accent font-semibold hover:bg-accent/20 transition-all hover:shadow-lg hover:shadow-accent/20">
            Book Free Consultation <FiIcons.FiArrowRight />
          </Link>
        </div>
      </div>
    </main>
  );
}