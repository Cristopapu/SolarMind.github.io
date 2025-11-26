// catalogo.js (actualizado) - añade selector de método de pago y sincronización con localStorage

// Productos data
const products = [
    {
        id: 1,
        name: "Lámpara Solar Básica",
        description: "Ideal para hogares rurales o campamentos. Carga con el sol y brinda luz por 6 horas.",
        price: 320,
        image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQxJ_FeVzlcWjo8-B10kaQ1qLyDRZ4vZ2yK_1WyAeeIz8qY8kDZIR1OX5YWiGrkj_7BI2CgcHMV2b-kd36w_0HA3PuHI6vSd0v2k2JZHdOoh4r6eR4LHaJBrR8UL95qLLX3dKepg0A&usqp=CAc"
    },
    {
        id: 2,
        name: "Mini Panel Solar Educativo",
        description: "Aprende cómo funciona la energía solar con este kit económico para estudiantes.",
        price: 250,
        image: "https://www.cyberpuerta.mx/img/product/M/CP-STEREN-PS-723-1.jpg"
    },
    {
        id: 3,
        name: "Luz Solar de Jardín",
        description: "Económica y decorativa. Se carga de día y se enciende automáticamente de noche.",
        price: 185,
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQvglA9WFJ3aTGEw_JNfRtZkqcSGsnvIae2jbRTjnAfDw6XPioLcl3Vrh_WulkkZWPjkMqPpKpeO8fOugGFwYj3A_YNp5dtmBi3C3qqGZPl4DM1oIzx_wAcLtM1DXbYO9Ixx2RGdqk&usqp=CAc"
    },
    {
        id: 4,
        name: "Cargador Solar Portátil",
        description: "Pequeño y práctico. Perfecto para cargar tu celular en zonas sin electricidad.",
        price: 450,
        image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUTExIVFRUVFRUYFxUXFRsYFxUVFRcYGBYVFRgYICggGBolHRUVITEhJSsrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0dHh8vMi0tMC0tLy0tLy0tLS0tLS4tLS0tLSstLS0tLS0tLS0tLS0tLi0tLS0tLS0tLS0tLf/AABEIAOcA2wMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABgEDBAUHAgj/xABUEAABAwEDBAsK"
    },
    {
        id: 5,
        name: "Linterna Solar Recargable",
        description: "Alternativa económica para emergencias o cortes de luz. Sin pilas ni cables.",
        price: 200,
        image: "https://m.media-amazon.com/images/I/61FOUArF3nL.jpg"
    },
    {
        id: 6,
        name: "Panel Solar USB",
        description: "Panel compacto para alimentar pequeños dispositivos. Bajo costo y alta utilidad.",
        price: 550,
        image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSmSeeakaZg4_NThD1eJsxNgVcVk-2TVG8cTWZ_mQFjNFJ_ojY3jKNEexhgTPIAxFz5Wpo2CY3pnDeRzdrRQiqqLAVPfwRtTNC1r_Hvfp6Hv3lyowVZcirEWBd0KrH9-V5e14gjZw&usqp=CAc"
    },
    {
        id: 7,
        name: "Mini Ventilador USB",
        description: "Mini ventilador de bajo consumo. Funciona conectado a tu panel USB. Ideal para el verano.",
        price: 130,
        image: "https://i5.walmartimages.com/asr/bc83dc93-48e6-4a7e-a47e-63ea22708a32.35e35e4154082f19c5cdb765d0533e73.jpeg"
    },
    {
        id: 8,
        name: "Lámpara Solar Colgante",
        description: "Solución sencilla y accesible para iluminar exteriores o pequeños talleres.",
        price: 290,
        image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSExIVFRUVFRUYFxUXFRsYFxUVFRcYGBYVFRgYICggGBolHRUVITEhJSkrLi4uGB8zODMsNygtLisBCgoKDg0OGhAQGi0dHh8vMi0tMC0tLy0tLy0tLS0tLS4tLS0tLSstLS0tLS0tLS0tLS0tLi0tLS0tLS0tLS0tLf/AABEIAOcA2wMBIgACEQEDEQH/xAAcAAEA"
    }
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

// ---------------- Payment dropdown logic ----------------
let paymentDropdownEl = null;

// Crea el dropdown de métodos de pago (si existe el botón en el DOM)
function createPaymentDropdown() {
    // Si ya se creó, retornar
    if (paymentDropdownEl) return;

    // Si no existe el toggle en el DOM (quizá la versión HTML no lo tiene), no crear nada
    const paymentToggle = document.getElementById('paymentToggle');
    if (!paymentToggle) return;

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
    // Insertar al body para evitar problemas de overflow dentro del navbar
    document.body.appendChild(dropdown);
    paymentDropdownEl = dropdown;
}

// Alternar visibilidad del dropdown (si existe)
function togglePaymentDropdown() {
    const paymentToggle = document.getElementById('paymentToggle');
    if (!paymentToggle) return;
    createPaymentDropdown();
    if (!paymentDropdownEl) return;

    const expanded = paymentToggle.getAttribute('aria-expanded') === 'true';
    if (!expanded) {
        // posicionar dropdown con respecto al botón
        const rect = paymentToggle.getBoundingClientRect();
        paymentDropdownEl.style.top = (rect.bottom + 8) + 'px';
        const rightSpace = window.innerWidth - rect.right;
        paymentDropdownEl.style.right = Math.max(12, rightSpace) + 'px';
        paymentDropdownEl.style.left = 'auto';
        paymentDropdownEl.style.display = 'block';
        paymentToggle.setAttribute('aria-expanded', 'true');
    } else {
        paymentDropdownEl.style.display = 'none';
        paymentToggle.setAttribute('aria-expanded', 'false');
    }
}

// Seleccionar método (almacena en localStorage y actualiza UI)
function selectPaymentMethod(id) {
    localStorage.setItem('selectedPaymentMethod', id);
    // actualizar UI en dropdown si está abierto
    if (paymentDropdownEl) {
        const nodes = paymentDropdownEl.querySelectorAll('.payment-option');
        nodes.forEach(n => {
            if (n.getAttribute('data-id') === id) {
                n.classList.add('selected');
            } else {
                n.classList.remove('selected');
            }
        });
        // cerrar dropdown
        paymentDropdownEl.style.display = 'none';
    }
    // actualizar label visible en la barra (si existe)
    updatePaymentLabel();
}

// Actualiza el texto visible del método de pago en la barra (si existe paymentLabel)
function updatePaymentLabel() {
    const paymentLabelEl = document.getElementById('paymentLabel');
    if (!paymentLabelEl) return;
    const selected = localStorage.getItem('selectedPaymentMethod');
    const opt = paymentOptions.find(p => p.id === selected);
    paymentLabelEl.textContent = opt ? opt.label : 'Método Pago';
}

// Cerrar dropdown al hacer click fuera
function onDocumentClick(e) {
    if (!paymentDropdownEl) return;
    const paymentToggle = document.getElementById('paymentToggle');
    const dd = paymentDropdownEl;
    if (dd.style.display === 'block') {
        const target = e.target;
        if (!dd.contains(target) && !paymentToggle.contains(target)) {
            dd.style.display = 'none';
            if (paymentToggle) paymentToggle.setAttribute('aria-expanded', 'false');
        }
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCartCount();
    // actualizar contador periódicamente (si el carrito se modifica desde otras pestañas)
    setInterval(updateCartCount, 1000);

    // Preparar dropdown si el HTML tiene el toggle
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

    // cerrar al hacer click fuera
    document.addEventListener('click', onDocumentClick);

    // Escuchar cambios desde otras pestañas
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

    // Cerrar dropdown al redimensionar
    window.addEventListener('resize', () => {
        if (paymentDropdownEl) paymentDropdownEl.style.display = 'none';
        const paymentToggleEl = document.getElementById('paymentToggle');
        if (paymentToggleEl) paymentToggleEl.setAttribute('aria-expanded', 'false');
    });
});
