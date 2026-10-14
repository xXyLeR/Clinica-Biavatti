const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
  navigation?.classList.toggle('open', !isOpen);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Abrir menu');
    navigation.classList.remove('open');
  });
});

const canTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canTilt) {
  document.querySelectorAll('.service-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.transform = `translateY(-8px) rotateX(${y * -3}deg) rotateY(${x * 3}deg)`;
      card.style.setProperty('--pointer-x', `${(x + 0.5) * 100}%`);
      card.style.setProperty('--pointer-y', `${(y + 0.5) * 100}%`);
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });

  const heroVisual = document.querySelector('.hero-visual');
  heroVisual?.addEventListener('pointermove', (event) => {
    const bounds = heroVisual.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroVisual.style.setProperty('--hero-x', `${x * 5}deg`);
    heroVisual.style.setProperty('--hero-y', `${y * -4}deg`);
    heroVisual.style.setProperty('--hero-shift-x', `${x * -9}px`);
    heroVisual.style.setProperty('--hero-shift-y', `${y * -9}px`);
  });

  heroVisual?.addEventListener('pointerleave', () => {
    heroVisual.style.removeProperty('--hero-x');
    heroVisual.style.removeProperty('--hero-y');
    heroVisual.style.removeProperty('--hero-shift-x');
    heroVisual.style.removeProperty('--hero-shift-y');
  });
}

const revealTargets = document.querySelectorAll(
  '.intro-label, .intro-content, .section-heading, .service-card, .experience-photo, .experience-copy, .review-top, .review-main, .review-bottom, .contact-copy, .contact-detail',
);

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

  revealTargets.forEach((target, index) => {
    target.classList.add('reveal');
    if (target.matches('.service-card, .contact-detail')) {
      target.style.setProperty('--reveal-delay', `${(index % 4) * 75}ms`);
    }
    revealObserver.observe(target);
  });
} else {
  revealTargets.forEach((target) => target.classList.add('is-visible'));
}
