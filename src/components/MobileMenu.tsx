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
        className="rounded-full p-2 text-ink transition hover:bg-forest-light cursor-pointer"
      >
        <Menu className="h-6 w-6" />
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <div className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-paper px-6 py-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-semibold text-ink">{SITE.shortName}</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="rounded-full p-2 text-ink-soft transition hover:bg-forest-light hover:text-ink cursor-pointer"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-1">
                {NAV.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-3 py-3 text-base font-medium transition ${
                      currentPath === item.href ? "bg-forest-light text-forest" : "text-ink hover:bg-forest-light"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-auto border-t border-ink/10 pt-6 text-sm text-ink-soft">
                <a href={SITE.phoneHref} className="block font-semibold text-ink">
                  {SITE.phone}
                </a>
                <p className="mt-1">{SITE.address.line1}</p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
