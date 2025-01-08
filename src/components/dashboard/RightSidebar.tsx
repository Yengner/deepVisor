'use client'


import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDownIcon } from '@radix-ui/react-icons';
// import { fetchIntegratedPlatforms } from '@/lib/api/fetchIntegratedPlatforms';
import { createClient } from '@/lib/utils/supabase/clients/browser';
import Image from 'next/image';

const RightSidebar = () => {
    const router = useRouter();
    const supabase = createClient();

    const [platforms, setPlatforms] = useState<{ platform_name: string; }[]>([]);
    const [currentPage, setCurrentPage] = useState<string>('/dashboard'); // Track the current page
    const [loading, setLoading] = useState(true);
    const [openWebsites, setOpenWebsites] = useState(false);

    useEffect(() => {
        // setting current page based on the current URL

        setCurrentPage(window.location.pathname);

        const fetchPlatforms = async () => {
            const { data: userData } = await supabase.auth.getUser();
            const userId = userData?.user?.id


            setLoading(true);
            const { data, error } = await supabase
                .from('platform_integrations')
                .select('platform_name')
                .eq('user_id', userId);

            if (error) {
                console.error('Error fetching platforms:', error.message);
            } else {
                setPlatforms(data || []);
            }
            setLoading(false);
        };

        fetchPlatforms();
    }, [supabase]);

    const websites = [
        { id: 'site1', name: 'My Website', comingSoon: true },
        { id: 'site2', name: 'Another Site', comingSoon: true },
    ];

    const handleNavigation = (path: string, comingSoon: boolean = false) => {
        if (!comingSoon) {
            setCurrentPage(path);
            router.push(path);
        }
    };

    const isCurrentPage = (path: string) => currentPage === path;
    const isCurrentSubPage = (path: string) => currentPage.startsWith(path);

    return (
        <div className="bg-white shadow-md h-screen flex flex-col p-4 border-l border-[#c5ddda]">
            <h2 className="text-xl font-bold text-gray-700 mb-6">Navigation</h2>

            {loading ? (
                <div className="text-center py-4">
                    <div className="animate-pulse bg-gray-200 h-8 w-1/2 mb-4 rounded-md"></div>
                    <div className="animate-pulse bg-gray-200 h-8 w-1/2 mb-4 rounded-md"></div>
                    <div className="animate-pulse bg-gray-200 h-8 w-1/2 mb-4 rounded-md"></div>
                </div>
            ) : (
                <>
                    {/* Overview Button */}
                    <div className="mb-8 border-l-2 border-gray-200 group relative">
                        <button
                            onClick={() => handleNavigation('/dashboard', true)}
                            className={`relative block w-full px-4 py-3 rounded-md text-gray-700 font-semibold text-center ${isCurrentPage('/dashboard') ? 'bg-[#e7f6f2]' : ''
                                }`}
                        >
                            {isCurrentPage('/dashboard') && (
                                <span className="absolute left-[-2px] top-0 bottom-0 w-1 bg-[#68beaf] rounded"></span>
                            )}
                            <span className='text-lg'>Overview</span>
                        </button>
                        <div className="coming-soon-overlay">Coming Soon</div>
                    </div>

                    {/* Platforms Section */}
                    <div className="mb-10 border-l-2 pb-4 pt-1 border-gray-200 ">
                        <button
                            onClick={() => handleNavigation('/dashboard/platforms', false)}
                            className={`relative flex items-center w-full px-4 py-3 rounded-md text-gray-700 font-semibold ${isCurrentPage('/dashboard/platforms') ? 'bg-[#e7f6f2]' : ''}`}
                            style={{ width: 'fit-content' }}
                        >
                            {isCurrentPage('/dashboard/platforms') && (
                                <span className="absolute left-[-2px] top-0 bottom-0 w-1 bg-[#68beaf] rounded"></span>
                            )}
                            <span className="truncate text-[16px]">Platforms Overview</span>
                        </button>

                        <div className="ml-4 mt-3 space-y-3 border-l-2 border-gray-200 pl-0 relative">
                            {platforms.map((platform) => (
                                <button
                                    key={platform.platform_name}
                                    onClick={() => handleNavigation(`/dashboard/platforms/${platform.platform_name}`, false)}
                                    className={`relative flex items-center w-full px-4 py-2 rounded-lg text-gray-700 text-sm font-semibold ${isCurrentSubPage(`/dashboard/platforms/${platform.platform_name}`) ? 'bg-[#e7f6f2]' : ''}`}
                                >
                                    {isCurrentSubPage(`/dashboard/platforms/${platform.platform_name}`) && (
                                        <span className="absolute left-[-2px] top-0 bottom-0 w-1 bg-[#68beaf] rounded"></span>
                                    )}
                                    <Image
                                        src={`/${platform.platform_name}.png`}
                                        alt={`${platform.platform_name} logo`}
                                        width={42}
                                        height={42}
                                        className="w-7 h-7 object-contain mr-3"
                                    />
                                    {platform.platform_name[0].toLocaleUpperCase() + platform.platform_name.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
            {/* Websites Section */}
            <div className="group relative">
                <button
                    onClick={() => setOpenWebsites(!openWebsites)}
                    className={`relative flex items-center justify-between w-full px-4 py-3 rounded-lg font-semibold text-gray-700 ${currentPage.startsWith('/dashboard/websites') ? 'bg-[#e7f6f2]' : ''
                        }`}
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
                                onClick={() => handleNavigation(`/dashboard/websites/${website.id}`, website.comingSoon)}
                                className={`relative block w-full px-4 py-2 rounded-lg bg-white text-gray-900 font-medium hover:bg-gray-100 shadow ${currentPage === `/dashboard/websites/${website.id}` ? 'bg-[#e7f6f2]' : ''
                                    }`}
                            >
                                {currentPage === `/dashboard/websites/${website.id}` && (
                                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#68beaf] rounded"></span>
                                )}
                                {website.name}
                                {website.comingSoon && <div className="coming-soon-overlay">Coming Soon</div>}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RightSidebar;
