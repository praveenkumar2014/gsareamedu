CREATE TYPE "public"."lead_status" AS ENUM('NEW', 'CONTACTED', 'CLOSED');--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "status" "lead_status" DEFAULT 'NEW' NOT NULL;