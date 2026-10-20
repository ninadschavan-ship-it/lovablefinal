import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { PetalKind } from "./data";

/** Integer-only hash so server and browser agree on every digit. */
function rand(n: number) {
  let x = Math.imul(n | 0, 1664525) + 1013904223;
  x ^= x >>> 15;
  x = Math.imul(x, 2246822507);
  x ^= x >>> 13;
  return (x >>> 0) % 100000 / 100000;
}

type PetalsProps = {
  colors: string[];
  kind: PetalKind;
  count: number;
  seed: number;
};

/** Drifting petals / leaves / sparks. Browser-only so SSR markup stays identical. */
export function Petals({ colors, kind, count, seed }: PetalsProps) {
  const [live, setLive] = useState(false);

  useEffect(() => {
    setLive(true);
  }, []);

  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const r = (k: number) => rand(seed * 97 + i * 13 + k * 5);
        return {
          left: r(1) * 100,
          delay: -r(2) * 18,
          dur: (kind === "spark" ? 7 : 11) + r(3) * 11,
          size: kind === "spark" ? 3 + r(4) * 5 : 11 + r(4) * 15,
          dx: (r(5) - 0.5) * 26,
          rot: 200 + r(6) * 520,
          op: 0.3 + r(7) * 0.55,
          color: colors[Math.floor(r(8) * colors.length) % colors.length],
        };
      }),
    [colors, count, kind, seed],
  );

  if (!live) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((it, i) => {
        const style = {
          left: `${it.left}%`,
          width: `${it.size}px`,
          height: `${kind === "spark" ? it.size : it.size * 0.7}px`,
          background:
            kind === "spark"
              ? `radial-gradient(circle, ${it.color} 0%, ${it.color}00 70%)`
              : `linear-gradient(140deg, ${it.color} 0%, ${it.color}99 100%)`,
          boxShadow: kind === "spark" ? `0 0 ${it.size * 3}px ${it.color}88` : "none",
          "--dur": `${it.dur}s`,
          "--delay": `${it.delay}s`,
          "--dx": `${it.dx}vw`,
          "--rot": `${it.rot}deg`,
          "--op": `${it.op}`,
        } as CSSProperties;
        return (
          <span
            key={i}
            className={kind === "spark" ? "petal petal--spark anim-spark" : "petal anim-petal"}
            style={style}
          />
        );
      })}
    </div>
  );
}
