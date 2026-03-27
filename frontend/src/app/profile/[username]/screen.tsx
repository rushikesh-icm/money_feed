"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BottomNav } from "@/components/mf/BottomNav";
import { demoMacroContext, demoTraderProfile, top10Carousel } from "@/lib/demo";
import { formatINR, formatPct, formatPrice } from "@/lib/format";

type Tab = "trades" | "featured" | "stats";

function IconButton({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-[34px] h-[34px] bg-[color:var(--mf-card)] border border-[color:var(--mf-border)] rounded-[10px] flex items-center justify-center text-[15px] transition-colors hover:border-[color:var(--mf-accent)] hover:bg-[color:var(--mf-accent-light)]"
      aria-label={label}
      title={label}
    >
      {label === "share" ? "🔗" : "⋯"}
    </button>
  );
}

export function ProfileScreen({ username }: { username: string }) {
  const [following, setFollowing] = useState(true);
  const [tab, setTab] = useState<Tab>("trades");

  const handle = useMemo(() => {
    const clean = username.replace(/^@/, "");
    return `@${clean}`;
  }, [username]);

  const profile = demoTraderProfile;
  const trades = top10Carousel.slice(0, 3);

  const perf = {
    dateLabel: "25 Mar 2026",
    pnl: 148_296,
    avgReturn: 42.5,
    winRateText: "2/3",
    rankLabel: "🥇 #1 Today",
  };

  return (
    <div className="pb-[90px]">
      {/* Back nav */}
      <div className="flex items-center justify-between px-4 py-[14px] bg-[rgba(242,244,248,0.95)] backdrop-blur-[12px] sticky top-0 z-[100] border-b border-[color:var(--mf-border)]">
        <Link href="/feed" className="flex items-center gap-[6px] text-[13px] font-semibold text-[color:var(--mf-accent)]">
          ← Moneyfeed
        </Link>
        <div className="flex gap-2">
          <IconButton label="share" />
          <IconButton label="more" />
        </div>
      </div>

      {/* Hero */}
      <div className="bg-[color:var(--mf-card)]">
        <div className="h-[88px] bg-[linear-gradient(120deg,#0d1f4f_0%,#1a3a8f_45%,#1a6bff_75%,#00b870_100%)] relative overflow-hidden" />
        <div className="px-4 pb-4 relative">
          <div className="inline-block relative mt-[-28px] mb-[10px]">
            <div
              className="w-[60px] h-[60px] rounded-[16px] bg-gradient-to-br from-[color:var(--mf-accent)] to-[color:var(--mf-purple)] flex items-center justify-center mf-heading text-[20px] font-extrabold text-white border-[3px] border-[color:var(--mf-card)] shadow-[0_4px_14px_rgba(26,107,255,0.25)]"
            >
              {profile.initials}
            </div>
            <div className="absolute bottom-[-2px] right-[-4px] w-[18px] h-[18px] bg-[color:var(--mf-accent)] rounded-full flex items-center justify-center text-[9px] border-2 border-[color:var(--mf-card)] text-white">
              ✓
            </div>
          </div>

          <div className="mf-heading text-[19px] font-extrabold tracking-[-0.4px] mb-[2px]">
            {handle.replace(/^@/, "")}
          </div>
          <div className="mf-mono text-[11px] text-[color:var(--mf-text2)] mb-2">
            {handle} · Options Trader · BFO
          </div>

          <div className="flex flex-wrap gap-[5px] mb-[10px]">
            {profile.specialtyPills.map((p) => (
              <span
                key={p}
                className={[
                  "text-[10px] font-semibold px-[9px] py-[3px] rounded-[20px] inline-flex items-center gap-1",
                  p.includes("#1") || p.includes("🏆")
                    ? "bg-[color:var(--mf-gold-light)] text-[color:var(--mf-gold)]"
                    : p.includes("Sensex") || p.includes("⚡")
                      ? "bg-[color:var(--mf-purple-light)] text-[color:var(--mf-purple)]"
                      : p.includes("BFO")
                        ? "bg-[color:var(--mf-accent-light)] text-[color:var(--mf-accent)]"
                        : "bg-[color:var(--mf-green-light)] text-[color:var(--mf-green)]",
                ].join(" ")}
              >
                {p}
              </span>
            ))}
          </div>

          <div className="text-[12px] text-[color:var(--mf-text2)] leading-[1.55] mb-[14px]">
            {profile.bio}
          </div>

          {/* Social stats */}
          <div className="flex items-center py-3 border-y border-[color:var(--mf-border)] mb-[14px]">
            {[
              { n: profile.followers.toLocaleString("en-IN"), l: "Followers" },
              { n: profile.following.toLocaleString("en-IN"), l: "Following" },
              { n: `${profile.winRate}%`, l: "Win Rate" },
              { n: `${profile.tradesToday}`, l: "Trades Today" },
            ].map((s, idx) => (
              <div key={s.l} className="flex-1 text-center">
                <div className="mf-heading text-[17px] font-extrabold tracking-[-0.3px]">
                  {s.n}
                </div>
                <div className="text-[9px] text-[color:var(--mf-muted)] font-medium mt-[1px] uppercase tracking-[0.4px]">
                  {s.l}
                </div>
                {idx < 3 ? (
                  <div className="hidden" />
                ) : null}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setFollowing((v) => !v)}
              className={[
                "flex-1 py-[10px] rounded-[10px] text-[13px] font-bold transition-colors",
                following
                  ? "bg-[color:var(--mf-accent-light)] text-[color:var(--mf-accent)] border-[1.5px] border-[color:var(--mf-accent)]"
                  : "bg-[color:var(--mf-accent)] text-white hover:bg-[#0050cc]",
              ].join(" ")}
            >
              {following ? "✓ Following" : "+ Follow"}
            </button>
            <button
              type="button"
              className="w-[42px] h-[42px] bg-[color:var(--mf-card)] border-[1.5px] border-[color:var(--mf-border)] rounded-[10px] flex items-center justify-center text-[16px] hover:border-[color:var(--mf-accent)] hover:bg-[color:var(--mf-accent-light)] transition-colors"
              title="Notifications"
              aria-label="Notifications"
            >
              🔔
            </button>
            <button
              type="button"
              className="w-[42px] h-[42px] bg-[color:var(--mf-card)] border-[1.5px] border-[color:var(--mf-border)] rounded-[10px] flex items-center justify-center text-[16px] hover:border-[color:var(--mf-accent)] hover:bg-[color:var(--mf-accent-light)] transition-colors"
              title="Share"
              aria-label="Share"
            >
              🔗
            </button>
          </div>
        </div>
      </div>

      {/* Performance banner */}
      <div className="mx-[14px] mt-[10px] bg-[linear-gradient(120deg,#0d1f4f,#1a6bff)] rounded-[14px] px-4 py-[14px] text-white relative overflow-hidden">
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[40px] opacity-[0.15]">
          🔥
        </div>
        <div className="absolute top-3 right-4 bg-[rgba(255,255,255,0.15)] border border-[rgba(255,255,255,0.25)] rounded-[20px] px-[10px] py-[3px] text-[11px] font-bold">
          {perf.rankLabel}
        </div>
        <div className="text-[10px] font-semibold opacity-70 tracking-[0.8px] uppercase mb-[6px]">
          {perf.dateLabel} — Today&apos;s Performance
        </div>
        <div className="flex gap-5">
          <div>
            <div className="mf-heading text-[20px] font-extrabold tracking-[-0.5px]">
              {formatINR(perf.pnl)}
            </div>
            <div className="text-[10px] opacity-70 mt-[1px]">Realized P&amp;L</div>
          </div>
          <div>
            <div className="mf-heading text-[20px] font-extrabold tracking-[-0.5px]">
              {formatPct(perf.avgReturn).replace(/\.00%$/, "%")}
            </div>
            <div className="text-[10px] opacity-70 mt-[1px]">Avg return</div>
          </div>
          <div>
            <div className="mf-heading text-[20px] font-extrabold tracking-[-0.5px]">
              {perf.winRateText}
            </div>
            <div className="text-[10px] opacity-70 mt-[1px]">Win rate</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-3 flex bg-[color:var(--mf-card)] border-y border-[color:var(--mf-border)] sticky top-[53px] z-50">
        {[
          { id: "trades", label: "All Trades" },
          { id: "featured", label: "Featured" },
          { id: "stats", label: "Stats" },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id as Tab)}
            className={[
              "flex-1 text-center py-3 text-[12px] font-semibold cursor-pointer relative transition-colors",
              tab === t.id
                ? "text-[color:var(--mf-accent)] after:content-[''] after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[2px] after:bg-[color:var(--mf-accent)] after:rounded-sm"
                : "text-[color:var(--mf-muted)]",
            ].join(" ")}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Trades pane */}
      <div className="px-[14px] pb-[90px]">
        {tab === "trades" ? (
          <>
            <div className="mf-heading text-[10px] font-bold tracking-[1px] uppercase text-[color:var(--mf-muted)] pt-[14px] pb-[6px] flex items-center justify-between">
              <span>25 Mar 2026 · 3 trades</span>
              <span className="mf-mono text-[11px] font-bold text-[color:var(--mf-green)]">
                {formatINR(148_296)}
              </span>
            </div>

            {trades.map((t, idx) => {
              const featured = idx < 2;
              const positive = t.retPct >= 0;
              return (
                <div
                  key={`${t.username}-${t.rank}-${t.entry}`}
                  className="bg-[color:var(--mf-card)] border border-[color:var(--mf-border)] rounded-xl mb-2 overflow-hidden hover:shadow-[0_4px_16px_rgba(0,0,0,0.07)] transition-shadow cursor-pointer"
                >
                  {featured ? (
                    <div className="bg-[linear-gradient(90deg,var(--mf-gold-light),#fffbeb)] border-b border-[#fde68a] px-[14px] py-[5px] flex items-center gap-[6px] text-[10px] font-bold text-[color:var(--mf-gold)]">
                      🏆 Featured on Moneyfeed
                      <span className="bg-[color:var(--mf-gold)] text-white rounded px-[6px] py-[1px] text-[9px]">
                        #{idx === 0 ? 1 : 10} Return · 25 Mar
                      </span>
                    </div>
                  ) : null}

                  <div className="px-[14px] pt-[11px] pb-[10px]">
                    <div className="flex items-start justify-between mb-[6px]">
                      <div>
                        <div className="mf-heading text-[14px] font-extrabold tracking-[-0.2px]">
                          {t.instrumentName}
                        </div>
                        <div className="flex items-center gap-1 mt-[2px]">
                          <span className="mf-mono text-[9px] text-[color:var(--mf-muted)] bg-[color:var(--mf-bg)] border border-[color:var(--mf-border)] rounded-[3px] px-1 py-[1px]">
                            {t.symbol}
                          </span>
                          <span className="mf-mono text-[9px] text-[color:var(--mf-muted)] bg-[color:var(--mf-bg)] border border-[color:var(--mf-border)] rounded-[3px] px-1 py-[1px]">
                            {t.exchange}
                          </span>
                          {t.optionType && t.strike ? (
                            <span
                              className={[
                                "text-[9px] font-bold px-[6px] py-[2px] rounded",
                                t.optionType === "CE"
                                  ? "bg-[color:var(--mf-green-light)] text-[color:var(--mf-green)]"
                                  : "bg-[color:var(--mf-red-light)] text-[color:var(--mf-red)]",
                              ].join(" ")}
                            >
                              {t.optionType} · {t.strike}
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <div
                        className={[
                          "mf-heading text-[18px] font-extrabold",
                          positive
                            ? "text-[color:var(--mf-green)]"
                            : "text-[color:var(--mf-red)]",
                        ].join(" ")}
                      >
                        {formatPct(t.retPct)}
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-[color:var(--mf-text2)] leading-[1.5] px-[14px] py-2 border-y border-dashed border-[color:var(--mf-border)] italic bg-[#fafbfd]">
                    <span className="not-italic text-[color:var(--mf-accent)] mr-[3px]">
                      📰
                    </span>
                    {demoMacroContext}
                  </div>

                  <div className="flex px-[14px] py-2 border-b border-[color:var(--mf-border)]">
                    {[
                      { l: "Entry", v: formatPrice(t.entry) },
                      { l: "Exit", v: formatPrice(t.exit) },
                      { l: "Capital", v: formatINR(t.capital) },
                    ].map((s) => (
                      <div key={s.l} className="flex-1">
                        <div className="text-[9px] text-[color:var(--mf-muted)] mb-[2px]">
                          {s.l}
                        </div>
                        <div className="text-[12px] font-semibold text-[color:var(--mf-text)]">
                          {s.v}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between px-[14px] py-[7px]">
                    <span className="mf-mono text-[10px] text-[color:var(--mf-muted)]">
                      25 Mar 2026 · NRML
                    </span>
                    <span
                      className={[
                        "mf-mono text-[11px] font-bold",
                        t.pnl >= 0
                          ? "text-[color:var(--mf-green)]"
                          : "text-[color:var(--mf-red)]",
                      ].join(" ")}
                    >
                      {formatINR(t.pnl)}
                    </span>
                  </div>
                </div>
              );
            })}
          </>
        ) : null}

        {tab === "featured" ? (
          <div className="text-center py-10 text-[12px] text-[color:var(--mf-muted)]">
            2 featured trades today · Historical features coming soon
          </div>
        ) : null}

        {tab === "stats" ? (
          <div className="pt-4">
            <div className="bg-[color:var(--mf-card)] border border-[color:var(--mf-border)] rounded-xl p-4 mb-2">
              <div className="text-[9px] font-bold tracking-[0.6px] uppercase text-[color:var(--mf-muted)] mb-[10px]">
                P&amp;L Breakdown
              </div>
              <div className="flex flex-col gap-2">
                {trades.map((t) => (
                  <div key={`${t.username}-${t.rank}`} className="flex items-center justify-between">
                    <div className="text-[12px] text-[color:var(--mf-text2)]">
                      {t.symbol} {t.optionType} {t.strike}{" "}
                      <span
                        className={[
                          "text-[10px] font-semibold",
                          t.retPct >= 0
                            ? "text-[color:var(--mf-green)]"
                            : "text-[color:var(--mf-red)]",
                        ].join(" ")}
                      >
                        {formatPct(t.retPct)}
                      </span>
                    </div>
                    <div
                      className={[
                        "mf-mono text-[12px] font-bold",
                        t.pnl >= 0
                          ? "text-[color:var(--mf-green)]"
                          : "text-[color:var(--mf-red)]",
                      ].join(" ")}
                    >
                      {formatINR(t.pnl)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-[color:var(--mf-border)] pt-2 mt-2 flex items-center justify-between">
                <div className="text-[12px] font-bold">Net P&amp;L</div>
                <div className="mf-heading text-[16px] font-extrabold text-[color:var(--mf-green)]">
                  {formatINR(148_296)}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <BottomNav />
    </div>
  );
}

