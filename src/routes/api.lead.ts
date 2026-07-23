import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

/**
 * Server-side proxy for lead-form submissions.
 *
 * The site's forms (LeadForm, HomeValueForm) POST their payload here, and this
 * handler forwards it to the GoHighLevel inbound webhook using a runtime secret.
 * Keeping the webhook server-side means the URL is never shipped in the public
 * client bundle.
 *
 * Requires the runtime secret GHL_INBOUND_WEBHOOK_URL (set in Lovable secrets).
 * The response includes a non-sensitive `configured` flag so the wiring can be
 * verified after deploy without exposing the URL.
 */
function readWebhookUrl(): string | undefined {
  const proc = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process;
  return proc?.env?.GHL_INBOUND_WEBHOOK_URL;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

export const Route = createFileRoute("/api/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return json({ ok: false, error: "invalid_json" }, 400);
        }

        const webhook = readWebhookUrl();
        if (!webhook) {
          console.error("[api/lead] GHL_INBOUND_WEBHOOK_URL is not set; lead not forwarded");
          return json({ ok: false, configured: false }, 200);
        }

        try {
          const res = await fetch(webhook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!res.ok) {
            console.error(`[api/lead] GHL webhook returned ${res.status}`);
          }
          return json({ ok: res.ok, configured: true }, 200);
        } catch (error) {
          console.error("[api/lead] failed to forward lead to GHL", error);
          return json({ ok: false, configured: true, error: "forward_failed" }, 200);
        }
      },
    },
  },
});
