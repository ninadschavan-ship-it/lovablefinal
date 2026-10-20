import { wedding } from "./data";
import { Petals } from "./Petals";

export function Envelope({ opening, onOpen }: { opening: boolean; onOpen: () => void }) {
  return (
    <main className="env-scene relative flex min-h-screen items-center justify-center overflow-hidden p-6 font-serif-body">
      <div className="anim-drift pointer-events-none absolute inset-0" aria-hidden />
      <Petals colors={["#E8C5C8", "#F3D8D8", "#BEA063"]} kind="petal" count={14} seed={7} />

      <button
        type="button"
        onClick={onOpen}
        disabled={opening}
        aria-label="Open the wedding invitation"
        className={`env group ${opening ? "is-open" : ""}`}
      >
        <span className="env__body" aria-hidden />
        <span className="env__card" aria-hidden>
          <span className="flex flex-col items-center gap-1 px-4 pt-6 text-center">
            <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
              You are invited
            </span>
            <span className="name-lockup text-3xl leading-none text-primary">
              {wedding.groom.name} &amp; {wedding.bride.name}
            </span>
            <span className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
              {wedding.date.short}
            </span>
          </span>
        </span>
        <span className="env__pocket" aria-hidden />
        <span className="env__flap" aria-hidden />
        <span className="env__seal" aria-hidden>
          <span className="name-lockup text-xl leading-none">
            {wedding.groom.name[0]}
            <span className="text-[0.7em]"> &amp; </span>
            {wedding.bride.name[0]}
          </span>
        </span>
      </button>

      <p
        className={`pointer-events-none absolute bottom-8 text-center text-sm uppercase tracking-[0.3em] text-foreground/75 transition-opacity duration-700 ${
          opening ? "opacity-0" : "anim-pulse-soft opacity-100"
        }`}
      >
        Tap to open
      </p>
    </main>
  );
}
