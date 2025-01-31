ALTER TABLE "tickets" ADD COLUMN "ticket_no" text;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_ticket_no_unique" UNIQUE("ticket_no");