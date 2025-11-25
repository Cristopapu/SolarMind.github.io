// producto.js - maneja la página de producto y el carrito (localStorage)

// Lista de productos (mantén la misma que en catálogo)
const products = [
  { id: 1, name: "Lámpara Solar Básica", description: "Ideal para hogares rurales o campamentos. Carga con el sol y brinda luz por 6 horas. Esta lámpara solar es perfecta para aquellos que buscan una solución de iluminación ecológica y económica.", price: 320, image: "Lamapara solar basica.jpg" },
  { id: 2, name: "Mini Panel Solar Educativo", description: "Aprende cómo funciona la energía solar con este kit económico para estudiantes.", price: 250, image: "Panel educativo.jpg" },
  { id: 3, name: "Lampara Solar de Jardín", description: "Económica y decorativa. Se carga de día y se enciende automáticamente de noche.", price: 185, image: "Lampara jardin.jpg" },
  { id: 4, name: "Cargador Solar Portátil", description: "Pequeño y práctico. Perfecto para cargar tu celular en zonas sin electricidad.", price: 450, image: "cargador solar.jpg" },
  { id: 5, name: "Linterna Solar Recargable", description: "Alternativa económica para emergencias o cortes de luz. Sin pilas ni cables.", price: 200, image: "linterna.png" },
  { id: 6, name: "Panel Solar USB", description: "Panel compacto para alimentar pequeños dispositivos. Bajo costo y alta utilidad.", price: 550, image: "panel usb.jpg" },
  { id: 7, name: "Mini Ventilador USB Solar", description: "Mini ventilador de bajo consumo. Funciona conectado a tu panel USB.", price: 130, image: "https://i5.walmartimages.com/asr/bc83dc93-48e6-4a7e-a47e-63ea22708a32.35e35e4154082f19c5cdb765d0533e73.jpeg" },
  { id: 8, name: "Lámpara Solar Colgante", description: "Solución sencilla y accesible para iluminar exteriores o pequeños talleres.", price: 290, image: "lampara colgante.jpg" },
  { id: 9, name: "Kit Solar para Camping", description: "Kit completo con panel, batería y lámparas LED para campamentos.", price: 890, image: "kit de camping.jpg" },
  { id: 10, name: "Reflector Solar LED", description: "Reflector potente con sensor de movimiento. Perfecto para seguridad.", price: 680, image: "reflector solar.jpg" },
  { id: 11, name: "Radio Solar Portátil", description: "Radio AM/FM con carga solar y manivela. Ideal para emergencias.", price: 420, image: "radio solar.jpg" },
  { id: 12, name: "Bomba de Agua Solar", description: "Bomba solar para fuentes o riego de jardín. Ecológica y eficiente.", price: 590, image: "bomba solar.jpeg" },
  { id: 13, name: "Mochila Solar con USB", description: "Mochila con panel solar integrado para cargar dispositivos mientras caminas.", price: 750, image: "mochila solar.jpg" },
  { id: 14, name: "Calentador Solar Portátil", description: "Calentador solar compacto para agua. Perfecto para duchas al aire libre.", price: 1200, image: "calentador solar.png" },
  { id: 15, name: "Lámpara Solar de Mesa", description: "Lámpara decorativa con carga solar. Moderna y funcional.", price: 340, image: "lampara de mesa.jpeg" }
  ];

let selectedProductId = null;
let basePrice = 0;

document.addEventListener('DOMContentLoaded', () => {
  const pid = localStorage.getItem('selectedProduct');
  selectedProductId = pid ? parseInt(pid, 10) : 1;
  const product = products.find(p => p.id === selectedProductId) || products[0];

  document.getElementById('productImage').src = product.image;
  document.getElementById('productImage').alt = product.name;
  document.getElementById('productName').textContent = product.name;
  document.getElementById('productDescription').textContent = product.description;
  document.getElementById('productPrice').textContent = `$${product.price}.00 MXN`;
  document.getElementById('totalPrice').textContent = `$${product.price.toFixed(2)} MXN`;
  basePrice = product.price;

  updateCartCount();
});

function changeQty(delta) {
  const qtyInput = document.getElementById('quantity');
  let value = parseInt(qtyInput.value || '1', 10);
  value = isNaN(value) ? 1 : value;
  value = Math.max(1, Math.min(99, value + delta));
  qtyInput.value = value;
  updateTotal();
}

function updateTotal() {
  const quantity = parseInt(document.getElementById('quantity').value || '1', 10);
  const total = basePrice * quantity;
  document.getElementById('totalPrice').textContent = `$${total.toFixed(2)} MXN`;
}

// Agrega al carrito (no redirige): muestra modal con botón "Ir al Carrito"
function addToCart() {
  const quantity = parseInt(document.getElementById('quantity').value || '1', 10);
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const idx = cart.findIndex(item => item.productId === selectedProductId);

  if (idx !== -1) {
    cart[idx].quantity += quantity;
  } else {
    cart.push({ productId: selectedProductId, quantity: quantity });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  // Mostrar modal de éxito (sin redirigir)
  showModal('¡Producto agregado!', 'El producto se añadió a tu carrito.');
}

// Comprar ahora: agrega y redirige al carrito
function buyNow() {
  const quantity = parseInt(document.getElementById('quantity').value || '1', 10);
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const idx = cart.findIndex(item => item.productId === selectedProductId);

  if (idx !== -1) {
    cart[idx].quantity += quantity;
  } else {
    cart.push({ productId: selectedProductId, quantity: quantity });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  // Redirigir directo al carrito
  window.location.href = 'carrito.html';
}

// Modal helpers
function showModal(title = '¡Pedido Confirmado!', text = 'Tu producto ha sido agregado al carrito exitosamente') {
  const modal = document.getElementById('modal');
  if (!modal) return;
  const titleEl = document.getElementById('modalTitle');
  const textEl = document.getElementById('modalText');
  if (titleEl) titleEl.textContent = title;
  if (textEl) textEl.textContent = text;
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');

  // ocultar automático opcional
  setTimeout(() => {
    if (modal) {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }
  }, 3000);
}

function continueShopping() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }
  window.location.href = 'catalogo.html';
}

// Redirige al carrito (llamado por el botón del modal)
function goToCart() {
  // Cerrar modal antes de redirigir (por si acaso)
  const modal = document.getElementById('modal');
  if (modal) {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }
  window.location.href = 'carrito.html';
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const el = document.getElementById('cartCount');
  if (el) el.textContent = totalItems;
}

setInterval(updateCartCount, 1000);