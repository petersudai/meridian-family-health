import { useEffect, useRef, useState } from "react";

interface Waypoint {
  label: string;
  percent: number;
}

const BOTTOM_GAP = 24;

export default function MeridianLine() {
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
  const [progress, setProgress] = useState(0);
  const [label, setLabel] = useState("");
  const [onDark, setOnDark] = useState(false);
  const [top, setTop] = useState(73);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    function railBox() {
      const header = document.querySelector("header");
      const headerH = header ? header.getBoundingClientRect().height : 73;
      return { headerH, railH: window.innerHeight - headerH - BOTTOM_GAP };
    }

    function measure() {
      const { headerH } = railBox();
      setTop(headerH);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-meridian]"));
      if (docHeight <= 0 || nodes.length === 0) {
        setWaypoints([]);
        return;
      }
      setWaypoints(
        nodes.map((el) => ({
          label: el.dataset.meridian || "",
          percent: Math.min(100, Math.max(0, ((el.getBoundingClientRect().top + window.scrollY) / docHeight) * 100)),
        }))
      );
    }

    function update() {
      frame.current = null;
      const { headerH, railH } = railBox();
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100)) : 0;
      setProgress(pct);

      const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-meridian]"));
      const cutoff = window.scrollY + window.innerHeight * 0.35;
      let current = nodes[0];
      for (const el of nodes) {
        if (el.getBoundingClientRect().top + window.scrollY <= cutoff) current = el;
      }
      setLabel(current?.dataset.meridian || "");

      // Read what is actually behind the label so it stays legible on dark sections.
      const y = headerH + (railH * pct) / 100;
      const behind = document.elementFromPoint(window.innerWidth / 2, Math.min(y, window.innerHeight - 1));
      setOnDark(behind?.closest("[data-tone]")?.getAttribute("data-tone") === "dark");
    }

    function onScroll() {
      if (frame.current === null) frame.current = requestAnimationFrame(update);
    }

    measure();
    update();
    window.addEventListener("resize", () => {
      measure();
      onScroll();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  if (waypoints.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-3 z-30 hidden w-px lg:block"
      style={{ top, bottom: BOTTOM_GAP }}
    >
      {/* Track and ticks use difference blending so they read on both light and dark sections */}
      <div className="absolute inset-y-0 left-0 w-px bg-white/30 mix-blend-difference" />
      {waypoints.map((wp, i) => (
        <span
          key={i}
          className="absolute left-0 block h-px w-1.5 bg-white/60 mix-blend-difference"
          style={{ top: `${wp.percent}%` }}
        />
      ))}

      <div className="absolute left-0 top-0 w-px bg-gold" style={{ height: `${progress}%` }} />
      <div className="absolute left-0 flex items-center" style={{ top: `${progress}%` }}>
        <span className="-ml-[3px] block h-[7px] w-[7px] bg-gold" />
        <span
          className={`ml-3 hidden whitespace-nowrap text-xs font-semibold min-[1400px]:block ${
            onDark ? "text-paper" : "text-ink"
          }`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
