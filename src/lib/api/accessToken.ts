// fetch access token dynamically for the given platform
export const fetchAccessToken = async (platform: string): Promise<string> => {
    const response = await fetch(`/api/get-access-token?platform=${platform}`);
    if (!response.ok) throw new Error("Error fetching access token");
    const { accessToken } = await response.json();
    return accessToken;
};
