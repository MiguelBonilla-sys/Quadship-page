import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupEntrances } from "./entrances";
import { setupWave } from "./wave";

gsap.registerPlugin(ScrollTrigger);
export function setupScrollStory() {
  const root = document.querySelector<HTMLElement>("[data-scroll-story]");
  if (!root) return;
  const media = gsap.matchMedia();
  const wires = Array.from(
    root.querySelectorAll<SVGPathElement>("[data-story-wire]"),
  );
  const packet = root.querySelector<SVGCircleElement>("[data-story-packet]");
  media.add(
    {
      desktop: "(min-width: 900px)",
      mobile: "(max-width: 899px)",
      handset: "(max-width: 700px)",
      reduced: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      const { desktop, reduced } = context.conditions!;
      root.dataset.scrollMode = reduced
        ? "reduced"
        : desktop
          ? "desktop"
          : "mobile";
      root.dataset.storyPhase = "overview";
      if (reduced) return;
      if (context.conditions!.handset) {
        gsap.fromTo(
          root.querySelectorAll(".story-mobile-connector"),
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1,
            stagger: 0.2,
            ease: "none",
            scrollTrigger: {
              trigger: root.querySelector(".story-mobile-map"),
              start: "top 85%",
              end: "bottom 70%",
              scrub: 0.3,
            },
          },
        );
        return () => {
          root.dataset.storyPhase = "overview";
        };
      }
      if (desktop) root.classList.add("is-scroll-ready");
      for (const wire of wires) {
        const length = wire.getTotalLength();
        gsap.set(wire, { strokeDasharray: length, strokeDashoffset: length });
      }
      if (packet) gsap.set(packet, { opacity: 0 });
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: desktop ? "top 120px" : "top 75%",
          end: desktop ? "bottom 90%" : "bottom 25%",
          scrub: 0.4,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            root.dataset.storyPhase = String(
              Math.min(2, Math.floor(self.progress * 3)),
            );
            root.style.setProperty("--story-progress", String(self.progress));
          },
        },
      });
      wires.forEach((wire, index) => {
        timeline.to(wire, { strokeDashoffset: 0, duration: 1 }, index);
      });
      const journey = { progress: 0 };
      timeline.to(
        journey,
        {
          progress: 1,
          duration: 3,
          onUpdate() {
            if (!packet) return;
            const position = Math.min(2.999, journey.progress * 3);
            const index = Math.floor(position);
            const wire = wires[index];
            const point = wire.getPointAtLength(
              wire.getTotalLength() * (position - index),
            );
            packet.setAttribute("cx", String(point.x));
            packet.setAttribute("cy", String(point.y));
            gsap.set(packet, {
              opacity: journey.progress > 0 && journey.progress < 1 ? 1 : 0,
            });
          },
        },
        0,
      );
      timeline.fromTo(
        root.querySelector(".story-gate-node .node-frame"),
        { stroke: "#697B92" },
        { stroke: "#E8714F", duration: 0.35 },
        0.8,
      );
      timeline.fromTo(
        root.querySelector(".story-server-node .node-frame"),
        { stroke: "#697B92" },
        { stroke: "#E8714F", duration: 0.35 },
        1.8,
      );
      // Translations can change line wrapping and the native scroll geometry.
      const refresh = () => ScrollTrigger.refresh();
      document.addEventListener("quadship:language", refresh);
      document.fonts.ready.then(refresh);
      return () => {
        document.removeEventListener("quadship:language", refresh);
        root.classList.remove("is-scroll-ready");
        root.dataset.storyPhase = "overview";
        root.style.removeProperty("--story-progress");
      };
    },
  );
  const stopEntrances = setupEntrances();
  const stopWave = setupWave();
  return () => {
    stopEntrances();
    stopWave();
    media.revert();
  };
}
