/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

interface Env {
  DB: D1Database;
  WHATSAPP_TO: string;
  META_WA_TOKEN: string;
  META_WA_PHONE_ID: string;
  RESTAURANT_NAME: string;
  RESTAURANT_TIMEZONE: string;
}

declare namespace App {
  interface Locals extends Runtime {}
}

interface ImportMetaEnv {
  readonly PUBLIC_BEHOLD_FEED_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
