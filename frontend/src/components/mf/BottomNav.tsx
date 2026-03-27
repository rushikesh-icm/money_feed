"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: string;
  label: string;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      className="flex flex-1 flex-col items-center gap-[3px] cursor-pointer"
    >
      <div className="text-[19px]">{icon}</div>
      <div
        className={[
          "text-[9px] font-medium",
          active
            ? "text-[color:var(--mf-accent)] font-bold"
            : "text-[color:var(--mf-muted)]",
        ].join(" ")}
      >
        {label}
      </div>
    </Link>
  );
}

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-[color:var(--mf-card)] border-t border-[color:var(--mf-border)] flex pt-[10px] pb-[18px] z-[100]">
      <NavItem href="/feed" icon="📡" label="Moneyfeed" />
      <NavItem href="/profile/spread_king_59" icon="👤" label="Profile" />
    </div>
  );
}

