-- Database Schema Preparation for Phase 6 (PostgreSQL format)
-- This schema prepares the backend structure required for true order management.

CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE order_type AS ENUM ('delivery', 'pickup', 'dine_in');
CREATE TYPE order_status AS ENUM (
    'PENDING_PAYMENT', 
    'ORDER_RECEIVED', 
    'CONFIRMED', 
    'PREPARING', 
    'READY', 
    'OUT_FOR_DELIVERY', 
    'DELIVERED', 
    'COMPLETED', 
    'CANCELLED', 
    'REFUNDED'
);

CREATE TABLE orders (
    id VARCHAR(50) PRIMARY KEY, -- Format: SBFV-ORD-YYYYMMDD-XXXX
    customer_id UUID REFERENCES customers(id),
    type order_type NOT NULL,
    status order_status DEFAULT 'PENDING_PAYMENT',
    subtotal DECIMAL(10, 2) NOT NULL,
    tax DECIMAL(10, 2) NOT NULL,
    delivery_fee DECIMAL(10, 2) DEFAULT 0.00,
    total DECIMAL(10, 2) NOT NULL,
    delivery_address TEXT,
    delivery_pincode VARCHAR(10),
    pickup_time TIME,
    table_number VARCHAR(20),
    special_instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price_at_order DECIMAL(10, 2) NOT NULL -- Crucial: Freezes the price at the time of order
);

CREATE TABLE order_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
    status order_status NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
