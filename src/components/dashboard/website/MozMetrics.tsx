'use client';

interface MozMetricsProps {
  data: {
    page: string;
    title: string;
    last_crawled: string;
    http_code: number;
    page_authority: number;
    domain_authority: number;
    spam_score: number;
    pages_to_page: number;
    root_domains_to_page: number;
    pages_to_root_domain: number;
    root_domains_to_root_domain: number;
  };
}

export default function MozMetrics({ data }: MozMetricsProps) {
  const {
    page,
    title,
    last_crawled,
    http_code,
    page_authority,
    domain_authority,
    spam_score,
    pages_to_page,
    root_domains_to_page,
    pages_to_root_domain,
    root_domains_to_root_domain,
  } = data;

  return (
    <div className="space-y-6 p-6 bg-gradient-to-b from-[#f1e9f9] via-[#f8f8fa] to-[#e7edf7] rounded-lg shadow-lg">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800">Moz Metrics</h1>
      <p className="text-gray-600 italic">Page: {page}</p>
      {title && <p className="text-lg font-semibold text-gray-700">Title: {title}</p>}

      {/* Last Crawled and HTTP Code */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Last Crawled</h2>
          <p className="text-xl text-[#5c6bc0]">{last_crawled || 'N/A'}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">HTTP Status Code</h2>
          <p className="text-xl text-[#5c6bc0]">{http_code || 'N/A'}</p>
        </div>
      </div>

      {/* Core Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Page Authority</h2>
          <p className="text-xl font-bold text-[#5c6bc0]">{page_authority || 'N/A'}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Domain Authority</h2>
          <p className="text-xl font-bold text-[#5c6bc0]">{domain_authority || 'N/A'}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Spam Score</h2>
          <p className="text-xl font-bold text-[#5c6bc0]">{spam_score || 'N/A'}</p>
        </div>
      </div>

      {/* Link Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Inbound Links to Page</h2>
          <p className="text-xl font-bold text-[#5c6bc0]">{pages_to_page.toLocaleString() || 'N/A'}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Root Domains to Page</h2>
          <p className="text-xl font-bold text-[#5c6bc0]">{root_domains_to_page.toLocaleString() || 'N/A'}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Links to Root Domain</h2>
          <p className="text-xl font-bold text-[#5c6bc0]">{pages_to_root_domain.toLocaleString() || 'N/A'}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Root Domains to Root Domain</h2>
          <p className="text-xl font-bold text-[#5c6bc0]">{root_domains_to_root_domain.toLocaleString() || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}
