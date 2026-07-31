import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCode, FiDatabase, FiLayout, FiSmartphone, FiServer, FiCloud, FiLoader } from "react-icons/fi";
import { getTeamMembers, getStats } from "../api";

const techStack = [
  { icon: FiCode, name: "React.js", color: "#61dafb" },
  { icon: FiServer, name: "Node.js", color: "#68a063" },
  { icon: FiDatabase, name: "MongoDB", color: "#00ed64" },
  { icon: FiLayout, name: "Tailwind", color: "#38bdf8" },
  { icon: FiSmartphone, name: "React Native", color: "#7c3aed" },
  { icon: FiCloud, name: "AWS", color: "#ff9900" },
];

export default function About() {
  const [team, setTeam] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getTeamMembers(), getStats()])
      .then(([teamData, statsData]) => {
        setTeam(teamData || []);
        setStats(statsData || []);
      })
      .catch((err) => console.error("Error loading about page data:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="pt-28 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-accent font-mono text-sm mb-4 tracking-widest uppercase">Who We Are</p>
          <h1 className="font-display font-black text-5xl md:text-7xl text-white mb-6">
            About <span className="gradient-text">The Code Limited</span>
          </h1>
          <p className="text-textSecondary text-lg max-w-2xl mx-auto leading-relaxed">
            A team of passionate engineers and designers building digital products that matter — and teaching the next generation to do the same.
          </p>
        </div>

        {/* Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 items-center">
          <div>
            <h2 className="font-display font-bold text-4xl text-white mb-6">Our <span className="gradient-text">Mission</span></h2>
            <p className="text-textSecondary leading-relaxed mb-6">
              At The Code Limited, we believe great software changes lives. We partner with startups, businesses, and entrepreneurs to build the digital tools that drive their vision forward.
            </p>
            <p className="text-textSecondary leading-relaxed mb-8">
              Beyond client work, we're deeply committed to growing the developer ecosystem through world-class coaching — helping aspiring developers go from zero to job-ready in weeks, not years.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 text-accent font-medium hover:gap-4 transition-all">
              Work with us <FiArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ _id, label, value }, idx) => {
              const colors = ["#00d4ff", "#7c3aed", "#00ff9d", "#00d4ff"];
              const color = colors[idx % colors.length];
              return (
                <div key={_id || label} className="glass-card rounded-2xl p-6 text-center">
                  <p className="font-display font-black text-4xl mb-1" style={{ color }}>{value}</p>
                  <p className="text-textSecondary text-sm">{label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl text-white mb-4">Meet the <span className="gradient-text">Team</span></h2>
            <p className="text-textSecondary">The people behind every line of code</p>
          </div>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-accent gap-3">
              <FiLoader className="animate-spin text-3xl" />
              <p className="text-sm font-mono text-textSecondary">Loading team from API...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map(({ _id, name, role, bio, emoji = "👨‍💻" }) => (
                <div key={_id || name} className="glass-card rounded-2xl p-6 text-center group hover:-translate-y-2 transition-all duration-300">
                  <div className="w-20 h-20 rounded-2xl bg-white/5 border border-borderColor flex items-center justify-center text-4xl mx-auto mb-4 group-hover:border-accent/30 transition-colors">
                    {emoji}
                  </div>
                  <h3 className="font-display font-bold text-base text-white mb-1">{name}</h3>
                  <p className="text-accent text-xs font-mono mb-3">{role}</p>
                  <p className="text-textSecondary text-xs leading-relaxed">{bio}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tech Stack */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl text-white mb-4">Our <span className="gradient-text">Tech Stack</span></h2>
            <p className="text-textSecondary">The technologies we use to build great products</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map(({ icon: Icon, name, color }) => (
              <div key={name} className="glass-card rounded-xl p-4 text-center group hover:-translate-y-1 transition-all duration-300 cursor-default">
                <Icon className="mx-auto mb-2 group-hover:scale-110 transition-transform" size={28} style={{ color }} />
                <p className="text-textSecondary text-xs font-mono">{name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl text-white mb-4">Our <span className="gradient-text">Values</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Quality First", icon: "🏆", desc: "We never ship code we wouldn't be proud of. Quality is non-negotiable in everything we build." },
              { title: "Transparency", icon: "🔍", desc: "Clear communication, honest timelines, and full visibility into our work at every stage." },
              { title: "Empowerment", icon: "🚀", desc: "We don't just build for clients — we teach, mentor, and empower developers to build for themselves." },
            ].map(({ title, icon, desc }) => (
              <div key={title} className="glass-card rounded-2xl p-8 text-center">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-display font-bold text-xl text-white mb-3">{title}</h3>
                <p className="text-textSecondary text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="font-display font-bold text-3xl text-white mb-4">Let's build something together</h2>
          <p className="text-textSecondary mb-8">We're always open to exciting new projects and coaching inquiries.</p>
          <Link to="/contact" className="animated-border inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-accent/10 text-accent font-semibold hover:bg-accent/20 transition-all hover:shadow-lg hover:shadow-accent/20">
            Get in Touch <FiArrowRight />
          </Link>
        </div>
      </div>
    </main>
  );
}