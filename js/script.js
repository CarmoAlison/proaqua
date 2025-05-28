// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Navbar Scroll
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Swiper Carousel
    const swiper = new Swiper('.mySwiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 20,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: '.swiper-pagination',
        },
        loop: true,
        autoplay: {
            delay: 3000,
        },
    });

    // Form Submission
    document.querySelector('.contact-form').addEventListener('submit', function (e) {
        e.preventDefault();
        // Adicionar lógica de envio aqui
        alert('Mensagem enviada com sucesso!');
        this.reset();
    });
});

// Adicione ao script.js
document.querySelectorAll('.event-card').forEach(card => {
    // Efeito 3D Parallax
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = (x - centerX) / 20;
        const rotateX = (centerY - y) / 20;

        card.style.setProperty('--mouse-x', `${rotateX}deg`);
        card.style.setProperty('--mouse-y', `${rotateY}deg`);
    });

    // Resetar rotação
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });

    // Efeito de onda ao clicar
    card.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.left = `${e.offsetX}px`;
        ripple.style.top = `${e.offsetY}px`;
        card.appendChild(ripple);

        setTimeout(() => ripple.remove(), 1000);
    });
});

// Observer para animações ao rolar
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observar todas as seções
document.querySelectorAll('.section, .service-card, .event-card, .footer-col').forEach(section => {
    observer.observe(section);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Event card parallax effect
document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = (x - centerX) / 25;
        const rotateX = (centerY - y) / 25;

        card.style.setProperty('--mouse-x', `${rotateX}deg`);
        card.style.setProperty('--mouse-y', `${rotateY}deg`);
    });

    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--mouse-x', '0deg');
        card.style.setProperty('--mouse-y', '0deg');
    });
});

// Script para animar os contadores e observar elementos
document.addEventListener('DOMContentLoaded', function() {
  // Função para animar contadores
  function animateCounter(element, finalValue, duration = 2000) {
    const startTime = performance.now();
    const startValue = 0;
    
    function updateCounter(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentValue = Math.floor(progress * (finalValue - startValue) + startValue);
      
      element.textContent = currentValue;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }
    
    requestAnimationFrame(updateCounter);
  }
  
  // Observador para animar elementos quando entram na viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animar contadores
        animateCounter(document.getElementById('projectsCount'), 240);
        animateCounter(document.getElementById('clientsCount'), 150);
        animateCounter(document.getElementById('teamCount'), 54);
        
        // Adicionar classe para mostrar cards de valores
        const valueCards = document.querySelectorAll('.value-card');
        valueCards.forEach(card => card.classList.add('in-view'));
        
        // Parar de observar depois de ativar
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });
  
  // Observar a seção sobre a empresa
  const aboutSection = document.getElementById('about-company');
  if (aboutSection) {
    observer.observe(aboutSection);
  }
  
  // Animação para o marcador de timeline
  const timelineMarker = document.querySelector('.timeline-marker');
  if (timelineMarker) {
    setTimeout(() => {
      timelineMarker.style.width = '100%';
      timelineMarker.style.transition = 'width 1.5s ease-out';
    }, 500);
  }
});