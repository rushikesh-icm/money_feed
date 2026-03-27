"use client";

import { useEffect } from "react";

export function Toast({
  open,
  message,
  onClose,
}: {
  open: boolean;
  message: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, 2400);
    return () => clearTimeout(t);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed top-4 right-4 z-[200]">
      <div className="bg-[color:var(--ad-panel)] border border-[color:var(--ad-border2)] rounded-xl px-4 py-3 shadow-[0_16px_50px_rgba(0,0,0,0.45)]">
        <div className="ad-heading text-[12px] font-bold text-[color:var(--ad-text)]">
          {message}
        </div>
      </div>
    </div>
  );
}

