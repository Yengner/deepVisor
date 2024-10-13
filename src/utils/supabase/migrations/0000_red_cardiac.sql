CREATE TABLE IF NOT EXISTS "facebook_accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"facebook_page_id" text NOT NULL,
	"facebook_page_name" text NOT NULL,
	"ad_account_id" text NOT NULL,
	"access_token" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "facebook_ad_campaigns" (
	"id" serial PRIMARY KEY NOT NULL,
	"facebook_account_id" serial NOT NULL,
	"campaign_id" text NOT NULL,
	"campaign_name" text NOT NULL,
	"objective" text NOT NULL,
	"status" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_activity_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"activity_type" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"business_name" text NOT NULL,
	"phone_number" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
