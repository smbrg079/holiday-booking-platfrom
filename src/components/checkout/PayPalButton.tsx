'use client'

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useRouter } from "@/i18n/routing";
import { useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";

interface PayPalButtonProps {
    amount: number;
    bookingId: string;
    locale: string;
}

export default function PayPalButton({ amount, bookingId, locale }: PayPalButtonProps) {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

    if (!clientId) {
        return (
            <div className="p-6 bg-amber-50 border border-amber-100 rounded-3xl text-center">
                <AlertCircle className="mx-auto text-amber-500 mb-2" size={24} />
                <p className="text-amber-700 text-sm font-medium">PayPal is not configured. Please add NEXT_PUBLIC_PAYPAL_CLIENT_ID to .env</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <PayPalScriptProvider options={{ "clientId": clientId, currency: "USD" }}>
                <PayPalButtons
                    style={{
                        layout: "vertical",
                        color: "gold",
                        shape: "pill",
                        label: "pay"
                    }}
                    createOrder={async () => {
                        // In a real app, you'd create the order on your server
                        // But for this demo, we'll return a static order creation on client
                        // Normally: return fetch('/api/payments/paypal/create-order', ...).then(res => res.id)
                        return fetch("/api/payments/paypal/create-order", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ bookingId }),
                        })
                            .then(res => res.json())
                            .then(data => data.id);
                    }}
                    onApprove={async (data, actions) => {
                        // Capture the funds on your server
                        return fetch(`/api/payments/paypal/capture-order`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ orderID: data.orderID, bookingId }),
                        })
                            .then(res => res.json())
                            .then(details => {
                                if (details.success) {
                                    router.push("/checkout/success");
                                } else {
                                    setError("Payment failed. Please try again.");
                                }
                            });
                    }}
                    onError={(err) => {
                        console.error("PayPal Error:", err);
                        setError("There was an error with PayPal. Please try again.");
                    }}
                />
            </PayPalScriptProvider>
            {error && <p className="mt-4 text-red-500 text-sm font-medium text-center">{error}</p>}
        </div>
    );
}
