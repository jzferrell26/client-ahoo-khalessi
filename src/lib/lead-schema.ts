import { z } from "zod";

const optionalText = z.string().trim().max(500).optional();

export const assignedLoanOfficerSchema = z.enum(["Ahoo Khalessi", "Ben Mokri", "Bobby Khalessi"]);
export type AssignedLoanOfficer = z.infer<typeof assignedLoanOfficerSchema>;

const baseLeadSchema = z
  .object({
    first: z.string().trim().min(1).max(100),
    last: z.string().trim().min(1).max(100),
    phone: z.string().trim().min(7).max(40),
    email: z.string().trim().email().max(254),
    property_address: z.string().trim().min(3).max(250),
    property_city: optionalText,
    property_state: optionalText,
    property_zip: optionalText,
    goal: optionalText,
    report_type: optionalText,
    // Per-recipient code printed on the mailer. Lets an inbound scan/submission be
    // tied back to the exact person the piece was sent to. Optional by design: a
    // borrower who lost the mailer must still be able to submit.
    notice_number: z.string().trim().max(64).optional(),
    // Which loan officer this lead belongs to. Set by the per-officer AVM landing
    // pages so the GHL workflow can route each officer's mailer leads into their
    // own pipelines. Absent on the shared pages, which stay on the default routing.
    assigned_lo: assignedLoanOfficerSchema.optional(),
    source: z.string().trim().min(1).max(200),
    lead_source: z.string().trim().min(1).max(100),
    campaign: z.string().trim().min(1).max(100),
    consent_language: z.string().trim().min(1).max(2_500),
    consent: z.literal(true),
    company_website: z.string().trim().max(250).optional(),
    form_started_at: z.string().datetime().optional(),
    submitted_at: z.string().datetime(),
  })
  .strict();

export const leadSubmissionSchema = z.discriminatedUnion("lead_kind", [
  baseLeadSchema.extend({
    lead_kind: z.literal("get_my_options"),
  }),
  baseLeadSchema.extend({
    lead_kind: z.literal("avm_report_request"),
    property_city: z.string().trim().min(1).max(100),
    property_state: z.string().trim().length(2),
    property_zip: z
      .string()
      .trim()
      .regex(/^\d{5}(?:-\d{4})?$/),
    report_type: z.string().trim().min(1).max(200),
  }),
]);

export type LeadSubmission = z.infer<typeof leadSubmissionSchema>;
