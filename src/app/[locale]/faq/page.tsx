'use client'

import React, { useState } from 'react'
import { Plus, Minus, Search } from 'lucide-react'

const FAQPage = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const faqs = [
        {
            q: "How do I book an activity?",
            a: "Simply browse our destinations or activities, select the one you like, choose a date and number of participants, and click 'Book Now'. Follow the checkout process to secure your spot."
        },
        {
            q: "What is your cancellation policy?",
            a: "Most activities offer free cancellation up to 24 hours before the scheduled start time. Specific rules may vary by activity, so please check the activity details page for precise information."
        },
        {
            q: "Are the tour guides verified?",
            a: "Yes, we work exclusively with professional, licensed guides and operators. Each partner undergoes a strict verification process to ensure safety and quality."
        },
        {
            q: "Do I need to print my booking confirmation?",
            a: "No, digital confirmation on your phone is sufficient. You will receive an email with a booking reference that you can show to your guide."
        },
        {
            q: "Can I reschedule my booking?",
            a: "Yes, you can reschedule your booking through your user dashboard if the request is made within the allowed timeframe (usually up to 48h before the event)."
        },
        {
            q: "What payment methods do you accept?",
            a: "We accept all major credit cards (Visa, Mastercard, Amex), Apple Pay, Google Pay, and PayPal."
        }
    ]

    return (
        <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-black text-slate-900 mb-6">Frequently Asked Questions</h1>
                    <p className="text-slate-500 text-lg">
                        Everything you need to know about booking with HolidaySync.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative mb-12">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold" size={20} />
                    <input
                        type="text"
                        placeholder="Search for answers..."
                        className="w-full pl-16 pr-8 py-5 bg-white border-none rounded-3xl shadow-xl shadow-slate-200 focus:ring-2 focus:ring-indigo-500 font-medium"
                    />
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm transition-all"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-8 text-left hover:bg-slate-50 transition-colors"
                            >
                                <span className="text-xl font-bold text-slate-900 pr-8">{faq.q}</span>
                                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${openIndex === i ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                                    {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                                </div>
                            </button>

                            {openIndex === i && (
                                <div className="px-8 pb-8 animate-in slide-in-from-top-2 duration-300">
                                    <p className="text-slate-500 leading-relaxed text-lg">
                                        {faq.a}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-16 p-10 bg-indigo-600 rounded-[2.5rem] text-center text-white">
                    <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
                    <p className="mb-8 text-indigo-100">If you can&apos;t find what you&apos;re looking for, our team is happy to help.</p>
                    <button className="px-10 py-4 bg-white text-indigo-600 font-bold rounded-full hover:bg-slate-50 transition-colors">
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FAQPage
