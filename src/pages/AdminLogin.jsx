import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, AlertCircle } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const { login, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Invalid email or password. Please check your credentials.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many failed attempts. Please try again later or reset password.");
      } else {
        setError(err.message || "Failed to sign in.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email.trim()) {
      setError("Please enter your admin email above first, then click Forgot Password.");
      return;
    }
    try {
      await resetPassword(email);
      setResetSent(true);
      setError("");
    } catch (err) {
      setError(err.message || "Could not send password reset email.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] flex flex-col items-center justify-center p-4 font-sans text-soft-black select-none">
      <div className="w-full max-w-md bg-white border border-[#DDD8CE] p-7 sm:p-9 rounded-2xl shadow-xl">
        
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-block mb-3">
            <img src="/logo_black.png" alt="AST Macramé" className="h-8 w-auto mx-auto object-contain" />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-soft-black">
            AST Admin Portal
          </h1>
          <p className="text-xs text-dark-charcoal/60 uppercase tracking-widest mt-1 font-medium">
            Authorized Management Only
          </p>
        </div>

        {/* Error / Alert */}
        {error && (
          <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {resetSent && (
          <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span className="leading-snug">Password reset link sent to your email. Check your inbox!</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/80 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="astmacrame@gmail.com"
                className="w-full bg-[#FAF8F5] border border-[#DDD8CE] rounded-xl px-3.5 py-3 pl-10 text-sm focus:outline-none focus:border-soft-black focus:ring-1 focus:ring-soft-black/10 transition-all text-soft-black"
              />
              <Mail className="w-4 h-4 text-dark-charcoal/40 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-dark-charcoal/80">
                Password
              </label>
              <button
                type="button"
                onClick={handleResetPassword}
                className="text-[11px] text-terracotta hover:underline font-semibold cursor-pointer"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#FAF8F5] border border-[#DDD8CE] rounded-xl px-3.5 py-3 pl-10 pr-10 text-sm focus:outline-none focus:border-soft-black focus:ring-1 focus:ring-soft-black/10 transition-all text-soft-black"
              />
              <Lock className="w-4 h-4 text-dark-charcoal/40 absolute left-3.5 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-dark-charcoal/40 hover:text-dark-charcoal cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1C2841] hover:bg-black text-white py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-lg active:scale-98 disabled:opacity-70 disabled:cursor-wait mt-2 cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? "Verifying..." : "Sign In to Dashboard"}
          </button>
        </form>

        {/* Security Trust Note */}
        <div className="mt-6 pt-5 border-t border-[#EAE5DB] text-center flex items-center justify-center gap-2 text-[11px] text-dark-charcoal/60">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Secured by Firebase Enterprise Authentication</span>
        </div>
      </div>

      <Link
        to="/retail"
        className="mt-6 inline-flex items-center gap-1.5 text-xs text-dark-charcoal/70 hover:text-soft-black font-semibold uppercase tracking-wider transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Retail Store</span>
      </Link>
    </div>
  );
};

export default AdminLogin;
