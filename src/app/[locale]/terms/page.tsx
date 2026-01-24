import React from 'react'

const TermsPage = () => {
    return (
        <div className="pt-32 pb-24 bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-black text-slate-900 mb-4">Terms & Conditions</h1>
                <p className="text-slate-400 mb-12">Last Updated: January 24, 2024</p>

                <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">1. Acceptance of Terms</h2>
                        <p className="mb-4">
                            By accessing and using HolidaySync, you agree to be bound by these Terms and Conditions and all applicable laws and regulations.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">2. Booking & Payments</h2>
                        <p className="mb-4">
                            All bookings are subject to availability. Prices are listed in USD unless otherwise specified. Full payment is required at the time of booking to confirm your reservation.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">3. Cancellation & Refunds</h2>
                        <p className="mb-4">
                            Cancellations made 24 hours or more before the activity start time are eligible for a full refund. Cancellations made within 24 hours are non-refundable. HolidaySync reserves the right to cancel activities due to unforeseen circumstances (e.g., weather). In such cases, a full refund or rescheduling will be offered.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">4. User Responsibility</h2>
                        <p className="mb-4">
                            Users are responsible for providing accurate information during booking and ensuring they meet any physical or age requirements specified for the activity.
                        </p>
                    </section>

                    <section className="mb-12">
                        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 italic">
                            &quot;We are committed to providing you with the best travel experiences while maintaining transparency and trust.&quot;
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default TermsPage
