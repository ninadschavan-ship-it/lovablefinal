import { useEffect, useState } from "react";

type T = { done: boolean; days: number; hours: number; minutes: number; seconds: number };

const EMPTY: T = { done: false, days: 0, hours: 0, minutes: 0, seconds: 0 };

function parts(iso: string): T {
  const ms = new Date(iso).getTime() - Date.now();
  const clamped = Math.max(0, ms);
  return {
    done: ms <= 0,
    days: Math.floor(clamped / 86400000),
    hours: Math.floor((clamped / 3600000) % 24),
    minutes: Math.floor((clamped / 60000) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

/** Days-to-go counter. Only computes in the browser so server markup stays stable. */
export function Countdown({ iso }: { iso: string }) {
  const [t, setT] = useState<T>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setT(parts(iso));
    setReady(true);
    const id = window.setInterval(() => setT(parts(iso)), 1000);
    return () => window.clearInterval(id);
  }, [iso]);

  if (!ready) {
    return <div className="h-12" aria-hidden />;
  }

  if (t.done) {
    return <p className="font-script text-3xl text-primary">Today is the day</p>;
  }

  const cells = [
    { v: t.days, l: "days" },
    { v: t.hours, l: "hrs" },
    { v: t.minutes, l: "min" },
    { v: t.seconds, l: "sec" },
  ];

  return (
    <div className="flex items-end justify-center gap-4">
      {cells.map((c) => (
        <div key={c.l} className="flex flex-col items-center">
          <span className="tabular-nums text-2xl font-medium text-foreground">
            {String(c.v).padStart(2, "0")}
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/80">
            {c.l}
          </span>
        </div>
      ))}
    </div>
  );
}
