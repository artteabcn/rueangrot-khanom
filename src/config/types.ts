export type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type ThemeName =
  | "baroque-dark"
  | "coastal-light"
  | "tropical-modern"
  | "tokyo-minimal"
  | "mediterranean"
  | "nordic-forest";

export type Locale = "en" | "fr" | "th";

export interface SiteConfig {
  name: string;
  slug: string;
  timezone: string;
  defaultLocale: Locale;
  theme: ThemeName;
  fonts: {
    display: string;
    body: string;
    googleFontsUrl: string;
  };
  contact: {
    whatsapp: string;
    whatsappDisplay: string;
    socialType: "instagram" | "facebook" | "none";
    socialHandle: string;
    socialUrl: string;
    address: string;
    mapsLat: number;
    mapsLng: number;
  };
  hours: Record<DayKey, { open: string; close: string } | null>;
  images: {
    menu: string[];
  };
}
