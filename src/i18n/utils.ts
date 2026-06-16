import en from "./en.json";
import fr from "./fr.json";
import th from "./th.json";

export const locales = ["en", "fr", "th"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

const dictionaries = { en, fr, th } as const;

export type Dictionary = typeof en;

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export function getLocaleFromUrl(url: URL): Locale {
  const seg = url.pathname.split("/")[1];
  return isLocale(seg) ? seg : defaultLocale;
}

export function useTranslations(locale: Locale) {
  const dict = dictionaries[locale];
  return function t(key: string): string {
    const parts = key.split(".");
    let cur: unknown = dict;
    for (const p of parts) {
      if (cur && typeof cur === "object" && p in (cur as Record<string, unknown>)) {
        cur = (cur as Record<string, unknown>)[p];
      } else {
        return key;
      }
    }
    return typeof cur === "string" ? cur : key;
  };
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function localizedPath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean === "/" ? "" : clean}`;
}
