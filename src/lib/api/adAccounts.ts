
// fetch access token dynamically for the given platform
export const fetchAccessToken = async (platform: string): Promise<string> => {
    const response = await fetch(`/api/get-access-token?platform=${platform}`);
    if (!response.ok) throw new Error("Error fetching access token");
    const { accessToken } = await response.json();
    return accessToken;
};

// fetch ad accounts for the given platform
export const fetchAdAccounts = async (platform: string, accessToken: string) => {
    const response = await fetch(`/api/${platform}/ad-accounts`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) throw new Error("Error fetching ad accounts");
    return response.json();;
};

