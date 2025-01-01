'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/utils/supabase/clients/browser';

const MetaIntegrationSuccess = () => {
    const [stage, setStage] = useState<'loading' | 'displayAccounts' | 'verifying' | 'success'>('loading');
    const [adAccounts, setAdAccounts] = useState<any[]>([]);
    const [industries, setIndustries] = useState<{ id: number; name: string }[]>([]);
    const [selectedIndustries, setSelectedIndustries] = useState<Record<string, number>>({});
    const router = useRouter();
    const searchParams = useSearchParams();
    const supabase = createClient();

    useEffect(() => {
        const fetchIndustries = async () => {
            try {
                const { data, error } = await supabase.from('industry').select('id, name');
                if (error) throw error;
                setIndustries(data || []);
            } catch (error: any) {
                console.error('Error fetching industries:', error.message);
            }
        };

        fetchIndustries();

        // Parse ad accounts from search params
        let accounts = [];
        try {
            const adAccountsParam = searchParams.get('adAccounts') || '[]';
            accounts = JSON.parse(decodeURIComponent(adAccountsParam));
        } catch (error) {
            console.error('Failed to parse ad accounts:', error);
        }
        setAdAccounts(accounts);

        setStage('displayAccounts');
    }, [searchParams, supabase]);

    const handleIndustryChange = (accountId: string, industryId: number) => {
        setSelectedIndustries((prev) => ({
            ...prev,
            [accountId]: industryId,
        }));
    };

    const verifyIndustryUpdates = async () => {
        const failedAccounts = [];
        for (const account of adAccounts) {
            const { data, error } = await supabase
                .from('ad_accounts')
                .select('industry_id')
                .eq('ad_account_id', account.id)
                .single();

            if (error || !data || data.industry_id !== selectedIndustries[account.id]) {
                failedAccounts.push(account.id);
            }
        }
        return failedAccounts.length === 0;
    };

    const handleSubmit = async () => {
        try {
            // Update industries
            await Promise.all(
                adAccounts.map((account) => {
                    const industryId = selectedIndustries[account.id];
                    if (industryId) {
                        console.log(`Updating industry for ad account: ${account.id} to ${industryId}`);
                        return supabase
                            .from('ad_accounts')
                            .update({ industry_id: industryId })
                            .eq('ad_account_id', account.id);
                    }
                })
            );

            setStage('verifying');

            // Verify updates
            const allUpdated = await verifyIndustryUpdates();
            if (allUpdated) {
                setStage('success');
                setTimeout(() => {
                    router.push('/integration');
                }, 2000);
            } else {
                alert('Failed to update some accounts. Please try again.');
                setStage('displayAccounts');
            }
        } catch (error) {
            console.error('Error updating industries:', error);
            setStage('displayAccounts');
        }
    };

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
        <div className="flex items-center justify-center bg-gray-50 px-4">
            {stage === 'loading' && (
                <div className="text-center">
                    <p className="text-xl font-semibold mb-4">Fetching data...</p>
                </div>
            )}
            {stage === 'displayAccounts' && (
                <div className="w-full max-w-lg">
                    <p className="text-xl font-semibold mb-4 text-center">Ad Accounts Found:</p>
                    <ul className="space-y-6">
                        {adAccounts.map((account, index) => (
                            <li
                                key={account.id}
                                className="bg-white p-4 rounded-md shadow-md space-y-2 opacity-0 transform translate-y-10 animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.6}s` }}
                            >
                                <p className="font-bold text-lg">{account.name}</p>
                                <p>Status: {getStatusDescription(account.account_status)}</p>
                                <div>
                                    <label htmlFor={`industry-${account.id}`} className="block text-sm font-medium text-gray-700">
                                        Select Industry
                                    </label>
                                    <select
                                        id={`industry-${account.id}`}
                                        value={selectedIndustries[account.id] || ''}
                                        onChange={(e) => handleIndustryChange(account.id, Number(e.target.value))}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                    >
                                        <option value="" disabled>
                                            Choose an industry
                                        </option>
                                        {industries.map((industry) => (
                                            <option key={industry.id} value={industry.id}>
                                                {industry.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-2 bg-emerald-500 text-white rounded-md shadow hover:bg-emerald-600 transition"
                        >
                            Save and Continue
                        </button>
                    </div>
                </div>
            )}
            {stage === 'verifying' && (
                <div className="text-center">
                    <p className="text-xl font-semibold mb-4">Verifying updates...</p>
                </div>
            )}
            {stage === 'success' && (
                <div className="text-center space-y-2">
                    <p className="text-2xl font-bold text-emerald-600 mb-4">Integration Successful!</p>
                    <p className="text-gray-500">Redirecting you to the integration page...</p>
                </div>
            )}
        </div>
    );
};

export default MetaIntegrationSuccess;
