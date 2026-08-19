const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a reusable transporter object using SMTP transport
// Recommend using an App Password if using Gmail, or a service like SendGrid/Resend in production
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER, // e.g., sajalbaruah65@gmail.com
        pass: process.env.SMTP_PASS  // App Password, NOT regular account password
    }
});

const RESTAURANT_EMAIL = 'sajalbaruah65@gmail.com';

/**
 * Send Order Confirmation to Customer
 */
async function sendCustomerOrderConfirmation(customerEmail, customerName, orderData) {
    if (!customerEmail || !process.env.SMTP_USER) return; // Fail silently if email setup is incomplete

    const mailOptions = {
        from: `"S. Baruah Foodyverse" <${process.env.SMTP_USER}>`,
        to: customerEmail,
        subject: `Order Received - ${orderData.orderId}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1c261e;">
                <h2 style="color: #2d5a3e;">Thank you for your order, ${customerName}!</h2>
                <p>We have successfully received your request. Your order is currently <strong>Pending Payment / Kitchen Confirmation</strong>.</p>
                <div style="background-color: #f7f9f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p><strong>Order ID:</strong> ${orderData.orderId}</p>
                    <p><strong>Total Amount:</strong> ₹${orderData.totals.grandTotal.toFixed(2)}</p>
                    <p><strong>Order Type:</strong> ${orderData.orderType.toUpperCase()}</p>
                </div>
                <p>You can track your order status on our website using your Order ID.</p>
                <br>
                <p>Warm regards,<br><strong>S. Baruah Foodyverse Team</strong><br>Pabhoi Panchali, Assam</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Confirmation email sent to ${customerEmail}`);
    } catch (error) {
        console.error('Error sending customer email:', error);
    }
}

/**
 * Send New Order Alert to Restaurant Owner
 */
async function sendAdminOrderAlert(orderData, customer) {
    if (!process.env.SMTP_USER) return;

    const mailOptions = {
        from: `"Foodyverse System" <${process.env.SMTP_USER}>`,
        to: RESTAURANT_EMAIL,
        subject: `NEW ORDER ALERT: ${orderData.orderId}`,
        html: `
            <div style="font-family: Arial, sans-serif; color: #1c261e;">
                <h2 style="color: #d4af37; background-color: #1c261e; padding: 10px;">ACTION REQUIRED: New Order Received</h2>
                <p><strong>Order ID:</strong> ${orderData.orderId}</p>
                <p><strong>Customer:</strong> ${customer.name} (${customer.phone})</p>
                <p><strong>Total:</strong> ₹${orderData.totals.grandTotal.toFixed(2)}</p>
                <p><strong>Type:</strong> ${orderData.orderType.toUpperCase()}</p>
                <hr>
                <p>Please log in to the admin dashboard to verify payment and begin preparation.</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Admin alert email sent successfully.');
    } catch (error) {
        console.error('Error sending admin alert:', error);
    }
}

module.exports = {
    sendCustomerOrderConfirmation,
    sendAdminOrderAlert
};
