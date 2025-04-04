require("dotenv").config();
const { Client } = require("pg");

const SQL = `

CREATE TABLE IF NOT EXISTS customer(

id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
username VARCHAR(50) UNIQUE,
role VARCHAR(50) DEFAULT 'regular' ,
password VARCHAR(50),
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS category(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
category VARCHAR(50),
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
category_id INTEGER REFERENCES category ON DELETE CASCADE,
name VARCHAR(100),
description VARCHAR(500),
price NUMERIC CHECK (price > 0),
imageUrl TEXT,
amount INTEGER,
added_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO customer (username, role, password) VALUES
('pg', 'superuser', 'pg@admin');

INSERT INTO category (category) VALUES 
('beverages'),
('snacks'),
('hygiene'),
('toiletries'),
('fruits'),
('vegetables');

INSERT INTO product (category_id, name, description, price, imageUrl, amount) VALUES
-- Beverages
((SELECT id FROM category WHERE category = 'beverages'), 'Coca-Cola', 'Refreshing soft drink', 1.99, 'https://melcom.com/media/catalog/product/cache/d0e1b0d5c74d14bfa9f7dd43ec52d082/x/5/x584a_1.jpg', 100),
((SELECT id FROM category WHERE category = 'beverages'), 'Pepsi', 'Classic cola beverage', 1.89, 'https://images.freshop.com/00012000002304/5ae994903c29acd282f9463c15da9e6f_large.png', 120),
((SELECT id FROM category WHERE category = 'beverages'), 'Orange Juice', '100% pure orange juice', 3.49, 'https://www.tropicana.com/images/products/tropicana-pure-premium-no-pulp-1920.png', 80),
((SELECT id FROM category WHERE category = 'beverages'), 'Green Tea', 'Organic green tea leaves', 2.99, 'https://m.media-amazon.com/images/I/61tCIeSY81L._SL1100_.jpg', 90),

-- Snacks
((SELECT id FROM category WHERE category = 'snacks'), 'Lays Chips', 'Crispy potato chips', 2.49, 'https://i5.walmartimages.com/seo/Lay-s-Classic-Potato-Chips-15-25-oz-Bag_d9939d0f-6382-4a0d-97c1-d5444345899e_1.c22bb525689793e89a3525a65f5a730c.jpeg', 200),
((SELECT id FROM category WHERE category = 'snacks'), 'Oreos', 'Chocolate sandwich cookies', 3.19, 'https://i5.walmartimages.com/seo/OREO-Chocolate-Sandwich-Cookies-Baked-14-3-oz-Shelf-Stable-Plastic-Tray_fa1cdfc9-30cb-4ae1-aa9a-f4c85cbfd70f.d5bb6d8fac50a6a8e862a00d4de65f20.jpeg', 150),
((SELECT id FROM category WHERE category = 'snacks'), 'Pretzels', 'Salted crunchy pretzels', 2.79, 'https://www.fritolay.com/sites/fritolay.com/files/rold-gold-thins.png', 180),
((SELECT id FROM category WHERE category = 'snacks'), 'Granola Bar', 'Healthy energy snack', 1.99, 'https://www.naturevalley.com/_next/image?url=https%3A%2F%2Fmojo.generalmills.com%2Fapi%2Fpublic%2Fcontent%2FnEh0zLkIcEOSFK9z7xPtjQ_04c57eea-66a2-45cd-a3f2-ecd27146a451_04c57eea-66a2-45cd-a3f2-ecd27146a451.png%3Fv%3Dad39e709%26t%3D04c57eea66a245cda3f2ecd27146a451&w=1024&q=75', 130),

-- Hygiene
((SELECT id FROM category WHERE category = 'hygiene'), 'Hand Sanitizer', 'Kills 99.9% of germs', 4.99, 'https://i5.walmartimages.com/seo/Equate-Original-Hand-Sanitizer-32-fl-oz_b71aaec3-987f-4e7a-863a-9f8e7d15d7fc.c83437d3980fc703ff6ac0621d70b4db.jpeg', 60),
((SELECT id FROM category WHERE category = 'hygiene'), 'Soap', 'Antibacterial hand soap', 2.49, 'https://www.imperialleather.com.gh/wp-content/uploads/2019/10/classic-bar-600x600.jpg', 200),
((SELECT id FROM category WHERE category = 'hygiene'), 'Toothpaste', 'Fluoride toothpaste for strong teeth', 3.99, 'https://i5.walmartimages.com/seo/Sensodyne-Rapid-Relief-Whitening-Sensitive-Toothpaste-3-4-Oz_db6417ac-8168-4077-9fce-6eed8feec9dc.ef1b75e19eccea933a9e8625fa13ce90.jpeg', 180),
((SELECT id FROM category WHERE category = 'hygiene'), 'Mouthwash', 'Alcohol-free mouthwash', 5.49, 'https://www.netmeds.com/images/product-v1/600x600/13763/listerine_coolmint_mouthwash_80_ml_0.jpg', 75),

-- Toiletries
((SELECT id FROM category WHERE category = 'toiletries'), 'Shampoo', 'Herbal shampoo for silky hair', 6.99, 'https://www.hygienelab.com/cdn/shop/products/nourishing-refreshing-shampoo-lavender-sands-150667.jpg?v=1736296395&width=1500', 50),
((SELECT id FROM category WHERE category = 'toiletries'), 'Conditioner', 'Moisturizing hair conditioner', 7.49, 'https://assets.unileversolutions.com/v1/117668756.png?im=AspectCrop=(800,800);Resize=(800,800)', 60), 
((SELECT id FROM category WHERE category = 'toiletries'), 'Body Wash', 'Refreshing citrus body wash', 5.99, 'https://i5.walmartimages.com/seo/Dove-Restoring-Gentle-Body-Wash-for-Women-Coconut-Cocoa-Butter-30-6-oz-with-Pump_22c90987-c45d-4e5f-a7a2-48fe4b61b539.f0cd411c671b7c28d07c138f2974689d.jpeg', 40),
((SELECT id FROM category WHERE category = 'toiletries'), 'Deodorant', 'Long-lasting protection', 4.99, 'https://static.beautytocare.com/cdn-cgi/image/width=1600,height=1600,f=auto/media/catalog/product//n/i/nivea-men-deep-48h-deodorant-anti-perspirant-roll-on-50ml_4.jpg', 90),

-- Fruits
((SELECT id FROM category WHERE category = 'fruits'), 'Apple', 'Fresh red apple', 0.99, 'https://www.collinsdictionary.com/images/thumb/apple_158989157_250.jpg?version=6.0.81', 300),
((SELECT id FROM category WHERE category = 'fruits'), 'Banana', 'Organic ripe bananas', 0.59, 'https://oasisonline.com.au/cdn/shop/products/bananas_1000x.jpg?v=1613482485', 400),
((SELECT id FROM category WHERE category = 'fruits'), 'Strawberry', 'Sweet fresh strawberries', 2.99, 'https://www.wiffens.com/content/uploads/2-straw-768x768.png', 150),
((SELECT id FROM category WHERE category = 'fruits'), 'Mango', 'Juicy tropical mango', 1.79, 'https://nearlynakedveg.co.uk/cdn/shop/products/Depositphotos_11142476_S_720x@2x.jpg?v=1681395520', 120),

-- Vegetables
((SELECT id FROM category WHERE category = 'vegetables'), 'Carrot', 'Organic fresh carrots', 1.29, 'https://mmmm.com.sg/cdn/shop/files/fresh-carrots.webp?v=1721807306&width=1280', 250),
((SELECT id FROM category WHERE category = 'vegetables'), 'Spinach', 'Leafy green spinach', 1.99, 'https://www.taylorfarms.com/wp-content/uploads/2021/04/Website-Product-Image-37.png', 200),
((SELECT id FROM category WHERE category = 'vegetables'), 'Broccoli', 'Fresh broccoli florets', 2.49, 'https://www.hastycart.ca/wp-content/uploads/2024/04/20145621001_front_a06_@2.png', 180),
((SELECT id FROM category WHERE category = 'vegetables'), 'Tomato', 'Juicy red tomatoes', 1.79, 'https://www.heddensofwoodtown.co.uk/wp-content/uploads/2020/05/tomatoes_opt.jpg', 300);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
