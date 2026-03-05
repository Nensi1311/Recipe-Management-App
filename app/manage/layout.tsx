"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  Settings,
  ChevronRight,
} from "lucide-react";

export default function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { label: "My Recipes", href: "/manage", icon: LayoutDashboard },
    { label: "Create Recipe", href: "/manage/create", icon: PlusCircle },
  ];

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "250px 1fr", gap: "3rem" }}
    >
      <aside>
        <div
          className="glass"
          style={{
            padding: "1.5rem",
            borderRadius: "var(--rounded)",
            position: "sticky",
            top: "100px",
            border: "1px solid var(--border)",
          }}
        >
          <h3
            style={{
              fontSize: "0.9rem",
              fontWeight: 800,
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "1.5rem",
              letterSpacing: "1px",
            }}
          >
            Management
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            {menuItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="btn"
                  style={{
                    justifyContent: "flex-start",
                    background: active ? "var(--primary)" : "transparent",
                    color: active ? "white" : "var(--text)",
                    padding: "0.8rem 1rem",
                    transition: "0.2s",
                  }}
                >
                  <Icon size={20} />
                  {item.label}
                  {active && (
                    <ChevronRight size={16} style={{ marginLeft: "auto" }} />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </aside>

      <div className="fade-in">{children}</div>
    </div>
  );
}
