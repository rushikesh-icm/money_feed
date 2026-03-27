import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-[color:var(--ad-bg)] text-[color:var(--ad-text)] px-4 ad-body">
      <div className="w-full max-w-[420px] bg-[color:var(--ad-panel)] border border-[color:var(--ad-border)] rounded-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-[color:var(--ad-border)]">
          <div className="ad-heading text-[18px] font-extrabold tracking-[-0.3px]">
            money<span className="text-[color:var(--ad-accent)]">fed</span>
          </div>
          <div className="ad-mono text-[11px] text-[color:var(--ad-text2)] mt-1">
            Admin login
          </div>
        </div>

        <form className="px-6 py-5">
          <label className="block text-[11px] font-semibold text-[color:var(--ad-text2)] mb-[6px]">
            Email
          </label>
          <input
            type="email"
            placeholder="rohit@incred.com"
            className="w-full mb-4 px-3 py-[10px] rounded-lg bg-[color:var(--ad-panel2)] border border-[color:var(--ad-border2)] text-[color:var(--ad-text)] outline-none focus:border-[color:var(--ad-accent)]"
          />

          <label className="block text-[11px] font-semibold text-[color:var(--ad-text2)] mb-[6px]">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full mb-5 px-3 py-[10px] rounded-lg bg-[color:var(--ad-panel2)] border border-[color:var(--ad-border2)] text-[color:var(--ad-text)] outline-none focus:border-[color:var(--ad-accent)]"
          />

          <button
            type="button"
            className="w-full px-5 py-[10px] rounded-lg text-[13px] font-semibold bg-[color:var(--ad-accent)] text-white hover:bg-[#3a6fd4] hover:shadow-[0_0_20px_var(--ad-accent-glow)] transition-shadow"
          >
            Sign in
          </button>

          <div className="mt-4 text-[11px] text-[color:var(--ad-text2)]">
            After backend auth is wired, this will set a JWT httpOnly cookie.
          </div>

          <div className="mt-5 text-[11px] text-[color:var(--ad-text2)]">
            Go back to{" "}
            <Link href="/admin" className="text-[color:var(--ad-accent)]">
              Admin dashboard
            </Link>
            .
          </div>
        </form>
      </div>
    </div>
  );
}

