# Database Seeding Instructions

## Quick Seed via MySQL

1. Open MySQL command line or MySQL Workbench
2. Connect to your database
3. Run:

```sql
USE expense_tracker_db;
SOURCE c:/Users/kiran/OneDrive/Desktop/kiranEdits/mySplit/backend/config/seed_categories.sql;
```

4. Verify:
```sql
SELECT COUNT(*) FROM categories;  -- Should return ~180+
SELECT * FROM categories WHERE level = 0 ORDER BY name;  -- Shows 9 top-level categories
```

## Alternative: Direct File Execution

```bash
mysql -u root -p expense_tracker_db < "c:/Users/kiran/OneDrive/Desktop/kiranEdits/mySplit/backend/config/seed_categories.sql"
```

## Verify Categories Loaded

```sql
-- Top-level categories (should show 9)
SELECT id, name FROM categories WHERE level = 0;

-- Check hierarchy (example: Dairy products)
SELECT c1.name AS 'Main', c2.name AS 'Sub', c3.name AS 'Item'
FROM categories c1
LEFT JOIN categories c2 ON c2.parent_id = c1.id
LEFT JOIN categories c3 ON c3.parent_id = c2.id
WHERE c1.name = 'Dairy & Eggs'
ORDER BY c2.name, c3.name;
```

## Expected Result

| Main Category | Count |
|---------------|-------|
| Dairy & Eggs | 1 |
| Fruits | 1 |
| Vegetables | 1 |
| Staples & Pantry | 1 |
| Snacks & Packaged Food | 1 |
| Meat, Seafood & Protein | 1 |
| Drinks | 1 |
| Restaurants / Cafes / Takeout | 1 |
| Special / Miscellaneous | 1 |

**Total**: 9 top-level + ~50 level-1 + ~130 level-2 = **~180+ categories**
