import Recommendations from '@/components/dashboard/Recommendations';
import FeaturedCampaigns from '@/components/dashboard/FeaturedCampaigns';
import TopPlatforms from '@/components/dashboard/TopPlatforms';
import TopPlatformCard from '@/components/dashboard/TopPlatform';
// import QuickActions from './CampaignCreation';
import StackedBarChart from './StackedBarChart';
import Suggestion from './Suggestion';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DashboardComponent = ({ featuredPlatformsCampaigns, Topmetrics, recommendations }: any) => {
    const { metrics, topPlatform, topPlatforms } = Topmetrics;

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Dashboard Title and Subtitle */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-800">Home</h1>
                <p className="text-sm text-gray-600">Your dashboard overview</p>
            </div>

            {/* Active Metrics and Key Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 mt-6">
                <div className="lg:col-span-5 bg-white rounded-lg shadow-sm border border-gray-200 py-6 px-6">
                    <StackedBarChart metrics={metrics} />
                </div>
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
                    <TopPlatformCard topPlatforms={topPlatform} />
                </div>
            </div>

            {/* Recently Accessed Section */}
            <div className='pt-6'>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Recently Accessed</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <p className="font-medium text-gray-700">Explore</p>
                        <p className="text-sm text-gray-500">Yesterday</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <p className="font-medium text-gray-700">Advertising Snapshot</p>
                        <p className="text-sm text-gray-500">Yesterday</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <p className="font-medium text-gray-700">Reports Snapshot</p>
                        <p className="text-sm text-gray-500">Yesterday</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <p className="font-medium text-gray-700">Reports Snapshot</p>
                        <p className="text-sm text-gray-500">Yesterday</p>
                    </div>
                </div>
            </div>

            {/* Suggestions for user */}
            <Suggestion/>

            {/* Top Platforms */}
            <div className='pt-6'>
                <h2 className="text-lg font-semibold text-gray-800 mb-4 underline underline-offset-8 [text-decoration-style:dotted]">
                    Insights & recommendations
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="col-span-3 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <TopPlatforms platforms={topPlatforms} />
                    </div>
                </div>
                <div className="grid grid-cols-3 lg:grid-cols-6 gap-6 mt-6">
                    <div className='col-span-3 bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-6'>
                        <FeaturedCampaigns data={featuredPlatformsCampaigns} />
                    </div>
                    <div className="col-span-3 bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-6">
                        <Recommendations recommendations={recommendations} />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DashboardComponent;
