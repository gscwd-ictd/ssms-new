ALTER TABLE "department" ADD CONSTRAINT "department_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "division" ADD CONSTRAINT "division_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "office" ADD CONSTRAINT "office_name_unique" UNIQUE("name");