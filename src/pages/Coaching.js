import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiBookOpen, FiCheck, FiArrowRight, FiStar, FiUser, FiClock, FiAward, FiLoader } from "react-icons/fi";
import { getCoachingPlans, getTestimonials } from "../api";

export default function Coaching() {
  const [openFaq, setOpenFaq] = useState(null);
  const [plans, setPlans] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getCoachingPlans(), getTestimonials()])
      .then(([plansData, testimonialsData]) => {
        setPlans(plansData || []);
        setTestimonials(testimonialsData || []);
      })
      .catch((err) => console.error("Error fetching coaching data:", err))
      .finally(() => setLoading(false));
  }, []);

  const faqs = [
    { q: "Do I need any prior experience?", a: "The Starter plan is designed for absolute beginners. For Builder and Pro, basic HTML/CSS knowledge is helpful but not required." },
    { q: "Are sessions live or pre-recorded?", a: "Sessions are live 1-on-1 or group video calls. Recordings are provided so you can revisit them anytime." },
    { q: "What platform do we use?", a: "We use Zoom for sessions, GitHub for code, Slack for community, and Notion for learning materials." },
    { q: "Can I get a refund?", a: "Yes — we offer a 7-day money-back guarantee if you're not satisfied after the first week." },
    { q: "Do I get a certificate?", a: "Builder and Full-Stack Pro plans include a Certificate of Completion from The Code Limited." },
  ];

  return (
    <main className="pt-28 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accentPurple/30 bg-accentPurple/10 text-accentPurple text-xs font-mono mb-8">
            <FiBookOpen size={14} /> Web Development Coaching
          </div>
          <h1 className="font-display font-black text-5xl md:text-7xl text-white mb-6">
            From Zero to<br /><span className="gradient-text">Full-Stack Dev</span>
          </h1>
          <p className="text-textSecondary text-lg max-w-2xl mx-auto leading-relaxed">
            Personalized mentorship from experienced developers. Learn by building real projects, get code reviews, and land your dream dev job or freelance career.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { icon: FiUser, val: "1-on-1", label: "Mentorship Sessions" },
            { icon: FiClock, val: "4–12", label: "Week Programs" },
            { icon: FiStar, val: "Real", label: "Project-Based Learning" },
            { icon: FiAward, val: "Cert.", label: "On Completion" },
          ].map(({ icon: Icon, val, label }) => (
            <div key={label} className="glass-card rounded-2xl p-6 text-center">
              <Icon className="text-accent mx-auto mb-3" size={22} />
              <p className="font-display font-bold text-2xl text-white mb-1">{val}</p>
              <p className="text-textSecondary text-xs">{label}</p>
            </div>
          ))}
        </div>

        {/* Pricing Plans */}
        <div className="mb-20">
          <h2 className="font-display font-bold text-4xl text-center text-white mb-4">Choose Your <span className="gradient-text">Plan</span></h2>
          <p className="text-textSecondary text-center mb-12">All plans include community access and real-world projects</p>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-accent gap-3">
              <FiLoader className="animate-spin text-3xl" />
              <p className="text-sm font-mono text-textSecondary">Loading coaching plans from API...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map(({ _id, name, price, duration, desc, color = "#00d4ff", popular, modules = [], cta = "Enroll Now" }) => (
                <div
                  key={_id || name}
                  className={`glass-card rounded-2xl p-8 relative transition-all duration-300 hover:-translate-y-2 ${popular ? "border border-accentPurple/50" : ""}`}
                  style={{ boxShadow: popular ? `0 0 40px ${color}20` : "" }}
                >
                  {popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-accentPurple text-white shadow-lg shadow-accentPurple/30">
                        ⭐ Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="font-display font-bold text-2xl text-white mb-1">{name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <FiClock size={14} style={{ color }} />
                      <span className="text-xs font-mono" style={{ color }}>{duration}</span>
                    </div>
                    <div className="flex items-end gap-1 mb-4">
                      <span className="font-display font-black text-5xl" style={{ color }}>{price}</span>
                      <span className="text-textSecondary text-sm mb-2">/ program</span>
                    </div>
                    <p className="text-textSecondary text-sm">{desc}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {modules.map((m) => (
                      <li key={m} className="flex items-center gap-2 text-sm text-textSecondary">
                        <FiCheck style={{ color }} size={14} className="shrink-0" />
                        {m}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className="block text-center py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
                    style={{ background: `${color}20`, border: `1px solid ${color}40`, color }}
                  >
                    {cta} →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <div className="mb-20">
            <h2 className="font-display font-bold text-4xl text-center text-white mb-12">Student <span className="gradient-text">Success Stories</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map(({ _id, name, role, text, rating = 5 }) => (
                <div key={_id || name} className="glass-card rounded-2xl p-6">
                  <div className="flex gap-1 mb-4">
                    {Array(rating).fill(0).map((_, i) => (
                      <FiStar key={i} className="text-yellow-400 fill-yellow-400" size={14} />
                    ))}
                  </div>
                  <p className="text-textSecondary text-sm italic mb-6 leading-relaxed">"{text}"</p>
                  <div>
                    <p className="font-semibold text-white text-sm">{name}</p>
                    <p className="text-accent text-xs font-mono">{role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        <div className="mb-20 max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-4xl text-center text-white mb-12">Frequently Asked <span className="gradient-text">Questions</span></h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="glass-card rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold text-white text-sm">{q}</span>
                  <span className="text-accent text-xl ml-4">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-textSecondary text-sm leading-relaxed border-t border-borderColor/30 pt-4">
                    {a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="font-display font-bold text-3xl text-white mb-4">Ready to start your dev journey?</h2>
          <p className="text-textSecondary mb-8">Book a free discovery call — no pressure, just clarity.</p>
          <Link to="/contact" className="animated-border inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-accentPurple/10 text-accentPurple border border-accentPurple/30 font-semibold hover:bg-accentPurple/20 transition-all hover:shadow-lg hover:shadow-accentPurple/20">
            Book Free Discovery Call <FiArrowRight />
          </Link>
        </div>
      </div>
    </main>
  );
}