CREATE TABLE "contacts" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"company" text,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"responded" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "language_content" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"language_code" text NOT NULL,
	"content_key" text NOT NULL,
	"content" json NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"category" text NOT NULL,
	"file_path" text NOT NULL,
	"file_size" text NOT NULL,
	"publish_date" timestamp NOT NULL,
	"download_count" text DEFAULT '0'
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
