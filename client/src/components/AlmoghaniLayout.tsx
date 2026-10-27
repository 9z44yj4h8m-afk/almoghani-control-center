import { Link, useLocation } from "wouter";
import type { LucideIcon } from "lucide-react";
import {
  BellRing,
  ChevronLeft,
  Headphones,
  LayoutDashboard,
  Menu,
  Radio,
  Settings2,
  Tv2,
  UsersRound,
  X,
} from "lucide-react";
import { useState } from "react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
};

export const navItems: NavItem[] = [
  { href: "/", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/live", label: "البث المباشر", icon: Radio },
  { href: "/content", label: "القنوات والمسلسلات", icon: Tv2 },
  { href: "/users", label: "المستخدمون والاشتراكات", icon: UsersRound },
  { href: "/notifications", label: "الإشعارات", icon: BellRing, badge: "3" },
  { href: "/support", label: "الدعم الفني", icon: Headphones, badge: "3" },
  { href: "/settings", label: "إعدادات النظام", icon: Settings2 },
];

function BrandMark() {
  return (
    <div className="brand-lockup" aria-label="ALMOGHANI">
      <div className="brand-symbol"><Tv2 size={22} strokeWidth={2.2} /><span className="signal-dot" /></div>
      <span>ALMOGHANI</span>
    </div>
  );
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [location] = useLocation();
  return (
    <>
      <div className={`sidebar-backdrop ${open ? "is-open" : ""}`} onClick={onClose} />
      <aside className={`sidebar ${open ? "is-open" : ""}`}>
        <div className="sidebar-top">
          <BrandMark />
          <button className="icon-button sidebar-close" onClick={onClose} aria-label="إغلاق القائمة"><X size={18} /></button>
        </div>
        <nav className="side-nav" aria-label="التنقل الرئيسي">
          {navItems.map((item) => {
            const active = item.href === "/" ? location === "/" : location.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} onClick={onClose} className={`nav-link ${active ? "active" : ""}`}>
                <Icon size={19} strokeWidth={1.9} />
                <span>{item.label}</span>
                {item.badge && <b className="nav-badge">{item.badge}</b>}
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-foot">
          <div className="orbit-glow" />
          <span>عالم الترفيه بين يديك</span>
          <small>ALMOGHANI • CONTROL CENTER</small>
        </div>
      </aside>
    </>
  );
}

export default function AlmoghaniLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="app-shell" dir="rtl">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="main-shell">
        <header className="mobile-header">
          <button className="icon-button" onClick={() => setMenuOpen(true)} aria-label="فتح القائمة"><Menu size={21} /></button>
          <BrandMark />
          <span className="mobile-live-dot" />
        </header>
        {children}
      </main>
    </div>
  );
}

export function PageHeader({ eyebrow, title, subtitle, actions }: { eyebrow?: string; title: string; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <header className="page-header">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {actions && <div className="header-actions">{actions}</div>}
    </header>
  );
}

export function Panel({ children, className = "", title, icon: Icon, action }: { children: React.ReactNode; className?: string; title?: string; icon?: LucideIcon; action?: React.ReactNode }) {
  return (
    <section className={`panel ${className}`}>
      {(title || action) && <div className="panel-head"><div className="panel-title">{Icon && <Icon size={18} />}<h2>{title}</h2></div>{action}</div>}
      {children}
    </section>
  );
}

export function StatCard({ label, value, trend, icon: Icon, tone = "violet" }: { label: string; value: string; trend?: string; icon: LucideIcon; tone?: "violet" | "cyan" | "green" | "amber" }) {
  return (
    <div className={`stat-card tone-${tone}`}>
      <div className="stat-icon"><Icon size={21} /></div>
      <div className="stat-copy"><span>{label}</span><strong>{value}</strong>{trend && <small>{trend}</small>}</div>
      <div className="mini-spark"><i /><i /><i /><i /><i /></div>
    </div>
  );
}

export function ActionButton({ children, variant = "primary", onClick, icon: Icon }: { children: React.ReactNode; variant?: "primary" | "ghost" | "danger"; onClick?: () => void; icon?: LucideIcon }) {
  return <button className={`action-button ${variant}`} onClick={onClick}>{Icon && <Icon size={16} />}{children}</button>;
}

export function SearchBox({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) {
  return <label className="search-box"><span>⌕</span><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} /></label>;
}

export function StatusPill({ children, tone = "green" }: { children: React.ReactNode; tone?: "green" | "red" | "amber" | "blue" | "violet" }) {
  return <span className={`status-pill ${tone}`}><i />{children}</span>;
}

export function FilterChip({ active, children, onClick }: { active?: boolean; children: React.ReactNode; onClick?: () => void }) {
  return <button className={`filter-chip ${active ? "active" : ""}`} onClick={onClick}>{children}</button>;
}

export function BackLink() {
  return <Link href="/" className="back-link"><ChevronLeft size={16} /> العودة للوحة التحكم</Link>;
}
