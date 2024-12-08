import { useEffect, useState } from 'react';

// Define the type for a notification
interface Notification {
  id: number;
  message: string;
  campaignId: string;
}

export const useMockNotifications = () => {
  // Specify the state type as an array of Notification
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Mock notifications data
    const mockData: Notification[] = [
      {
        id: 1,
        message: 'Ad Campaign A is underperforming. Check it out.',
        campaignId: 'campaignA',
      },
      {
        id: 2,
        message: 'Your campaign B is reaching its budget limit.',
        campaignId: 'campaignB',
      },
      {
        id: 3,
        message: 'Campaign C has exceeded its target reach!',
        campaignId: 'campaignC',
      },
      {
        id: 4,
        message: 'Campaign C has exceeded its target reach!',
        campaignId: 'campaignC',
      },
      {
        id: 5,
        message: 'Campaign C has exceeded its target reach!',
        campaignId: 'campaignC',
      },
      {
        id: 6,
        message: 'Campaign C has exceeded its target reach!',
        campaignId: 'campaignC',
      },
      {
        id: 7,
        message: 'Campaign C has exceeded its target reach!',
        campaignId: 'campaignC',
      },
    ];

    // Simulate a delay like a real API call
    setTimeout(() => {
      setNotifications(mockData);
    }, 1000);
  }, []);

  return { notifications };
};
