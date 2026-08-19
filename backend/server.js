const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Body Parsing Middleware
app.use(express.json());

// Routes
app.use('/api/orders', orderRoutes);

// Health Check Endpoint
app.app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'S. Baruah Foodyverse Backend is running.' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running securely on port ${PORT}`);
});
