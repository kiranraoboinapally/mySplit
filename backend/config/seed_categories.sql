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

-- Reset auto increment (Moved to end)
-- ALTER TABLE categories AUTO_INCREMENT = 1;

-- =========================================
-- DETAILED GROCERY SEEDING (Level 3 & 4)
-- =========================================

-- 1. DAIRY & EGGS DETAILS
SET @dairy = (SELECT id FROM categories WHERE name='Dairy & Eggs' AND parent_id=@groceries);

INSERT INTO categories (name, parent_id, level) VALUES
('Milk', @dairy, 3),
('Cheese', @dairy, 3),
('Yogurt / Dahi / Greek Yogurt', @dairy, 3),
('Butter / Ghee / Margarine', @dairy, 3),
('Cream / Condensed Milk', @dairy, 3),
('Eggs', @dairy, 3);

SET @milk = (SELECT id FROM categories WHERE name='Milk' AND parent_id=@dairy);
INSERT INTO categories (name, parent_id, level) VALUES
('Cow Milk', @milk, 4),
('Buffalo Milk', @milk, 4),
('Almond Milk', @milk, 4),
('Soy Milk', @milk, 4),
('Oat Milk', @milk, 4);

SET @cheese = (SELECT id FROM categories WHERE name='Cheese' AND parent_id=@dairy);
INSERT INTO categories (name, parent_id, level) VALUES
('Cheddar', @cheese, 4),
('Mozzarella', @cheese, 4),
('Paneer', @cheese, 4),
('Feta', @cheese, 4),
('Gouda', @cheese, 4);

-- 2. FRUITS DETAILS
SET @fruits = (SELECT id FROM categories WHERE name='Fruits' AND parent_id=@groceries);

INSERT INTO categories (name, parent_id, level) VALUES
('Common Fruits', @fruits, 3),
('Berries', @fruits, 3),
('Citrus', @fruits, 3),
('Tropical', @fruits, 3),
('Exotic', @fruits, 3);

SET @common_fruits = (SELECT id FROM categories WHERE name='Common Fruits' AND parent_id=@fruits);
INSERT INTO categories (name, parent_id, level) VALUES
('Apple', @common_fruits, 4),
('Banana', @common_fruits, 4),
('Orange', @common_fruits, 4),
('Grapes', @common_fruits, 4),
('Mango', @common_fruits, 4),
('Pear', @common_fruits, 4);

SET @berries = (SELECT id FROM categories WHERE name='Berries' AND parent_id=@fruits);
INSERT INTO categories (name, parent_id, level) VALUES
('Strawberry', @berries, 4),
('Blueberry', @berries, 4),
('Raspberry', @berries, 4),
('Blackberry', @berries, 4);

SET @citrus = (SELECT id FROM categories WHERE name='Citrus' AND parent_id=@fruits);
INSERT INTO categories (name, parent_id, level) VALUES
('Lemon', @citrus, 4),
('Lime', @citrus, 4),
('Grapefruit', @citrus, 4);

SET @tropical = (SELECT id FROM categories WHERE name='Tropical' AND parent_id=@fruits);
INSERT INTO categories (name, parent_id, level) VALUES
('Papaya', @tropical, 4),
('Pineapple', @tropical, 4),
('Watermelon', @tropical, 4),
('Guava', @tropical, 4);

SET @exotic = (SELECT id FROM categories WHERE name='Exotic' AND parent_id=@fruits);
INSERT INTO categories (name, parent_id, level) VALUES
('Dragon Fruit', @exotic, 4),
('Kiwi', @exotic, 4),
('Pomegranate', @exotic, 4),
('Passion Fruit', @exotic, 4),
('Starfruit', @exotic, 4);

-- 3. VEGETABLES DETAILS
SET @vegetables = (SELECT id FROM categories WHERE name='Vegetables' AND parent_id=@groceries);

INSERT INTO categories (name, parent_id, level) VALUES
('Leafy Greens', @vegetables, 3),
('Root Vegetables', @vegetables, 3),
('Cruciferous', @vegetables, 3),
('Others', @vegetables, 3);

SET @leafy = (SELECT id FROM categories WHERE name='Leafy Greens' AND parent_id=@vegetables);
INSERT INTO categories (name, parent_id, level) VALUES
('Spinach', @leafy, 4),
('Lettuce', @leafy, 4),
('Kale', @leafy, 4),
('Mint', @leafy, 4),
('Coriander', @leafy, 4),
('Fenugreek', @leafy, 4);

SET @root = (SELECT id FROM categories WHERE name='Root Vegetables' AND parent_id=@vegetables);
INSERT INTO categories (name, parent_id, level) VALUES
('Carrot', @root, 4),
('Potato', @root, 4),
('Beetroot', @root, 4),
('Radish', @root, 4),
('Turnip', @root, 4),
('Ginger', @root, 4),
('Garlic', @root, 4);

SET @cruciferous = (SELECT id FROM categories WHERE name='Cruciferous' AND parent_id=@vegetables);
INSERT INTO categories (name, parent_id, level) VALUES
('Broccoli', @cruciferous, 4),
('Cauliflower', @cruciferous, 4),
('Cabbage', @cruciferous, 4),
('Brussels Sprouts', @cruciferous, 4);

SET @others = (SELECT id FROM categories WHERE name='Others' AND parent_id=@vegetables);
INSERT INTO categories (name, parent_id, level) VALUES
('Tomato', @others, 4),
('Cucumber', @others, 4),
('Capsicum', @others, 4),
('Eggplant', @others, 4),
('Pumpkin', @others, 4),
('Zucchini', @others, 4);

-- 4. STAPLES & GRAINS DETAILS
SET @staples = (SELECT id FROM categories WHERE name='Staples & Grains' AND parent_id=@groceries);

INSERT INTO categories (name, parent_id, level) VALUES
('Rice & Grains', @staples, 3),
('Flours & Baking', @staples, 3),
('Pulses & Lentils', @staples, 3),
('Spices & Herbs', @staples, 3),
('Cooking Oils & Fats', @staples, 3),
('Sugar, Salt & Sweeteners', @staples, 3),
('Sauces, Condiments & Pastes', @staples, 3);

SET @rice = (SELECT id FROM categories WHERE name='Rice & Grains' AND parent_id=@staples);
INSERT INTO categories (name, parent_id, level) VALUES
('Basmati Rice', @rice, 4),
('Brown Rice', @rice, 4),
('Quinoa', @rice, 4),
('Oats', @rice, 4),
('Cornmeal / Polenta', @rice, 4);

SET @flours = (SELECT id FROM categories WHERE name='Flours & Baking' AND parent_id=@staples);
INSERT INTO categories (name, parent_id, level) VALUES
('Wheat Flour', @flours, 4),
('Maida / All-Purpose Flour', @flours, 4),
('Rice Flour', @flours, 4),
('Baking Powder / Soda', @flours, 4);

SET @pulses = (SELECT id FROM categories WHERE name='Pulses & Lentils' AND parent_id=@staples);
INSERT INTO categories (name, parent_id, level) VALUES
('Toor Dal', @pulses, 4),
('Moong Dal', @pulses, 4),
('Chana / Chickpeas', @pulses, 4),
('Rajma / Kidney Beans', @pulses, 4),
('Lentils (Masoor, Green, Black)', @pulses, 4);

SET @spices = (SELECT id FROM categories WHERE name='Spices & Herbs' AND parent_id=@staples);
INSERT INTO categories (name, parent_id, level) VALUES
('Turmeric', @spices, 4),
('Cumin', @spices, 4),
('Coriander Powder', @spices, 4),
('Chili Powder', @spices, 4),
('Basil', @spices, 4),
('Oregano', @spices, 4);

SET @oils = (SELECT id FROM categories WHERE name='Cooking Oils & Fats' AND parent_id=@staples);
INSERT INTO categories (name, parent_id, level) VALUES
('Vegetable Oil', @oils, 4),
('Olive Oil', @oils, 4),
('Coconut Oil', @oils, 4),
('Ghee', @oils, 4),
('Butter', @oils, 4);

SET @sugar = (SELECT id FROM categories WHERE name='Sugar, Salt & Sweeteners' AND parent_id=@staples);
INSERT INTO categories (name, parent_id, level) VALUES
('White Sugar', @sugar, 4),
('Brown Sugar', @sugar, 4),
('Honey', @sugar, 4),
('Salt', @sugar, 4),
('Artificial Sweeteners', @sugar, 4);

SET @sauces = (SELECT id FROM categories WHERE name='Sauces, Condiments & Pastes' AND parent_id=@staples);
INSERT INTO categories (name, parent_id, level) VALUES
('Tomato Ketchup', @sauces, 4),
('Soy Sauce', @sauces, 4),
('Mustard', @sauces, 4),
('Chili Sauce', @sauces, 4),
('Mayonnaise', @sauces, 4);

-- 5. SNACKS DETAILS
SET @snacks = (SELECT id FROM categories WHERE name='Snacks & Packaged' AND parent_id=@groceries);

INSERT INTO categories (name, parent_id, level) VALUES
('Chips / Namkeen', @snacks, 3),
('Biscuits / Cookies / Crackers', @snacks, 3),
('Chocolates / Candy / Sweets / Mithai', @snacks, 3),
('Instant Noodles / Pasta / Ready-to-eat Meals', @snacks, 3),
('Nuts / Seeds / Dry Fruits', @snacks, 3),
('Breakfast Cereals / Granola Bars', @snacks, 3);

-- 6. MEAT & SEAFOOD DETAILS
SET @meat_seafood = (SELECT id FROM categories WHERE name='Meat & Seafood' AND parent_id=@groceries);

INSERT INTO categories (name, parent_id, level) VALUES
('Meat', @meat_seafood, 3),
('Seafood', @meat_seafood, 3),
('Poultry', @meat_seafood, 3),
('Tofu / Plant Protein', @meat_seafood, 3);

SET @meat = (SELECT id FROM categories WHERE name='Meat' AND parent_id=@meat_seafood);
INSERT INTO categories (name, parent_id, level) VALUES
('Mutton / Lamb', @meat, 4),
('Beef', @meat, 4),
('Pork', @meat, 4);

SET @seafood = (SELECT id FROM categories WHERE name='Seafood' AND parent_id=@meat_seafood);
INSERT INTO categories (name, parent_id, level) VALUES
('Fish', @seafood, 4),
('Shrimp / Prawns', @seafood, 4),
('Crab', @seafood, 4),
('Lobster', @seafood, 4),
('Squid / Calamari', @seafood, 4);

SET @poultry = (SELECT id FROM categories WHERE name='Poultry' AND parent_id=@meat_seafood);
INSERT INTO categories (name, parent_id, level) VALUES
('Chicken', @poultry, 4),
('Duck', @poultry, 4),
('Turkey', @poultry, 4);

-- 7. BEVERAGES DETAILS (Level 3 under Non-Alcoholic / Alcoholic)
SET @beverages = (SELECT id FROM categories WHERE name='Beverages' AND parent_id=1);
SET @non_alcoholic = (SELECT id FROM categories WHERE name='Non-Alcoholic' AND parent_id=@beverages);
SET @alcoholic = (SELECT id FROM categories WHERE name='Alcoholic' AND parent_id=@beverages);

INSERT INTO categories (name, parent_id, level) VALUES
('Water', @non_alcoholic, 3),
('Juices', @non_alcoholic, 3),
('Tea', @non_alcoholic, 3),
('Coffee', @non_alcoholic, 3),
('Soft Drinks / Soda', @non_alcoholic, 3),
('Energy Drinks / Sports Drinks', @non_alcoholic, 3),
('Coconut Water / Flavored Water', @non_alcoholic, 3);

INSERT INTO categories (name, parent_id, level) VALUES
('Beer', @alcoholic, 3),
('Wine', @alcoholic, 3),
('Spirits', @alcoholic, 3),
('Cocktails', @alcoholic, 3),
('Liqueurs', @alcoholic, 3);

-- =========================================
-- DETAILED NON-GROCERY SEEDING (Level 2, 3 & 4)
-- =========================================

-- 1. TRANSPORT DETAILS
SET @transport = 2; 

SET @fuel = (SELECT id FROM categories WHERE name='Fuel & Gas' AND parent_id=@transport);
INSERT INTO categories (name, parent_id, level) VALUES
('Petrol', @fuel, 2),
('Diesel', @fuel, 2),
('CNG / LPG', @fuel, 2),
('EV Charging', @fuel, 2);

SET @maintenance = (SELECT id FROM categories WHERE name='Vehicle Maintenance' AND parent_id=@transport);
INSERT INTO categories (name, parent_id, level) VALUES
('Car Service', @maintenance, 2),
('Bike Service', @maintenance, 2),
('Car Wash', @maintenance, 2),
('Spare Parts', @maintenance, 2),
('Tyre Replacement', @maintenance, 2);

SET @parking = (SELECT id FROM categories WHERE name='Parking & Tolls' AND parent_id=@transport);
INSERT INTO categories (name, parent_id, level) VALUES
('Parking Fees', @parking, 2),
('Toll / FastTag', @parking, 2),
('Traffic Fines', @parking, 2);

SET @flights = (SELECT id FROM categories WHERE name='Flights & Trips' AND parent_id=@transport);
INSERT INTO categories (name, parent_id, level) VALUES
('Domestic Flights', @flights, 2),
('International Flights', @flights, 2),
('Travel Agent Fees', @flights, 2),
('Visa Fees', @flights, 2);

-- 2. HOUSING DETAILS
SET @housing = 3;

SET @rent = (SELECT id FROM categories WHERE name='Rent / Mortgage' AND parent_id=@housing);
INSERT INTO categories (name, parent_id, level) VALUES
('Monthly Rent', @rent, 2),
('Maintenance Charges', @rent, 2),
('Brokerage', @rent, 2),
('Property Tax', @rent, 2);

SET @electricity = (SELECT id FROM categories WHERE name='Electricity' AND parent_id=@housing);
INSERT INTO categories (name, parent_id, level) VALUES
('Monthly Bill', @electricity, 2),
('Arrears', @electricity, 2);

SET @watergas = (SELECT id FROM categories WHERE name='Water & Gas' AND parent_id=@housing);
INSERT INTO categories (name, parent_id, level) VALUES
('Water Tanker', @watergas, 2),
('Corporation Water Bill', @watergas, 2),
('Gas Cylinder (LPG)', @watergas, 2),
('Piped Gas Bill', @watergas, 2);

SET @repairs = (SELECT id FROM categories WHERE name='Home Repairs' AND parent_id=@housing);
INSERT INTO categories (name, parent_id, level) VALUES
('Plumbing', @repairs, 2),
('Electrical Work', @repairs, 2),
('Carpenter / Woodwork', @repairs, 2),
('Painting', @repairs, 2),
('Appliance Repair', @repairs, 2);

SET @furniture = (SELECT id FROM categories WHERE name='Furniture & Decor' AND parent_id=@housing);
INSERT INTO categories (name, parent_id, level) VALUES
('Furniture', @furniture, 2),
('Curtains & Blinds', @furniture, 2),
('Lighting & Lamps', @furniture, 2),
('Plants & Garden', @furniture, 2);

SET @cleaning = (SELECT id FROM categories WHERE name='Cleaning & Supplies' AND parent_id=@housing);
INSERT INTO categories (name, parent_id, level) VALUES
('Maid Salary', @cleaning, 2),
('Floor Cleaner / Phenyl', @cleaning, 2),
('Laundry / Detergent', @cleaning, 2),
('Dishwashing', @cleaning, 2),
('Bathroom Supplies', @cleaning, 2);

-- 3. HEALTH DETAILS
SET @health = 4;

SET @doctor = (SELECT id FROM categories WHERE name='Doctor Visits' AND parent_id=@health);
INSERT INTO categories (name, parent_id, level) VALUES
('General Physician', @doctor, 2),
('Dentist', @doctor, 2),
('Eye Specialist', @doctor, 2),
('Dermatologist', @doctor, 2),
('Lab Tests / Diagnostics', @doctor, 2);

SET @medicines = (SELECT id FROM categories WHERE name='Medicines' AND parent_id=@health);
INSERT INTO categories (name, parent_id, level) VALUES
('Prescription Medicines', @medicines, 2),
('OTC / First Aid', @medicines, 2),
('Vitamins & Supplements', @medicines, 2),
('Homeopathy / Ayurveda', @medicines, 2);

SET @insurance_health = (SELECT id FROM categories WHERE name='Health Insurance' AND parent_id=@health);
INSERT INTO categories (name, parent_id, level) VALUES
('Premium Payment', @insurance_health, 2),
('Top-up Plan', @insurance_health, 2);

-- 4. ENTERTAINMENT DETAILS
SET @entertainment = 5;

SET @movies = (SELECT id FROM categories WHERE name='Movies & Cinema' AND parent_id=@entertainment);
INSERT INTO categories (name, parent_id, level) VALUES
('Movie Tickets', @movies, 2),
('Popcorn & Snacks', @movies, 2),
('IMAX / Premium', @movies, 2);

SET @events = (SELECT id FROM categories WHERE name='Events & Concerts' AND parent_id=@entertainment);
INSERT INTO categories (name, parent_id, level) VALUES
('Concerts', @events, 2),
('Stand-up Comedy', @events, 2),
('Workshops', @events, 2),
('Sports Matches', @events, 2);

-- 5. SHOPPING DETAILS
SET @shopping = 7;

SET @clothing = (SELECT id FROM categories WHERE name='Clothing' AND parent_id=@shopping);
INSERT INTO categories (name, parent_id, level) VALUES
('Men''s Wear', @clothing, 2),
('Women''s Wear', @clothing, 2),
('Kids'' Wear', @clothing, 2),
('Winter Wear', @clothing, 2),
('Sportswear', @clothing, 2),
('Innerwear', @clothing, 2);

SET @footwear = (SELECT id FROM categories WHERE name='Footwear' AND parent_id=@shopping);
INSERT INTO categories (name, parent_id, level) VALUES
('Casual Shoes', @footwear, 2),
('Formal Shoes', @footwear, 2),
('Sports Shoes', @footwear, 2),
('Slippers / Sandals', @footwear, 2);

SET @accessories = (SELECT id FROM categories WHERE name='Accessories' AND parent_id=@shopping);
INSERT INTO categories (name, parent_id, level) VALUES
('Bags / Wallets', @accessories, 2),
('Watches', @accessories, 2),
('Sunglasses', @accessories, 2),
('Jewelry / Ornaments', @accessories, 2);

SET @grooming = (SELECT id FROM categories WHERE name='Grooming' AND parent_id=@shopping);
INSERT INTO categories (name, parent_id, level) VALUES
('Haircut / Salon', @grooming, 2),
('Spa / Massage', @grooming, 2),
('Manicure / Pedicure', @grooming, 2);

-- 6. FINANCE DETAILS
SET @finance = 8;
-- Most finance categories (Loans, Investments) already have Level 2.
-- Adding specific Taxes if needed
SET @taxes = (SELECT id FROM categories WHERE name='Taxes' AND parent_id=@finance);
INSERT INTO categories (name, parent_id, level) VALUES
('Income Tax', @taxes, 2),
('GST', @taxes, 2),
('Professional Tax', @taxes, 2);

-- 7. MISCELLANEOUS DETAILS
SET @misc = 13;

SET @gifts = (SELECT id FROM categories WHERE name='Gifts & Donations' AND parent_id=9);
-- Note: Gifts is top Level 9, not under Misc (13) in this schema, but 'Miscellaneous' has 'Other Expenses'
-- Seeding specific sub-items for Top Level 9 (Gifts)
INSERT INTO categories (name, parent_id, level) VALUES
('Wedding Gift', @gifts, 2),
('Birthday Gift', @gifts, 2),
('Anniversary Gift', @gifts, 2),
('Rakhi / Festival Gift', @gifts, 2);

-- Final reset
ALTER TABLE categories AUTO_INCREMENT = 1;
SELECT 'Full category seeding (Basic + Advanced) complete!' AS status;


