import { NextRequest, NextResponse } from 'next/server';
import { AdAccount, FacebookAdsApi } from 'facebook-nodejs-business-sdk';

// Initialize the Facebook Ads API
const initFacebookApi = (accessToken: string) => {
  return FacebookAdsApi.init(accessToken);
};

// Named export for the `POST` method
export async function POST(req: NextRequest) {
  try {
    const { accessToken, adAccountId } = await req.json();

    if (!accessToken || !adAccountId) {
      return NextResponse.json({ message: 'Missing required parameters' }, { status: 400 });
    }

    // Initialize the Facebook API
    initFacebookApi(accessToken);

    const fields: string[] = [];
    const params = {
      name: 'My Campaign',
      objective: 'OUTCOME_TRAFFIC', // Campaign objective
      status: 'PAUSED',             // Campaign status
      special_ad_categories: [],    // Special ad categories
    };

    // Create the campaign
    const campaign = await new AdAccount(adAccountId).createCampaign(fields, params);

    // Return the created campaign
    return NextResponse.json({ campaign });
  } catch (error) {
    console.error('Error creating campaign:', error);
    return NextResponse.json({ message: 'Error creating campaign' }, { status: 500 });
  }
}
