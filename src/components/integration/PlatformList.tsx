'use client';

import React, { useState } from 'react';
import MetaIntegration from '@/components/integration/MetaIntegration';
import Image from 'next/image';

type Platform = {
    id: string;
    platform_name: string;
    description: string;
    full_description: string;
    strengths: string;
    weaknesses: string;
    image_url: string;
    isIntegrated: boolean;
};

type PlatformListProps = {
    platforms: Platform[];
    userId: string;
};

const PlatformList: React.FC<PlatformListProps> = ({ platforms, userId }) => {
    const [expandedPlatform, setExpandedPlatform] = useState<Platform | null>(null);

    const closeExpanded = () => setExpandedPlatform(null);

    return (
        <div className="">
            <div className="max-w-6xl mx-auto space-y-6 p-6">
                {platforms.map((platform) => (
                    <div
                        key={platform.id}
                        className="bg-white shadow-md rounded-lg flex divide-x-2 divide-gray-200 relative"
                    >
                        {/* Left Section */}
                        <div className="w-1/3 flex items-center space-x-4 p-6">
                            <Image
                                src={platform.image_url}
                                alt={platform.platform_name}
                                width={64} 
                                height={64}
                                className="object-contain"
                            />
                            <div>
                                <h3 className="text-lg font-bold">{platform.platform_name}</h3>
                                {platform.id === 'meta' && (
                                    <MetaIntegration
                                        platformName={platform.platform_name.toLowerCase()}
                                        userId="6d9a0842-3887-43a0-8909-16589f8eae2a"
                                        isIntegrated={platform.isIntegrated}
                                    />
                                )}
                                {/* Add other integration components for other platforms */}
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="w-2/3 p-6">
                            <p className="text-gray-600">{platform.description}</p>
                            <button
                                onClick={() => setExpandedPlatform(platform)}
                                className="absolute top-2 right-5 text-sm text-blue-600 hover:text-blue-800"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Expanded Platform Details */}
            {expandedPlatform && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative">
                        <button
                            onClick={closeExpanded}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            Close
                        </button>
                        <div className="flex flex-col items-start">
                            <div className="flex items-center space-x-4 mb-6">
                                <Image
                                    src={expandedPlatform.image_url}
                                    alt={expandedPlatform.platform_name}
                                    width={64}
                                    height={64}
                                    className="object-contain"
                                />
                                <h2 className="text-2xl font-bold">{expandedPlatform.platform_name}</h2>
                            </div>
                            <p className="text-gray-600 mb-4">{expandedPlatform.full_description}</p>
                            <div>
                                <h3 className="text-lg font-semibold">Strengths:</h3>
                                <p className="text-gray-600">{expandedPlatform.strengths}</p>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold">Weaknesses:</h3>
                                <p className="text-gray-600">{expandedPlatform.weaknesses}</p>
                            </div>
                            <div className="mt-6">
                                {expandedPlatform.id === 'meta' && (
                                    <MetaIntegration
                                        platformName={expandedPlatform.platform_name.toLowerCase()}
                                        userId={userId}
                                        isIntegrated={expandedPlatform.isIntegrated}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlatformList;
