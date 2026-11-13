import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Add one-shot entrances without taking ownership of the scrubbed diagram. */
export function setupEntrances() {
  const media = gsap.matchMedia();
  media.add("(prefers-reduced-motion: no-preference)", () => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-enter]"),
    );
    const pending = new Map<HTMLElement, gsap.core.Tween>();
    const revealImmediately = (element: HTMLElement) => {
      const tween = pending.get(element);
      tween?.scrollTrigger?.kill();
      tween?.kill();
      gsap.set(element, { clearProps: "opacity,transform,clipPath" });
      element.dataset.enterState = "visible";
      pending.delete(element);
    };
    for (const element of targets) {
      if (
        !element.getClientRects().length ||
        element.getBoundingClientRect().top < innerHeight
      ) {
        element.dataset.enterState = "visible";
        continue;
      }
      element.dataset.enterState = "pending";
      const side = element.dataset.enter === "side";
      const index = Math.min(3, Number(element.dataset.enterIndex) || 0);
      const tween = gsap.fromTo(
        element,
        {
          opacity: 0,
          x: side ? -18 : 0,
          y: side ? 0 : 26,
          clipPath: "inset(0 0 5% 0)",
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.65,
          delay: index * 0.06,
          ease: "power3.out",
          clearProps: "opacity,transform,clipPath",
          onStart: () => {
            element.dataset.enterState = "entering";
          },
          onComplete: () => {
            element.dataset.enterState = "visible";
            pending.delete(element);
          },
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        },
      );
      pending.set(element, tween);
    }
    const onFocus = (event: FocusEvent) => {
      const element =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-enter]")
          : null;
      if (element && element.dataset.enterState !== "visible")
        revealImmediately(element);
    };
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("focusin", onFocus);
      for (const element of targets) delete element.dataset.enterState;
      pending.clear();
    };
  });
  return () => media.revert();
}
