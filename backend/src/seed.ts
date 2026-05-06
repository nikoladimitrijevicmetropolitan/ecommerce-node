import sequelize from './models';
import Product from './models/Product';

const products = [
  {
    name: 'Vibe Sleek Laptop',
    description: 'Ultra-thin laptop with 16GB RAM and 512GB SSD.',
    price: 1200.00,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww',
    stock: 10
  },
  {
    name: 'Sonic Headphones',
    description: 'Noise-cancelling wireless headphones with 40h battery life.',
    price: 250.50,
    category: 'Audio',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D',
    stock: 25
  },
  {
    name: 'Smart Watch Pro',
    description: 'Water-resistant smartwatch with heart rate monitor.',
    price: 199.99,
    category: 'Wearables',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
    stock: 50
  },
  {
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with brown switches.',
    price: 85.00,
    category: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2V5Ym9hcmR8ZW58MHx8MHx8fDA%3D',
    stock: 15
  },
  {
    name: 'Gaming Mouse',
    description: 'High-precision gaming mouse with customizable buttons.',
    price: 45.00,
    category: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1527690191606-40fd4420d481?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FtaW5nJTIwbW91c2V8ZW58MHx8MHx8fDA%3D',
    stock: 30
  }
];

async function seed() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced!');

    for (const p of products) {
      await Product.create(p);
    }

    console.log('Seed successful!');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
