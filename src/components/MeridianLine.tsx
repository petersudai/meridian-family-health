import { useEffect, useRef, useState } from "react";

interface Waypoint {
  label: string;
  top: number;
  percent: number;
}

export default function MeridianLine() {
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    function measure() {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-meridian]"));
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0 || nodes.length === 0) {
        setWaypoints([]);
        return;
      }
      const points = nodes.map((el) => {
        const top = el.getBoundingClientRect().top + window.scrollY;
        return { label: el.dataset.meridian || "", top, percent: Math.min(100, (top / docHeight) * 100) };
      });
      setWaypoints(points);
    }

    function onScroll() {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? Math.min(100, (window.scrollY / docHeight) * 100) : 0;
        setProgress(pct);

        const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-meridian]"));
        let idx = 0;
        const cutoff = window.scrollY + window.innerHeight * 0.25;
        nodes.forEach((el, i) => {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= cutoff) idx = i;
        });
        setActiveIndex(idx);
      });
    }

    measure();
    onScroll();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (waypoints.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed left-8 top-0 z-30 hidden h-screen w-px xl:block"
      aria-hidden="true"
    >
      <div className="absolute left-0 top-0 h-full w-px bg-ink/12" />
      <div
        className="absolute left-0 top-0 w-px bg-gold transition-[height] duration-150 ease-out"
        style={{ height: `${progress}%` }}
      />

      {waypoints.map((wp, i) => (
        <div
          key={i}
          className="absolute left-0 flex items-center gap-2.5"
          style={{ top: `${wp.percent}%` }}
        >
          <span
            className={`h-px transition-all duration-300 ${
              i === activeIndex ? "w-3 bg-gold" : "w-1.5 bg-ink/25"
            }`}
          />
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-300 ${
              i === activeIndex ? "text-ink" : "text-ink/30"
            }`}
          >
            {wp.label}
          </span>
        </div>
      ))}
    </div>
  );
}
