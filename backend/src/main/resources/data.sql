-- Dummy Data for Users
-- Password is 'password123' (encoded)
INSERT INTO users (name, email, password_hash) VALUES 
('John Doe', 'john@example.com', '$2a$10$N.zmdr9k7uOCQb376y.6..p0s/kG1/.0d8a8.M1y.w5.z.x.y.z.'), 
('Alice Smith', 'alice@example.com', '$2a$10$N.zmdr9k7uOCQb376y.6..p0s/kG1/.0d8a8.M1y.w5.z.x.y.z.'),
('Bob Jones', 'bob@example.com', '$2a$10$N.zmdr9k7uOCQb376y.6..p0s/kG1/.0d8a8.M1y.w5.z.x.y.z.');

-- Dummy Data for Categories
INSERT INTO categories (user_id, name, type) VALUES 
(1, 'Food', 'EXPENSE'),
(1, 'Rent', 'EXPENSE'),
(1, 'Transport', 'EXPENSE'),
(1, 'Utilities', 'EXPENSE'),
(1, 'Groceries', 'EXPENSE'),
(1, 'Entertainment', 'EXPENSE'),
(1, 'Salary', 'INCOME');

-- Dummy Data for Expenses
INSERT INTO expenses (user_id, category_id, item_name, quantity, unit, price_per_unit, total_amount, date, notes) VALUES 
(1, 1, 'Lunch at Cafe', 1, 'plate', 15.00, 15.00, CURRENT_DATE, 'Business lunch'),
(1, 2, 'Monthly Rent', 1, 'month', 500.00, 500.00, CURRENT_DATE, 'January Rent'),
(1, 5, 'Milk', 2, 'Litre', 1.50, 3.00, CURRENT_DATE, 'Morning supply'),
(1, 5, 'Rice', 5, 'kg', 2.00, 10.00, CURRENT_DATE, 'Basmati Rice'),
(1, 3, 'Uber to Work', 1, 'trip', 25.00, 25.00, CURRENT_DATE, 'Late for meeting');

-- Dummy Data for Shared Expenses
-- Pizza party paid by John (1), split with Alice (2) and Bob (3)
INSERT INTO expenses (user_id, category_id, item_name, quantity, unit, price_per_unit, total_amount, date, notes) VALUES 
(1, 1, 'Pizza Party', 3, 'pizzas', 12.00, 36.00, CURRENT_DATE, 'Shared dinner');

-- Assuming the last inserted ID is 6, we add shared details
INSERT INTO shared_expenses (expense_id, payer_user_id, debtor_user_id, amount_owed, is_settled) VALUES 
(6, 1, 2, 12.00, false),
(6, 1, 3, 12.00, false);
