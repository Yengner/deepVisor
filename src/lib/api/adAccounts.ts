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

