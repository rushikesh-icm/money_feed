"use client";

import { useMemo, useState } from "react";
import { BottomNav } from "@/components/mf/BottomNav";
import { FeedNav } from "@/components/mf/FeedNav";
import { SmartCarousel } from "@/components/mf/SmartCarousel";
import { TradeCard } from "@/components/mf/TradeCard";
import {
  demoDateLabel,
  suggestedTraders,
  top10Carousel,
  top20ByPnl,
  top20ByReturn,
} from "@/lib/demo";
import { formatPct } from "@/lib/format";

type FeedArea = "top20" | "following";
type LeaderboardTab = "returnPct" | "pnlAbs";

function SuggestedTraders() {
  return (
    <div className="mx-[14px] bg-[color:var(--mf-card)] border border-[color:var(--mf-border)] rounded-[14px] overflow-hidden">
      {suggestedTraders.map((t, idx) => (
        <div
          key={t.username}
          className={[
            "flex items-center gap-[10px] px-[14px] py-[11px]",
            idx === suggestedTraders.length - 1
              ? ""
              : "border-b border-[color:var(--mf-border)]",
            "hover:bg-[color:var(--mf-bg)] transition-colors",
          ].join(" ")}
        >
          <div
            className={[
              "w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-[12px] font-extrabold text-white mf-heading flex-shrink-0",
              t.gradientClass,
            ].join(" ")}
          >
            {t.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-bold text-[color:var(--mf-text)]">
              {t.username}
            </div>
            <div className="mf-mono text-[10px] text-[color:var(--mf-muted)] mt-[1px]">
              {t.specialtyPills.join(" · ")}
            </div>
            <div className="text-[10px] text-[color:var(--mf-text2)] mt-[2px]">
              Best today{" "}
              <span className="text-[color:var(--mf-green)] font-bold">
                {formatPct(12.46 + idx * 3.0)}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <div className="mf-mono text-[10px] text-[color:var(--mf-muted)]">
              {t.tradesToday} trades
            </div>
            <button
              type="button"
              className="text-[11px] font-bold px-[14px] py-[5px] rounded-[20px] border-[1.5px] border-[color:var(--mf-accent)] text-[color:var(--mf-accent)] hover:bg-[color:var(--mf-accent)] hover:text-white transition-colors whitespace-nowrap"
            >
              + Follow
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function FeedScreen() {
  const [topTab, setTopTab] = useState<"following" | "top">("top");
  const [area, setArea] = useState<FeedArea>("top20");
  const [lbTab, setLbTab] = useState<LeaderboardTab>("returnPct");

  const lbTitle = useMemo(
    () => (lbTab === "returnPct" ? "Top 20 by Return %" : "Top 20 by Absolute P&L"),
    [lbTab],
  );

  return (
    <div className="pb-[90px]">
      <FeedNav dateLabel={demoDateLabel} tab={topTab} onTabChange={setTopTab} />

      <div className="flex items-center justify-between px-[14px] pt-4 pb-2">
        <div className="mf-heading text-[13px] font-bold flex items-center gap-[6px]">
          🔥 Today&apos;s Top 10
        </div>
        <div className="text-[11px] text-[color:var(--mf-muted)]">
          Ranked by % return · Swipe →
        </div>
      </div>

      <SmartCarousel trades={top10Carousel} />

      <div className="flex items-center justify-between px-[14px] pt-[18px] pb-2">
        <div className="mf-heading text-[13px] font-bold flex items-center gap-[6px]">
          👥 Suggested Traders
        </div>
        <div className="text-[11px] text-[color:var(--mf-accent)] cursor-pointer font-semibold">
          See all
        </div>
      </div>
      <SuggestedTraders />

      {/* Feed toggle */}
      <div className="mt-[10px] mx-[14px] flex bg-[color:var(--mf-card)] border border-[color:var(--mf-border)] rounded-[10px] p-[3px]">
        <button
          type="button"
          onClick={() => setArea("top20")}
          className={[
            "flex-1 text-center text-[12px] font-medium py-[7px] rounded-[7px] transition-all",
            area === "top20"
              ? "bg-[color:var(--mf-accent)] text-white font-bold shadow-[0_2px_8px_rgba(26,107,255,0.25)]"
              : "text-[color:var(--mf-muted)]",
          ].join(" ")}
        >
          🏆 Top 20
        </button>
        <button
          type="button"
          onClick={() => setArea("following")}
          className={[
            "flex-1 text-center text-[12px] font-medium py-[7px] rounded-[7px] transition-all",
            area === "following"
              ? "bg-[color:var(--mf-accent)] text-white font-bold shadow-[0_2px_8px_rgba(26,107,255,0.25)]"
              : "text-[color:var(--mf-muted)]",
          ].join(" ")}
        >
          👥 Following
        </button>
      </div>

      {/* Leaderboard sub-tabs */}
      {area === "top20" ? (
        <>
          <div className="mt-[10px] mx-[14px] flex bg-[color:var(--mf-bg)] border border-[color:var(--mf-border)] rounded-[10px] p-[3px]">
            <button
              type="button"
              onClick={() => setLbTab("returnPct")}
              className={[
                "flex-1 text-center text-[11px] font-semibold py-[7px] rounded-[7px] transition-all leading-[1.3]",
                lbTab === "returnPct"
                  ? "bg-[color:var(--mf-card)] text-[color:var(--mf-text)] shadow-[0_1px_6px_rgba(0,0,0,0.08)]"
                  : "text-[color:var(--mf-muted)]",
              ].join(" ")}
            >
              📈 By Return %
              <span
                className={[
                  "block text-[9px] font-medium mt-[1px]",
                  lbTab === "returnPct"
                    ? "text-[color:var(--mf-accent)]"
                    : "text-[color:var(--mf-muted)]",
                ].join(" ")}
              >
                Biggest % gainers
              </span>
            </button>
            <button
              type="button"
              onClick={() => setLbTab("pnlAbs")}
              className={[
                "flex-1 text-center text-[11px] font-semibold py-[7px] rounded-[7px] transition-all leading-[1.3]",
                lbTab === "pnlAbs"
                  ? "bg-[color:var(--mf-card)] text-[color:var(--mf-text)] shadow-[0_1px_6px_rgba(0,0,0,0.08)]"
                  : "text-[color:var(--mf-muted)]",
              ].join(" ")}
            >
              ₹ By Absolute P&L
              <span
                className={[
                  "block text-[9px] font-medium mt-[1px]",
                  lbTab === "pnlAbs"
                    ? "text-[color:var(--mf-accent)]"
                    : "text-[color:var(--mf-muted)]",
                ].join(" ")}
              >
                Highest ₹ profits
              </span>
            </button>
          </div>

          <div className="flex items-center justify-between px-[14px] pt-[10px] pb-[6px]">
            <div className="mf-heading text-[12px] font-bold">{lbTitle}</div>
            <div className="mf-mono text-[11px] text-[color:var(--mf-muted)]">
              {demoDateLabel} · 20 trades
            </div>
          </div>

          <div className="px-[14px]">
            {lbTab === "returnPct"
              ? top20ByReturn.map((t) => (
                  <TradeCard key={`${t.username}-${t.rank}-${t.entry}`} trade={t} variant="return" />
                ))
              : top20ByPnl.map((t) => (
                  <TradeCard key={`${t.username}-${t.rank}-${t.entry}`} trade={t} variant="pnl" />
                ))}
          </div>
        </>
      ) : (
        <div className="text-center px-5 py-10">
          <div className="text-[32px] mb-[10px]">👥</div>
          <div className="mf-heading text-[15px] font-bold mb-[6px]">
            Follow traders to see their trades here
          </div>
          <div className="text-[12px] text-[color:var(--mf-muted)] leading-[1.6]">
            Tap <strong>+ Follow</strong> on any trader in the Top 20 to track
            their future trades in this feed.
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

