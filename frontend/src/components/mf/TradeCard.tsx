"use client";

import Link from "next/link";
import type { Trade } from "@/lib/demo";
import { formatINR, formatPct, formatPrice } from "@/lib/format";

function rankBadge(rank: number) {
  if (rank === 1) {
    return {
      text: "🥇 #1 Return",
      className: "bg-[color:var(--mf-gold-light)] text-[color:var(--mf-gold)]",
    };
  }
  if (rank === 2) {
    return { text: "🥈 #2 Return", className: "bg-slate-100 text-slate-600" };
  }
  if (rank === 3) {
    return { text: "🥉 #3 Return", className: "bg-orange-50 text-orange-700" };
  }
  return {
    text: `#${rank}`,
    className:
      "bg-[color:var(--mf-bg)] text-[color:var(--mf-muted)] border border-[color:var(--mf-border)]",
  };
}

function avatarGradient(username: string) {
  const gradients = [
    "bg-gradient-to-br from-[color:var(--mf-accent)] to-[color:var(--mf-purple)]",
    "bg-gradient-to-br from-[color:var(--mf-purple)] to-pink-600",
    "bg-gradient-to-br from-[color:var(--mf-green)] to-[color:var(--mf-accent)]",
    "bg-gradient-to-br from-[color:var(--mf-gold)] to-[color:var(--mf-orange)]",
    "bg-gradient-to-br from-[color:var(--mf-red)] to-[color:var(--mf-orange)]",
    "bg-gradient-to-br from-cyan-500 to-[color:var(--mf-accent)]",
  ];
  let h = 0;
  for (let i = 0; i < username.length; i++) h = (h * 31 + username.charCodeAt(i)) >>> 0;
  return gradients[h % gradients.length];
}

function initials(username: string) {
  const clean = username.replace(/^@/, "");
  const parts = clean.split(/[_\-]/g).filter(Boolean);
  const a = parts[0]?.[0] ?? clean[0] ?? "U";
  const b = parts[1]?.[0] ?? clean[1] ?? "X";
  return (a + b).toUpperCase();
}

export function TradeCard({
  trade,
  variant,
}: {
  trade: Trade;
  variant: "return" | "pnl";
}) {
  const badge = variant === "return" ? rankBadge(trade.rank) : null;
  const retOrPnl =
    variant === "return" ? formatPct(trade.retPct) : formatINR(trade.pnl);
  const retColor =
    variant === "return"
      ? "text-[color:var(--mf-green)]"
      : trade.pnl >= 0
        ? "text-[color:var(--mf-green)]"
        : "text-[color:var(--mf-red)]";

  return (
    <div className="bg-[color:var(--mf-card)] border border-[color:var(--mf-border)] rounded-xl mb-[10px] overflow-hidden transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)]">
      <div className="flex items-center gap-[10px] px-[14px] pt-3">
        <div
          className={[
            "w-9 h-9 rounded-[10px] flex items-center justify-center text-[12px] font-extrabold text-white flex-shrink-0 mf-heading",
            avatarGradient(trade.username),
          ].join(" ")}
        >
          {initials(trade.username)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-[6px] flex-wrap">
            <Link
              href={`/profile/${trade.username.replace(/^@/, "")}`}
              className="text-[13px] font-bold text-[color:var(--mf-text)]"
            >
              {trade.username}
            </Link>
            {badge ? (
              <span
                className={[
                  "text-[9px] font-bold px-[6px] py-[1px] rounded-[10px]",
                  badge.className,
                ].join(" ")}
              >
                {badge.text}
              </span>
            ) : null}
          </div>
          <div className="mf-mono text-[10px] text-[color:var(--mf-muted)] mt-[1px]">
            {trade.exchange} · Options · NRML
          </div>
        </div>
        <div className={["mf-heading text-[18px] font-extrabold", retColor].join(" ")}>
          {retOrPnl}
        </div>
      </div>

      <div className="text-[12px] text-[color:var(--mf-text2)] leading-[1.5] px-[14px] pt-2 pb-[10px] italic border-b border-[color:var(--mf-border)]">
        {trade.narrative}
      </div>

      <div className="px-[14px] py-[10px] border-b border-[color:var(--mf-border)]">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="mf-heading text-[14px] font-extrabold tracking-[-0.2px] leading-[1.2] text-[color:var(--mf-text)]">
              {trade.instrumentName}
            </div>
            <div className="flex items-center gap-[5px] mt-[3px]">
              <span className="mf-mono text-[9px] text-[color:var(--mf-muted)] bg-[color:var(--mf-bg)] border border-[color:var(--mf-border)] rounded-[3px] px-[5px] py-[1px]">
                {trade.symbol}
              </span>
              {trade.optionType && trade.strike ? (
                <span
                  className={[
                    "text-[9px] font-bold px-[6px] py-[2px] rounded",
                    trade.optionType === "CE"
                      ? "bg-[color:var(--mf-green-light)] text-[color:var(--mf-green)]"
                      : "bg-[color:var(--mf-red-light)] text-[color:var(--mf-red)]",
                  ].join(" ")}
                >
                  {trade.optionType} · {trade.strike}
                </span>
              ) : null}
            </div>
          </div>

          <div className="text-right">
            <div className="text-[9px] text-[color:var(--mf-muted)] mb-[2px]">
              Realized P&L
            </div>
            <div
              className={[
                "mf-mono text-[12px] font-bold",
                trade.pnl >= 0
                  ? "text-[color:var(--mf-green)]"
                  : "text-[color:var(--mf-red)]",
              ].join(" ")}
            >
              {formatINR(trade.pnl)}
            </div>
          </div>
        </div>

        <div className="flex gap-[18px]">
          <div>
            <div className="text-[9px] text-[color:var(--mf-muted)] mb-[2px]">
              Entry
            </div>
            <div className="text-[12px] font-semibold text-[color:var(--mf-text)]">
              {formatPrice(trade.entry)}
            </div>
          </div>
          <div>
            <div className="text-[9px] text-[color:var(--mf-muted)] mb-[2px]">
              Exit
            </div>
            <div className="text-[12px] font-semibold text-[color:var(--mf-text)]">
              {formatPrice(trade.exit)}
            </div>
          </div>
          <div>
            <div className="text-[9px] text-[color:var(--mf-muted)] mb-[2px]">
              Capital
            </div>
            <div className="text-[12px] font-semibold text-[color:var(--mf-text)]">
              {formatINR(trade.capital || 0)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-[14px] py-2">
        <button
          type="button"
          className="text-[11px] font-bold px-[14px] py-[5px] rounded-[20px] border-[1.5px] border-[color:var(--mf-accent)] text-[color:var(--mf-accent)] hover:bg-[color:var(--mf-accent)] hover:text-white transition-colors"
        >
          + Follow
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="mf-mono text-[9px] font-bold bg-[color:var(--mf-purple-light)] text-[color:var(--mf-purple)] rounded px-[6px] py-[2px]"
            title="Efficiency = Return% ÷ Max Drawdown%"
          >
            Eff {trade.effRatio.toFixed(1)}× ℹ️
          </button>
          <span className="text-[10px] text-[color:var(--mf-muted)]">❤️ 41</span>
        </div>
      </div>
    </div>
  );
}

