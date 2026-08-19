const express = require('express');
const router = express.Router();
const db = require('../db');

/**
 * POST /api/orders
 * CRITICAL SECURITY ARCHITECTURE: Server-Side Price Calculation
 * The frontend sends ONLY item IDs and quantities.
 * The backend fetches the true prices from the database to prevent client-side manipulation.
 */
router.post('/', async (req, res) => {
    const client = await db.pool.connect();
    
    try {
        await client.query('BEGIN'); // Start transaction

        const { customer, items, orderType, deliveryAddress, pincode, specialInstructions } = req.body;

        // 1. Validate Input
        if (!customer || !customer.phone || !items || items.length === 0) {
            return res.status(400).json({ error: 'Invalid order payload' });
        }

        // 2. Find or Create Customer
        let customerId;
        const custRes = await client.query('SELECT id FROM customers WHERE phone = $1', [customer.phone]);
        
        if (custRes.rows.length > 0) {
            customerId = custRes.rows[0].id;
        } else {
            const newCust = await client.query(
                'INSERT INTO customers (name, phone, email) VALUES ($1, $2, $3) RETURNING id',
                [customer.name, customer.phone, customer.email]
            );
            customerId = newCust.rows[0].id;
        }

        // 3. SERVER-SIDE PRICE CALCULATION (Anti-Hack Mechanism)
        let subtotal = 0;
        const verifiedItems = [];

        for (const item of items) {
            // Fetch real price from database
            const menuRes = await client.query('SELECT name, price, is_available FROM menu_items WHERE id = $1', [item.id]);
            
            if (menuRes.rows.length === 0) {
                throw new Error(`Item ${item.id} not found in database.`);
            }
            if (!menuRes.rows[0].is_available) {
                throw new Error(`Item ${menuRes.rows[0].name} is currently unavailable.`);
            }

            const realPrice = parseFloat(menuRes.rows[0].price);
            const qty = parseInt(item.quantity);
            
            subtotal += (realPrice * qty);
            verifiedItems.push({
                id: item.id,
                name: menuRes.rows[0].name,
                price: realPrice,
                quantity: qty
            });
        }

        // 4. Fetch System Settings for Tax and Delivery
        const settingsRes = await client.query('SELECT key, value FROM restaurant_settings WHERE key IN ($1, $2)', ['tax_rate', 'delivery_fee']);
        const settings = {};
        settingsRes.rows.forEach(row => settings[row.key] = parseFloat(row.value));

        const tax = subtotal * settings.tax_rate;
        const deliveryFee = orderType === 'delivery' ? settings.delivery_fee : 0;
        const grandTotal = subtotal + tax + deliveryFee;

        // 5. Generate Secure Order ID
        const dateStr = new Date().toISOString().slice(0,10).replace(/-/g,'');
        const randomStr = Math.floor(1000 + Math.random() * 9000);
        const orderId = `SBFV-ORD-${dateStr}-${randomStr}`;

        // 6. Insert Order
        await client.query(
            `INSERT INTO orders (id, customer_id, type, subtotal, tax, delivery_fee, total, delivery_address, delivery_pincode, special_instructions) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
            [orderId, customerId, orderType, subtotal, tax, deliveryFee, grandTotal, deliveryAddress, pincode, specialInstructions]
        );

        // 7. Insert Order Items (Locking in the price)
        for (const vItem of verifiedItems) {
            await client.query(
                `INSERT INTO order_items (order_id, menu_item_id, quantity, price_at_order) VALUES ($1, $2, $3, $4)`,
                [orderId, vItem.id, vItem.quantity, vItem.price]
            );
        }

        await client.query('COMMIT'); // Commit transaction

        res.status(201).json({
            success: true,
            orderId: orderId,
            totals: { subtotal, tax, deliveryFee, grandTotal }
        });

    } catch (error) {
        await client.query('ROLLBACK'); // Rollback on error
        console.error('Order processing failed:', error.message);
        res.status(400).json({ error: error.message });
    } finally {
        client.release();
    }
});

module.exports = router;
