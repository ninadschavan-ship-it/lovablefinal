import type { ReactNode } from "react";
import { wedding, type PageDef, type Tone } from "./data";
import { calendarHref } from "./calendar";
import { Countdown } from "./Countdown";
import ganpati from "@/assets/ganpati-color.png";

function Kicker({ children, tone }: { children: ReactNode; tone: Tone }) {
  return (
    <p
      className={`text-[11px] font-bold uppercase tracking-[0.3em] ${
        tone === "dark" ? "text-on-dark" : "text-foreground"
      }`}
    >
      {children}
    </p>
  );
}

function Rule({ tone }: { tone: Tone }) {
  return (
    <span className={`block h-px w-20 ${tone === "dark" ? "bg-on-dark-faint" : "bg-accent"}`} />
  );
}

function Title({ children, tone }: { children: ReactNode; tone: Tone }) {
  return (
    <h2
      className={`font-script text-6xl leading-[1.05] ${
        tone === "dark" ? "text-on-dark" : "text-primary"
      }`}
    >
      {children}
    </h2>
  );
}

function Body({ children, tone }: { children: ReactNode; tone: Tone }) {
  return (
    <p
      className={`max-w-sm text-base font-medium leading-relaxed ${
        tone === "dark" ? "text-on-dark" : "text-foreground"
      }`}
    >
      {children}
    </p>
  );
}

function Line({ strong, soft, tone }: { strong: string; soft?: string; tone: Tone }) {
  return (
    <div className="text-center">
      <p
        className={`text-lg font-semibold tracking-wide ${
          tone === "dark" ? "text-on-dark" : "text-foreground"
        }`}
      >
        {strong}
      </p>
      {soft ? (
        <p className={`text-sm font-medium ${tone === "dark" ? "text-on-dark" : "text-foreground/90"}`}>
          {soft}
        </p>
      ) : null}
    </div>
  );
}

export function PageContent({ page }: { page: PageDef }) {
  const tone = page.tone;

  if (page.id === "shubh-vivah") {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <img
          src={ganpati}
          alt="Lord Ganesha"
          width={816}
          height={816}
          className="ganpati-art h-36 w-36 object-contain drop-shadow-[0_8px_24px_rgba(180,90,20,0.5)] sm:h-44 sm:w-44"
        />
        <p className="text-lg font-semibold tracking-wide text-foreground">
          ॥ श्री गणेशाय नमः ॥
        </p>
        <Title tone={tone}>Shubh Vivah</Title>
        <Rule tone={tone} />
        <Body tone={tone}>
          With the divine blessings of Lord Ganesha, we joyfully invite you to the wedding of
        </Body>
        <p className="name-lockup text-5xl leading-[1.1] text-primary">
          <span>{wedding.groom.name}</span> <span className="name-amp">&amp;</span> <span>{wedding.bride.name}</span>
        </p>
      </div>
    );
  }

  if (page.id === "invitation") {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <Kicker tone={tone}>With joy in our hearts</Kicker>
        <p className="text-xl font-semibold tracking-wide text-foreground">Mr. Surendra &amp; Mrs. Sujata Chavan</p>
        <Body tone={tone}>
          cordially invite you and your family to grace the wedding reception of our beloved son
        </Body>
        <div className="flex flex-col items-center">
          <h1 className="name-lockup text-6xl leading-[1.05] text-primary">{wedding.groom.name}</h1>
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground/90">with</span>
        <div className="flex flex-col items-center">
          <h1 className="name-lockup text-6xl leading-[1.05] text-primary">{wedding.bride.name}</h1>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/90">
            {wedding.bride.parents}
          </p>
        </div>
        <Rule tone={tone} />
        <div className="flex flex-col items-center gap-1">
          <p className="text-lg font-semibold uppercase tracking-[0.25em]">{wedding.date.weekday}</p>
          <p className="text-3xl font-medium">{wedding.date.display}</p>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/90">
            {wedding.date.time}
          </p>
        </div>
        <Countdown iso={wedding.date.iso} />
      </div>
    );
  }

  if (page.id === "reception") {
    return (
      <div className="flex flex-col items-center gap-5 text-center">
        <Kicker tone={tone}>You are invited to the</Kicker>
        <Title tone={tone}>Reception</Title>
        <Body tone={tone}>
          Join our family for an evening of music, dinner and blessings as our son Ninad and Neha begin married life together.
        </Body>
        <Rule tone={tone} />
        <Line strong={`${wedding.date.weekday}, ${wedding.date.day} ${wedding.date.month}`} tone={tone} />
        <Line strong="7:30 PM onwards" soft="Followed by Dinner" tone={tone} />
      </div>
    );
  }

  if (page.id === "venue") {
    return (
      <div className="flex flex-col items-center gap-5 text-center">
        <Kicker tone={tone}>Where to find us</Kicker>
        <Title tone={tone}>{wedding.venue.name}</Title>
        <Body tone={tone}>
          {wedding.venue.street}
          <br />
          {wedding.venue.area}
          <br />
          {wedding.venue.city}
        </Body>
        <Rule tone={tone} />
        <a
          href={wedding.venue.map}
          target="_blank"
          rel="noreferrer"
          className="border border-accent bg-card/80 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground backdrop-blur-sm transition-colors hover:bg-accent/20"
        >
          Open in Maps
        </a>
        <Body tone={tone}>
          Message/call us if you need help with directions.
        </Body>
      </div>
    );
  }

  if (page.id === "save-the-date") {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <Kicker tone={tone}>Mark your calendar</Kicker>
        <Body tone={tone}>
          {wedding.date.weekday} {wedding.date.day} {wedding.date.month}, {wedding.date.year}
          <br />
          {wedding.date.time}
        </Body>
        <a
          href={calendarHref()}
          download={`${wedding.groom.name}-${wedding.bride.name}-reception.ics`}
          className="border border-accent bg-card/80 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground backdrop-blur-sm transition-colors hover:bg-accent/20"
        >
          Add to calendar
        </a>
        <Body tone={tone}>
          We look forward to celebrate this beautiful occasion with you.
        </Body>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-5 text-center">
      <Kicker tone={tone}>Will you join us?</Kicker>
      <Title tone={tone}>RSVP</Title>
      <Body tone={tone}>Kindly let us know if you can join us — call or message us on the number this invitation was sent from.</Body>
    </div>
  );
}
