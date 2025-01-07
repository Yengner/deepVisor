export function getDateRangeForLastDays(days: number) {
    const today = new Date();
    const since = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);
    return {
        since: since.toISOString().split("T")[0],
        until: today.toISOString().split("T")[0],
    };
}