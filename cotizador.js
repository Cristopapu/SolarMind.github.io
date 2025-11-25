// Plan Data
const planesData = {
  basico: {
    name: 'Plan Básico',
    desc: 'Ideal para casas pequeñas o departamentos',
    price: '$1,499',
    icon: 'fa-home',
    colorClass: 'cyan',
    capacidad: '4 paneles (1.6 kW)',
    ahorro: '$800 - $1,200',
    garantia: '15 años',
    features: [
      '4 paneles solares (1.6 kW)',
      'Inversor incluido',
      'Instalación profesional',
      'Monitoreo por app',
      'Garantía 15 años',
      'Soporte técnico'
    ]
  },
  familiar: {
    name: 'Plan Familiar',
    desc: 'Perfecto para familias de 4-6 personas',
    price: '$2,999',
    icon: 'fa-users',
    colorClass: 'green',
    capacidad: '8 paneles (3.2 kW)',
    ahorro: '$1,800 - $2,500',
    garantia: '20 años',
    features: [
      '8 paneles solares (3.2 kW)',
      'Inversor híbrido',
      'Batería de respaldo',
      'Instalación premium',
      'Monitoreo 24/7',
      'Garantía 20 años',
      'Mantenimiento anual gratis'
    ]
  },
  premium: {
    name: 'Plan Premium',
    desc: 'Para casas grandes y alto consumo',
    price: '$4,999',
    icon: 'fa-crown',
    colorClass: 'purple',
    capacidad: '12+ paneles (5+ kW)',
    ahorro: '$3,500 - $5,000',
    garantia: '25 años',
    features: [
      '12+ paneles solares (5+ kW)',
      'Sistema completo off-grid',
      'Baterías de alto rendimiento',
      'Cargador para auto eléctrico',
      'Domótica solar incluida',
      'Garantía 25 años',
      'Mantenimiento VIP',
      'Asesor personal'
    ]
  }
};

let selectedPlan = 'familiar';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  initPlanSelector();
  initForm();
  updatePlanDetails(selectedPlan);
});

// Plan Selector
function initPlanSelector() {
  const planOptions = document.querySelectorAll('.plan-option');
  
  planOptions.forEach(option => {
    option.addEventListener('click', function() {
      const plan = this.dataset.plan;
      
      // Update selection
      planOptions.forEach(opt => opt.classList.remove('selected'));
      this.classList.add('selected');
      
      selectedPlan = plan;
      updatePlanDetails(plan);
    });
  });
}

// Update Plan Details
function updatePlanDetails(planId) {
  const plan = planesData[planId];
  if (!plan) return;
  
  // Update header
  const header = document.getElementById('planHeader');
  const icon = header.querySelector('.plan-details-icon');
  icon.className = `plan-details-icon ${plan.colorClass}`;
  icon.innerHTML = `<i class="fas ${plan.icon}"></i>`;
  
  document.getElementById('planName').textContent = plan.name;
  document.getElementById('planDesc').textContent = plan.desc;
  
  // Update stats
  document.getElementById('statCapacidad').textContent = plan.capacidad;
  document.getElementById('statAhorro').textContent = plan.ahorro;
  document.getElementById('statGarantia').textContent = plan.garantia;
  
  // Update features
  const featuresList = document.getElementById('featuresList');
  featuresList.innerHTML = plan.features.map(f => 
    `<li><i class="fas fa-check-circle"></i> ${f}</li>`
  ).join('');
  
  // Update price
  document.getElementById('planPriceDisplay').textContent = plan.price;
  
  // Add animation
  const planDetails = document.querySelector('.plan-details');
  planDetails.style.animation = 'none';
  planDetails.offsetHeight; // Trigger reflow
  planDetails.style.animation = 'fadeIn 0.3s ease';
}

// Form
function initForm() {
  const form = document.getElementById('cotizacionForm');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
      nombre: document.getElementById('nombre').value,
      email: document.getElementById('email').value,
      telefono: document.getElementById('telefono').value,
      direccion: document.getElementById('direccion').value,
      consumo: document.getElementById('consumo').value,
      mensaje: document.getElementById('mensaje').value,
      plan: selectedPlan
    };
    
    console.log('Cotización enviada:', formData);
    
    // Show success
    document.getElementById('formSection').style.display = 'none';
    document.getElementById('successSection').style.display = 'block';
    document.getElementById('successPlan').textContent = planesData[selectedPlan].name;
  });
}

// Reset Form
function resetForm() {
  document.getElementById('cotizacionForm').reset();
  document.getElementById('formSection').style.display = 'block';
  document.getElementById('successSection').style.display = 'none';
}

// Add animation keyframe
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateX(-10px); }
    to { opacity: 1; transform: translateX(0); }
  }
`;
document.head.appendChild(style);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

console.log('☀️ SolarMind Cotizador cargado correctamente');