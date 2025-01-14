import { IFAQ } from "@/types/public/types";
import { siteDetails } from "./siteDetails";

export const faqs: IFAQ[] = [
    {
        question: `Is ${siteDetails.siteName} secure?`,
        answer: `Absolutely. ${siteDetails.siteName} employs state-of-the-art encryption to protect your data and adheres to strict data privacy standards. We never sell your data to third parties, ensuring your information remains confidential and secure.`,
    },
    {
        question: `Can I integrate multiple platforms with ${siteDetails.siteName}?`,
        answer: 'Yes! You can seamlessly integrate multiple social media platforms like Meta, Google, TikTok, and more to get a centralized view of your marketing data.',
    },
    {
        question: 'How can DeepVisor help me with my campaigns?',
        answer: `${siteDetails.siteName} provides actionable insights, advanced analytics, and AI-driven recommendations to optimize your campaigns. Plus, you'll have full transparency into your data and results.`,
    },
    {
        question: 'What if I want DeepVisor to manage my campaigns?',
        answer: 'You can request a free estimate to have our team of experts handle your campaigns. We’ll ensure your strategy is optimized for results while keeping you informed with detailed reports.',
    },
    {
        question: 'What support does DeepVisor provide?',
        answer: 'Our team is here to help! You’ll have access to our support via email and chat, along with a knowledge base filled with tutorials and FAQs to guide you through the platform.',
    },
];
