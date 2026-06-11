// Mellow Media — animations layer
// Adds: custom cursor (glowing dot + flower trail), click flower burst, scroll reveal

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* ─── FLOWER ASSETS ─── */
  const FLOWERS = [1, 2, 3, 4, 5, 6, 7];

  /* ─── CURSOR ─── */
  // Hide the real cursor on non-touch devices
  const isTouchOnly = window.matchMedia('(hover: none)').matches;
  if (!isTouchOnly) {
    document.documentElement.style.cursor = 'none';

    // Glowing dot
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 99999;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: radial-gradient(circle, #F78762 0%, #EA829A 60%, rgba(247,135,98,0) 100%);
      box-shadow: 0 0 12px 4px rgba(247,135,98,0.55), 0 0 24px 8px rgba(234,130,154,0.3);
      transform: translate(-50%, -50%);
      transition: width 0.15s ease, height 0.15s ease, opacity 0.2s ease;
      mix-blend-mode: multiply;
    `;
    document.body.appendChild(dot);

    // Restore cursor on interactive elements so they feel normal
    document.addEventListener('mouseover', (e) => {
      const el = e.target.closest('a, button, input, textarea, select, [role="button"]');
      if (el) {
        dot.style.width  = '22px';
        dot.style.height = '22px';
        dot.style.opacity = '0.7';
        el.style.cursor = 'pointer';
      }
    });
    document.addEventListener('mouseout', (e) => {
      const el = e.target.closest('a, button, input, textarea, select, [role="button"]');
      if (el) {
        dot.style.width  = '14px';
        dot.style.height = '14px';
        dot.style.opacity = '1';
      }
    });

    let mx = -200, my = -200;
    let cx = -200, cy = -200;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
    });

    // Trail particles
    const TRAIL_MAX   = 12;
    const trail       = [];

    function makeTrailFlower() {
      const v   = FLOWERS[Math.floor(Math.random() * FLOWERS.length)];
      const img = document.createElement('img');
      img.src   = `assets/flowers/flower-${v}.svg`;
      img.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 99998;
        width: 18px;
        height: 18px;
        transform: translate(-50%, -50%) rotate(0deg);
        opacity: 0;
        transition: opacity 0.15s ease;
      `;
      document.body.appendChild(img);
      return { el: img, x: mx, y: my, born: 0, life: 0 };
    }

    // Pre-warm trail pool
    for (let i = 0; i < TRAIL_MAX; i++) trail.push(makeTrailFlower());

    let trailHead = 0;
    let lastTrailTime = 0;
    const TRAIL_INTERVAL = 55; // ms between trail flowers

    function animateCursor(ts) {
      // Smooth dot follows mouse
      cx += (mx - cx) * 0.22;
      cy += (my - cy) * 0.22;
      dot.style.left = cx + 'px';
      dot.style.top  = cy + 'px';

      // Spawn trail flower on interval
      if (ts - lastTrailTime > TRAIL_INTERVAL) {
        lastTrailTime = ts;
        const t   = trail[trailHead % TRAIL_MAX];
        trailHead++;
        t.x    = cx;
        t.y    = cy;
        t.born = ts;
        t.life = 500 + Math.random() * 300;
        t.el.style.left    = t.x + 'px';
        t.el.style.top     = t.y + 'px';
        t.el.style.opacity = '0.72';
        const rot = Math.random() * 360;
        t.el.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`;
        t.el.style.width  = (14 + Math.random() * 10) + 'px';
        t.el.style.height = t.el.style.width;
      }

      // Fade out old trail flowers
      trail.forEach((t) => {
        if (t.born === 0) return;
        const age = ts - t.born;
        if (age > t.life) {
          t.el.style.opacity = '0';
          t.born = 0;
        } else {
          const frac = 1 - age / t.life;
          t.el.style.opacity = (frac * 0.72).toString();
          // Drift upward slightly
          const drift = age * 0.02;
          t.el.style.top = (t.y - drift) + 'px';
        }
      });

      requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);
  }

  /* ─── CLICK FLOWER BURST ─── */
  function burst(x, y) {
    const COUNT = 8;
    for (let i = 0; i < COUNT; i++) {
      const v    = FLOWERS[Math.floor(Math.random() * FLOWERS.length)];
      const size = 24 + Math.random() * 22;
      const angle = (i / COUNT) * 360 + Math.random() * 20;
      const dist  = 70 + Math.random() * 60;
      const rad   = (angle * Math.PI) / 180;
      const tx    = Math.cos(rad) * dist;
      const ty    = Math.sin(rad) * dist;
      const rot   = Math.random() * 720 - 360;

      const img   = document.createElement('img');
      img.src     = `assets/flowers/flower-${v}.svg`;
      img.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 99999;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        transform: translate(-50%, -50%) rotate(0deg) scale(1);
        opacity: 1;
        transition:
          transform 0.65s cubic-bezier(.2, .8, .3, 1),
          opacity   0.55s ease 0.1s;
      `;
      document.body.appendChild(img);

      // Trigger animation after paint
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          img.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${rot}deg) scale(0.3)`;
          img.style.opacity   = '0';
        });
      });

      setTimeout(() => img.remove(), 800);
    }
  }

  document.addEventListener('click', (e) => burst(e.clientX, e.clientY));
  document.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    burst(t.clientX, t.clientY);
  }, { passive: true });

  /* ─── SCROLL REVEAL ─── */
  const REVEAL_CSS = `
    .mm-reveal {
      opacity: 0;
      transform: translateY(36px);
      transition: opacity 0.65s cubic-bezier(.25,.8,.25,1), transform 0.65s cubic-bezier(.25,.8,.25,1);
    }
    .mm-reveal.mm-visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  const style = document.createElement('style');
  style.textContent = REVEAL_CSS;
  document.head.appendChild(style);

  // Wait for React to render sections, then observe them
  function attachReveal() {
    // Target each section's direct content wrappers
    const sections = document.querySelectorAll(
      '#about, #services, #promise, #testimonials, #contact, footer'
    );
    if (sections.length === 0) {
      setTimeout(attachReveal, 200);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('mm-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    sections.forEach((sec, i) => {
      sec.classList.add('mm-reveal');
      sec.style.transitionDelay = `${i * 0.04}s`;
      io.observe(sec);
    });
  }

  // Run after React mounts
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(attachReveal, 400));
  } else {
    setTimeout(attachReveal, 400);
  }
})();
