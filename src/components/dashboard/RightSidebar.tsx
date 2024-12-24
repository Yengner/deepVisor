'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { ClipLoader } from 'react-spinners';
import { fetchAdAccounts } from '@/lib/api/adAccounts';

const RightSidebar = () => {
    const router = useRouter();

    const platforms = [
        { id: 'facebook', name: 'Facebook', image: '/facebook.png' },
        { id: 'instagram', name: 'Instagram', image: '/instagram.png' },
        { id: 'tiktok', name: 'TikTok', image: '/tiktok.png' },
    ];

    const websites = [
        { id: 'site1', name: 'My Website' },
        { id: 'site2', name: 'Another Site' },
    ];

    const [openPlatforms, setOpenPlatforms] = useState(true);
    const [openWebsites, setOpenWebsites] = useState(false);
    const [platformDropdowns, setPlatformDropdowns] = useState<Record<string, boolean>>({});
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
    const [adAccounts, setAdAccounts] = useState<
        Array<{ ad_account_id: string; platform: string; name: string }>
    >([]);
    const [isLoading, setIsLoading] = useState(false);

    const handlePlatformClick = async (platform: string) => {
        setSelectedPlatform(platform);

        if (!platformDropdowns[platform]) {
            setIsLoading(true);
            try {
                const result = await fetchAdAccounts(platform);
                setAdAccounts(result.adAccounts);
            } catch (error) {
                console.error('Failed to fetch ad accounts:', error);
            } finally {
                setIsLoading(false);
            }
        }

        setPlatformDropdowns((prev) => ({
            ...prev,
            [platform]: !prev[platform],
        }));
    };

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        <div className=" bg-gradient-to-b from-[#f1e9f9] via-[#f8f8fa] to-[#e7edf7] shadow-md h-screen flex flex-col p-4 border-l border-gray-300">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Navigation</h2>

            {/* Overview Button */}
            <div className="mb-6">
                <button
                    onClick={() => handleNavigation('/dashboard')}
                    className="block w-full px-4 py-3 rounded-lg bg-gradient-to-r from-white to-blue-50 text-gray-900 font-semibold text-center hover:bg-[#4b5bb1] shadow transition"
                >
                    Overview
                </button>
            </div>
            {/* Platforms Section */}
            <div className="mb-8">
                <button
                    onClick={() => setOpenPlatforms(!openPlatforms)}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-[#e7edf7] text-[#5c6bc0] font-semibold hover:bg-[#d6def7] shadow transition"
                >
                    Platforms
                    <ChevronDownIcon
                        className={`w-5 h-5 text-[#5c6bc0] transition-transform ${openPlatforms ? 'rotate-180' : 'rotate-0'
                            }`}
                    />
                </button>
                {openPlatforms && (
                    <div className="ml-4 mt-3 space-y-3">
                        <button
                            onClick={() => handleNavigation('/dashboard/platforms')}
                            className="block w-full text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-white to-blue-50 text-gray-900 font-semibold hover:bg-gray-100 shadow"
                        >
                            Platforms Overview
                        </button>

                        {platforms.map((platform) => (
                            <div key={platform.id} className="mb-3">
                                <button
                                    onClick={() => handlePlatformClick(platform.id)}
                                    className="flex items-center justify-between w-full px-4 py-2 rounded-lg bg-white text-gray-800 font-semibold hover:bg-gray-100 shadow"
                                >
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={platform.image}
                                            alt={`${platform.name} logo`}
                                            className="w-6 h-6 object-contain"
                                        />
                                        {platform.name}
                                    </div>
                                    <ChevronDownIcon
                                        className={`w-5 h-5 text-gray-500 transition-transform ${platformDropdowns[platform.id] ? 'rotate-180' : 'rotate-0'
                                            }`}
                                    />
                                </button>

                                {platformDropdowns[platform.id] && (
                                    <div className="ml-6 mt-2 space-y-2">
                                        <button
                                            onClick={() =>
                                                handleNavigation(`/dashboard/platforms/${platform.id}`)
                                            }
                                            className="block w-full text-left px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-white to-blue-50 text-gray-900 hover:bg-[#e0e6ef] shadow-sm"
                                        >
                                            {platform.name} Overview
                                        </button>

                                        {isLoading ? (
                                            <div className="flex items-center justify-center h-full">
                                                <ClipLoader color="#5c6bc0" size={20} />
                                            </div>
                                        ) : adAccounts.length > 0 ? (
                                            adAccounts.map((account) => (
                                                <button
                                                    key={account.ad_account_id}
                                                    onClick={() =>
                                                        handleNavigation(
                                                            `/dashboard/platforms/${platform.id}/${account.ad_account_id}`
                                                        )
                                                    }
                                                    className="block w-full text-left px-4 py-2 text-sm rounded-lg truncate bg-gradient-to-r from-purple-100 via-blue-50 to-blue-100 text-gray-900 hover:bg-[#eef1f5] shadow-sm"
                                                >
                                                    {account.name || account.ad_account_id}
                                                </button>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-sm italic">
                                                No ad accounts found for {platform.name}.
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Websites Section */}
            <div>
                <button
                    onClick={() => setOpenWebsites(!openWebsites)}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-[#e7edf7] text-[#5c6bc0] font-semibold hover:bg-[#d6def7] shadow transition"
                >
                    Websites
                    <ChevronDownIcon
                        className={`w-5 h-5 text-[#5c6bc0] transition-transform ${openWebsites ? 'rotate-180' : 'rotate-0'
                            }`}
                    />
                </button>
                {openWebsites && (
                    <div className="ml-4 mt-3 space-y-3">
                        {websites.map((website) => (
                            <button
                                key={website.id}
                                onClick={() => handleNavigation(`/dashboard/websites/${website.id}`)}
                                className="block w-full px-4 py-2 rounded-lg bg-white text-gray-900 font-medium hover:bg-gray-100 shadow"
                            >
                                {website.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RightSidebar;
