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
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="flex min-h-11 items-center gap-2 border border-ink/45 px-4 text-sm font-semibold text-ink transition hover:bg-ink hover:text-paper cursor-pointer"
      >
        <Menu className="h-4 w-4" aria-hidden />
        Menu
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 bg-night text-paper" role="dialog" aria-modal="true" aria-label="Menu" data-tone="dark">
            <div className="flex h-full flex-col px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="font-display text-xl font-extrabold uppercase tracking-tight">{SITE.shortName}</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex min-h-11 items-center gap-2 border border-paper/50 px-4 text-sm font-semibold transition hover:bg-paper hover:text-ink cursor-pointer"
                >
                  <X className="h-4 w-4" aria-hidden />
                  Close
                </button>
              </div>

              <nav className="mt-10 flex flex-1 flex-col justify-center" aria-label="Main">
                {NAV.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={currentPath === item.href ? "page" : undefined}
                    className={`block border-t border-night-line py-3.5 pl-4 font-display text-3xl font-bold tracking-tight first:border-t-0 sm:text-4xl ${
                      currentPath === item.href ? "-ml-px border-l-2 border-l-gold" : "ml-0 border-l-2 border-l-transparent"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="border-t border-night-line pt-6">
                <a href={SITE.phoneHref} className="btn btn-primary w-full">
                  Call {SITE.phone}
                </a>
                <p className="mt-4 text-sm text-paper/70">
                  {SITE.address.line1}, {SITE.address.line2}
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
