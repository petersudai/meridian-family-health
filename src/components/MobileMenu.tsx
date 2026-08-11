import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { NAV, SITE } from "../lib/site";

export default function MobileMenu({ currentPath }: { currentPath: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="flex items-center gap-2 border border-ink/15 px-3 py-2 text-ink transition hover:border-ink cursor-pointer"
      >
        <Menu className="h-4 w-4" />
        <span className="font-mono text-[10px] uppercase tracking-[0.16em]">Menu</span>
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 bg-night" role="dialog" aria-modal="true">
            <div className="flex h-full flex-col px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-xl font-extrabold uppercase tracking-tight text-paper">
                  {SITE.shortName}
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex items-center gap-2 border border-paper/20 px-3 py-2 text-paper transition hover:border-paper cursor-pointer"
                >
                  <X className="h-4 w-4" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em]">Close</span>
                </button>
              </div>

              <nav className="mt-14 flex flex-1 flex-col justify-center gap-1">
                {NAV.map((item, i) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`group flex items-baseline gap-4 border-t border-paper/10 py-4 first:border-t-0 ${
                      currentPath === item.href ? "text-gold" : "text-paper"
                    }`}
                  >
                    <span className="font-mono text-xs text-paper/35">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-3xl font-bold uppercase tracking-tight transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">
                      {item.label}
                    </span>
                  </a>
                ))}
              </nav>

              <div className="flex flex-col gap-1 border-t border-paper/10 pt-6 font-mono text-xs text-paper/60">
                <a href={SITE.phoneHref} className="text-paper">{SITE.phone}</a>
                <p>{SITE.address.line1}</p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
