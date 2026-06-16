import type { SiteConfig } from "./types";

export const siteConfig: SiteConfig = {
  name: "Rueangrot Khanom",
  slug: "rueangrot-khanom",
  timezone: "Asia/Bangkok",
  defaultLocale: "en",
  theme: "nordic-forest",
  fonts: {
    display: "'DM Serif Display', serif",
    body: "'DM Sans', sans-serif",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap",
  },
  contact: {
    whatsapp: "061 963 8979",
    whatsappDisplay: "+6661 963 8979",
    socialType: "facebook",
    socialHandle: "Rueangrot",
    socialUrl: "https://www.facebook.com/people/Rueangrot-Restaurant/61566602113375/",
    address: "Na Dan Beach, Khanom",
    mapsLat: 9.1789147,
    mapsLng: 99.8717281,
  },
  hours: {
    monday: null,
    tuesday: null,
    wednesday: {"open":"18:00","close":"00:00"},
    thursday: {"open":"18:00","close":"00:00"},
    friday: {"open":"18:00","close":"00:00"},
    saturday: {"open":"18:00","close":"00:00"},
    sunday: {"open":"18:00","close":"00:00"},
  },
  menuMode: "photos",
  images: {
    menu: ["/images/menu1.jpeg","/images/menu2.jpeg"],
  },
};
