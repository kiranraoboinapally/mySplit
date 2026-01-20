# Database Migration Fix

## Issue
Foreign key constraint error: `category_id` and `id` are incompatible types.

## Solution

Drop and recreate the database schema:

```sql
-- Connect to MySQL
USE expense_tracker_db;

-- Drop all tables to reset
DROP TABLE IF EXISTS shared_expenses;
DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

-- Now restart the Go server and it will recreate tables with correct types
```

Then run the category seed:

```bash
mysql -u root -p expense_tracker_db < "c:/Users/kiran/OneDrive/Desktop/kiranEdits/mySplit/backend/config/seed_categories.sql"
```
