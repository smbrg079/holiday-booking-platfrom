import { loadStripe } from '@stripe/stripe-js';

export const getStripe = () => {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!key || key === '') {
        console.error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is missing!");
        return null;
    }
    const stripePromise = loadStripe(key);
    return stripePromise;
};
