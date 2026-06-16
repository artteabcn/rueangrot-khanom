import { useState, useRef, useEffect } from "react";
import { locales, type Locale } from "@/i18n/utils";
import { cn } from "@/lib/utils";

interface Props {
  currentLocale: Locale;
  currentPath: string;
}

const labels: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  th: "TH",
};

export default function LanguageSelector({ currentLocale, currentPath }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function switchTo(l: Locale) {
    document.cookie = `locale=${l}; path=/; max-age=31536000; samesite=lax`;
    const path = currentPath === "/" ? "" : currentPath;
    window.location.href = `/${l}${path}`;
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="text-[0.7rem] tracking-[0.28em] text-[var(--color-fg-muted)] hover:text-[var(--color-gold)] uppercase border border-transparent hover:border-[var(--color-line-strong)] px-3 py-1.5 rounded-sm transition-colors"
      >
        {labels[currentLocale]}
      </button>
      {open && (
        <ul role="listbox" className="absolute right-0 mt-2 min-w-[80px] panel py-1">
          {locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === currentLocale}
                onClick={() => switchTo(l)}
                className={cn(
                  "w-full text-left px-4 py-2 text-[0.72rem] tracking-[0.24em] uppercase transition-colors",
                  l === currentLocale
                    ? "text-[var(--color-gold)]"
                    : "text-[var(--color-fg-muted)] hover:text-[var(--color-gold-soft)]",
                )}
              >
                {labels[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
