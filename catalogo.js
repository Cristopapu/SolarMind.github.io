// catalogo.js (actualizado) - añade selector de método de pago responsive (dropdown en desktop / bottom-sheet en móvil)

// Productos data
const products = [
    { id: 1, name: "Lámpara Solar Básica", description: "Ideal para hogares rurales o campamentos. Carga con el sol y brinda luz por 6 horas.", price: 320, image: "Lamapara solar basica.jpg" },
    { id: 2, name: "Mini Panel Solar Educativo", description: "Aprende cómo funciona la energía solar con este kit económico para estudiantes.", price: 250, image: "Panel educativo.jpg" },
    { id: 3, name: "Luz Solar de Jardín", description: "Económica y decorativa. Se carga de día y se enciende automáticamente de noche.", price: 185, image: "Lampara jardin.jpg" },
    { id: 4, name: "Cargador Solar Portátil", description: "Pequeño y práctico. Perfecto para cargar tu celular en zonas sin electricidad.", price: 450, image: "cargador solar.jpg" },
    { id: 5, name: "Linterna Solar Recargable", description: "Alternativa económica para emergencias o cortes de luz. Sin pilas ni cables.", price: 200, image: "linterna.png" },
    { id: 6, name: "Panel Solar USB", description: "Panel compacto para alimentar pequeños dispositivos. Bajo costo y alta utilidad.", price: 550, image: "panel usb.jpg" },
    { id: 7, name: "Mini Ventilador USB", description: "Mini ventilador de bajo consumo. Funciona conectado a tu panel USB.", price: 130, image: "https://i5.walmartimages.com/asr/bc83dc93-48e6-4a7e-a47e-63ea22708a32.35e35e4154082f19c5cdb765d0533e73.jpeg" },
    { id: 8, name: "Lámpara Solar Colgante", description: "Solución sencilla y accesible para iluminar exteriores o pequeños talleres.", price: 290, image: "lampara colgante.jpg" },
    { id: 9, name: "Kit Solar para Camping", description: "Kit completo con panel, batería y lámparas LED para campamentos.", price: 890, image: "kit de camping.jpg" },
    { id: 10, name: "Reflector Solar LED", description: "Reflector potente con sensor de movimiento. Perfecto para seguridad.", price: 680, image: "reflector solar.jpg" },
    { id: 11, name: "Radio Solar Portátil", description: "Radio AM/FM con carga solar y manivela. Ideal para emergencias.", price: 420, image: "radio solar.jpg" },
    { id: 12, name: "Bomba de Agua Solar", description: "Bomba solar para fuentes o riego de jardín. Ecológica y eficiente.", price: 590, image: "bomba solar.jpeg" },
    { id: 13, name: "Mochila Solar con USB", description: "Mochila con panel solar integrado para cargar dispositivos mientras caminas.", price: 750, image: "mochila solar.jpg" },
    { id: 14, name: "Calentador Solar Portátil", description: "Calentador solar compacto para agua. Perfecto para duchas al aire libre.", price: 1200, image: "calentador solar.png" },
    { id: 15, name: "Lámpara Solar de Mesa", description: "Lámpara decorativa con carga solar. Moderna y funcional.", price: 340, image: "lampara de mesa.jpeg" }
];

// Opciones de pago
const paymentOptions = [
    { id: 'card', label: 'Tarjeta de Crédito / Débito', desc: 'Visa, MasterCard, Amex', icon: '💳' },
    { id: 'paypal', label: 'PayPal', desc: 'Pago seguro con PayPal', icon: '🅿️' },
    { id: 'oxxo', label: 'OXXO / Pago en Efectivo', desc: 'Paga en efectivo en OXXO', icon: '🏪' },
    { id: 'transfer', label: 'Transferencia Bancaria', desc: 'Depósito o SPEI', icon: '🏦' }
];

// Renderiza productos en el grid
function loadProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animationDelay = `${index * 0.05}s`;
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-body">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;">
                    <span class="product-price">$${product.price}.00 MXN</span>
                    <button class="btn-buy" aria-label="Ver ${product.name}" onclick="goToProduct(${product.id})">🛒 Ver Producto</button>
                </div>
            </div>
        `;
        grid.appendChild(productCard);
    });
}

// Navegar a la página de producto (guarda seleccionado)
function goToProduct(productId) {
    localStorage.setItem('selectedProduct', productId);
    window.location.href = 'producto.html';
}

// Contador del carrito
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const el = document.getElementById('cartCount');
    if (el) el.textContent = totalItems;
}

// ---------------- Payment dropdown / bottom-sheet logic ----------------
let paymentDropdownEl = null;
let paymentBackdropEl = null;

// Comprueba si estamos en móvil (puedes ajustar el ancho)
function isMobileViewport() {
    return window.innerWidth <= 768;
}

function createPaymentDropdown() {
    if (paymentDropdownEl) return;

    const dropdown = document.createElement('div');
    dropdown.id = 'paymentDropdown';
    dropdown.className = 'payment-dropdown';
    dropdown.setAttribute('role', 'dialog');
    dropdown.setAttribute('aria-label', 'Seleccionar método de pago');

    const title = document.createElement('h4');
    title.textContent = 'Selecciona tu método de pago';
    dropdown.appendChild(title);

    const methodsDiv = document.createElement('div');
    methodsDiv.className = 'payment-methods';

    const selected = localStorage.getItem('selectedPaymentMethod') || null;

    paymentOptions.forEach(opt => {
        const optDiv = document.createElement('div');
        optDiv.className = 'payment-option' + (selected === opt.id ? ' selected' : '');
        optDiv.setAttribute('data-id', opt.id);
        optDiv.setAttribute('tabindex', '0');
        optDiv.setAttribute('role', 'button');
        optDiv.innerHTML = `
            <div class="payment-icon" aria-hidden="true">${opt.icon}</div>
            <div style="display:flex;flex-direction:column;">
                <div class="payment-label">${opt.label}</div>
                <div class="payment-desc">${opt.desc}</div>
            </div>
        `;
        optDiv.addEventListener('click', () => {
            selectPaymentMethod(opt.id);
        });
        optDiv.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectPaymentMethod(opt.id);
            }
        });
        methodsDiv.appendChild(optDiv);
    });

    dropdown.appendChild(methodsDiv);
    document.body.appendChild(dropdown);
    paymentDropdownEl = dropdown;

    // crea backdrop (usado especialmente en móvil)
    const backdrop = document.createElement('div');
    backdrop.id = 'paymentBackdrop';
    backdrop.className = 'payment-backdrop';
    backdrop.style.display = 'none';
    backdrop.addEventListener('click', closePaymentDropdown);
    document.body.appendChild(backdrop);
    paymentBackdropEl = backdrop;
}

function openPaymentDropdown() {
    createPaymentDropdown();
    if (!paymentDropdownEl) return;

    if (isMobileViewport()) {
        // mostrar como bottom sheet
        paymentDropdownEl.classList.add('mobile-sheet');
        paymentDropdownEl.style.display = 'block';
        paymentBackdropEl.style.display = 'block';
        document.body.style.overflow = 'hidden'; // evita scroll del body mientras sheet está abierto
    } else {
        // position near button (desktop dropdown)
        const paymentToggle = document.getElementById('paymentToggle');
        if (!paymentToggle) {
            paymentDropdownEl.style.display = 'block';
            return;
        }
        const rect = paymentToggle.getBoundingClientRect();
        paymentDropdownEl.classList.remove('mobile-sheet');
        paymentDropdownEl.style.top = (rect.bottom + 8) + 'px';
        const rightSpace = window.innerWidth - rect.right;
        paymentDropdownEl.style.right = Math.max(12, rightSpace) + 'px';
        paymentDropdownEl.style.left = 'auto';
        paymentDropdownEl.style.display = 'block';
    }
    const paymentToggle = document.getElementById('paymentToggle');
    if (paymentToggle) paymentToggle.setAttribute('aria-expanded', 'true');
}

function closePaymentDropdown() {
    if (!paymentDropdownEl) return;
    paymentDropdownEl.style.display = 'none';
    paymentDropdownEl.classList.remove('mobile-sheet');
    if (paymentBackdropEl) paymentBackdropEl.style.display = 'none';
    document.body.style.overflow = ''; // restaurar scroll
    const paymentToggle = document.getElementById('paymentToggle');
    if (paymentToggle) paymentToggle.setAttribute('aria-expanded', 'false');
}

function togglePaymentDropdown() {
    createPaymentDropdown();
    if (!paymentDropdownEl) return;
    const visible = paymentDropdownEl.style.display === 'block';
    if (visible) closePaymentDropdown();
    else openPaymentDropdown();
}

function selectPaymentMethod(id) {
    localStorage.setItem('selectedPaymentMethod', id);
    if (paymentDropdownEl) {
        const nodes = paymentDropdownEl.querySelectorAll('.payment-option');
        nodes.forEach(n => {
            if (n.getAttribute('data-id') === id) n.classList.add('selected');
            else n.classList.remove('selected');
        });
    }
    updatePaymentLabel();
    // cerrar (en móvil es bottom-sheet, en desktop dropdown)
    closePaymentDropdown();
}

function updatePaymentLabel() {
    const paymentLabelEl = document.getElementById('paymentLabel');
    if (!paymentLabelEl) return;
    const selected = localStorage.getItem('selectedPaymentMethod');
    const opt = paymentOptions.find(p => p.id === selected);
    paymentLabelEl.textContent = opt ? opt.label : 'Método Pago';
}

// Cerrar dropdown al hacer click fuera (desktop)
function onDocumentClick(e) {
    if (!paymentDropdownEl) return;
    const paymentToggle = document.getElementById('paymentToggle');
    const dd = paymentDropdownEl;
    if (dd.style.display === 'block' && !isMobileViewport()) {
        const target = e.target;
        if (!dd.contains(target) && (!paymentToggle || !paymentToggle.contains(target))) {
            closePaymentDropdown();
        }
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCartCount();
    setInterval(updateCartCount, 1000);

    createPaymentDropdown();
    if (paymentDropdownEl) paymentDropdownEl.style.display = 'none';
    updatePaymentLabel();

    const paymentToggle = document.getElementById('paymentToggle');
    if (paymentToggle) {
        paymentToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePaymentDropdown();
        });
    }

    document.addEventListener('click', onDocumentClick);

    // escuchar storage para sincronizar entre pestañas
    window.addEventListener('storage', (e) => {
        if (e.key === 'selectedPaymentMethod') {
            updatePaymentLabel();
            if (paymentDropdownEl) {
                const selected = localStorage.getItem('selectedPaymentMethod');
                const nodes = paymentDropdownEl.querySelectorAll('.payment-option');
                nodes.forEach(n => {
                    if (n.getAttribute('data-id') === selected) n.classList.add('selected');
                    else n.classList.remove('selected');
                });
            }
        }
        if (e.key === 'cart') updateCartCount();
    });

    // esconder dropdown al cambiar tamaño
    window.addEventListener('resize', () => {
        closePaymentDropdown();
    });
});
