ALTER TABLE public.campaign_performance ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.facebook_accounts
ADD CONSTRAINT fk_facebook_accounts_users
FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

ALTER TABLE public.facebook_ad_campaigns
ADD CONSTRAINT fk_facebook_ad_campaigns_facebook_accounts
FOREIGN KEY (facebook_account_id) REFERENCES public.facebook_accounts(id) ON DELETE CASCADE;

ALTER TABLE public.campaign_performance
ADD CONSTRAINT fk_campaign_performance_facebook_ad_campaigns
FOREIGN KEY (campaign_id) REFERENCES public.facebook_ad_campaigns(id) ON DELETE CASCADE;
