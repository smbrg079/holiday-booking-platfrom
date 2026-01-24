import Stripe from 'stripe'

// We avoid throwing here to prevent build-time crashes
// Keys should be validated at the route level
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'dummy_key', {
    typescript: true,
})
