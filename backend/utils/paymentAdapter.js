/**
 * PAYMENT GATEWAY ADAPTER
 * This file serves as the bridge between your system and a real provider (e.g., Razorpay).
 * Currently set up as a stub waiting for production credentials.
 */

// Example: const Razorpay = require('razorpay');
require('dotenv').config();

class PaymentAdapter {
    constructor() {
        this.isConfigured = !!(process.env.PAYMENT_API_KEY && process.env.PAYMENT_API_SECRET);
        
        // Uncomment when credentials are ready:
        // this.instance = new Razorpay({
        //     key_id: process.env.PAYMENT_API_KEY,
        //     key_secret: process.env.PAYMENT_API_SECRET,
        // });
    }

    /**
     * Step 1: Create a secure payment intent/order on the Gateway server.
     */
    async createGatewayOrder(internalOrderId, amountInRupees) {
        if (!this.isConfigured) {
            console.warn(`[DEV] Payment Gateway not configured. Stubbing gateway order for ${internalOrderId}`);
            return {
                id: `stub_pay_${Date.now()}`,
                amount: amountInRupees * 100, // Providers usually expect paise
                currency: "INR",
                receipt: internalOrderId,
                status: "created"
            };
        }

        /* 
        // Real Implementation Example:
        const options = {
            amount: amountInRupees * 100, // amount in the smallest currency unit
            currency: "INR",
            receipt: internalOrderId
        };
        return await this.instance.orders.create(options);
        */
    }

    /**
     * Step 2: Cryptographically verify the signature returned by the gateway webhook.
     */
    verifySignature(orderId, paymentId, signature) {
        if (!this.isConfigured) {
            console.warn(`[DEV] Bypassing cryptographic signature verification.`);
            return true; 
        }

        /*
        // Real Implementation Example:
        const crypto = require('crypto');
        const generated_signature = crypto
            .createHmac('sha256', process.env.PAYMENT_API_SECRET)
            .update(orderId + "|" + paymentId)
            .digest('hex');
            
        return generated_signature === signature;
        */
    }
}

module.exports = new PaymentAdapter();
