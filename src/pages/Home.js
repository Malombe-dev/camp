import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import * as FiIcons from "react-icons/fi";
import { getServices, getStats, getProjects } from "../api";

const roles = ["Full-Stack Web Apps", "Mobile Applications", "SaaS Products", "REST APIs", "Dev Coaching"];

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  const [services, setServices] = useState([]);
  const [stats, setStats] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    Promise.all([getServices(), getStats(), getProjects()])
      .then(([servicesData, statsData, projectsData]) => {
        setServices(servicesData || []);
        setStats(statsData || []);
        setProjects((projectsData || []).filter((p) => p.featured));
      })
      .catch((err) => console.error("Error loading home data:", err));
  }, []);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;
    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse2" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accentPurple/5 rounded-full blur-3xl animate-pulse2 animation-delay-500" />

        <div className="container-custom relative z-10 text-center pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs font-mono mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-accentGreen animate-pulse" />
            Available for new projects
          </div>

          <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-none mb-6 animate-fade-up">
            <span className="text-white">WE BUILD.</span>
            <br />
            <span className="glow-text text-accent">WE SHIP.</span>
            <br />
            <span className="text-white">WE SCALE.</span>
          </h1>

          <div className="h-12 flex items-center justify-center mb-8">
            <p className="text-xl md:text-2xl text-textSecondary font-body">
              Expert{" "}
              <span className="text-accentGreen font-mono font-semibold">
                {displayed}
                <span className="animate-pulse">|</span>
              </span>
            </p>
          </div>

          <p className="text-textSecondary text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-up animation-delay-300">
            The Code Limited crafts premium digital experiences — from blazing-fast web apps to scalable backends, and world-class dev coaching.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-500">
            <Link to="/projects" className="animated-border relative px-8 py-4 rounded-xl bg-accent/10 text-accent font-semibold tracking-wide hover:bg-accent/20 transition-all duration-300 flex items-center gap-2 hover:shadow-xl hover:shadow-accent/20 group">
              View Our Work
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/contact" className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold tracking-wide hover:bg-white/10 transition-all duration-300">
              Get a Free Quote
            </Link>
          </div>

          {/* Stats */}
          {stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24 max-w-3xl mx-auto">
              {stats.map(({ _id, icon, value, label }) => {
                const IconComp = FiIcons[icon] || FiIcons.FiStar;
                return (
                  <div key={_id || label} className="glass-card rounded-2xl p-6 animate-fade-up">
                    <IconComp className="text-accent mx-auto mb-2" size={22} />
                    <p className="font-display font-bold text-3xl text-white mb-1">{value}</p>
                    <p className="text-textSecondary text-xs">{label}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="text-textSecondary text-xs font-mono">scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-accent to-transparent" />
        </div>
      </section>

      {/* Services Preview */}
      {services.length > 0 && (
        <section className="section-padding bg-secondary/30">
          <div className="container-custom">
            <div className="text-center mb-16">
              <p className="text-accent font-mono text-sm mb-4 tracking-widest uppercase">What We Do</p>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
                Our <span className="gradient-text">Services</span>
              </h2>
              <p className="text-textSecondary max-w-xl mx-auto">
                From idea to deployment — we cover every layer of your digital product.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.slice(0, 6).map(({ _id, icon, title, desc, color = "#00d4ff" }) => {
                const IconComponent = FiIcons[icon] || FiIcons.FiCode;
                return (
                  <div key={_id || title} className="glass-card rounded-2xl p-8 group hover:border-accent/30 transition-all duration-500 hover:-translate-y-1 cursor-pointer">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-white/5 border border-white/10 group-hover:border-accent/30 transition-all" style={{ color }}>
                      <IconComponent size={22} />
                    </div>
                    <h3 className="font-display font-semibold text-lg text-white mb-3 tracking-wide">{title}</h3>
                    <p className="text-textSecondary text-sm leading-relaxed">{desc}</p>
                    <div className="mt-6 flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color }}>
                      Learn more <FiArrowRight size={14} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Link to="/services" className="inline-flex items-center gap-2 text-accent font-medium hover:gap-4 transition-all duration-300">
                View All Services <FiArrowRight />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {projects.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-16">
              <p className="text-accentGreen font-mono text-sm mb-4 tracking-widest uppercase">Portfolio</p>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
                Featured <span className="gradient-text">Projects</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map(({ _id, title, description, tags = [], color = "#00d4ff" }) => (
                <div key={_id || title} className="glass-card rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-500">
                  <div className="h-48 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${color}15, ${color}05)` }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-2xl border flex items-center justify-center font-mono text-2xl font-bold" style={{ borderColor: color, color }}>
                        {"</>"}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-semibold text-lg text-white mb-2">{title}</h3>
                    <p className="text-textSecondary text-sm mb-4">{description}</p>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((t) => (
                        <span key={t} className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-textSecondary">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/projects" className="animated-border relative inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-accent/10 text-accent font-semibold hover:bg-accent/20 transition-all">
                View All Projects <FiArrowRight />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="relative animated-border rounded-3xl p-12 md:p-20 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-secondary to-accentPurple/10 rounded-3xl" />
            <div className="relative z-10">
              <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-6">
                Ready to Build<br /><span className="gradient-text">Something Great?</span>
              </h2>
              <p className="text-textSecondary text-lg mb-10 max-w-xl mx-auto">
                Let's turn your vision into a product people love. Book a free discovery call today.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-accent text-primary font-display font-bold text-lg hover:bg-accent/90 transition-all hover:shadow-xl hover:shadow-accent/30 hover:scale-105 group">
                Start Your Project
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}