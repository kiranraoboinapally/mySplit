-- Clear existing categories
TRUNCATE TABLE categories;

-- =========================================
-- TOP-LEVEL CATEGORIES (Level 0)
-- =========================================
INSERT INTO categories (id, name, parent_id, level, description) VALUES
(1, 'Food & Drinks', NULL, 0, 'Groceries, dining, and beverages'),
(2, 'Transport & Travel', NULL, 0, 'Daily commute and transportation'),
(3, 'Housing & Utilities', NULL, 0, 'Rent, bills, and home maintenance'),
(4, 'Health & Fitness', NULL, 0, 'Medical, gym, and wellness'),
(5, 'Entertainment & Leisure', NULL, 0, 'Movies, hobbies, and recreation'),
(6, 'Education & Learning', NULL, 0, 'Courses, books, and certifications'),
(7, 'Shopping & Personal', NULL, 0, 'Clothes, electronics, and personal care'),
(8, 'Finance & Investments', NULL, 0, 'EMIs, loans, savings, and investments'),
(9, 'Gifts & Donations', NULL, 0, 'Celebrations and charity'),
(10, 'Subscriptions', NULL, 0, 'Recurring software and services'),
(11, 'Travel & Vacation', NULL, 0, 'Trips, hotels, and holiday expenses'),
(12, 'Pet Care', NULL, 0, 'Pet food, vet, and grooming'),
(13, 'Miscellaneous', NULL, 0, 'Emergency and unexpected expenses');

-- =========================================
-- 1. FOOD & DRINKS (Detailed hierarchy)
-- =========================================
INSERT INTO categories (name, parent_id, level) VALUES
('Groceries', 1, 1),
('Dining Out', 1, 1),
('Beverages', 1, 1);

-- Groceries subcategories
SET @groceries = (SELECT id FROM categories WHERE name='Groceries' AND parent_id=1);
INSERT INTO categories (name, parent_id, level) VALUES
('Dairy & Eggs', @groceries, 2),
('Fruits', @groceries, 2),
('Vegetables', @groceries, 2),
('Meat & Seafood', @groceries, 2),
('Staples & Grains', @groceries, 2),
('Snacks & Packaged', @groceries, 2);

-- Dining Out subcategories
SET @dining = (SELECT id FROM categories WHERE name='Dining Out' AND parent_id=1);
INSERT INTO categories (name, parent_id, level) VALUES
('Restaurants', @dining, 2),
('Fast Food', @dining, 2),
('Cafes & Coffee', @dining, 2),
('Street Food', @dining, 2);

-- Beverages subcategories
SET @beverages = (SELECT id FROM categories WHERE name='Beverages' AND parent_id=1);
INSERT INTO categories (name, parent_id, level) VALUES
('Non-Alcoholic', @beverages, 2),
('Alcoholic', @beverages, 2);

-- =========================================
-- 2. TRANSPORT & TRAVEL
-- =========================================
INSERT INTO categories (name, parent_id, level) VALUES
('Fuel & Gas', 2, 1),
('Public Transport', 2, 1),
('Ride-hailing & Taxi', 2, 1),
('Vehicle Maintenance', 2, 1),
('Parking & Tolls', 2, 1),
('Flights & Trips', 2, 1),
('Hotels & Accommodation', 2, 1);

-- Public Transport details
SET @public_transport = (SELECT id FROM categories WHERE name='Public Transport' AND parent_id=2);
INSERT INTO categories (name, parent_id, level) VALUES
('Bus', @public_transport, 2),
('Metro / Train', @public_transport, 2),
('Auto Rickshaw', @public_transport, 2);

-- Ride-hailing details
SET @ridehailing = (SELECT id FROM categories WHERE name='Ride-hailing & Taxi' AND parent_id=2);
INSERT INTO categories (name, parent_id, level) VALUES
('Uber', @ridehailing, 2),
('Ola', @ridehailing, 2),
('Local Taxi', @ridehailing, 2);

-- =========================================
-- 3. HOUSING & UTILITIES
-- =========================================
INSERT INTO categories (name, parent_id, level) VALUES
('Rent / Mortgage', 3, 1),
('Electricity', 3, 1),
('Water & Gas', 3, 1),
('Internet & Phone', 3, 1),
('Home Repairs', 3, 1),
('Furniture & Decor', 3, 1),
('Cleaning & Supplies', 3, 1);

-- Internet & Phone details
SET @internet = (SELECT id FROM categories WHERE name='Internet & Phone' AND parent_id=3);
INSERT INTO categories (name, parent_id, level) VALUES
('Broadband', @internet, 2),
('Mobile Recharge', @internet, 2),
('Streaming Services', @internet, 2);

-- =========================================
-- 4. HEALTH & FITNESS
-- =========================================
INSERT INTO categories (name, parent_id, level) VALUES
('Doctor Visits', 4, 1),
('Medicines', 4, 1),
('Gym & Fitness', 4, 1),
('Yoga & Wellness', 4, 1),
('Health Insurance', 4, 1),
('Supplements', 4, 1),
('Therapy & Mental Health', 4, 1);

-- Gym & Fitness details
SET @gym = (SELECT id FROM categories WHERE name='Gym & Fitness' AND parent_id=4);
INSERT INTO categories (name, parent_id, level) VALUES
('Gym Membership', @gym, 2),
('Personal Training', @gym, 2),
('Sports Equipment', @gym, 2);

-- =========================================
-- 5. ENTERTAINMENT & LEISURE
-- =========================================
INSERT INTO categories (name, parent_id, level) VALUES
('Movies & Cinema', 5, 1),
('Streaming Services', 5, 1),
('Games & Apps', 5, 1),
('Hobbies', 5, 1),
('Sports & Recreation', 5, 1),
('Events & Concerts', 5, 1),
('Weekend Trips', 5, 1);

-- Streaming Services details
SET @streaming = (SELECT id FROM categories WHERE name='Streaming Services' AND parent_id=5);
INSERT INTO categories (name, parent_id, level) VALUES
('Netflix', @streaming, 2),
('Amazon Prime', @streaming, 2),
('Disney+ Hotstar', @streaming, 2),
('YouTube Premium', @streaming, 2),
('Spotify', @streaming, 2);

-- Hobbies details
SET @hobbies = (SELECT id FROM categories WHERE name='Hobbies' AND parent_id=5);
INSERT INTO categories (name, parent_id, level) VALUES
('Photography', @hobbies, 2),
('Music', @hobbies, 2),
('Art & Craft', @hobbies, 2),
('Reading', @hobbies, 2);

-- =========================================
-- 6. EDUCATION & LEARNING
-- =========================================
INSERT INTO categories (name, parent_id, level) VALUES
('Online Courses', 6, 1),
('Books & eBooks', 6, 1),
('Workshops & Seminars', 6, 1),
('Certifications', 6, 1),
('Tuition & Classes', 6, 1),
('Stationery', 6, 1);

-- Online Courses details
SET @courses = (SELECT id FROM categories WHERE name='Online Courses' AND parent_id=6);
INSERT INTO categories (name, parent_id, level) VALUES
('Udemy', @courses, 2),
('Coursera', @courses, 2),
('Skillshare', @courses, 2),
('LinkedIn Learning', @courses, 2);

-- =========================================
-- 7. SHOPPING & PERSONAL
-- =========================================
INSERT INTO categories (name, parent_id, level) VALUES
('Clothing', 7, 1),
('Footwear', 7, 1),
('Accessories', 7, 1),
('Electronics', 7, 1),
('Personal Care', 7, 1),
('Grooming', 7, 1),
('Jewelry', 7, 1);

-- Electronics details
SET @electronics = (SELECT id FROM categories WHERE name='Electronics' AND parent_id=7);
INSERT INTO categories (name, parent_id, level) VALUES
('Mobile Phone', @electronics, 2),
('Laptop / Computer', @electronics, 2),
('Headphones', @electronics, 2),
('Smart Watch', @electronics, 2),
('Camera', @electronics, 2);

-- Personal Care details
SET @personal_care = (SELECT id FROM categories WHERE name='Personal Care' AND parent_id=7);
INSERT INTO categories (name, parent_id, level) VALUES
('Skincare', @personal_care, 2),
('Haircare', @personal_care, 2),
('Makeup', @personal_care, 2),
('Fragrances', @personal_care, 2);

-- =========================================
-- 8. FINANCE & INVESTMENTS
-- =========================================
INSERT INTO categories (name, parent_id, level) VALUES
('Loan EMIs', 8, 1),
('Credit Card Bills', 8, 1),
('Savings', 8, 1),
('Investments', 8, 1),
('Insurance Premiums', 8, 1),
('Taxes', 8, 1);

-- Loan EMIs details
SET @loans = (SELECT id FROM categories WHERE name='Loan EMIs' AND parent_id=8);
INSERT INTO categories (name, parent_id, level) VALUES
('Home Loan', @loans, 2),
('Car Loan', @loans, 2),
('Personal Loan', @loans, 2),
('Education Loan', @loans, 2);

-- Investments details
SET @investments = (SELECT id FROM categories WHERE name='Investments' AND parent_id=8);
INSERT INTO categories (name, parent_id, level) VALUES
('Mutual Funds', @investments, 2),
('Stocks', @investments, 2),
('Fixed Deposits', @investments, 2),
('Crypto', @investments, 2);

-- Insurance Premiums details
SET @insurance = (SELECT id FROM categories WHERE name='Insurance Premiums' AND parent_id=8);
INSERT INTO categories (name, parent_id, level) VALUES
('Life Insurance', @insurance, 2),
('Health Insurance', @insurance, 2),
('Vehicle Insurance', @insurance, 2);

-- =========================================
-- 9. GIFTS & DONATIONS
-- =========================================
INSERT INTO categories (name, parent_id, level) VALUES
('Birthday Gifts', 9, 1),
('Wedding Gifts', 9, 1),
('Festival Gifts', 9, 1),
('Charity', 9, 1),
('Donations', 9, 1),
('Party Supplies', 9, 1);

-- =========================================
-- 10. SUBSCRIPTIONS
-- =========================================
INSERT INTO categories (name, parent_id, level) VALUES
('Software & Tools', 10, 1),
('Cloud Storage', 10, 1),
('News & Magazines', 10, 1),
('Professional Services', 10, 1);

-- Software & Tools details
SET @software = (SELECT id FROM categories WHERE name='Software & Tools' AND parent_id=10);
INSERT INTO categories (name, parent_id, level) VALUES
('Adobe Creative Cloud', @software, 2),
('Microsoft 365', @software, 2),
('Canva Pro', @software, 2),
('Notion', @software, 2),
('GitHub', @software, 2);

-- Cloud Storage details
SET @cloud = (SELECT id FROM categories WHERE name='Cloud Storage' AND parent_id=10);
INSERT INTO categories (name, parent_id, level) VALUES
('Google Drive', @cloud, 2),
('Dropbox', @cloud, 2),
('iCloud', @cloud, 2);

-- AI & Productivity details
INSERT INTO categories (name, parent_id, level) VALUES
('AI & Productivity', 10, 1),
('Entertainment Subscriptions', 10, 1),
('TV & Cable', 10, 1),
('Gaming Services', 10, 1);

SET @ai = (SELECT id FROM categories WHERE name='AI & Productivity' AND parent_id=10);
INSERT INTO categories (name, parent_id, level) VALUES
('ChatGPT Plus', @ai, 2),
('Claude Pro', @ai, 2),
('Gemini Advanced', @ai, 2),
('GitHub Copilot', @ai, 2),
('Midjourney', @ai, 2),
('Perplexity', @ai, 2),
('Jasper', @ai, 2);

-- Entertainment Subscriptions details (Billing focus)
SET @entsub = (SELECT id FROM categories WHERE name='Entertainment Subscriptions' AND parent_id=10);
INSERT INTO categories (name, parent_id, level) VALUES
('YouTube Premium', @entsub, 2),
('Netflix', @entsub, 2),
('Disney+ Hotstar', @entsub, 2),
('Amazon Prime', @entsub, 2),
('Apple TV+', @entsub, 2),
('Hulu', @entsub, 2),
('SonyLIV', @entsub, 2),
('Zee5', @entsub, 2),
('Audible', @entsub, 2);

-- TV & Cable details
SET @tvcable = (SELECT id FROM categories WHERE name='TV & Cable' AND parent_id=10);
INSERT INTO categories (name, parent_id, level) VALUES
('Tata Sky / DTH', @tvcable, 2),
('Cable Bill', @tvcable, 2),
('Dish TV', @tvcable, 2),
('Sun Direct', @tvcable, 2);

-- Gaming Services details
SET @gaming = (SELECT id FROM categories WHERE name='Gaming Services' AND parent_id=10);
INSERT INTO categories (name, parent_id, level) VALUES
('PlayStation Plus', @gaming, 2),
('Xbox Game Pass', @gaming, 2),
('Nintendo Switch Online', @gaming, 2),
('Steam', @gaming, 2);

-- =========================================
-- 11. TRAVEL & VACATION
-- =========================================
INSERT INTO categories (name, parent_id, level) VALUES
('Flight Tickets', 11, 1),
('Train / Bus Tickets', 11, 1),
('Hotel Bookings', 11, 1),
('Vacation Rentals', 11, 1),
('Tour Packages', 11, 1),
('Travel Insurance', 11, 1),
('Visa & Passport', 11, 1),
('Sightseeing', 11, 1),
('Local Transportation', 11, 1);

-- Hotel Bookings details
SET @hotels = (SELECT id FROM categories WHERE name='Hotel Bookings' AND parent_id=11);
INSERT INTO categories (name, parent_id, level) VALUES
('Budget Hotels', @hotels, 2),
('Mid-Range Hotels', @hotels, 2),
('Luxury Hotels', @hotels, 2),
('Resorts', @hotels, 2);

-- Tour Packages details
SET @tours = (SELECT id FROM categories WHERE name='Tour Packages' AND parent_id=11);
INSERT INTO categories (name, parent_id, level) VALUES
('Domestic Tours', @tours, 2),
('International Tours', @tours, 2),
('Adventure Trips', @tours, 2),
('Cruise', @tours, 2);

-- =========================================
-- 12. PET CARE
-- =========================================
INSERT INTO categories (name, parent_id, level) VALUES
('Pet Food', 12, 1),
('Veterinary', 12, 1),
('Pet Grooming', 12, 1),
('Pet Supplies', 12, 1),
('Pet Insurance', 12, 1),
('Pet Boarding', 12, 1);

-- Pet Food details
SET @petfood = (SELECT id FROM categories WHERE name='Pet Food' AND parent_id=12);
INSERT INTO categories (name, parent_id, level) VALUES
('Dog Food', @petfood, 2),
('Cat Food', @petfood, 2),
('Bird Food', @petfood, 2),
('Fish Food', @petfood, 2);

-- Pet Supplies details
SET @petsupplies = (SELECT id FROM categories WHERE name='Pet Supplies' AND parent_id=12);
INSERT INTO categories (name, parent_id, level) VALUES
('Toys', @petsupplies, 2),
('Beds & Bedding', @petsupplies, 2),
('Collars & Leashes', @petsupplies, 2),
('Cages & Aquariums', @petsupplies, 2);

-- =========================================
-- 13. MISCELLANEOUS & EMERGENCY
-- =========================================
INSERT INTO categories (name, parent_id, level) VALUES
('Emergency Expenses', 13, 1),
('Repairs & Maintenance', 13, 1),
('Legal Fees', 13, 1),
('Bank Charges', 13, 1),
('ATM Fees', 13, 1),
('Fines & Penalties', 13, 1),
('Post Office / Courier', 13, 1),
('Household Helpers', 13, 1),
('Other Expenses', 13, 1);

-- Emergency Expenses details
SET @emergency = (SELECT id FROM categories WHERE name='Emergency Expenses' AND parent_id=13);
INSERT INTO categories (name, parent_id, level) VALUES
('Medical Emergency', @emergency, 2),
('Vehicle Breakdown', @emergency, 2),
('Home Emergency', @emergency, 2),
('Lost / Stolen Items', @emergency, 2);

-- Household Helpers details
SET @helpers = (SELECT id FROM categories WHERE name='Household Helpers' AND parent_id=13);
INSERT INTO categories (name, parent_id, level) VALUES
('Maid / Cleaning', @helpers, 2),
('Cook', @helpers, 2),
('Gardener', @helpers, 2),
('Security', @helpers, 2),
('Driver', @helpers, 2);

-- Reset auto increment
ALTER TABLE categories AUTO_INCREMENT = 1;

-- Success message (commented)
-- SELECT 'Category seeding complete!' AS status;
-- SELECT COUNT(*) AS total_categories FROM categories;
