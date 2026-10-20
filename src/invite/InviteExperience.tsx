import { useCallback, useEffect, useRef, useState } from "react";
import { pages, wedding } from "./data";
import { Petals } from "./Petals";
import { Envelope } from "./Envelope";
import { PageContent } from "./Pages";
import { Effects } from "./Effects";

export function InviteExperience() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const wheelLock = useRef(0);
  const page = pages[index] ?? pages[0]!;
  const dark = page.tone === "dark";
  const photo = Boolean(page.photo);

  const go = useCallback((n: number) => {
    setIndex(Math.max(0, Math.min(pages.length - 1, n)));
  }, []);

  const reseal = useCallback(() => {
    setOpened(false);
    setOpening(false);
    setIndex(0);
  }, []);

  const open = useCallback(() => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => setOpened(true), 1700);
  }, [opening]);

  useEffect(() => {
    if (!opened) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowUp" || e.key === "PageUp" || e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, opened]);

  if (!opened) return <Envelope opening={opening} onOpen={open} />;

  const label = dark ? "text-on-dark" : "text-foreground";
  const edge = dark
    ? "border-on-dark/50 bg-on-dark/10 text-on-dark hover:bg-on-dark/20"
    : "border-accent/80 bg-card/75 text-foreground backdrop-blur-sm hover:bg-accent/20";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4 font-serif-body">
      <div className={`anim-drift scene-drift--${page.id} pointer-events-none absolute inset-0`} aria-hidden />

      <div
        style={{ touchAction: "none" }}
        className={`invite-card invite-card--${page.id} relative w-full max-w-xl overflow-hidden rounded-sm bg-card shadow-invite`}
        onWheel={(e) => {
          const now = Date.now();
          if (Math.abs(e.deltaY) < 25 || now - wheelLock.current < 900) return;
          wheelLock.current = now;
          go(index + (e.deltaY > 0 ? 1 : -1));
        }}
        onTouchStart={(e) => (touchX.current = e.changedTouches[0]?.clientY ?? null)}
        onTouchEnd={(e) => {
          const end = e.changedTouches[0]?.clientY;
          if (touchX.current === null || end === undefined) return;
          const dy = end - touchX.current;
          if (Math.abs(dy) > 48) go(index + (dy < 0 ? 1 : -1));
          touchX.current = null;
        }}
      >
        {!photo && (
          <>
            <img
              key={page.image}
              src={page.image}
              alt=""
              aria-hidden
              width={1024}
              height={1280}
              loading="lazy"
              className="anim-kenburns absolute inset-0 h-full w-full object-cover"
            />
            <div
              className={dark ? "wash-dark absolute inset-0" : page.id === "shubh-vivah" ? "wash-auspicious absolute inset-0" : "wash-light absolute inset-0"}
              aria-hidden
            />
          </>
        )}
        {photo && <div className="anim-drift absolute inset-0 opacity-80" aria-hidden />}
        <div className="absolute inset-0" style={{ background: page.tint }} aria-hidden />
        <div className={`design-overlay design-overlay--${page.id} absolute inset-0`} aria-hidden />
        <Effects key={`fx-${page.id}`} seed={page.seed} dark={dark} variant={page.id} />
        <Petals colors={page.colors} kind={page.petals} count={page.count} seed={page.seed} />
        <div className="anim-sheen pointer-events-none absolute inset-0" aria-hidden />

        <div className="relative flex min-h-[80svh] flex-col sm:min-h-[640px]">
          <header className="flex items-center justify-between px-6 pt-5">
            <button
              type="button"
              onClick={reseal}
              className={`font-script text-xl leading-none ${dark ? "text-on-dark" : "text-primary"}`}
              aria-label="Back to the envelope"
            >
              N &amp; N
            </button>
            <span className={`text-[11px] font-medium uppercase tracking-[0.28em] ${label}`}>{page.label}</span>
            <span className={`text-[11px] font-medium tabular-nums tracking-[0.18em] ${label}`}>
              {String(index + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}
            </span>
          </header>

          {photo ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-4">
              <img
                src={page.image}
                alt={`Save the date — ${wedding.groom.name} weds ${wedding.bride.name}, ${wedding.date.day} ${wedding.date.month} ${wedding.date.year}`}
                width={1240}
                height={1748}
                loading="lazy"
                className="anim-rise max-h-[56svh] w-auto max-w-full rounded-sm border border-accent/25 object-contain shadow-invite"
              />
              <PageContent page={page} />
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center px-6 py-8">
              <div key={page.id} className={`page-content page-content--${page.id} w-full`}>
                <PageContent page={page} />
              </div>
            </div>
          )}

          <nav className="flex items-center justify-between gap-4 px-6 pb-6">
            <button
              type="button"
              onClick={index === 0 ? reseal : () => go(index - 1)}
              className={`border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] transition-colors ${edge}`}
            >
              {index === 0 ? "Envelope" : "↑ Back"}
            </button>

            <div className="flex items-center gap-2">
              {pages.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Go to ${p.label}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === index
                      ? dark
                        ? "w-7 bg-on-dark"
                        : "w-7 bg-accent"
                      : dark
                        ? "w-1.5 bg-on-dark/30"
                        : "w-1.5 bg-accent/35"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(index + 1)}
              disabled={index === pages.length - 1}
              className={`border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] transition-opacity disabled:opacity-40 ${edge}`}
            >
              Next ↓
            </button>
          </nav>
          {index < pages.length - 1 && (
            <button
              type="button"
              onClick={() => go(index + 1)}
              className={`anim-bob mx-auto mb-6 block text-[11px] font-medium uppercase tracking-[0.28em] ${label}`}
            >
              Scroll down ⌄
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
