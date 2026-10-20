import { useEffect, useState } from "react";

function rand(seed: number) {
  let x = Math.imul(seed ^ 0x9e3779b9, 0x85ebca6b);
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

/** Layered wedding ambience: glowing bokeh, twinkling stars, rising hearts, rotating mandala halo. */
export function Effects({ seed, dark, variant }: { seed: number; dark: boolean; variant: string }) {
  const [live, setLive] = useState(false);
  useEffect(() => setLive(true), []);
  if (!live) return null;

  const bokeh = Array.from({ length: 9 }, (_, i) => {
    const r = (n: number) => rand(seed * 97 + i * 13 + n);
    return {
      left: `${r(1) * 100}%`,
      top: `${r(2) * 100}%`,
      size: 40 + r(3) * 110,
      delay: `${-r(4) * 14}s`,
      dur: `${10 + r(5) * 10}s`,
    };
  });
  const stars = Array.from({ length: 22 }, (_, i) => {
    const r = (n: number) => rand(seed * 31 + i * 7 + n);
    return {
      left: `${r(1) * 100}%`,
      top: `${r(2) * 100}%`,
      delay: `${-r(3) * 4}s`,
      dur: `${2 + r(4) * 3}s`,
    };
  });
  const hearts = Array.from({ length: 6 }, (_, i) => {
    const r = (n: number) => rand(seed * 53 + i * 11 + n);
    return {
      left: `${8 + r(1) * 84}%`,
      delay: `${-r(2) * 16}s`,
      dur: `${12 + r(3) * 8}s`,
      size: 10 + r(4) * 10,
    };
  });

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden effects effects--${variant}`} aria-hidden>
      <div className={`fx-halo ${dark ? "fx-halo--dark" : ""}`} />
      {bokeh.map((b, i) => (
        <span
          key={`b${i}`}
          className="fx-bokeh"
          style={{ left: b.left, top: b.top, width: b.size, height: b.size, animationDelay: b.delay, animationDuration: b.dur }}
        />
      ))}
      {stars.map((s, i) => (
        <span
          key={`s${i}`}
          className="fx-star"
          style={{ left: s.left, top: s.top, animationDelay: s.delay, animationDuration: s.dur }}
        />
      ))}
      {hearts.map((h, i) => (
        <span
          key={`h${i}`}
          className="fx-heart"
          style={{ left: h.left, fontSize: h.size, animationDelay: h.delay, animationDuration: h.dur }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
