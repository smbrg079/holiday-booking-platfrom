const getPaypalAccessToken = async () => {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error("PayPal keys are missing");
    }

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    // For sandbox, use api-m.sandbox.paypal.com. For live, api-m.paypal.com
    const baseUrl = clientId.startsWith('sb-') ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.sandbox.paypal.com'; // Defaulting to sandbox for safety

    const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
            Authorization: `Basic ${auth}`,
        },
    });

    const data = await response.json();
    return data.access_token;
};

export const createPaypalOrder = async (amount: number, bookingReference: string) => {
    const accessToken = await getPaypalAccessToken();
    const baseUrl = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID?.startsWith('sb-') ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.sandbox.paypal.com';

    const response = await fetch(`${baseUrl}/v2/checkout/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            intent: "CAPTURE",
            purchase_units: [
                {
                    reference_id: bookingReference,
                    amount: {
                        currency_code: "USD",
                        value: amount.toFixed(2),
                    },
                },
            ],
        }),
    });

    return await response.json();
};

export const capturePaypalOrder = async (orderId: string) => {
    const accessToken = await getPaypalAccessToken();
    const baseUrl = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID?.startsWith('sb-') ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.sandbox.paypal.com';

    const response = await fetch(`${baseUrl}/v2/checkout/orders/${orderId}/capture`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return await response.json();
};
