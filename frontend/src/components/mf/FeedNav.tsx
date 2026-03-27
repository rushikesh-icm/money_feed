"use client";

export function FeedNav({
  dateLabel,
  tab,
  onTabChange,
}: {
  dateLabel: string;
  tab: "following" | "top";
  onTabChange: (tab: "following" | "top") => void;
}) {
  return (
    <div className="bg-[color:var(--mf-card)] px-4 pt-[14px] sticky top-0 z-[100] border-b border-[color:var(--mf-border)]">
      <div className="flex items-center justify-between mb-3">
        <div className="mf-heading text-[18px] font-extrabold">
          money<span className="text-[color:var(--mf-accent)]">feed</span>
        </div>
        <div className="flex items-center gap-[10px]">
          <div className="text-[10px] font-semibold text-[color:var(--mf-green)] bg-[color:var(--mf-green-light)] rounded-[20px] px-2 py-[3px] flex items-center gap-1">
            <span className="w-[5px] h-[5px] rounded-full bg-[color:var(--mf-green)]" />
            {dateLabel}
          </div>
          <div className="w-[30px] h-[30px] rounded-full bg-[color:var(--mf-accent)] text-white flex items-center justify-center text-[12px] font-bold">
            R
          </div>
        </div>
      </div>

      <div className="flex gap-5">
        <button
          type="button"
          onClick={() => onTabChange("following")}
          className={[
            "text-[13px] pb-[10px] cursor-pointer relative whitespace-nowrap",
            tab === "following"
              ? "text-[color:var(--mf-accent)] font-semibold after:content-[''] after:absolute after:-bottom-[1px] after:left-0 after:right-0 after:h-[2px] after:bg-[color:var(--mf-accent)] after:rounded-sm"
              : "text-[color:var(--mf-muted)] font-medium",
          ].join(" ")}
        >
          Following
        </button>
        <button
          type="button"
          onClick={() => onTabChange("top")}
          className={[
            "text-[13px] pb-[10px] cursor-pointer relative whitespace-nowrap",
            tab === "top"
              ? "text-[color:var(--mf-accent)] font-semibold after:content-[''] after:absolute after:-bottom-[1px] after:left-0 after:right-0 after:h-[2px] after:bg-[color:var(--mf-accent)] after:rounded-sm"
              : "text-[color:var(--mf-muted)] font-medium",
          ].join(" ")}
        >
          Top trades
        </button>
      </div>
    </div>
  );
}

