'use client'

import { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { getStripe } from '@/lib/stripe-client'
import { StripeElementsOptions } from '@stripe/stripe-js'
import CheckoutForm from './CheckoutForm'
import PayPalButton from './PayPalButton'
import { Loader2, CreditCard, ShieldCheck } from 'lucide-react'

interface PaymentWrapperProps {
    bookingId: string
    amount: number
    locale: string
}

export default function PaymentWrapper({ bookingId, amount, locale }: PaymentWrapperProps) {
    const [clientSecret, setClientSecret] = useState('')
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/api/payments/create-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bookingId }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.clientSecret) {
                    setClientSecret(data.clientSecret)
                } else if (data.error) {
                    setError(data.error)
                }
            })
            .catch(err => {
                console.error("Error fetching payment intent:", err)
                setError("Failed to connect to the payment server. Please try again.")
            });
    }, [bookingId]);

    const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe')

    if (error) {
        return (
            <div className="p-8 bg-red-50 border border-red-100 rounded-[2.5rem] text-center">
                <div className="text-red-600 font-bold mb-2">Checkout Error</div>
                <p className="text-red-500 text-sm">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-6 px-6 py-2 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-colors"
                >
                    Retry Initialization
                </button>
            </div>
        )
    }

    const stripePromise = getStripe();

    const options = {
        clientSecret,
        appearance: {
            theme: 'stripe',
            labels: 'floating',
            variables: {
                colorPrimary: '#4f46e5',
                borderRadius: '16px',
                fontFamily: 'Inter, system-ui, sans-serif',
            },
        },
    };

    return (
        <div className="space-y-8">
            {/* Payment Method Selector */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div
                    onClick={() => setPaymentMethod('stripe')}
                    className={`p-6 border-2 rounded-[2rem] flex flex-col items-center justify-center space-y-3 cursor-pointer transition-all duration-300 ${paymentMethod === 'stripe' ? 'border-indigo-600 bg-indigo-50 shadow-lg shadow-indigo-100' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${paymentMethod === 'stripe' ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
                        <CreditCard size={24} />
                    </div>
                    <span className={`font-bold transition-colors ${paymentMethod === 'stripe' ? 'text-slate-900' : 'text-slate-400'}`}>Credit Card</span>
                </div>

                <div
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-6 border-2 rounded-[2rem] flex flex-col items-center justify-center space-y-3 cursor-pointer transition-all duration-300 ${paymentMethod === 'paypal' ? 'border-indigo-600 bg-indigo-50 shadow-lg shadow-indigo-100' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${paymentMethod === 'paypal' ? 'bg-[#0070ba] text-white' : 'bg-slate-50 text-slate-400'}`}>
                        <span className="font-black text-xl italic select-none">P</span>
                    </div>
                    <span className={`font-bold transition-colors ${paymentMethod === 'paypal' ? 'text-slate-900' : 'text-slate-400'}`}>PayPal</span>
                </div>
            </div>

            {paymentMethod === 'stripe' ? (
                <>
                    {clientSecret ? (
                        <Elements options={options as StripeElementsOptions} stripe={stripePromise}>
                            <CheckoutForm amount={amount} locale={locale} />
                        </Elements>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-[2.5rem] shadow-xl border border-slate-100 min-h-[400px]">
                            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                            <p className="text-slate-500 font-medium">Initializing Secure Checkout...</p>
                        </div>
                    )}
                </>
            ) : (
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl">
                    <h3 className="text-xl font-bold mb-6 flex items-center">
                        <span className="w-8 h-8 rounded-lg bg-[#0070ba]/10 text-[#0070ba] flex items-center justify-center mr-3 font-black italic">P</span>
                        PayPal Checkout
                    </h3>
                    <div className="p-6 bg-slate-50 rounded-2xl mb-8 text-center text-slate-500 text-sm">
                        Confirm your booking by using the PayPal button below. You will be redirected to PayPal&apos;s secure site.
                    </div>
                    <PayPalButton amount={amount} bookingId={bookingId} locale={locale} />

                    <div className="mt-8 flex items-center justify-center space-x-2 text-slate-400 text-xs uppercase tracking-widest font-black">
                        <ShieldCheck size={14} className="text-emerald-500" />
                        <span>Powered by PayPal Secure Payments</span>
                    </div>
                </div>
            )}
        </div>
    )
}
