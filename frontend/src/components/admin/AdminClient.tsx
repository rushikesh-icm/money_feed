"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Toast } from "@/components/admin/Toast";

type PipelineStep = "upload" | "validate" | "anonymise" | "engine" | "publish";
type UploadStatus = "idle" | "file_loaded" | "validated" | "preview_ready" | "published";

function formatRows(n: number) {
  return n.toLocaleString("en-IN");
}

function Badge({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "green" | "yellow" | "blue" | "red";
}) {
  const cls =
    tone === "green"
      ? "bg-[color:var(--ad-green-glow)] text-[color:var(--ad-green)] border border-[rgba(0,201,122,0.2)]"
      : tone === "yellow"
        ? "bg-[rgba(245,200,66,0.1)] text-[color:var(--ad-yellow)] border border-[rgba(245,200,66,0.2)]"
        : tone === "red"
          ? "bg-[rgba(255,87,87,0.1)] text-[color:var(--ad-red)] border border-[rgba(255,87,87,0.2)]"
          : "bg-[color:var(--ad-accent-glow)] text-[color:var(--ad-accent)] border border-[rgba(79,143,255,0.2)]";
  return (
    <span className={["ad-mono text-[10px] font-medium px-2 py-[2px] rounded", cls].join(" ")}>
      {children}
    </span>
  );
}

function Card({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[color:var(--ad-panel)] border border-[color:var(--ad-border)] rounded-xl overflow-hidden">
      <div className="px-[18px] py-[14px] border-b border-[color:var(--ad-border)] flex items-center justify-between">
        <div className="ad-heading text-[13px] font-bold tracking-[-0.2px] text-[color:var(--ad-text)]">
          {title}
        </div>
        {badge}
      </div>
      <div className="px-[18px] py-4">{children}</div>
    </div>
  );
}

function stepState(step: PipelineStep, status: UploadStatus) {
  const order: Record<PipelineStep, number> = {
    upload: 1,
    validate: 2,
    anonymise: 3,
    engine: 4,
    publish: 5,
  };
  const at: Record<UploadStatus, PipelineStep> = {
    idle: "upload",
    file_loaded: "validate",
    validated: "anonymise",
    preview_ready: "engine",
    published: "publish",
  };
  const active = at[status];
  if (order[step] < order[active]) return "done";
  if (step === active) return "active";
  return "idle";
}

function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[150]">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="w-full max-w-[980px] bg-[color:var(--ad-panel)] border border-[color:var(--ad-border2)] rounded-2xl overflow-hidden shadow-[0_24px_90px_rgba(0,0,0,0.6)]">
          <div className="px-6 py-4 border-b border-[color:var(--ad-border)] flex items-center justify-between">
            <div className="ad-heading text-[14px] font-bold">{title}</div>
            <button
              type="button"
              onClick={onClose}
              className="ad-mono text-[12px] text-[color:var(--ad-text2)] hover:text-[color:var(--ad-text)]"
            >
              Close
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function AdminClient() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [drag, setDrag] = useState(false);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const meta = useMemo(() => {
    if (!file) return null;
    const rows = 482_310;
    const cols = 8;
    const sizeMb = Math.max(0.1, file.size / (1024 * 1024));
    const eligible = 463_631;
    return {
      rows,
      cols,
      sizeMb,
      eligible,
      filteredCap: 18_442,
      malformed: 237,
      processingTime: "1m 42s",
    };
  }, [file]);

  function acceptFile(f: File) {
    if (!/\.csv$/i.test(f.name)) {
      setToast("Only .csv files are accepted.");
      return;
    }
    setFile(f);
    setStatus("file_loaded");
    setToast("File loaded. Ready to validate.");
  }

  function onChoose() {
    fileInputRef.current?.click();
  }

  function onRemove() {
    setFile(null);
    setStatus("idle");
    setToast("File removed.");
  }

  function onValidate() {
    if (!file) {
      setToast("Upload a CSV first.");
      return;
    }
    setStatus("validated");
    setToast("Validation passed. Anonymisation queued.");
    window.setTimeout(() => setStatus("preview_ready"), 650);
  }

  function onPublish() {
    if (status !== "preview_ready" && status !== "published") {
      setToast("Run engine preview before publishing.");
      return;
    }
    setStatus("published");
    setToast("Published to live feed.");
  }

  const pipeline = [
    { key: "upload" as const, label: "Upload CSV", desc: file ? "File received" : "Awaiting file", n: "1" },
    { key: "validate" as const, label: "Validate", desc: status === "idle" ? "Waiting" : "All checks passed", n: "2" },
    { key: "anonymise" as const, label: "Anonymise", desc: status === "idle" ? "Waiting" : "IDs mapped", n: "3" },
    { key: "engine" as const, label: "Run Engine", desc: status === "preview_ready" || status === "published" ? "Preview ready" : "Computing", n: "4" },
    { key: "publish" as const, label: "Publish", desc: status === "published" ? "Published" : "Awaiting approval", n: "5" },
  ];

  const stats = [
    {
      label: "Trades Ranked",
      value: meta ? formatRows(meta.eligible) : "—",
      tone: "accent" as const,
      sub: "After quality filter",
    },
    {
      label: "Unique Traders",
      value: meta ? formatRows(91_204) : "—",
      tone: "text" as const,
      sub: "Anonymised usernames",
    },
    {
      label: "Top Return Today",
      value: meta ? "+18.4%" : "—",
      tone: "green" as const,
      sub: meta ? "TATAMOTORS · @silent_bull_99" : "—",
    },
  ];

  return (
    <div className="min-h-dvh bg-[color:var(--ad-bg)] text-[color:var(--ad-text)] ad-body">
      <Toast open={toast != null} message={toast ?? ""} onClose={() => setToast(null)} />

      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-[220px] bg-[color:var(--ad-panel)] border-r border-[color:var(--ad-border)] flex flex-col">
        <div className="px-5 pt-[22px] pb-5 border-b border-[color:var(--ad-border)]">
          <div className="ad-heading text-[18px] font-extrabold tracking-[-0.3px]">
            money<span className="text-[color:var(--ad-accent)]">fed</span>
          </div>
          <div className="ad-mono text-[10px] text-[color:var(--ad-text2)] mt-[3px] tracking-[0.5px]">
            OPS CONSOLE · v1.0
          </div>
        </div>

        <div className="px-[10px] py-4 flex-1">
          <div className="text-[9px] font-bold tracking-[1.5px] uppercase text-[color:var(--ad-text2)] px-[10px] py-[6px] mt-2">
            Daily Ops
          </div>
          {[
            { icon: "⬆️", label: "Upload & Publish", active: true },
            { icon: "🔍", label: "Preview Feed", active: false, onClick: () => setPreviewOpen(true) },
            { icon: "📅", label: "Publish History", active: false, onClick: () => setToast("History will load from backend.") },
          ].map((i) => (
            <button
              type="button"
              key={i.label}
              onClick={i.onClick}
              className={[
                "w-full text-left flex items-center gap-[10px] px-3 py-[9px] rounded-lg text-[13px] cursor-pointer transition-colors mb-[2px]",
                i.active
                  ? "bg-[color:var(--ad-accent-glow)] text-[color:var(--ad-accent)] font-semibold"
                  : "text-[color:var(--ad-text2)] hover:bg-[color:var(--ad-panel2)] hover:text-[color:var(--ad-text)]",
              ].join(" ")}
            >
              <span className="w-[18px] text-center text-[15px]">{i.icon}</span>
              {i.label}
            </button>
          ))}

          <div className="text-[9px] font-bold tracking-[1.5px] uppercase text-[color:var(--ad-text2)] px-[10px] py-[6px] mt-2">
            Settings
          </div>
          {[
            { icon: "⚙️", label: "Algorithm Config", onClick: () => setToast("Config will be editable once backend is wired.") },
            { icon: "🔐", label: "Access Control", onClick: () => setToast("Access control pending auth wiring.") },
          ].map((i) => (
            <button
              type="button"
              key={i.label}
              onClick={i.onClick}
              className="w-full text-left flex items-center gap-[10px] px-3 py-[9px] rounded-lg text-[13px] cursor-pointer transition-colors mb-[2px] text-[color:var(--ad-text2)] hover:bg-[color:var(--ad-panel2)] hover:text-[color:var(--ad-text)]"
            >
              <span className="w-[18px] text-center text-[15px]">{i.icon}</span>
              {i.label}
            </button>
          ))}
        </div>

        <div className="px-[14px] py-4 border-t border-[color:var(--ad-border)]">
          <div className="flex items-center gap-[10px]">
            <div className="w-8 h-8 rounded-lg bg-[linear-gradient(135deg,var(--ad-accent),#7c5fff)] flex items-center justify-center text-[12px] font-bold text-white">
              RK
            </div>
            <div>
              <div className="text-[12px] font-semibold">Rohit Kumar</div>
              <div className="text-[10px] text-[color:var(--ad-text2)]">
                InCred Ops Admin
              </div>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-[color:var(--ad-text2)]">
            Need auth? Go to{" "}
            <Link href="/admin/login" className="text-[color:var(--ad-accent)]">
              /admin/login
            </Link>
            .
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="ml-[220px] min-h-dvh flex flex-col">
        <div className="sticky top-0 z-50 bg-[color:var(--ad-panel)] border-b border-[color:var(--ad-border)] px-7 py-[14px] flex items-center justify-between">
          <div className="ad-heading text-[16px] font-bold">
            Daily Upload &amp; Publish Pipeline
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-[6px] text-[11px] font-semibold text-[color:var(--ad-red)] bg-[rgba(255,87,87,0.1)] border border-[rgba(255,87,87,0.2)] rounded-[20px] px-[10px] py-1">
              <span className="w-[6px] h-[6px] rounded-full bg-[color:var(--ad-red)]" />
              Market Closed
            </div>
            <div className="ad-mono text-[11px] text-[color:var(--ad-text2)]">
              THU 27 MAR 2026 · 16:32 IST
            </div>
          </div>
        </div>

        <div className="p-7">
          {/* Pipeline */}
          <div className="flex items-center bg-[color:var(--ad-panel)] border border-[color:var(--ad-border)] rounded-xl px-5 py-4 overflow-x-auto mb-7">
            {pipeline.map((s, idx) => {
              const st = stepState(s.key, status);
              return (
                <div key={s.label} className="flex items-center flex-1 min-w-[120px]">
                  <div className="flex items-center gap-[10px] flex-1">
                    <div
                      className={[
                        "w-7 h-7 rounded-full flex items-center justify-center ad-mono text-[12px] font-semibold border-2",
                        st === "done"
                          ? "bg-[color:var(--ad-green)] border-[color:var(--ad-green)] text-black"
                          : st === "active"
                            ? "bg-[color:var(--ad-accent)] border-[color:var(--ad-accent)] text-white shadow-[0_0_12px_var(--ad-accent-glow)]"
                            : "bg-[color:var(--ad-panel2)] border-[color:var(--ad-border2)] text-[color:var(--ad-text2)]",
                      ].join(" ")}
                    >
                      {st === "done" ? "✓" : s.n}
                    </div>
                    <div>
                      <div
                        className={[
                          "text-[12px] font-semibold",
                          st === "done"
                            ? "text-[color:var(--ad-green)]"
                            : st === "active"
                              ? "text-[color:var(--ad-accent)]"
                              : "text-[color:var(--ad-text2)]",
                        ].join(" ")}
                      >
                        {s.label}
                      </div>
                      <div className="text-[10px] text-[color:var(--ad-text2)] opacity-70 mt-[1px]">
                        {s.desc}
                      </div>
                    </div>
                  </div>
                  {idx < pipeline.length - 1 ? (
                    <div className="px-[10px] text-[14px] text-[color:var(--ad-border2)] flex-shrink-0">
                      →
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <Card
              title="📂 CSV Upload — AD-01"
              badge={
                status === "idle" ? (
                  <Badge tone="yellow">Awaiting File</Badge>
                ) : status === "published" ? (
                  <Badge tone="green">Published</Badge>
                ) : (
                  <Badge tone="green">File Loaded</Badge>
                )
              }
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) acceptFile(f);
                }}
              />

              <div
                role="button"
                tabIndex={0}
                onClick={onChoose}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onChoose();
                }}
                onDragEnter={(e) => {
                  e.preventDefault();
                  setDrag(true);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDrag(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setDrag(false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setDrag(false);
                  const f = e.dataTransfer.files?.[0];
                  if (f) acceptFile(f);
                }}
                className={[
                  "border-2 border-dashed rounded-[10px] px-5 py-8 text-center bg-[color:var(--ad-panel2)] transition-colors cursor-pointer select-none",
                  drag
                    ? "border-[color:var(--ad-accent)] bg-[color:var(--ad-accent-glow)]"
                    : "border-[color:var(--ad-border2)] hover:border-[color:var(--ad-accent)] hover:bg-[color:var(--ad-accent-glow)]",
                ].join(" ")}
              >
                <div className="text-[36px] mb-[10px]">📄</div>
                <div className="ad-heading text-[15px] font-bold mb-1">
                  Drop your trades CSV here
                </div>
                <div className="text-[12px] text-[color:var(--ad-text2)] leading-[1.5] mb-[14px]">
                  Drag &amp; drop or click to browse.
                  <br />
                  Only .csv files accepted.
                </div>
                <div className="flex justify-center gap-2 mb-4">
                  {[".csv", "Max 50 MB", "UTF-8"].map((t) => (
                    <span
                      key={t}
                      className="ad-mono text-[10px] px-2 py-[3px] rounded bg-[color:var(--ad-panel)] border border-[color:var(--ad-border2)] text-[color:var(--ad-text2)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChoose();
                  }}
                  className="inline-block px-[22px] py-[9px] rounded-lg bg-[color:var(--ad-accent)] text-white text-[13px] font-semibold hover:bg-[#3a6fd4] hover:shadow-[0_0_20px_var(--ad-accent-glow)] transition-shadow"
                >
                  Choose File
                </button>
              </div>

              {file ? (
                <div className="mt-3 bg-[color:var(--ad-green-glow)] border-2 border-[rgba(0,201,122,0.3)] rounded-[10px] px-4 py-[14px] flex items-center gap-3">
                  <div className="text-[22px]">✅</div>
                  <div className="flex-1">
                    <div className="ad-mono text-[12px] font-medium text-[color:var(--ad-green)]">
                      {file.name}
                    </div>
                    <div className="text-[11px] text-[color:var(--ad-text2)] mt-[2px]">
                      {meta ? `${formatRows(meta.rows)} rows · ${meta.cols} columns · ${meta.sizeMb.toFixed(1)} MB` : ""}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onRemove}
                    className="text-[16px] text-[color:var(--ad-text2)] hover:text-[color:var(--ad-text)]"
                    aria-label="Remove file"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              ) : null}

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={onValidate}
                  className="px-4 py-[10px] rounded-lg text-[13px] font-semibold bg-[color:var(--ad-accent)] text-white hover:bg-[#3a6fd4] hover:shadow-[0_0_20px_var(--ad-accent-glow)] transition-shadow disabled:opacity-50"
                  disabled={!file}
                >
                  ✅ Validate Now
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewOpen(true)}
                  className="px-4 py-[10px] rounded-lg text-[13px] font-semibold border border-[color:var(--ad-border2)] text-[color:var(--ad-text2)] hover:border-[color:var(--ad-text2)] hover:text-[color:var(--ad-text)] transition-colors disabled:opacity-50"
                  disabled={status === "idle"}
                >
                  👁 Preview
                </button>
              </div>
            </Card>

            <Card
              title="✅ Validation Report — AD-02"
              badge={
                status === "idle" ? (
                  <Badge tone="yellow">WAITING</Badge>
                ) : status === "file_loaded" ? (
                  <Badge tone="yellow">READY</Badge>
                ) : (
                  <Badge tone="green">PASSED</Badge>
                )
              }
            >
              <div className="grid grid-cols-2 gap-[6px] mb-4">
                {[
                  "Trade_ID",
                  "User_ID",
                  "Ticker_Symbol",
                  "Entry_Price",
                  "Exit_Price",
                  "Max_Drawdown_Pct",
                  "Capital_Deployed",
                ].map((c) => (
                  <div
                    key={c}
                    className="flex items-center gap-2 px-[10px] py-[7px] bg-[color:var(--ad-panel2)] border border-[color:var(--ad-border)] rounded-md"
                  >
                    <span
                      className={[
                        "text-[12px]",
                        status === "idle" ? "text-[color:var(--ad-text2)]" : "text-[color:var(--ad-green)]",
                      ].join(" ")}
                    >
                      {status === "idle" ? "•" : "✓"}
                    </span>
                    <span className="ad-mono text-[11px] text-[color:var(--ad-text2)]">
                      {c}
                    </span>
                  </div>
                ))}
              </div>

              {[
                {
                  icon: "📋",
                  label: "Total rows ingested",
                  value: meta ? formatRows(meta.rows) : "—",
                  tone: "ok",
                },
                {
                  icon: "🔻",
                  label: "Filtered (Capital < ₹10,000)",
                  value: meta ? `−${formatRows(meta.filteredCap)}` : "—",
                  tone: "warn",
                },
                {
                  icon: "⚠️",
                  label: "Malformed / null rows rejected",
                  value: meta ? `−${formatRows(meta.malformed)}` : "—",
                  tone: "warn",
                },
                {
                  icon: "✅",
                  label: "Eligible trades for ranking",
                  value: meta ? formatRows(meta.eligible) : "—",
                  tone: "ok",
                },
                {
                  icon: "🕐",
                  label: "Processing time",
                  value: meta ? meta.processingTime : "—",
                  tone: "info",
                },
              ].map((r) => (
                <div
                  key={r.label}
                  className="flex items-center gap-[10px] py-2 border-b border-[color:var(--ad-border)] last:border-b-0 text-[12px]"
                >
                  <div className="w-[18px] text-center">{r.icon}</div>
                  <div className="flex-1 text-[color:var(--ad-text2)]">{r.label}</div>
                  <div
                    className={[
                      "ad-mono text-[11px] font-semibold",
                      r.tone === "ok"
                        ? "text-[color:var(--ad-green)]"
                        : r.tone === "warn"
                          ? "text-[color:var(--ad-yellow)]"
                          : "text-[color:var(--ad-accent)]",
                    ].join(" ")}
                  >
                    {r.value}
                  </div>
                </div>
              ))}
            </Card>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-[color:var(--ad-panel2)] border border-[color:var(--ad-border)] rounded-[10px] px-4 py-[14px]"
              >
                <div className="text-[10px] font-semibold tracking-[0.8px] uppercase text-[color:var(--ad-text2)] mb-[6px]">
                  {s.label}
                </div>
                <div
                  className={[
                    "ad-heading text-[24px] font-extrabold tracking-[-0.5px]",
                    s.tone === "accent"
                      ? "text-[color:var(--ad-accent)]"
                      : s.tone === "green"
                        ? "text-[color:var(--ad-green)]"
                        : "text-[color:var(--ad-text)]",
                  ].join(" ")}
                >
                  {s.value}
                </div>
                <div className="text-[11px] text-[color:var(--ad-text2)] mt-[3px]">
                  {s.sub}
                </div>
              </div>
            ))}
          </div>

          <Card
            title="🏆 Engine Preview — Top 20 + Smart Picks"
            badge={
              status === "preview_ready" || status === "published" ? (
                <Badge tone="blue">PREVIEW READY</Badge>
              ) : (
                <Badge tone="yellow">WAITING</Badge>
              )
            }
          >
            <div className="overflow-x-auto rounded-lg border border-[color:var(--ad-border)]">
              <table className="w-full border-collapse text-[12px]">
                <thead className="bg-[color:var(--ad-panel2)] border-b border-[color:var(--ad-border2)]">
                  <tr className="text-left">
                    {[
                      "Rank",
                      "Moneyfed Username",
                      "Ticker",
                      "Return %",
                      "Efficiency Ratio",
                      "Max Drawdown",
                      "Smart Pick",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-3 py-[10px] ad-mono text-[10px] font-semibold tracking-[0.5px] uppercase text-[color:var(--ad-text2)] whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      r: "🥇 1",
                      u: "@silent_bull_99",
                      t: "TATAMOTORS",
                      ret: "+18.4%",
                      eff: "9.2x",
                      dd: "2.0%",
                      sp: "⚡ #1",
                    },
                    {
                      r: "🥈 2",
                      u: "@quant_ghost",
                      t: "INFY",
                      ret: "+12.1%",
                      eff: "7.8x",
                      dd: "1.6%",
                      sp: "⚡ #2",
                    },
                    {
                      r: "🥉 3",
                      u: "@delta_monk",
                      t: "RELIANCE",
                      ret: "+9.7%",
                      eff: "6.5x",
                      dd: "1.5%",
                      sp: "⚡ #3",
                    },
                  ].map((row) => (
                    <tr
                      key={row.u}
                      className="border-b border-[color:var(--ad-border)] last:border-b-0 hover:bg-[color:var(--ad-panel2)]"
                    >
                      <td className="px-3 py-[9px] ad-mono font-bold text-[color:var(--ad-yellow)]">
                        {row.r}
                      </td>
                      <td className="px-3 py-[9px] text-[11px] text-[color:var(--ad-text2)]">
                        {row.u}
                      </td>
                      <td className="px-3 py-[9px] ad-mono font-semibold text-[color:var(--ad-accent)]">
                        {row.t}
                      </td>
                      <td className="px-3 py-[9px] ad-mono font-bold text-[color:var(--ad-green)]">
                        {row.ret}
                      </td>
                      <td className="px-3 py-[9px] ad-mono text-[color:var(--ad-green)]">
                        {row.eff}
                      </td>
                      <td className="px-3 py-[9px] ad-mono text-[color:var(--ad-text2)]">
                        {row.dd}
                      </td>
                      <td className="px-3 py-[9px]">
                        <span className="inline-block bg-[color:var(--ad-accent-glow)] text-[color:var(--ad-accent)] text-[9px] font-bold px-[5px] py-[1px] rounded-[3px]">
                          {row.sp}
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center text-[11px] text-[color:var(--ad-text2)] px-3 py-[10px]"
                    >
                      + 17 more rows ·{" "}
                      <button
                        type="button"
                        onClick={() => setPreviewOpen(true)}
                        className="text-[color:var(--ad-accent)] font-semibold hover:underline"
                      >
                        Open full preview
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          <div className="mt-4 bg-[linear-gradient(135deg,rgba(0,201,122,0.1),rgba(79,143,255,0.08))] border border-[rgba(0,201,122,0.25)] rounded-xl px-5 py-[18px] flex items-center gap-4">
            <div className="text-[28px]">🚀</div>
            <div>
              <div className="ad-heading text-[14px] font-bold text-[color:var(--ad-green)] mb-[2px]">
                Ready to Publish to Live App
              </div>
              <div className="text-[12px] text-[color:var(--ad-text2)]">
                Top 20 leaderboard + 4 Smart Picks queued · Will replace today&apos;s
                04:00 AM feed · ~1.2M users will see this
              </div>
            </div>
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                className="px-5 py-[10px] rounded-lg text-[13px] font-semibold border border-[color:var(--ad-border2)] text-[color:var(--ad-text2)] hover:border-[color:var(--ad-text2)] hover:text-[color:var(--ad-text)] transition-colors"
              >
                👁 Full Preview
              </button>
              <button
                type="button"
                onClick={onPublish}
                disabled={status !== "preview_ready" && status !== "published"}
                className="px-5 py-[10px] rounded-lg text-[13px] font-bold bg-[color:var(--ad-green)] text-black hover:opacity-85 hover:shadow-[0_0_20px_var(--ad-green-glow)] transition-shadow disabled:opacity-40 disabled:cursor-not-allowed"
              >
                🚀 Publish Now — AD-05
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={previewOpen}
        title="Full Engine Preview"
        onClose={() => setPreviewOpen(false)}
      >
        <div className="text-[12px] text-[color:var(--ad-text2)] mb-4">
          This is a UI preview. Next step is wiring it to backend `/api/admin/preview/:date`.
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { k: "Status", v: status.toUpperCase() },
            { k: "Rows", v: meta ? formatRows(meta.rows) : "—" },
            { k: "Eligible", v: meta ? formatRows(meta.eligible) : "—" },
          ].map((x) => (
            <div
              key={x.k}
              className="bg-[color:var(--ad-panel2)] border border-[color:var(--ad-border)] rounded-xl px-4 py-3"
            >
              <div className="text-[10px] font-semibold tracking-[0.8px] uppercase text-[color:var(--ad-text2)] mb-[6px]">
                {x.k}
              </div>
              <div className="ad-mono text-[13px] font-semibold text-[color:var(--ad-text)]">
                {x.v}
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}

