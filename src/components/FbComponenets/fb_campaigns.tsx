import React from 'react'
import { fetchFacebookCampaignInsights }from '../../lib/meta.insights'


const fb_campaigns = async ({accountId}: any) => {
    // Fetch Facebook campaigns using the user's fbId
    const campaigns = await fetchFacebookCampaignInsights(accountId);
    return (
        <div>
        <h1>Facebook Campaigns</h1>
        <ul>
            {campaigns.map((campaign: any) => (
                <li key={campaign.id}>
                    <h2>{campaign.name}</h2>
                    <p>Spend: {campaign.spend}</p>
                    <p>Leads: {campaign.leads}</p>
                    <p>Link Clicks: {campaign.link_click}</p>
                    <p>Impressions: {campaign.impressions}</p>
                    <p>Reach: {campaign.reach}</p>
                    <p>Clicks: {campaign.clicks}</p>
                    <p>CTR: {campaign.ctr}</p>
                    <p>CPC: {campaign.cpc}</p>
                    <p>CPM: {campaign.cpm}</p>
                    <p>Conversions: {campaign.conversions}</p>
                </li>
            ))}
        </ul>
        </div>
    );    
}

export default fb_campaigns