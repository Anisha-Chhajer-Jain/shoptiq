export const PRODUCTS = [
  {
    id: 'p1',
    name: 'Velocity Prime X1',
    cat: 'FOOTWEAR',
    brand: 'HERITAGE COLLECTION',
    price: 4500,
    oldPrice: 6500,
    rating: 4.8,
    reviews: 124,
    status: 'IN STOCK',
    badge: 'LIVE INVENTORY',
    discount: '15%',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400',
    desc: 'High-performance engineering with responsive cushioning for agility.'
  },
  {
    id: 'p2',
    name: 'Ethereal Mono Watch',
    cat: 'ACCESSORIES',
    brand: 'STUDIO DENIM',
    price: 12500,
    oldPrice: 15800,
    rating: 5.0,
    reviews: 42,
    status: 'LOW STOCK',
    badge: 'LOW STOCK: 3 LEFT',
    discount: '10%',
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400',
    desc: 'Precision Swiss movement housed in a surgical-grade steel case.'
  },
  {
    id: 'p3',
    name: 'Sonic ANC Gen 2',
    cat: 'ELECTRONICS',
    brand: 'ACCESSORIES',
    price: 8500,
    oldPrice: 10200,
    rating: 4.7,
    reviews: 892,
    status: 'IN STOCK',
    badge: 'LIVE INVENTORY',
    discount: '20%',
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400',
    desc: 'Active noise cancellation and spatial audio for immersive sound.'
  },
  {
    id: 'p4',
    name: 'Nomad Leather Pack',
    cat: 'TRAVEL',
    brand: 'LUXURY LEATHER',
    price: 6500,
    oldPrice: 8800,
    rating: 4.6,
    reviews: 156,
    status: 'IN STOCK',
    badge: 'LIVE INVENTORY',
    discount: '12%',
    img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=400',
    desc: 'Handcrafted full-grain leather backpack designed for modern explorers.'
  }
];

export const NEGOTIATIONS = [
  { id: 1, name: 'Velo-Speed Pro X', asking: 4500, bid: 3800, status: 'COUNTER', type: 'offer', time: '2m ago', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400' },
  { id: 2, name: 'Nordic Chrono v2', asking: 12999, bid: 10500, status: 'PENDING', type: 'waiting', time: '1h ago', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400' },
  { id: 3, name: 'Aura HD Headphones', asking: 8500, bid: 7200, status: 'EXPIRED', type: 'expired', time: 'Ended yesterday', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400' }
];

export const GROUP_BUYS = [
  { id: 1, name: 'Studio Audio Pack', progress: 85, backers: 142, needed: 8, discount: '35% OFF', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400' },
  { id: 2, name: 'Smart Garden Kit v2', progress: 62, backers: 94, needed: 26, discount: '20% OFF', img: 'https://images.unsplash.com/photo-1585336139118-1079a79c5155?auto=format&fit=crop&q=80&w=400' }
];
