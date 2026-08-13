document.addEventListener('DOMContentLoaded', () => {
  // Menú Hamburguesa Móvil
  const menuBtn = document.getElementById('mobile-menu');
  const navLinks = document.getElementById('nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // Animaciones de Entrada al Scroll (Fade-In)
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});

// Filtrar Mascotas (Perros / Gatos / Todos)
function filtrarCategoria(categoria, event) {
  const cards = document.querySelectorAll('#pet-grid .card-pet');
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach(btn => btn.classList.remove('active'));
  if (event && event.target) {
    event.target.classList.add('active');
  }

  cards.forEach(card => {
    if (categoria === 'todos' || card.getAttribute('data-category') === categoria) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// Abrir Modal Emergente de Adopción
function abrirModal(nombre, tipo, imagen) {
  const modal = document.getElementById('modal-adopcion');
  document.getElementById('modal-titulo').innerText = `¡Gracias por interesarte en ${nombre}! 🥰`;
  document.getElementById('modal-texto').innerText = `Escribinos a nuestro Instagram indicando que querés adoptar a ${nombre} (${tipo}) para realizar la entrevista de adopción.`;
  document.getElementById('modal-img').src = imagen;
  
  modal.style.display = 'flex';
}

// Cerrar Modal
function cerrarModal() {
  document.getElementById('modal-adopcion').style.display = 'none';
}

// Cerrar Modal al hacer clic en el fondo
window.onclick = function(event) {
  const modal = document.getElementById('modal-adopcion');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// Copiar CBU / Alias
function copiarTexto(elementId, tipo) {
  const texto = document.getElementById(elementId).innerText;
  navigator.clipboard.writeText(texto).then(() => {
    alert(`¡${tipo} "${texto}" copiado al portapapeles!\n\nGracias por apoyar a Camino a Casa.`);
  }).catch(err => {
    console.error('Error al copiar: ', err);
  });
}