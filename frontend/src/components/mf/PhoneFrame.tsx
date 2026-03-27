import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-[color:var(--mf-bg)] text-[color:var(--mf-text)]">
      <div className="mx-auto max-w-[480px] min-h-dvh">{children}</div>
    </div>
  );
}

