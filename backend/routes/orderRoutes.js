const express = require('express');
const router = express.Router();
const db = require('../db');
const { sendCustomerOrderConfirmation, sendAdminOrderAlert } = require('../utils/emailService');

router.post('/', async (req, res) => {
    const client = await db.query ? await db.pool.connect() : null; // Fallback for dev mode without DB connected yet
    
    // TEMPORARY MOCK FOR CONTINUED FRONTEND DEVELOPMENT
    // This allows the server to run and test email logic even if PostgreSQL is not yet configured locally.
    if (!client) {
        console.warn("DEV MODE: Bypassing Database Insertion.");
        const mockOrderId = `SBFV-ORD-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(1000 + Math.random() * 9000)}`;
        
        // Mock async email triggering
        setTimeout(() => {
            sendCustomerOrderConfirmation(req.body.customer?.email, req.body.customer?.name, { orderId: mockOrderId, totals: { grandTotal: 500 }, orderType: 'delivery' });
            sendAdminOrderAlert({ orderId: mockOrderId, totals: { grandTotal: 500 }, orderType: 'delivery' }, req.body.customer);
        }, 1000);

        return res.status(201).json({ success: true, orderId: mockOrderId });
    }

    // --- REAL DATABASE LOGIC BEGINS ---
    try {
        await client.query('BEGIN');
        const { customer, items, orderType, deliveryAddress, pincode, specialInstructions } = req.body;
        
        /* ... (Database insertion logic from Phase 8 remains here) ... */
        
        // Assume order generation was successful (abbreviated for brevity):
        const orderId = "GENERATED_ID"; 
        const totals = { grandTotal: 0 }; 

        await client.query('COMMIT');

        // Fire & Forget Emails (Do not await, so response to user is immediate)
        if (customer.email) {
            sendCustomerOrderConfirmation(customer.email, customer.name, { orderId, totals, orderType }).catch(console.error);
        }
        sendAdminOrderAlert({ orderId, totals, orderType }, customer).catch(console.error);

        res.status(201).json({
            success: true,
            orderId: orderId,
            totals: totals
        });

    } catch (error) {
        await client.query('ROLLBACK');
        res.status(400).json({ error: error.message });
    } finally {
        client.release();
    }
});

module.exports = router;
