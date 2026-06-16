import { eq } from "drizzle-orm";
import { bookings, type NewBooking } from "@/db/schema";
import type { DB } from "./index";

export async function insertBooking(db: DB, data: NewBooking) {
  const [row] = await db.insert(bookings).values(data).returning();
  return row;
}

export async function markWhatsappSent(db: DB, id: number) {
  await db
    .update(bookings)
    .set({ whatsappStatus: "sent", updatedAt: new Date().toISOString() })
    .where(eq(bookings.id, id));
}

export async function markWhatsappFailed(db: DB, id: number, error: string) {
  await db
    .update(bookings)
    .set({
      whatsappStatus: "failed",
      whatsappError: error.slice(0, 500),
      updatedAt: new Date().toISOString(),
    })
    .where(eq(bookings.id, id));
}
