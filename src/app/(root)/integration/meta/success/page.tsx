'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const MetaIntegrationSuccess = () => {
    const [stage, setStage] = useState<'loading' | 'displayAccounts' | 'success'>('loading');
    const [adAccounts, setAdAccounts] = useState<any[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Parse adAccounts safely
        let accounts = [];
        try {
            const adAccountsParam = searchParams.get('adAccounts') || '[]';
            accounts = JSON.parse(decodeURIComponent(adAccountsParam));
        } catch (error) {
            console.error('Failed to parse adAccounts:', error);
        }
        setAdAccounts(accounts);

        // Handle animation stages
        const stages = ['loading', 'displayAccounts', 'success'];
        let currentStage = 0;

        const interval = setInterval(() => {
            if (currentStage >= stages.length - 1) {
                clearInterval(interval);

                // Redirect to the integration page after success
                setTimeout(() => {
                    router.push('/integration');
                }, 3000);

                return;
            }
            currentStage += 1;
            setStage(stages[currentStage] as any);
        }, 2000);

        return () => clearInterval(interval);
    }, [searchParams, router]);

    const getStatusDescription = (status: number) => {
        switch (status) {
            case 1:
                return 'Active';
            case 2:
                return 'Disabled';
            case 3:
                return 'Pending Review';
            case 7:
                return 'Inactive';
            default:
                return 'Unknown';
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            {stage === 'loading' && (
                <div>
                    <p className="text-xl font-semibold mb-4">Fetching ad accounts...</p>
                    <div className="loader border-t-4 border-emerald-600 w-12 h-12 rounded-full animate-spin"></div>
                </div>
            )}
            {stage === 'displayAccounts' && (
                <div className="w-full max-w-lg">
                    <p className="text-xl font-semibold mb-4 text-center">Ad Accounts Found:</p>
                    <ul className="space-y-6">
                        {adAccounts.map((account, index) => (
                            <li
                                key={account.id}
                                className="bg-white p-4 rounded-md shadow-md flex flex-col items-center space-y-2 opacity-0 transform translate-y-10 animate-[drop-in_1s_ease-out] transition-all duration-1000 ease-in-out"
                                style={{ animationDelay: `${index * 0.4}s` }} // Increase delay to stagger more
                            >
                                <p className="font-bold text-lg">{account.name}</p>
                                <p>Status: {getStatusDescription(account.account_status)}</p>
                                <p className="text-sm text-gray-500">
                                    Spend Amount: ${(account.amount_spent / 100).toFixed(2)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {stage === 'success' && (
                <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-600 mb-4">Integration Successful!</p>
                    <p className="text-gray-500">Redirecting you to the integration page...</p>
                </div>
            )}
        </div>
    );
};

export default MetaIntegrationSuccess;