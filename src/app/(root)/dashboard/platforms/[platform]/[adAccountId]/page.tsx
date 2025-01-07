import ClientDashboard from '@/components/ClientDashboard';
import { fetchDashboardMetrics } from '@/lib/api/dashboard';

interface AdAccountPageProps {
  params: Promise<{
    platform: string;
    adAccountId: string;
  }>;
}

export default async function AdAccountPage({
  params,
}: AdAccountPageProps) {
  try {
    // Await the params to resolve the Promise
    const resolvedParams = await params;

    const { platform, adAccountId } = resolvedParams;

    if (!platform || !adAccountId) {
      return (
        <p className="text-center mt-6">
          Please select a platform and ad account to view data.
        </p>
      );
    }

    const dashboardData = await fetchDashboardMetrics(platform, adAccountId);

    return <ClientDashboard dashboardData={dashboardData} />;
  } catch (error) {
    console.error('Error resolving params or fetching dashboard data:', error);
    return <div className="text-red-600">Failed to load dashboard data.</div>;
  }
}
