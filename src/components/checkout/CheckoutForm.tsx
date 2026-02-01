'use client'

import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { ShieldCheck, Loader2, Lock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { formatPrice } from '@/lib/utils'

interface CheckoutFormProps {
    amount: number
    locale: string
}

export default function CheckoutForm({ amount, locale }: CheckoutFormProps) {
    const t = useTranslations('Checkout')
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        setIsLoading(true)
        setErrorMessage(null)

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/${locale}/checkout/success`,
            },
        })

        if (error) {
            setErrorMessage(error.message || t('unexpectedError'))
            setIsLoading(false)
        } else {
            // The UI will likely redirect before this code executes
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl mb-8">
            <h3 className="text-xl font-bold mb-6 flex items-center">
                <Lock className="mr-2 text-indigo-600" size={20} />
                {t('paymentDetails')}
            </h3>

            <div className="mb-6">
                <PaymentElement />
            </div>

            {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
                    {errorMessage}
                </div>
            )}

            <button
                type="submit"
                disabled={isLoading || !stripe || !elements}
                className="w-full py-5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="animate-spin" size={20} />
                        <span>{t('processing')}</span>
                    </>
                ) : (
                    <>
                        <span>{t('pay')} {formatPrice(amount)}</span>
                        <ShieldCheck size={20} />
                    </>
                )}
            </button>

            <div className="mt-6 flex items-center justify-center space-x-2 text-slate-400 text-sm">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span>{t('securedByStripe')}</span>
            </div>
        </form>
    )
}
