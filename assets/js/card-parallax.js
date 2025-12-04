(function () {
  const cards = Array.from(
    document.querySelectorAll(".project-card, [data-parallax-card]")
  );
  if (!cards.length) return;

  let ticking = false;

  function updateOffsets() {
    const viewportHeight = window.innerHeight || 1;
    const centerY = viewportHeight / 2;

    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const distance = (cardCenter - centerY) / centerY;
      const clamped = Math.max(-1, Math.min(1, distance));
      const offset = clamped * 10; // subtle translate range in px

      card.style.setProperty("--parallax-offset", `${offset}px`);
    });

    ticking = false;
  }

  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateOffsets);
    }
  }

  requestUpdate();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
})();
