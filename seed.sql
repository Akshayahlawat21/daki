-- ==============================================================================
-- Sample Seed Data for Sales CRM Database
-- Use this in Supabase SQL Editor after running schema.sql
-- ==============================================================================

-- 1. Create Organization
INSERT INTO organizations (id, name, slug)
VALUES 
    ('a0000000-0000-0000-0000-000000000001', 'Acme Corporation', 'acme-corp')
ON CONFLICT (slug) DO NOTHING;

-- 2. Create Roles
INSERT INTO roles (id, organization_id, name, description)
VALUES 
    ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Admin', 'Full administrative access'),
    ('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Sales Manager', 'Manages sales team, leads and deals'),
    ('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'Sales Representative', 'Executes daily sales activities and manages pipeline')
ON CONFLICT DO NOTHING;

-- 3. Create Users
INSERT INTO users (id, organization_id, role_id, name, email, status)
VALUES 
    ('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'Alex Johnson', 'alex@acmecorp.com', 'active'),
    ('c0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000002', 'Sarah Miller', 'sarah@acmecorp.com', 'active'),
    ('c0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000003', 'David Smith', 'david@acmecorp.com', 'active')
ON CONFLICT (email) DO NOTHING;

-- 4. Create Teams & Team Members
INSERT INTO teams (id, organization_id, name, description)
VALUES 
    ('d0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Enterprise Sales', 'Focuses on Fortune 500 accounts')
ON CONFLICT DO NOTHING;

INSERT INTO team_members (team_id, user_id, is_active)
VALUES 
    ('d0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000002', true),
    ('d0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000003', true)
ON CONFLICT DO NOTHING;

-- 5. Create Campaigns
INSERT INTO campaigns (id, organization_id, name, type, status, start_date, end_date, budget)
VALUES 
    ('e0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Q4 Cloud Summit Outreach', 'Event', 'active', '2026-10-01', '2026-12-31', 25000.00)
ON CONFLICT DO NOTHING;

-- 6. Create Leads & Lead Signals
INSERT INTO leads (id, organization_id, assigned_to, campaign_id, source, status, name, email, phone, industry, score)
VALUES 
    ('f0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000001', 'Website Form', 'qualified', 'Emily Davis', 'emily@techhorizon.io', '+1-555-0199', 'SaaS', 85)
ON CONFLICT DO NOTHING;

INSERT INTO lead_signals (lead_id, signal_type, signal_value, score, source)
VALUES 
    ('f0000000-0000-0000-0000-000000000001', 'Page Visit', 'Pricing Page viewed 4 times', 30, 'Website Analytics'),
    ('f0000000-0000-0000-0000-000000000001', 'Demo Request', 'Requested Enterprise Demo', 55, 'Contact Form');

-- 7. Create Accounts & Contacts
INSERT INTO accounts (id, organization_id, name, industry, website, phone, address, status)
VALUES 
    ('10000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Tech Horizon Inc', 'Information Technology', 'https://techhorizon.io', '+1-555-0100', '100 Silicon Ave, San Francisco, CA', 'active')
ON CONFLICT DO NOTHING;

INSERT INTO contacts (id, account_id, first_name, last_name, email, phone, title, department)
VALUES 
    ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Emily', 'Davis', 'emily@techhorizon.io', '+1-555-0199', 'VP of Engineering', 'Engineering')
ON CONFLICT DO NOTHING;

-- 8. Create Products
INSERT INTO products (id, organization_id, name, sku, category, description, price, currency, is_active)
VALUES 
    ('30000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Enterprise CRM License', 'SKU-CRM-ENT', 'Software', 'Annual enterprise tier seat license', 1200.00, 'USD', true),
    ('30000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Onboarding & Migration Package', 'SKU-SVC-ONB', 'Services', 'Dedicated migration assistance and training', 5000.00, 'USD', true)
ON CONFLICT DO NOTHING;

-- 9. Create Opportunities & Deals
INSERT INTO opportunities (id, organization_id, account_id, contact_id, owner_id, name, amount, stage, probability, expected_close_date)
VALUES 
    ('40000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000003', 'Tech Horizon 50-Seat Expansion', 65000.00, 'Negotiation', 80, '2026-11-15')
ON CONFLICT DO NOTHING;

INSERT INTO deals (id, organization_id, account_id, opportunity_id, name, amount, currency, stage, close_date, status)
VALUES 
    ('50000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', 'Tech Horizon Enterprise Deal', 65000.00, 'USD', 'Closing', '2026-11-15', 'open')
ON CONFLICT DO NOTHING;

INSERT INTO deal_products (deal_id, product_id, quantity, unit_price, discount)
VALUES 
    ('50000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 50, 1200.00, 0.00),
    ('50000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000002', 1, 5000.00, 0.00)
ON CONFLICT DO NOTHING;

-- 10. Create Activities & Notes
INSERT INTO activities (organization_id, account_id, contact_id, opportunity_id, user_id, type, subject, description, start_at, end_at, status, priority)
VALUES 
    ('a0000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000003', 'Demo Call', 'Executive Architecture Review', 'Demonstrate cloud infrastructure features and discuss roadmap', CURRENT_TIMESTAMP + INTERVAL '1 day', CURRENT_TIMESTAMP + INTERVAL '1 day 1 hour', 'planned', 'high');

INSERT INTO notes (organization_id, user_id, related_to_type, related_to_id, content)
VALUES 
    ('a0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000003', 'deal', '50000000-0000-0000-0000-000000000001', 'Client is keen on SLA terms and 24/7 priority support.');

-- 11. Create Invoices, Invoice Items & Payments
INSERT INTO invoices (id, organization_id, account_id, deal_id, invoice_number, issue_date, due_date, subtotal, tax_amount, total_amount, currency, status)
VALUES 
    ('60000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000001', 'INV-2026-001', '2026-10-06', '2026-11-06', 65000.00, 0.00, 65000.00, 'USD', 'issued')
ON CONFLICT DO NOTHING;

INSERT INTO invoice_items (organization_id, invoice_id, product_id, description, quantity, unit_price, discount, tax, subtotal, total)
VALUES 
    ('a0000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', '50x Enterprise Licenses', 50, 1200.00, 0.00, 0.00, 60000.00, 60000.00),
    ('a0000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000002', 'Onboarding Package', 1, 5000.00, 0.00, 0.00, 5000.00, 5000.00);

INSERT INTO payments (organization_id, invoice_id, amount, payment_method, transaction_id, status)
VALUES 
    ('a0000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000001', 65000.00, 'Bank Wire', 'TXN-9847192837', 'completed');
