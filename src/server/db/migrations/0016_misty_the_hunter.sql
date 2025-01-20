CREATE TABLE "category_assignments" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"category_id" text
);
--> statement-breakpoint
ALTER TABLE "category_assignments" ADD CONSTRAINT "category_assignments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category_assignments" ADD CONSTRAINT "category_assignments_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;