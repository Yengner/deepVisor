'use server';

import ClientDashboard from '@/components/ClientDashboard';
import { fetchDashboardMetrics } from '@/lib/api/dashboard';

export default async function DashboardPage({
  params,
}: {
  params: { platform?: string; adAccountId?: string };
}) {
  const { platform, adAccountId } = await Promise.resolve(params || {});

  if (!platform || !adAccountId) {
    return <p className="text-center mt-6">Please select a platform and ad account to view data.</p>;
  }

  try {
    const dashboardData = await fetchDashboardMetrics(platform, adAccountId);
    return <ClientDashboard dashboardData={dashboardData} />;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return <div className="text-red-600">Failed to load dashboard data.</div>;
  }
}