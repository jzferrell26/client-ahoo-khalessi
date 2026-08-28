import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { leadSubmissionSchema, type LeadSubmission } from "@/lib/lead-schema";

/**
 * Server-side proxy for lead-form submissions.
 *
 * The site's forms (LeadForm, HomeValueForm) POST their payload here, and this
 * handler forwards it to the GoHighLevel inbound webhook using a runtime secret.
 * Keeping the webhook server-side means the URL is never shipped in the public
 * client bundle.
 *
 * Requires one runtime secret per intake path (set in Lovable secrets):
 * GHL_AVM_WEBHOOK_URL, GHL_AVM_BEN_WEBHOOK_URL, and
 * GHL_GET_MY_OPTIONS_WEBHOOK_URL.
 * GHL_INBOUND_WEBHOOK_URL remains a backwards-compatible fallback for the AVM
 * form while production secrets are migrated.
 * The response includes a non-sensitive `configured` flag so the wiring can be
 * verified after deploy without exposing the URL.
 */
function readWebhookUrl(submission: LeadSubmission): string | undefined {
  const proc = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process;
  const env = proc?.env;

  if (submission.lead_kind === "get_my_options") {
    return env?.GHL_GET_MY_OPTIONS_WEBHOOK_URL;
  }

  // Ben has a dedicated intake workflow inside Ahoo's centralized GHL location.
  // Do not fall back to the shared AVM webhook when his route is unconfigured,
  // because that silently bypasses his assignment and reporting path.
  if (submission.assigned_lo === "Ben Mokri") {
    return env?.GHL_AVM_BEN_WEBHOOK_URL;
  }

  return env?.GHL_AVM_WEBHOOK_URL ?? env?.GHL_INBOUND_WEBHOOK_URL;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

const MAX_BODY_BYTES = 16_384;

export const Route = createFileRoute("/api/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const contentLength = Number(request.headers.get("content-length") ?? 0);
        if (contentLength > MAX_BODY_BYTES) {
          return json({ ok: false, error: "payload_too_large" }, 413);
        }

        let payload: unknown;
        try {
          const rawPayload = await request.text();
          if (new TextEncoder().encode(rawPayload).byteLength > MAX_BODY_BYTES) {
            return json({ ok: false, error: "payload_too_large" }, 413);
          }
          payload = JSON.parse(rawPayload);
        } catch {
          return json({ ok: false, error: "invalid_json" }, 400);
        }

        const parsed = leadSubmissionSchema.safeParse(payload);
        if (!parsed.success) {
          return json({ ok: false, error: "invalid_submission" }, 400);
        }

        const webhook = readWebhookUrl(parsed.data);
        if (!webhook) {
          const intakePath =
            parsed.data.lead_kind === "avm_report_request" &&
            parsed.data.assigned_lo === "Ben Mokri"
              ? "avm_report_request:ben_mokri"
              : parsed.data.lead_kind;
          console.error(`[api/lead] webhook is not set for ${intakePath}; lead not forwarded`);
          return json({ ok: false, configured: false }, 503);
        }

        try {
          const res = await fetch(webhook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parsed.data),
          });
          if (!res.ok) {
            console.error(`[api/lead] GHL webhook returned ${res.status}`);
            return json({ ok: false, configured: true, error: "forward_failed" }, 502);
          }
          return json({ ok: true, configured: true }, 200);
        } catch {
          console.error("[api/lead] failed to forward lead to GHL");
          return json({ ok: false, configured: true, error: "forward_failed" }, 502);
        }
      },
    },
  },
});
