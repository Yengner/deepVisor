import Link from 'next/link'
import React from 'react'

const Suggestion = () => {
    return (
        <div className="pt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 underline underline-offset-8 [text-decoration-style:dotted]">
                Suggested For You
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Blog Post Suggestion */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-6">
                    <h3 className="text-md font-semibold text-gray-800 mb-2">
                        How to Maximize ROI on Your Ad Campaigns
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Discover actionable tips to get the most out of your ad spend and generate high-quality leads.
                    </p>
                    <Link
                        href="/blog/maximize-roi"
                        className="text-blue-600 hover:underline text-sm font-medium"
                    >
                        Read more →
                    </Link>
                </div>

                {/* Contact Agency */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-6">
                    <h3 className="text-md font-semibold text-gray-800 mb-2">
                        Book a Free Consultation
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Let&apos;s discuss how we can help you grow your business with effective ad strategies.
                    </p>
                    <a
                        href="/contact"
                        className="text-blue-600 hover:underline text-sm font-medium"
                    >
                        Schedule a Call →
                    </a>
                </div>

                {/* Reports CTA */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-6">
                    <h3 className="text-md font-semibold text-gray-800 mb-2">
                        View Your Campaign Reports
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Stay up-to-date with detailed insights on your ad campaigns&apos; performance.
                    </p>
                    <a
                        href="/reports"
                        className="text-blue-600 hover:underline text-sm font-medium"
                    >
                        Access Reports →
                    </a>
                </div>

                {/* Free Resource */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-6">
                    <h3 className="text-md font-semibold text-gray-800 mb-2">
                        Download Free Marketing Templates
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Get free templates for planning your marketing budget and content strategy.
                    </p>
                    <a
                        href="/resources/free-templates"
                        className="text-blue-600 hover:underline text-sm font-medium"
                    >
                        Download Now →
                    </a>
                </div>
            </div>
        </div>)
}

export default Suggestion