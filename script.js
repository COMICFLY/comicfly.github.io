const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const hero = document.querySelector(".hero");
const revealGroups = document.querySelectorAll(".reveal-group");
const glassPanels = document.querySelectorAll("[data-glass]");
const openingSequence = document.querySelector(".opening-sequence");

requestAnimationFrame(() => {
  document.body.classList.add("is-ready");
});

if (reducedMotion.matches) {
  document.body.classList.add("opening-complete");
} else if (openingSequence) {
  window.setTimeout(() => {
    document.body.classList.add("opening-complete");
  }, 1250);
}

if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.28 },
  );

  revealGroups.forEach((group) => observer.observe(group));
} else {
  revealGroups.forEach((group) => group.classList.add("is-visible"));
}

if (hero && !reducedMotion.matches && window.matchMedia("(pointer: fine)").matches) {
  hero.addEventListener(
    "pointermove",
    (event) => {
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      hero.style.setProperty("--wide-x", `${(-x * 8).toFixed(2)}px`);
      hero.style.setProperty("--wide-y", `${(-y * 8).toFixed(2)}px`);
      hero.style.setProperty("--edge-x", `${(x * 12).toFixed(2)}px`);
      hero.style.setProperty("--edge-y", `${(y * 12).toFixed(2)}px`);
      hero.style.setProperty("--portrait-x", `${(x * 7).toFixed(2)}px`);
      hero.style.setProperty("--portrait-y", `${(y * 7).toFixed(2)}px`);
    },
    { passive: true },
  );

  hero.addEventListener("pointerleave", () => {
    hero.style.setProperty("--wide-x", "0px");
    hero.style.setProperty("--wide-y", "0px");
    hero.style.setProperty("--edge-x", "0px");
    hero.style.setProperty("--edge-y", "0px");
    hero.style.setProperty("--portrait-x", "0px");
    hero.style.setProperty("--portrait-y", "0px");
  });
}

if (!reducedMotion.matches && window.matchMedia("(pointer: fine)").matches) {
  glassPanels.forEach((panel) => {
    const highlight = document.createElement("span");
    highlight.className = "glass-highlight";
    highlight.setAttribute("aria-hidden", "true");
    panel.appendChild(highlight);

    panel.addEventListener(
      "pointermove",
      (event) => {
        const bounds = panel.getBoundingClientRect();
        panel.style.setProperty("--glass-x", `${(event.clientX - bounds.left).toFixed(1)}px`);
        panel.style.setProperty("--glass-y", `${(event.clientY - bounds.top).toFixed(1)}px`);
        panel.style.setProperty("--glass-light", "1");
      },
      { passive: true },
    );

    panel.addEventListener("pointerleave", () => {
      panel.style.setProperty("--glass-light", "0");
    });
  });
}
