import { wedding } from "./data";

const pad = (n: number) => String(n).padStart(2, "0");

function toIcs(iso: string) {
  const d = new Date(iso);
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`
  );
}

function esc(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

const venueLine = `${wedding.venue.name}, ${wedding.venue.street}, ${wedding.venue.area}, ${wedding.venue.city}`;

/** .ics data URL for the wedding reception, three hours long. */
export function calendarHref() {
  const start = wedding.date.iso;
  const end = new Date(new Date(start).getTime() + 3 * 60 * 60 * 1000).toISOString();
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "PRODID:-//Ninad and Neha//Wedding 2026//EN",
    "BEGIN:VEVENT",
    "UID:ninad-neha-reception-20261124@invite",
    `DTSTAMP:${toIcs(start)}`,
    `DTSTART:${toIcs(start)}`,
    `DTEND:${toIcs(end)}`,
    `SUMMARY:${esc(`${wedding.groom.name} & ${wedding.bride.name} — Wedding Reception`)}`,
    `LOCATION:${esc(venueLine)}`,
    `DESCRIPTION:${esc(
      `Wedding reception of ${wedding.groom.name} ${wedding.groom.surname} and ${wedding.bride.name} ${wedding.bride.surname}. ${wedding.date.time}.`,
    )}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}
