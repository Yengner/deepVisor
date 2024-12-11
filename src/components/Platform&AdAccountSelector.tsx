'use client';

import React, { useState } from 'react';
import { useGlobalState } from '@/lib/store/globalState';
import { useAdAccounts } from '@/hooks/useAdAccounts';
import { ClipLoader } from 'react-spinners';

const PlatformAdAccountSelector = () => {
    const { selectedPlatform, setPlatform, selectedAdAccount, setAdAccount } = useGlobalState();
    const { data, isLoading } = useAdAccounts(selectedPlatform);

    const [isOpen, setIsOpen] = useState(false);

    const platforms = [
        { id: 'facebook', name: 'Facebook' },
        { id: 'instagram', name: 'Instagram' },
        { id: 'tiktok', name: 'TikTok' },
    ];

    const adAccounts = data?.adAccounts || [];
    const adAccountName = selectedAdAccount && adAccounts.find((account) => account.ad_account_id === selectedAdAccount)?.name;
    const platformName = platforms.find((platform) => platform.id === selectedPlatform)?.name;
    return (
        <div className="relative"> {/* Move the selector away from the edge */}
            {/* Main Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="py-2 px-4 bg-white border border-gray-300 rounded shadow text-gray-700 focus:ring-2 focus:ring-emerald-500 hover:bg-gray-100"
            >
                {selectedAdAccount
                    ? `${platformName}: ${adAccountName}`
                    : selectedPlatform
                        ? `Platform: ${selectedPlatform}`
                        : 'Select Platform & Ad Account'}
            </button>

            {/* Dropdown Widget */}
            {isOpen && (
                <div className="absolute top-full left-[-200px] mt-2 w-[400px] bg-white border border-gray-300 rounded shadow-lg z-10 flex">

                    {/* Left Side: Platforms */}
                    <div className="w-1/3 border-r border-gray-300">
                        {platforms.map((platform) => (
                            <button
                                key={platform.id}
                                onClick={() => {
                                    setPlatform(platform.id);
                                    setAdAccount(null);
                                }}
                                className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${selectedPlatform === platform.id ? 'bg-gray-200' : ''
                                    }`}
                            >
                                {platform.name}
                            </button>
                        ))}
                    </div>

                    {/* Right Side: Ad Accounts */}
                    <div className="w-2/3 p-2">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full">
                                <ClipLoader color="#3498db" size={30} />
                            </div>
                        ) : selectedPlatform ? (
                            adAccounts.length > 0 ? (
                                <div>
                                    {adAccounts.map((account) => (
                                        <button
                                            key={account.ad_account_id}
                                            onClick={() => {
                                                setAdAccount(account.ad_account_id);
                                                setIsOpen(false);
                                            }}
                                            className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${selectedAdAccount === account.ad_account_id ? 'bg-gray-200' : ''
                                                }`}
                                        >
                                            {account.name || account.ad_account_id}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No ad accounts available for this platform.</p>
                            )
                        ) : (
                            <p className="text-gray-500">Select a platform to see ad accounts.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlatformAdAccountSelector;
