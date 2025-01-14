import { IBenefit } from "@/types/public/types";
import { FiBarChart2, FiBriefcase, FiCpu, FiDollarSign, FiEye, FiLayers, FiLock, FiPieChart, FiShield, FiTarget, FiTrendingUp, FiUser } from "react-icons/fi";


export const benefits: IBenefit[] = [
    {
        title: "Smart Campaigns",
        description: "Optimize your marketing efforts with data-driven strategies designed to maximize engagement and ROI.",
        bullets: [
            {
                title: "Data-Driven Insights",
                description: "Access detailed analytics to track performance and fine-tune campaigns in real-time.",
                icon: <FiBarChart2 size={26} />
            },
            {
                title: "Targeted Advertising",
                description: "Reach the right audience with precision-targeting tools tailored to your business goals.",
                icon: <FiTarget size={26} />
            },
            {
                title: "Predictive Trends",
                description: "Leverage AI to identify upcoming trends and adapt your strategies proactively.",
                icon: <FiTrendingUp size={26} />
            }
        ],
        imageSrc: "/images/paper.png"
    },
    {
        title: "Unified Marketing Data",
        description: "Streamline your marketing efforts with a centralized dashboard for all your platforms.",
        bullets: [
            {
                title: "Cross-Platform Insights",
                description: "Integrate and analyze data from platforms like Meta, Google, TikTok, and LinkedIn.",
                icon: <FiBarChart2 size={26} />
            },
            {
                title: "Actionable Metrics",
                description: "Track KPIs like engagement, reach, and conversions in one place.",
                icon: <FiTrendingUp size={26} />
            },
            {
                title: "Data Transparency",
                description: "See exactly where your marketing budget is going and how it performs.",
                icon: <FiEye size={26} />
            }
        ],
        imageSrc: "/images/marketing-dashboard.png"
    },
    {
        title: "Growth-Driven Tools",
        description: "Empowering businesses of all sizes to achieve smarter marketing outcomes.",
        bullets: [
            {
                title: "AI-Powered Recommendations",
                description: "Get insights and suggestions to optimize your campaigns in real time.",
                icon: <FiCpu size={26} />
            },
            {
                title: "Scalable for All Businesses",
                description: "From startups to enterprises, our tools adapt to your marketing needs.",
                icon: <FiLayers size={26} />
            },
            {
                title: "Data-Driven Decisions",
                description: "Leverage detailed analytics to make informed marketing choices.",
                icon: <FiPieChart size={26} />
            }
        ],
        imageSrc: "/images/growth-image.png"
    }
]