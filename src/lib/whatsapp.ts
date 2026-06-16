// Meta WhatsApp Cloud API sender.
// Setup: developers.facebook.com → WhatsApp → API Setup → grab a permanent
// system-user token (META_WA_TOKEN) and phone number ID (META_WA_PHONE_ID).
// Free tier: 1000 conversations / month.

type SendArgs = {
  to: string;
  body: string;
  token: string;
  phoneId: string;
};

export type WhatsappResult =
  | { ok: true; messageId: string }
  | { ok: false; error: string };

export async function sendWhatsappText({
  to,
  body,
  token,
  phoneId,
}: SendArgs): Promise<WhatsappResult> {
  if (!token || !phoneId) {
    return { ok: false, error: "missing META_WA_TOKEN or META_WA_PHONE_ID" };
  }

  const recipient = to.replace(/[^\d]/g, "");
  const url = `https://graph.facebook.com/v21.0/${phoneId}/messages`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: recipient,
        type: "text",
        text: { preview_url: false, body },
      }),
    });

    const json = (await res.json()) as {
      messages?: { id: string }[];
      error?: { message?: string };
    };

    if (!res.ok) {
      return {
        ok: false,
        error: json?.error?.message ?? `HTTP ${res.status}`,
      };
    }
    return { ok: true, messageId: json.messages?.[0]?.id ?? "" };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

export function formatBookingMessage(b: {
  name: string;
  phone: string;
  email?: string;
  partySize: number;
  date: string;
  time: string;
  notes?: string;
}): string {
  const lines = [
    "🍽️ *New booking*",
    "",
    `*Name:* ${b.name}`,
    `*Phone:* ${b.phone}`,
    b.email ? `*Email:* ${b.email}` : null,
    `*Party:* ${b.partySize}`,
    `*Date:* ${b.date}`,
    `*Time:* ${b.time}`,
    b.notes ? `*Notes:* ${b.notes}` : null,
  ].filter(Boolean);
  return lines.join("\n");
}
