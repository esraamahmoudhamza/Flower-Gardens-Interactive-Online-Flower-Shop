// Flower data
const flowers = [
  { id: 1, name: 'Red Rose', category: 'Roses', price: 15.99, description: 'A vibrant red rose symbolizing love and passion, with fresh petals and a long stem.', img: 'images/redrose.jpg' },
  { id: 2, name: 'Yellow Tulip', category: 'Tulips', price: 12.99, description: 'Bright yellow tulips representing happiness and cheerfulness, perfect for any occasion.', img: 'images/Yellow Tulip.jpg' },
  { id: 3, name: 'Sunflower', category: 'Sunflowers', price: 9.99, description: 'Large sunflower with a sunny yellow center and bright petals, symbolizing adoration.', img: 'images/sunflower.jpg' },
  { id: 4, name: 'White Lily', category: 'Lilies', price: 18.99, description: 'Elegant white lily denoting purity and peace, with graceful curved petals.', img: 'images/WhiteLily.jpg' },
  { id: 5, name: 'Pink Rose', category: 'Roses', price: 16.99, description: 'Soft pink rose expressing gratitude and appreciation, with delicate fragrance.', img: 'images/PinkRose.jpg' },
  { id: 6, name: 'Purple Tulip', category: 'Tulips', price: 13.99, description: 'Rich purple tulips signifying royalty and wisdom, vibrant and eye-catching.', img: 'images/PurpleTulip.jpg' },
  { id: 7, name: 'Giant Sunflower', category: 'Sunflowers', price: 11.99, description: 'Oversized sunflower with deep brown center and golden petals, a garden favorite.', img: 'images/GiantSunflower.jpg'},
  { id: 8, name: 'Tiger Lily', category: 'Lilies', price: 19.99, description: 'Bold tiger lily with orange spots on white petals, representing confidence.', img: 'images/TigerLily.jpg' }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart display
function updateCart() {
  const cartBtn = document.getElementById('cart-toggle');
  cartBtn.textContent = `Cart (${cart.reduce((sum, item) => sum + item.quantity, 0)})`;
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
}

// Display flowers
function displayFlowers(filteredFlowers) {
  const grid = document.getElementById('flowers-grid');
  grid.innerHTML = '';
  filteredFlowers.forEach(flower => {
    const card = `
      <div class="flower-card bg-gray-50 rounded-lg overflow-hidden shadow-sm">
        <img src="${flower.img}" alt="${flower.description}" class="w-full h-48 object-cover" />
        <div class="p-4">
          <h3 class="text-xl font-semibold mb-2">${flower.name}</h3>
          <p class="text-gray-600 mb-4">${flower.description}</p>
          <div class="flex justify-between items-center mb-4">
            <span class="text-2xl font-bold text-green-600">$${flower.price}</span>
            <button onclick="addToCart(${flower.id})" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
    grid.innerHTML += card;
  });
}

// Filter flowers
function filterFlowers() {
  const search = document.getElementById('search').value.toLowerCase();
  const category = document.getElementById('category').value;
  let filtered = flowers.filter(f => f.name.toLowerCase().includes(search));
  if (category) filtered = filtered.filter(f => f.category === category);
  displayFlowers(filtered);
}

// Add to cart
function addToCart(flowerId) {
  const flower = flowers.find(f => f.id === flowerId);
  const existing = cart.find(item => item.id === flowerId);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...flower, quantity: 1 });
  }
  updateCart();
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart display in modal
function updateCartItems() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }
  cart.forEach((item, index) => {
    const itemDiv = `
      <div class="flex justify-between items-center">
        <div>
          <h4 class="font-semibold">${item.name}</h4>
          <p>$${item.price} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        <div class="flex items-center space-x-2">
          <button onclick="changeQuantity(${index}, -1)" class="quantity-btn">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQuantity(${index}, 1)" class="quantity-btn">+</button>
          <button onclick="removeFromCart(${index})" class="text-red-500">×</button>
        </div>
      </div>
    `;
    cartItems.innerHTML += itemDiv;
  });
}

// Change quantity
function changeQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  updateCart();
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartItems();
}

// Remove from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartItems();
}

// Checkout
function checkout() {
  alert('Thank you for your purchase! Your flowers will be delivered soon.');
  cart = [];
  localStorage.removeItem('cart');
  updateCart();
  updateCartItems();
  document.getElementById('cart-modal').classList.remove('show');
}

// Modal toggle
document.getElementById('cart-toggle').addEventListener('click', () => {
  updateCartItems();
  document.getElementById('cart-modal').classList.add('show');
});
document.getElementById('close-cart').addEventListener('click', () => {
  document.getElementById('cart-modal').classList.remove('show');
});
document.getElementById('cart-modal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) e.target.classList.remove('show');
});

// Scroll to flowers
function scrollToFlowers() {
  document.getElementById('flowers').scrollIntoView({ behavior: 'smooth' });
}

// Initialize
displayFlowers(flowers);
updateCart();
