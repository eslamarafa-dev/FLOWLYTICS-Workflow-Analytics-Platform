/*
  FLOWLYTICS Runtime Enhancements
  - Cursor glow coordinates for .cursor-glow elements (CSS variables --x/--y)
  - Subtle parallax for elements with .parallax (CSS variables --mx/--my)
  Notes:
  - Keeps work minimal and throttled via rAF
*/

(() => {
  const root = document.documentElement;

  // ---------- Cursor glow (delegated) ----------
  const onPointerMoveGlow = (e) => {
    const el = e.target.closest?.('.cursor-glow');
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty('--x', `${x}%`);
    el.style.setProperty('--y', `${y}%`);
  };

  // ---------- Parallax (global vars) ----------
  let raf = 0;
  let lastX = 0.5;
  let lastY = 0.5;

  const commitParallax = () => {
    raf = 0;
    root.style.setProperty('--mx', String(lastX));
    root.style.setProperty('--my', String(lastY));
  };

  const onPointerMoveParallax = (e) => {
    // normalized [0..1]
    lastX = Math.min(1, Math.max(0, e.clientX / window.innerWidth));
    lastY = Math.min(1, Math.max(0, e.clientY / window.innerHeight));
    if (!raf) raf = requestAnimationFrame(commitParallax);
  };

  document.addEventListener('pointermove', onPointerMoveGlow, { passive: true });
  window.addEventListener('pointermove', onPointerMoveParallax, { passive: true });
})();
