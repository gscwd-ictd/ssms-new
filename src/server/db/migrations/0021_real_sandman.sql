ALTER TABLE "teams" RENAME COLUMN "team_name" TO "name";--> statement-breakpoint
ALTER TABLE "team_assignments" ADD COLUMN "team_id" text;--> statement-breakpoint
ALTER TABLE "team_assignments" ADD CONSTRAINT "team_assignments_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;