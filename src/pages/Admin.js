import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  FiLock,
  FiMail,
  FiUser,
  FiCheckCircle,
  FiTrash2,
  FiRefreshCw,
  FiLogOut,
  FiCalendar,
  FiSearch,
  FiMessageSquare,
  FiTag,
  FiDollarSign,
  FiCheck,
  FiArchive,
  FiInbox,
  FiEye,
} from "react-icons/fi";
import {
  loginAdmin,
  getAdminMe,
  getContactsAdmin,
  updateContactStatusAdmin,
  deleteContactAdmin,
} from "../api";

export default function Admin() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("admin_token") || "");
  const [loginForm, setLoginForm] = useState({ email: "admin@thecodelimited.com", password: "" });
  const [loggingIn, setLoggingIn] = useState(false);

  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);

  // Check auth status on mount
  useEffect(() => {
    if (token) {
      getAdminMe()
        .then((userData) => {
          setUser(userData);
          fetchContacts();
        })
        .catch(() => {
          handleLogout();
        });
    }
  }, [token]);

  const fetchContacts = (status = filterStatus) => {
    setLoadingContacts(true);
    getContactsAdmin(status)
      .then((res) => {
        setContacts(res.data || []);
      })
      .catch((err) => {
        toast.error("Failed to load contact inquiries.");
      })
      .finally(() => setLoadingContacts(false));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      toast.error("Please enter email and password.");
      return;
    }
    setLoggingIn(true);
    try {
      const res = await loginAdmin(loginForm.email, loginForm.password);
      if (res.success) {
        toast.success(`Welcome back, ${res.data.name}! 🚀`);
        setToken(res.data.token);
        setUser(res.data);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setToken("");
    setUser(null);
    toast.info("Logged out of Admin Dashboard.");
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateContactStatusAdmin(id, newStatus);
      toast.success(`Status updated to "${newStatus}"`);
      setContacts((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );
      if (selectedContact?._id === id) {
        setSelectedContact((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      toast.error("Failed to update status.");
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      await deleteContactAdmin(id);
      toast.success("Inquiry deleted.");
      setContacts((prev) => prev.filter((c) => c._id !== id));
      if (selectedContact?._id === id) setSelectedContact(null);
    } catch (err) {
      toast.error("Failed to delete inquiry.");
    }
  };

  // Filter contacts by search & status
  const filteredContacts = contacts.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "new":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-accent/20 text-accent border border-accent/40 animate-pulse">
            NEW
          </span>
        );
      case "read":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-blue-500/20 text-blue-400 border border-blue-500/30">
            READ
          </span>
        );
      case "replied":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-accentGreen/20 text-accentGreen border border-accentGreen/30">
            REPLIED
          </span>
        );
      case "archived":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-gray-500/20 text-gray-400 border border-gray-500/30">
            ARCHIVED
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-white">
            {status}
          </span>
        );
    }
  };

  // 1. Unauthenticated Login Screen
  if (!token || !user) {
    return (
      <main className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="container-custom max-w-md">
          <div className="glass-card rounded-3xl p-8 md:p-10 border border-accent/20 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-6 text-accent">
              <FiLock size={28} />
            </div>

            <h1 className="font-display font-black text-3xl text-center text-white mb-2">
              Admin Portal
            </h1>
            <p className="text-textSecondary text-center text-sm mb-8">
              Sign in to manage contact form inquiries and website settings.
            </p>

            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-mono text-textSecondary uppercase tracking-wider mb-2">
                  Admin Email
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary" />
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    placeholder="admin@thecodelimited.com"
                    required
                    className="w-full bg-white/5 border border-borderColor rounded-xl pl-11 pr-4 py-3 text-white placeholder-textSecondary text-sm focus:outline-none focus:border-accent/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-textSecondary uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary" />
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    placeholder="••••••••••••"
                    required
                    className="w-full bg-white/5 border border-borderColor rounded-xl pl-11 pr-4 py-3 text-white placeholder-textSecondary text-sm focus:outline-none focus:border-accent/50 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loggingIn}
                className="w-full py-4 rounded-xl bg-accent text-primary font-display font-bold text-base hover:bg-accent/90 transition-all hover:shadow-lg hover:shadow-accent/20 disabled:opacity-50"
              >
                {loggingIn ? "Authenticating..." : "Sign In to Dashboard"}
              </button>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-textSecondary text-center">
                <span className="text-white font-medium">Default Credentials:</span>
                <br />
                <code className="text-accent">admin@thecodelimited.com</code> / <code className="text-accent">AdminPassword123!</code>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }

  // 2. Authenticated Admin Dashboard
  return (
    <main className="pt-28 pb-20">
      <div className="container-custom">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-borderColor/40">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-accentGreen/20 text-accentGreen border border-accentGreen/30">
                ● Live Database Connection
              </span>
              <span className="text-textSecondary text-xs font-mono">
                Admin: <strong className="text-white">{user.email}</strong>
              </span>
            </div>
            <h1 className="font-display font-black text-4xl text-white">
              Contact Inquiries <span className="gradient-text">Dashboard</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchContacts(filterStatus)}
              className="px-4 py-2.5 rounded-xl bg-white/5 border border-borderColor text-textSecondary hover:text-white hover:border-accent/30 text-sm font-medium flex items-center gap-2 transition-all"
            >
              <FiRefreshCw className={loadingContacts ? "animate-spin" : ""} /> Refresh
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-sm font-medium flex items-center gap-2 transition-all"
            >
              <FiLogOut /> Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Total Inquiries", val: contacts.length, icon: FiInbox, color: "#00d4ff" },
            { label: "New Messages", val: contacts.filter((c) => c.status === "new").length, icon: FiMail, color: "#00ff9d" },
            { label: "Replied", val: contacts.filter((c) => c.status === "replied").length, icon: FiCheckCircle, color: "#7c3aed" },
            { label: "Archived", val: contacts.filter((c) => c.status === "archived").length, icon: FiArchive, color: "#94a3b8" },
          ].map(({ label, val, icon: Icon, color }) => (
            <div key={label} className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-textSecondary text-xs font-mono">{label}</span>
                <Icon style={{ color }} size={18} />
              </div>
              <p className="font-display font-black text-3xl text-white">{val}</p>
            </div>
          ))}
        </div>

        {/* Filter Controls & Search */}
        <div className="glass-card rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            {["all", "new", "read", "replied", "archived"].map((st) => (
              <button
                key={st}
                onClick={() => {
                  setFilterStatus(st);
                  fetchContacts(st);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                  filterStatus === st
                    ? "bg-accent text-primary font-bold shadow-lg shadow-accent/20"
                    : "text-textSecondary hover:text-white hover:bg-white/5"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textSecondary" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, message..."
              className="w-full bg-white/5 border border-borderColor rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-textSecondary focus:outline-none focus:border-accent/50 transition-all"
            />
          </div>
        </div>

        {/* Main Content Grid: Inquiries List & Detail Pane */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inquiries Table / Cards */}
          <div className={`${selectedContact ? "lg:col-span-7" : "lg:col-span-12"} space-y-4`}>
            {loadingContacts ? (
              <div className="text-center py-20 glass-card rounded-2xl text-accent font-mono">
                Loading contact entries from MongoDB...
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="text-center py-20 glass-card rounded-2xl text-textSecondary">
                <FiInbox size={48} className="mx-auto mb-4 opacity-30 text-accent" />
                <p className="text-lg text-white font-semibold mb-1">No contact inquiries found</p>
                <p className="text-sm">Submissions from your website contact form will appear here live.</p>
              </div>
            ) : (
              filteredContacts.map((c) => (
                <div
                  key={c._id}
                  onClick={() => setSelectedContact(c)}
                  className={`glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:border-accent/40 ${
                    selectedContact?._id === c._id ? "border-accent bg-accent/5" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-display font-bold text-lg text-white">{c.name}</h3>
                        {getStatusBadge(c.status)}
                      </div>
                      <a
                        href={`mailto:${c.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-accent text-xs font-mono hover:underline"
                      >
                        {c.email}
                      </a>
                    </div>
                    <span className="text-xs font-mono text-textSecondary">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-textSecondary text-sm line-clamp-2 leading-relaxed mb-4">
                    {c.message}
                  </p>

                  <div className="flex items-center justify-between text-xs font-mono pt-3 border-t border-borderColor/30">
                    <span className="text-accentGreen">
                      Service: {c.service || "General Inquiry"}
                    </span>
                    <span className="text-textSecondary">
                      Budget: {c.budget || "N/A"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Inquiry Detail Sidebar */}
          {selectedContact && (
            <div className="lg:col-span-5">
              <div className="glass-card rounded-2xl p-6 sticky top-28 border border-accent/30">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-borderColor/40">
                  <div>
                    <span className="text-xs font-mono text-textSecondary uppercase">Inquiry Details</span>
                    <h2 className="font-display font-bold text-xl text-white">{selectedContact.name}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="text-textSecondary hover:text-white text-xs font-mono bg-white/5 px-2.5 py-1 rounded-md"
                  >
                    Close ✕
                  </button>
                </div>

                <div className="space-y-4 text-sm mb-6">
                  <div className="p-3 rounded-xl bg-white/5">
                    <p className="text-xs font-mono text-textSecondary mb-1">Email Address</p>
                    <a href={`mailto:${selectedContact.email}`} className="text-accent font-mono font-medium hover:underline">
                      {selectedContact.email}
                    </a>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-white/5">
                      <p className="text-xs font-mono text-textSecondary mb-1">Service Needed</p>
                      <p className="text-white font-medium text-xs">{selectedContact.service || "Not specified"}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5">
                      <p className="text-xs font-mono text-textSecondary mb-1">Budget Range</p>
                      <p className="text-white font-medium text-xs">{selectedContact.budget || "Not specified"}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-borderColor/40">
                    <p className="text-xs font-mono text-textSecondary mb-2">Message Body</p>
                    <p className="text-textPrimary leading-relaxed whitespace-pre-wrap text-sm">
                      {selectedContact.message}
                    </p>
                  </div>

                  <div className="text-xs font-mono text-textSecondary">
                    Submitted: {new Date(selectedContact.createdAt).toLocaleString()}
                  </div>
                </div>

                {/* Status Updater Buttons */}
                <div className="space-y-3 pt-4 border-t border-borderColor/40">
                  <p className="text-xs font-mono text-textSecondary uppercase">Update Status</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleStatusChange(selectedContact._id, "read")}
                      className="py-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-medium hover:bg-blue-500/20 transition-all"
                    >
                      Mark Read
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedContact._id, "replied")}
                      className="py-2 rounded-xl bg-accentGreen/10 border border-accentGreen/30 text-accentGreen text-xs font-mono font-medium hover:bg-accentGreen/20 transition-all"
                    >
                      Mark Replied
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedContact._id, "archived")}
                      className="py-2 rounded-xl bg-gray-500/10 border border-gray-500/30 text-gray-400 text-xs font-mono font-medium hover:bg-gray-500/20 transition-all"
                    >
                      Archive
                    </button>
                    <button
                      onClick={() => handleDeleteContact(selectedContact._id)}
                      className="py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-medium hover:bg-red-500/20 transition-all flex items-center justify-center gap-1"
                    >
                      <FiTrash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
