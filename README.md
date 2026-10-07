# Sales CRM Supabase Setup Guide

This repository contains the complete PostgreSQL database schema and seed data for the **Sales CRM Database Schema (Enhanced)** based on your ER diagram.

---

## 📁 Files Included

1. **[`schema.sql`](./schema.sql)**: Full database schema definition with:
   - All **27 tables** with exact columns, data types, and primary / foreign key relationships
   - Automatic `updated_at` trigger functions
   - Optimized indexes for multi-tenancy and foreign keys
2. **[`seed.sql`](./seed.sql)**: Sample data across all modules to instantly test tables and relations

---

## 🚀 How to Apply to Supabase in 3 Steps

### Step 1: Open Supabase SQL Editor
1. Go to your Supabase project: [https://supabase.com/dashboard/project/ijcadjkycoursargthbm](https://supabase.com/dashboard/project/ijcadjkycoursargthbm)
2. In the left navigation menu, click **SQL Editor** (the `>_` icon just below *Table Editor*).

### Step 2: Run `schema.sql`
1. Click **+ New Query** in the SQL Editor.
2. Copy the entire contents of [`schema.sql`](./schema.sql).
3. Paste it into the editor and click **Run** (or press `Ctrl` + `Enter` / `Cmd` + `Enter`).
4. You will see `Success. No rows returned`.

### Step 3: (Optional) Run `seed.sql` for Sample Data
1. Open a new query tab.
2. Copy the contents of [`seed.sql`](./seed.sql), paste and click **Run**.
3. Go back to **Table Editor** on the left menu: all 27 tables will now appear populated with realistic CRM data!

---

## 📊 Modules & Tables Overview

| Module | Tables Included |
| :--- | :--- |
| **1. Security & Organization** | `organizations`, `roles`, `permissions`, `role_permissions`, `users`, `teams`, `team_members` |
| **2. Sales Acquisition** | `campaigns`, `campaign_members`, `campaign_responses`, `leads`, `lead_signals`, `lead_conversions` |
| **3. Sales Pipeline & Commerce** | `accounts`, `contacts`, `sales_targets`, `opportunities`, `deals`, `deal_products`, `products` |
| **4. Engagement & Tracking** | `activities`, `activity_participants`, `notes` |
| **5. Audit Logs** | `audit_logs` |
| **6. Billing & Payments** | `invoices`, `invoice_items`, `payments` |
