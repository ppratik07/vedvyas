"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { loadProgressFromDb } from "@/lib/store/userProgress";

const SIDE_PANEL = (
  <div
    className="hidden lg:flex w-[420px] shrink-0 flex-col items-center justify-center relative overflow-hidden"
    style={{ background: "linear-gradient(160deg, #1E0F06 0%, #3D2312 50%, #5C3A20 100%)" }}
  >
    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
    <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-amber-700/40 to-transparent" />
    <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
      <span className="font-display text-[280px] text-white/[0.04] leading-none">ॐ</span>
    </div>
    <div className="relative z-10 text-center px-12">
      <Link href="/" className="inline-block mb-8">
        <span className="font-display text-3xl font-bold text-[#C17D3C]">Ved Vyas</span>
      </Link>
      <p className="font-display italic text-white/70 text-lg leading-relaxed mb-6">
        &ldquo;Yoga is the journey of the self,<br />through the self,<br />to the self.&rdquo;
      </p>
      <p className="text-[11px] uppercase tracking-widest text-amber-500/70 font-semibold">
        — Bhagavad Gita, 6.20
      </p>
      <div className="mt-12 flex flex-col gap-3 text-left">
        {[
          { icon: "📖", text: "Track reading across 5 sacred texts" },
          { icon: "🔥", text: "Maintain your daily study streak" },
          { icon: "✨", text: "AI-powered cross-scripture search" },
          { icon: "🏛", text: "Scholarly commentaries & annotations" },
        ].map(({ icon, text }) => (
          <div key={text} className="flex items-center gap-3">
            <span className="text-base">{icon}</span>
            <span className="text-sm text-white/55">{text}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.includes("@")) return setError("Please enter a valid email address.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });
      const data = await res.json() as { id?: string; name?: string; email?: string; avatarInitial?: string; error?: string };
      if (!res.ok) {
        setLoading(false);
        return setError(data.error ?? "Sign in failed. Please try again.");
      }
      await loadProgressFromDb(data.id!);
      login(data.name!, data.email!, data.id!);
      router.push("/");
    } catch {
      setLoading(false);
      setError("Network error. Please check your connection.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF6EC] flex">
      {SIDE_PANEL}

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <Link href="/" className="mb-8 lg:hidden">
          <span className="font-display text-2xl font-bold text-[#C17D3C]">Ved Vyas</span>
        </Link>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-[#3B2415]">Welcome back</h1>
            <p className="text-[#8B6344] text-sm mt-1.5">Sign in to continue your spiritual journey.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-[#5C3A20] uppercase tracking-wider">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seeker@example.com"
                autoComplete="email"
                className="w-full bg-white border border-[#E8D5B8] rounded-xl px-4 py-3 text-sm text-[#3B2415] placeholder:text-[#C4A882] focus:outline-none focus:border-[#C17D3C] focus:ring-2 focus:ring-[#C17D3C]/15 transition-all"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-xs font-semibold text-[#5C3A20] uppercase tracking-wider">
                  Password
                </label>
                <button type="button" className="text-xs text-[#C17D3C] hover:text-[#9B6020] font-medium transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full bg-white border border-[#E8D5B8] rounded-xl px-4 py-3 pr-11 text-sm text-[#3B2415] placeholder:text-[#C4A882] focus:outline-none focus:border-[#C17D3C] focus:ring-2 focus:ring-[#C17D3C]/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B8906A] hover:text-[#C17D3C] p-1 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full bg-[#C17D3C] hover:bg-[#9B6020] disabled:opacity-60 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md shadow-amber-900/20"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <LogIn size={16} />
              )}
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#E8D5B8]" />
            <span className="text-[#B8906A] text-xs">or</span>
            <div className="flex-1 h-px bg-[#E8D5B8]" />
          </div>

          <Link
            href="/"
            className="block w-full text-center bg-white border border-[#E8D5B8] hover:border-[#C17D3C] hover:bg-[#FDF6EC] text-[#5C3A20] font-semibold py-3 rounded-xl text-sm transition-all"
          >
            Continue as Guest
          </Link>

          <p className="text-center text-xs text-[#B8906A] mt-6">
            New seeker?{" "}
            <Link href="/register" className="text-[#C17D3C] hover:text-[#9B6020] font-semibold transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

