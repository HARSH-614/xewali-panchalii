// ... existing imports ...
const paymentRoutes = require('./routes/paymentRoutes');

// ... existing middleware ...

// Special condition: Webhooks often need the raw request body to verify cryptographic signatures
// We must mount the webhook BEFORE the global express.json() parser intercepts it.
app.use('/api/payment/webhook', paymentRoutes); 

app.use(express.json()); // Global JSON parser

// Routes
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes); // Mount remaining payment routes

// ... existing error handler and listen block ...
