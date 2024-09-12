CREATE SCHEMA "scratchpad";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scratchpad"."scratchpad" (
	"user_id" varchar PRIMARY KEY NOT NULL,
	"content" varchar,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "scratchpad_user_id_unique" UNIQUE("user_id")
);
