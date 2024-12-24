'use client';

import { useRouter } from 'next/navigation';

interface IntegratedPlatformsProps {
  platforms: { platform: string; isIntegrated: boolean }[];
}

const IntegratedPlatforms = ({ platforms }: IntegratedPlatformsProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-4 h-full items-center">
      {platforms.map((platform) => (
        <div
          key={platform.platform}
          className="flex flex-col justify-center p-4 border rounded shadow bg-white "
        >
          <img
            src={`/${platform.platform}.png`} // Replace with appropriate icon paths
            alt={`${platform.platform} logo`}
            className="h-12 w-12 mx-auto"
          />
          <p className="mt-2 text-sm font-semibold capitalize text-center">
            {platform.platform}
          </p>
          {platform.isIntegrated && (
            <p className="text-xs text-green-600 mt-1 text-center">Integrated</p>
          )}
        </div>
      ))}

      {/* Quick Add Integration Card */}
      <div
        onClick={() => router.push('/integration')}
        className="flex flex-col items-center justify-center p-4 border rounded shadow bg-white cursor-pointer hover:bg-gray-100 transition"
      >
        <div className="flex items-center justify-center h-12 w-12 bg-gray-200 rounded-full">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <p className="mt-2 text-sm font-semibold text-gray-700 text-center">
          Integration
        </p>
      </div>
    </div>
  );
};

export default IntegratedPlatforms;
