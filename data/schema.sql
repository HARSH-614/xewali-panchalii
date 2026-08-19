-- COMPLETE POSTGRESQL DATABASE SCHEMA
-- Execute this file in your PostgreSQL database to create all necessary tables.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Customers
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Menu Items (Central source of truth for pricing)
CREATE TABLE menu_items (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    is_available BOOLEAN DEFAULT true,
    is_vegetarian BOOLEAN DEFAULT false,
    spice_level VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Orders & Order Items
CREATE TYPE order_type AS ENUM ('delivery', 'pickup', 'dine_in');
CREATE TYPE order_status AS ENUM (
    'PENDING_PAYMENT', 'ORDER_RECEIVED', 'CONFIRMED', 'PREPARING', 
    'READY', 'OUT_FOR_DELIVERY', 'DELIVERED', 'COMPLETED', 'CANCELLED', 'REFUNDED'
);

CREATE TABLE orders (
    id VARCHAR(50) PRIMARY KEY,
    customer_id UUID REFERENCES customers(id),
    type order_type NOT NULL,
    status order_status DEFAULT 'PENDING_PAYMENT',
    subtotal DECIMAL(10, 2) NOT NULL,
    tax DECIMAL(10, 2) NOT NULL,
    delivery_fee DECIMAL(10, 2) DEFAULT 0.00,
    total DECIMAL(10, 2) NOT NULL,
    delivery_address TEXT,
    delivery_pincode VARCHAR(10),
    special_instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id VARCHAR(50) REFERENCES menu_items(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price_at_order DECIMAL(10, 2) NOT NULL -- Locked price for historical accuracy
);

-- 4. Payments
CREATE TYPE payment_status AS ENUM (
    'UNPAID', 'PAYMENT_PENDING', 'PAID', 'PAYMENT_FAILED', 'REFUNDED'
);

CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
    gateway_reference VARCHAR(255), -- e.g., Razorpay/Cashfree Order ID
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR',
    status payment_status DEFAULT 'UNPAID',
    payment_method VARCHAR(50), -- UPI, CARD, CASH
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Reservations
CREATE TYPE reservation_status AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

CREATE TABLE reservations (
    id VARCHAR(50) PRIMARY KEY,
    customer_id UUID REFERENCES customers(id),
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    guests INTEGER NOT NULL,
    seating_preference VARCHAR(50),
    special_requests TEXT,
    status reservation_status DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Admin Users
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Settings & Extras
CREATE TABLE restaurant_settings (
    key VARCHAR(100) PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial required settings
INSERT INTO restaurant_settings (key, value) VALUES 
('tax_rate', '0.05'),
('delivery_fee', '50.00'),
('is_accepting_orders', 'true');
