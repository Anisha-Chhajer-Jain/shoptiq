require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

connectDB();

const users = [
  {
    name: 'Admin User',
    email: 'admin@shoptiq.com',
    password: 'password123',
    role: 'admin',
  },
  {
    name: 'Anisha Seller',
    email: 'anisha@shoptiq.com',
    password: 'password123',
    role: 'seller',
  },
  {
    name: 'Buyer User',
    email: 'buyer@shoptiq.com',
    password: 'password123',
    role: 'buyer',
  },
];

const products = [
  {
    name: 'Luxury Velvet Blazer',
    price: 8500,
    stock: 25,
    category: 'Clothing',
    description: 'A premium velvet blazer for a sophisticated evening look.',
  },
  {
    name: 'Titanium Smart Watch',
    price: 15000,
    stock: 50,
    category: 'Electronics',
    description: 'Next-gen titanium body with AI health tracking features.',
  },
  {
    name: 'Minimalist Leather Tote',
    price: 4200,
    stock: 15,
    category: 'Accessories',
    description: 'Handcrafted genuine leather tote bag with ample space.',
  },
  {
    name: 'Ergonomic Mesh Chair',
    price: 12000,
    stock: 10,
    category: 'Home & Office',
    description: 'Breathable mesh back with multi-level lumber support.',
  },
  {
    name: 'Noise Cancelling Headphones',
    price: 18500,
    stock: 30,
    category: 'Electronics',
    description: 'Studio-grade sound quality with hybrid active noise cancellation.',
  },
];

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
