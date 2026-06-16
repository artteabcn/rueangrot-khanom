import type { APIRoute } from "astro";
import { BookingSchema } from "@/lib/validations/booking";
import { getDb } from "@/lib/db";
import {
  insertBooking,
  markWhatsappFailed,
  markWhatsappSent,
} from "@/lib/db/bookings";
import { formatBookingMessage, sendWhatsappText } from "@/lib/whatsapp";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime.env;

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = BookingSchema.safeParse(payload);
  if (!parsed.success) {
    return Response.json(
      { error: "validation_failed", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // honeypot tripped → silently accept
  if (parsed.data.website) {
    return Response.json({ success: true });
  }

  const { website: _hp, ...data } = parsed.data;
  const db = getDb(env.DB);

  const row = await insertBooking(db, data);

  const result = await sendWhatsappText({
    to: env.WHATSAPP_TO,
    body: formatBookingMessage(data),
    token: env.META_WA_TOKEN,
    phoneId: env.META_WA_PHONE_ID,
  });

  if (result.ok) {
    await markWhatsappSent(db, row.id);
  } else {
    await markWhatsappFailed(db, row.id, result.error);
    console.error("whatsapp send failed", { id: row.id, error: result.error });
  }

  return Response.json({ success: true });
};
