import { createFileRoute } from "@tanstack/react-router";
import { InviteExperience } from "@/invite/InviteExperience";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ninad & Neha — Wedding Invitation" },
      {
        name: "description",
        content:
          "Ninad Chavan weds Neha Jadhav. Wedding reception on Tuesday 24 November 2026, 7.30pm onwards at Durga Garden, Borivali West, Mumbai.",
      },
      { property: "og:title", content: "Ninad & Neha — Wedding Invitation" },
      {
        property: "og:description",
        content:
          "Ninad Chavan weds Neha Jadhav. Wedding reception on Tuesday 24 November 2026, 7.30pm onwards at Durga Garden, Borivali West, Mumbai.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Alex+Brush&family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap",
      },
    ],
  }),
  component: InviteExperience,
});
