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

// Load products on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

function loadProducts() {
    const grid = document.getElementById('productsGrid');
    
    products.forEach((product, index) => {
        const productCard = `
            <div class="col-sm-6 col-md-4 col-lg-3 animate-slide-up" style="animation-delay: ${index * 0.1}s;">
                <div class="product-card" onclick="goToProduct(${product.id})">
                    <div class="product-image-wrapper">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="product-overlay">
                            <a href__="#" class="product-quick-view">
                                <i class="bi bi-eye"></i> Ver Detalles
                            </a>
                        </div>
                    </div>
                    <div class="product-body">
                        <h5>${product.name}</h5>
                        <p>${product.description}</p>
                        <span class="product-price">$${product.price}.00 MXN</span>
                        <button class="product-btn">
                            <i class="bi bi-cart-plus me-2"></i>Ver Producto
                        </button>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += productCard;
    });
}

function goToProduct(productId) {
    localStorage.setItem('selectedProduct', productId);
    window.location.href = 'producto.html';
}
