CREATE TABLE IF NOT EXISTS "campaign_performance" (
	"id" serial PRIMARY KEY NOT NULL,
	"campaign_id" integer NOT NULL,
	"impressions" integer NOT NULL,
	"clicks" integer NOT NULL,
	"conversions" integer NOT NULL,
	"spend" numeric NOT NULL,
	"created_at" timestamp DEFAULT now()
);
