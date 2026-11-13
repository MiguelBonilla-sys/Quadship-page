/** The decorative wave never runs offscreen, in hidden tabs or against motion preferences. */
export function setupWave() {
  const stage = document.querySelector<HTMLElement>(".scroll-explainer");
  const toggle = stage?.querySelector<HTMLButtonElement>("[data-wave-toggle]");
  if (!stage || !toggle || !("IntersectionObserver" in window)) return () => {};
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  const pauseLabel = toggle.querySelector<HTMLElement>("[data-wave-pause]")!;
  const resumeLabel = toggle.querySelector<HTMLElement>("[data-wave-resume]")!;
  let visible = false;
  let paused = false;
  const update = () => {
    const enabled = !preference.matches;
    stage.classList.toggle("is-wave-ready", enabled);
    stage.dataset.waveState = enabled && visible && !paused && !document.hidden
      ? "running" : "paused";
    pauseLabel.hidden = paused;
    resumeLabel.hidden = !paused;
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    update();
  });
  const togglePause = () => { paused = !paused; update(); };
  observer.observe(stage);
  toggle.addEventListener("click", togglePause);
  document.addEventListener("visibilitychange", update);
  preference.addEventListener("change", update);
  update();
  return () => {
    observer.disconnect();
    toggle.removeEventListener("click", togglePause);
    document.removeEventListener("visibilitychange", update);
    preference.removeEventListener("change", update);
    stage.classList.remove("is-wave-ready");
    delete stage.dataset.waveState;
  };
}
