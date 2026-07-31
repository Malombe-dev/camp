import React from "react";
import { Link } from "react-router-dom";
import { FiCode, FiGithub, FiLinkedin, FiTwitter, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-borderColor/30 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg border border-accent/50 bg-accent/10">
                <FiCode className="text-accent" />
              </div>
              <div>
                <p className="font-display font-bold text-sm text-white tracking-widest">THE CODE</p>
                <p className="font-display font-bold text-sm text-accent tracking-widest">LIMITED</p>
              </div>
            </div>
            <p className="text-textSecondary text-sm leading-relaxed mb-6">
              We build scalable digital solutions and empower the next generation of developers.
            </p>
            <div className="flex gap-4">
              {[FiGithub, FiLinkedin, FiTwitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 flex items-center justify-center rounded-lg border border-borderColor hover:border-accent/50 text-textSecondary hover:text-accent transition-all duration-300">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-bold text-white tracking-widest mb-6 uppercase">Navigation</h4>
            <ul className="space-y-3">
              {[["Home", "/"], ["Services", "/services"], ["Coaching", "/coaching"], ["Projects", "/projects"], ["About", "/about"]].map(([name, path]) => (
                <li key={name}>
                  <Link to={path} className="text-textSecondary hover:text-accent text-sm transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-accent/50 group-hover:bg-accent transition-colors" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-sm font-bold text-white tracking-widest mb-6 uppercase">Services</h4>
            <ul className="space-y-3">
              {["Full-Stack Development", "Mobile App Dev", "API & Backend", "UI/UX Design", "Cloud & DevOps", "Web Dev Coaching"].map((s) => (
                <li key={s}>
                  <span className="text-textSecondary text-sm flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accentGreen/50" />
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold text-white tracking-widest mb-6 uppercase">Contact</h4>
            <ul className="space-y-4">
              {[
                [FiMail, "hello@thecodelimited.com"],
                [FiPhone, "+1 (555) 123-4567"],
                [FiMapPin, "Lagos, Nigeria"],
              ].map(([Icon, text], i) => (
                <li key={i} className="flex items-start gap-3">
                  <Icon className="text-accent mt-0.5 shrink-0" size={15} />
                  <span className="text-textSecondary text-sm">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-borderColor/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-textSecondary text-xs">
            © {new Date().getFullYear()} The Code Limited. All rights reserved.
          </p>
          <p className="text-textSecondary text-xs font-mono">
            Built with <span className="text-accent">❤</span> using MERN Stack
          </p>
        </div>
      </div>
    </footer>
  );
}