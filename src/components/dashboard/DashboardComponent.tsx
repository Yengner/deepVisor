import IntegratedPlatforms from '@/components/dashboard/IntegratedPlatforms';
import Recommendations from '@/components/dashboard/Recommendations';
import FeaturedCampaigns from '@/components/dashboard/FeaturedCampaigns';
import TopPlatforms from '@/components/dashboard/TopPlatforms';
import TopPlatformCard from '@/components/dashboard/TopPlatform';
import QuickActions from './CampaignCreation';
import ConversionsBreakdownChart from './PerformanceTrends';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DashboardComponent = ({platforms, featuredPlatformsCampaigns, Topmetrics, recommendations}: any) => {
    const { metrics, topPlatform, topPlatforms } = Topmetrics;
    return (
        <div className="space-y-8 p-4">

            {/* Integrated Platforms & Spend Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 ">

                <div className="lg:col-span-5">
                    <IntegratedPlatforms platforms={platforms} />
                </div>
                <div className="lg:col-span-2">
                    <TopPlatformCard topPlatforms={topPlatform} />
                </div>

            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-1">
                    <FeaturedCampaigns data={featuredPlatformsCampaigns} />
                </div>
                <div className='lg:col-span-1'>
                    <Recommendations recommendations={recommendations} />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TopPlatforms platforms={topPlatforms} />
            </div>

            {/* Top Campaigns and Featured Campaigns */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                <QuickActions />
                <div className='col-span-2'>
                    <ConversionsBreakdownChart metrics={metrics} />

                </div>
            </div>
        </div>
    )
}

export default DashboardComponent