import { pgTable, serial, text, uuid, timestamp, integer, decimal } from 'drizzle-orm/pg-core';

// Users table (Linked to Supabase Auth, manual reference in migrations)
export const users = pgTable('users', {
  id: uuid('id').primaryKey(), // No direct reference to auth.users (manual reference later)
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  business_name: text('business_name').notNull(),
  phone_number: text('phone_number').notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow().$onUpdateFn(() => new Date()), // Automatically updates timestamp
});

// Facebook Accounts table
export const facebookAccounts = pgTable('facebook_accounts', {
  id: serial('id').primaryKey(),
  user_id: uuid('user_id').notNull(), // Reference manually via SQL later
  facebook_page_id: text('facebook_page_id').notNull(),
  facebook_page_name: text('facebook_page_name').notNull(),
  ad_account_id: text('ad_account_id').notNull(),
  access_token: text('access_token').notNull(), // Consider encryption
  created_at: timestamp('created_at').defaultNow(),
});

// Facebook Ad Campaigns table
export const facebookAdCampaigns = pgTable('facebook_ad_campaigns', {
  id: serial('id').primaryKey(),
  facebook_account_id: serial('facebook_account_id').notNull(), // Reference manually via SQL later
  campaign_id: text('campaign_id').notNull(),
  campaign_name: text('campaign_name').notNull(),
  objective: text('objective').notNull(),
  status: text('status').notNull(),
  created_at: timestamp('created_at').defaultNow(),
});

// export const campaignPerformance = pgTable('campaign_performance', {
//     id: serial('id').primaryKey(), // Auto-incremented primary key
//     campaign_id: integer('campaign_id').notNull(), // Foreign key to facebook_ad_campaigns
//     impressions: integer('impressions').notNull(), // Number of impressions
//     clicks: integer('clicks').notNull(), // Number of clicks
//     conversions: integer('conversions').notNull(), // Number of conversions
//     spend: decimal('spend', 10, 2).notNull(), // Spend amount
//     created_at: timestamp('created_at').defaultNow(), // Timestamp for performance data
//   });

// User Activity Logs table
export const userActivityLogs = pgTable('user_activity_logs', {
  id: serial('id').primaryKey(),
  user_id: uuid('user_id').notNull(), // Reference manually via SQL later
  activity_type: text('activity_type').notNull(),
  description: text('description'),
  created_at: timestamp('created_at').defaultNow(),
});
