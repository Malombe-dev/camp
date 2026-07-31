import React, { useState } from "react";
import { toast } from "react-toastify";
import { FiMail, FiPhone, FiMapPin, FiSend, FiLoader, FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { sendContact } from "../api";

const serviceOptions = [
  "Full-Stack Web Development",
  "Mobile App Development",
  "API & Backend Engineering",
  "UI/UX Design",
  "Cloud & DevOps",
  "Web Dev Coaching",
  "Other / Not Sure",
];

const budgetOptions = ["< $500", "$500 – $2,000", "$2,000 – $5,000", "$5,000 – $15,000", "$15,000+", "Let's Discuss"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", service: "", budget: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      await sendContact(form);
      toast.success("Message sent! We'll be in touch within 24 hours. 🚀");
      setForm({ name: "", email: "", service: "", budget: "", message: "" });
    } catch (err) {
      console.error("Contact submit error:", err);
      toast.error(err.response?.data?.message || "Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-28 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-accent font-mono text-sm mb-4 tracking-widest uppercase">Let's Talk</p>
          <h1 className="font-display font-black text-5xl md:text-7xl text-white mb-6">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-textSecondary text-lg max-w-xl mx-auto">
            Have a project in mind, want to enroll in coaching, or just want to say hi? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-display font-bold text-2xl text-white mb-6">Contact Info</h2>
              <div className="space-y-6">
                {[
                  { icon: FiMail, label: "Email", value: "hello@thecodelimited.com", href: "mailto:hello@thecodelimited.com" },
                  { icon: FiPhone, label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
                  { icon: FiMapPin, label: "Location", value: "Lagos, Nigeria (Remote-first)", href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                      <Icon className="text-accent" size={16} />
                    </div>
                    <div>
                      <p className="text-textSecondary text-xs font-mono mb-1">{label}</p>
                      {href ? (
                        <a href={href} className="text-white text-sm hover:text-accent transition-colors">{value}</a>
                      ) : (
                        <p className="text-white text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div>
              <h3 className="font-display font-bold text-lg text-white mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {[FiGithub, FiLinkedin, FiTwitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-xl border border-borderColor hover:border-accent/50 flex items-center justify-center text-textSecondary hover:text-accent transition-all duration-300">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-accentGreen animate-pulse" />
                <span className="text-accentGreen text-sm font-mono font-medium">Available Now</span>
              </div>
              <p className="text-textSecondary text-sm">We typically respond within <span className="text-white font-medium">24 hours</span> on business days.</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="glass-card rounded-2xl p-8">
              <h2 className="font-display font-bold text-2xl text-white mb-8">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-textSecondary text-xs font-mono mb-2 uppercase tracking-wider">Your Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full bg-white/5 border border-borderColor rounded-xl px-4 py-3 text-white placeholder-textSecondary text-sm focus:outline-none focus:border-accent/50 focus:bg-accent/5 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-textSecondary text-xs font-mono mb-2 uppercase tracking-wider">Email Address *</label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="john@example.com"
                      required
                      className="w-full bg-white/5 border border-borderColor rounded-xl px-4 py-3 text-white placeholder-textSecondary text-sm focus:outline-none focus:border-accent/50 focus:bg-accent/5 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-textSecondary text-xs font-mono mb-2 uppercase tracking-wider">Service Needed</label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-borderColor rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent/50 focus:bg-accent/5 transition-all duration-300 appearance-none"
                  >
                    <option value="" className="bg-primary">Select a service...</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s} className="bg-primary">{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-textSecondary text-xs font-mono mb-2 uppercase tracking-wider">Budget Range</label>
                  <select
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-borderColor rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent/50 focus:bg-accent/5 transition-all duration-300 appearance-none"
                  >
                    <option value="" className="bg-primary">Select a budget...</option>
                    {budgetOptions.map((b) => (
                      <option key={b} value={b} className="bg-primary">{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-textSecondary text-xs font-mono mb-2 uppercase tracking-wider">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your project or what you need help with..."
                    required
                    className="w-full bg-white/5 border border-borderColor rounded-xl px-4 py-3 text-white placeholder-textSecondary text-sm focus:outline-none focus:border-accent/50 focus:bg-accent/5 transition-all duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-accent/10 border border-accent/30 text-accent font-semibold tracking-wide hover:bg-accent/20 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <><FiLoader className="animate-spin" /> Sending...</>
                  ) : (
                    <><FiSend /> Send Message</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}