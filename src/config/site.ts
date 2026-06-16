import type { SiteConfig } from "./types";

export const siteConfig: SiteConfig = {
  name: "Restaurant Name",
  slug: "restaurant-slug",
  timezone: "Asia/Bangkok",
  defaultLocale: "en",
  theme: "baroque-dark",
  fonts: {
    display: "'Cormorant Garamond', serif",
    body: "'EB Garamond', serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap",
  },
  contact: {
    whatsapp: "+66000000000",
    whatsappDisplay: "+66 00 000 0000",
    socialType: "none",
    socialHandle: "",
    socialUrl: "",
    address: "Address",
    mapsLat: 13.7563,
    mapsLng: 100.5018,
  },
  hours: {
    monday: null,
    tuesday: { open: "18:00", close: "00:00" },
    wednesday: { open: "18:00", close: "00:00" },
    thursday: { open: "18:00", close: "00:00" },
    friday: { open: "18:00", close: "00:00" },
    saturday: { open: "18:00", close: "00:00" },
    sunday: { open: "18:00", close: "00:00" },
  },
  images: {
    menu: [
      "/images/menu1.jpeg",
      "/images/menu2.jpeg",
      "/images/menu3.jpeg",
      "/images/menu4.jpeg",
      "/images/menu5.jpeg",
      "/images/menu6.jpeg",
    ],
  },
};
