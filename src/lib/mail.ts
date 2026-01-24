import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendBookingConfirmation = async (
    email: string,
    bookingReference: string,
    activityTitle: string,
    totalPrice: number,
    date: Date
) => {
    if (!process.env.RESEND_API_KEY) {
        console.warn("RESEND_API_KEY is missing. Skipping email.");
        return;
    }

    try {
        await resend.emails.send({
            from: 'HolidaySync <onboarding@resend.dev>', // Update with verified domain
            to: email,
            subject: `Booking Confirmed: ${activityTitle}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #4f46e5;">Your Booking is Confirmed!</h1>
                    <p>Thank you for booking with HolidaySync. We are excited to see you.</p>
                    
                    <div style="padding: 24px; background-color: #f8fafc; border-radius: 12px; margin: 24px 0;">
                        <h3 style="margin-top: 0; color: #1e293b;">Booking Details</h3>
                        <p style="margin: 8px 0;"><strong>Activity:</strong> ${activityTitle}</p>
                        <p style="margin: 8px 0;"><strong>Reference:</strong> ${bookingReference}</p>
                        <p style="margin: 8px 0;"><strong>Date:</strong> ${date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p style="margin: 8px 0;"><strong>Amount Paid:</strong> $${totalPrice.toFixed(2)}</p>
                    </div>
                    
                    <p>If you have any questions, simply reply to this email.</p>
                    <p style="color: #94a3b8; font-size: 12px; margin-top: 40px;">HolidaySync - Travel & Adventures</p>
                </div>
            `
        });
        console.log(`Confirmation email sent to ${email}`);
    } catch (error) {
        console.error('Email sending failed:', error);
    }
};
