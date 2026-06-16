import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingSchema, type BookingInput } from "@/lib/validations/booking";
import { useTranslations, type Locale } from "@/i18n/utils";

interface Props {
  locale: Locale;
}

type Status = "idle" | "submitting" | "success" | "error";

const PARTY_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1);

const TIME_SLOTS = [
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
];

function todayISO(): string {
  const now = new Date();
  const tz = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return tz.toISOString().slice(0, 10);
}

export default function BookingForm({ locale }: Props) {
  const t = useTranslations(locale);
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      locale,
      partySize: 2,
      date: todayISO(),
      time: "19:30",
    },
  });

  async function onSubmit(values: BookingInput) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("submit_failed");
      setStatus("success");
      reset({ ...values, name: "", phone: "", email: "", notes: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="panel p-10 text-center">
        <p className="display italic text-3xl text-[var(--color-gold-soft)] mb-4">
          {t("booking.successTitle")}
        </p>
        <p className="text-[var(--color-fg-muted)]">{t("booking.successBody")}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-ghost mt-8"
        >
          ↺
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="panel p-8 md:p-10 space-y-6"
      noValidate
    >
      {/* honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...register("website")}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="field-label" htmlFor="name">
            {t("booking.name")}
          </label>
          <input
            id="name"
            className="field-input"
            autoComplete="name"
            {...register("name")}
          />
          {errors.name && (
            <span className="field-error">{t(errors.name.message ?? "")}</span>
          )}
        </div>
        <div>
          <label className="field-label" htmlFor="phone">
            {t("booking.phone")}
          </label>
          <input
            id="phone"
            className="field-input"
            autoComplete="tel"
            placeholder="+66…"
            {...register("phone")}
          />
          {errors.phone && (
            <span className="field-error">{t(errors.phone.message ?? "")}</span>
          )}
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor="email">
          {t("booking.email")}
        </label>
        <input
          id="email"
          type="email"
          className="field-input"
          autoComplete="email"
          {...register("email")}
        />
        {errors.email && (
          <span className="field-error">{t(errors.email.message ?? "")}</span>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="field-label" htmlFor="partySize">
            {t("booking.partySize")}
          </label>
          <select
            id="partySize"
            className="field-input"
            {...register("partySize", { valueAsNumber: true })}
          >
            {PARTY_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          {errors.partySize && (
            <span className="field-error">
              {t(errors.partySize.message ?? "")}
            </span>
          )}
        </div>
        <div>
          <label className="field-label" htmlFor="date">
            {t("booking.date")}
          </label>
          <input
            id="date"
            type="date"
            min={todayISO()}
            className="field-input"
            {...register("date")}
          />
          {errors.date && (
            <span className="field-error">{t(errors.date.message ?? "")}</span>
          )}
        </div>
        <div>
          <label className="field-label" htmlFor="time">
            {t("booking.time")}
          </label>
          <select id="time" className="field-input" {...register("time")}>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.time && (
            <span className="field-error">{t(errors.time.message ?? "")}</span>
          )}
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor="notes">
          {t("booking.notes")}
        </label>
        <textarea
          id="notes"
          rows={3}
          className="field-input resize-none"
          {...register("notes")}
        />
      </div>

      <input type="hidden" {...register("locale")} value={locale} />

      <div className="pt-2 flex flex-col items-center gap-4">
        <button type="submit" disabled={isSubmitting} className="btn-primary">
          {isSubmitting ? t("booking.submitting") : t("booking.submit")}
        </button>
        {status === "error" && (
          <p className="text-sm text-[var(--color-danger)]">
            {t("booking.errorBody")}
          </p>
        )}
      </div>
    </form>
  );
}
