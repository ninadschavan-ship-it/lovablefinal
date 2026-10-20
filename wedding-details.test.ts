import { describe, expect, it } from "vitest";

import { calendarHref } from "@/invite/calendar";
import { pages, wedding } from "@/invite/data";

describe("Wedding details", () => {
  it("is issued by the groom's parents", () => {
    expect(wedding.hosts.names).toBe("Surendra & Sujata Chavan");
  });

  it("names both families in full", () => {
    expect(wedding.groom.name).toBe("Ninad");
    expect(wedding.groom.parents).toBe("Son of Surendra & Sujata Chavan");
    expect(wedding.bride.name).toBe("Neha");
    expect(wedding.bride.parents).toBe("Daughter of Vilas & Geeta Jadhav");
  });

  it("is set for Tuesday 24 November 2026 with the reception at seven thirty in the evening", () => {
    expect(wedding.date.day).toBe("24");
    expect(wedding.date.month).toBe("November");
    expect(wedding.date.year).toBe("2026");
    expect(new Date(wedding.date.iso).getUTCDay()).toBe(2); // Tuesday
    expect(wedding.date.iso).toBe("2026-11-24T14:00:00Z"); // 19:30 Calcutta
  });

  it("points at Durga Garden in Borivali West", () => {
    const full = `${wedding.venue.name} ${wedding.venue.street} ${wedding.venue.area} ${wedding.venue.city}`;
    expect(full).toContain("Durga Garden");
    expect(full).toContain("New Link Rd");
    expect(full).toContain("Eksar Village");
    expect(full).toContain("Borivali West");
    expect(full).toContain("Mumbai, Maharashtra 400091");
  });

  it("writes a calendar file that starts at the reception time", () => {
    const ics = decodeURIComponent(calendarHref());
    expect(ics).toContain("DTSTART:20261124T140000Z");
    expect(ics).toContain("DTEND:20261124T170000Z");
  });

  it("ends on the save-the-date photo", () => {
    expect(pages.at(-1)?.id).toBe("save-the-date");
    expect(pages.at(-1)?.photo).toBe(true);
  });

  it("opens with Shubh Vivah and has no blessings page", () => {
    expect(pages[0]?.id).toBe("shubh-vivah");
    expect(pages.some((p) => p.id === "blessings")).toBe(false);
  });

  it("states the reception time as 7.30pm onwards", () => {
    expect(wedding.date.time).toBe("7.30pm onwards");
  });
});
