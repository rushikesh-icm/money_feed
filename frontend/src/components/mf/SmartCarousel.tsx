"use client";

import type { Trade } from "@/lib/demo";
import { formatPct, formatPrice } from "@/lib/format";

function scColorClass(i: number) {
  const cls = [
    "before:bg-gradient-to-r before:from-[color:var(--mf-green)] before:to-[color:var(--mf-accent)]",
    "before:bg-gradient-to-r before:from-[color:var(--mf-purple)] before:to-pink-600",
    "before:bg-gradient-to-r before:from-[color:var(--mf-gold)] before:to-[color:var(--mf-orange)]",
    "before:bg-gradient-to-r before:from-[color:var(--mf-accent)] before:to-cyan-500",
    "before:bg-gradient-to-r before:from-[color:var(--mf-red)] before:to-[color:var(--mf-orange)]",
  ];
  return cls[i % cls.length]!;
}

export function SmartCarousel({ trades }: { trades: Trade[] }) {
  return (
    <div className="flex gap-[10px] px-[14px] pb-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {trades.map((t, idx) => (
        <div
          key={`${t.username}-${t.rank}-${t.entry}`}
          className={[
            "relative overflow-hidden flex-[0_0_200px] cursor-pointer",
            "bg-[color:var(--mf-card)] border border-[color:var(--mf-border)] rounded-[14px] p-[14px]",
            "transition-[box-shadow,transform] duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.09)]",
            "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px]",
            scColorClass(idx),
          ].join(" ")}
        >
          <div
            className={[
              "inline-flex items-center gap-1 text-[9px] font-bold tracking-[0.4px] rounded-[20px] px-[7px] py-[2px] mb-2",
              t.rank === 1
                ? "bg-[color:var(--mf-gold-light)] text-[color:var(--mf-gold)]"
                : t.rank === 2
                  ? "bg-slate-100 text-slate-600"
                  : t.rank === 3
                    ? "bg-orange-50 text-orange-700"
                    : "bg-[color:var(--mf-accent-light)] text-[color:var(--mf-accent)]",
            ].join(" ")}
          >
            {t.rank <= 3 ? `${["🥇", "🥈", "🥉"][t.rank - 1]} #${t.rank} Today` : `#${t.rank} Today`}
          </div>

          <div className="mf-heading text-[13px] font-extrabold leading-[1.25] tracking-[-0.2px] mb-[1px]">
            {t.instrumentName}
          </div>
          <div className="mf-mono text-[9px] text-[color:var(--mf-muted)] mb-2">
            {t.symbol} · {t.exchange} · {t.optionType ?? "—"} · {t.username}
          </div>

          <div className="mf-heading text-[26px] font-extrabold tracking-[-1px] leading-none text-[color:var(--mf-green)]">
            {formatPct(t.retPct)}
          </div>

          <div className="flex items-center gap-[5px] mt-[6px]">
            {t.optionType ? (
              <span
                className={[
                  "text-[9px] font-semibold px-[6px] py-[2px] rounded",
                  t.optionType === "CE"
                    ? "bg-[color:var(--mf-green-light)] text-[color:var(--mf-green)]"
                    : "bg-[color:var(--mf-red-light)] text-[color:var(--mf-red)]",
                ].join(" ")}
              >
                {t.optionType}
              </span>
            ) : null}
            <span className="mf-mono text-[9px] text-[color:var(--mf-muted)]">
              {formatPrice(t.entry)} → {formatPrice(t.exit)}
            </span>
            <span className="mf-mono text-[9px] font-bold bg-[color:var(--mf-purple-light)] text-[color:var(--mf-purple)] rounded px-[5px] py-[2px]">
              {t.effRatio.toFixed(1)}×
            </span>
          </div>

          <div className="text-[10px] text-[color:var(--mf-text2)] leading-[1.45] mt-2 pt-2 border-t border-[color:var(--mf-border)] italic">
            {t.narrative}
          </div>
        </div>
      ))}
    </div>
  );
}

