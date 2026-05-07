document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.querySelector('.primary-nav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    primaryNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (primaryNav.classList.contains('open')) {
          primaryNav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && primaryNav.classList.contains('open')) {
        primaryNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  const heroCarousel = document.querySelector('[data-hero-carousel]');
  if (!heroCarousel) return;

  const slides = Array.from(heroCarousel.querySelectorAll('.hero-slide'));
  const prevButton = heroCarousel.querySelector('.hero-prev');
  const nextButton = heroCarousel.querySelector('.hero-next');
  const dotsWrap = heroCarousel.querySelector('.hero-dots');
  const heroCounter = heroCarousel.querySelector('.hero-counter');
  let index = 0;
  let timer = null;
  const rotationDelay = 5200;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const render = () => {
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });

    if (dotsWrap) {
      Array.from(dotsWrap.children).forEach((dot, dotIndex) => {
        dot.classList.toggle('is-active', dotIndex === index);
        dot.setAttribute('aria-current', dotIndex === index ? 'true' : 'false');
      });
    }

    if (heroCounter) {
      heroCounter.textContent = `${index + 1} / ${slides.length}`;
    }
  };

  const goTo = (nextIndex) => {
    index = (nextIndex + slides.length) % slides.length;
    render();
  };

  const start = () => {
    if (reduceMotion || slides.length < 2 || timer) return;
    timer = window.setInterval(() => goTo(index + 1), rotationDelay);
  };

  const stop = () => {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  };

  if (dotsWrap) {
    slides.forEach((_, slideIndex) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'hero-dot';
      dot.setAttribute('aria-label', `Folie ${slideIndex + 1}`);
      dot.addEventListener('click', () => {
        stop();
        goTo(slideIndex);
        start();
      });
      dotsWrap.appendChild(dot);
    });
  }

  prevButton?.addEventListener('click', () => {
    stop();
    goTo(index - 1);
    start();
  });

  nextButton?.addEventListener('click', () => {
    stop();
    goTo(index + 1);
    start();
  });

  heroCarousel.addEventListener('mouseenter', stop);
  heroCarousel.addEventListener('mouseleave', start);
  heroCarousel.addEventListener('focusin', stop);
  heroCarousel.addEventListener('focusout', start);

  render();
  start();
});
