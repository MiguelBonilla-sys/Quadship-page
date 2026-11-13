import { translations, englishMetadata } from "../lib/translations.mjs";

type Language = "es" | "en";
const dictionary: Record<string, string> = translations;
const textNodes: { node: Text; original: string }[] = [];
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (walker.nextNode()) {
  const node = walker.currentNode as Text;
  if (
    !node.parentElement?.closest("script, style") &&
    node.textContent?.trim()
  ) {
    textNodes.push({ node, original: node.textContent });
  }
}
const labelled = Array.from(
  document.querySelectorAll<HTMLElement>("[aria-label]"),
).map((element) => ({
  element,
  original: element.getAttribute("aria-label")!,
}));
const originalTitle = document.title;
const metaFields = Array.from(
  document.querySelectorAll<HTMLMetaElement>(
    'meta[name="description"], meta[property="og:title"], meta[property="og:description"], meta[name="twitter:title"], meta[name="twitter:description"], meta[property="og:locale"]',
  ),
).map((element) => ({ element, original: element.content }));
const schema = document.querySelector<HTMLScriptElement>(
  'script[type="application/ld+json"]',
);
const originalSchema = schema?.textContent;

function setLanguage(language: Language, persist = false) {
  for (const { node, original } of textNodes) {
    const key = original.trim();
    node.textContent =
      language === "en" && dictionary[key]
        ? original.replace(key, dictionary[key])
        : original;
  }
  for (const { element, original } of labelled)
    element.setAttribute(
      "aria-label",
      language === "en" ? dictionary[original] || original : original,
    );
  for (const day of document.querySelectorAll<HTMLElement>("[data-weekday]"))
    day.textContent = (
      language === "en"
        ? ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
        : ["L", "M", "X", "J", "V", "S", "D"]
    )[Number(day.dataset.weekday)];
  document.documentElement.lang = language;
  document.dispatchEvent(new Event("quadship:language"));
  document.title = language === "en" ? englishMetadata.title : originalTitle;
  for (const { element, original } of metaFields) {
    const key = element.getAttribute("property") || element.name;
    element.content =
      language === "es"
        ? original
        : key === "og:locale"
          ? "en_US"
          : key.includes("title")
            ? englishMetadata.title
            : englishMetadata.description;
  }
  if (schema && originalSchema) {
    const data = JSON.parse(originalSchema);
    for (const entity of data["@graph"]) {
      if (entity.description)
        entity.description =
          language === "en"
            ? englishMetadata.description
            : JSON.parse(originalSchema)["@graph"].find(
                (item: Record<string, string>) =>
                  item["@type"] === entity["@type"],
              ).description;
      if (entity.inLanguage) entity.inLanguage = language;
    }
    schema.textContent = JSON.stringify(data);
  }
  for (const button of document.querySelectorAll<HTMLButtonElement>(
    "[data-language]",
  ))
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.language === language),
    );
  if (persist) {
    try {
      localStorage.setItem("quadship-language", language);
    } catch {
      /* Language switching works without storage. */
    }
  }
}
for (const button of document.querySelectorAll<HTMLButtonElement>(
  "[data-language]",
))
  button.addEventListener("click", () =>
    setLanguage(button.dataset.language as Language, true),
  );
document.documentElement.classList.add("is-language-ready");
try {
  if (localStorage.getItem("quadship-language") === "en") setLanguage("en");
} catch {
  /* Spanish remains the static default. */
}

const examples = document.querySelector<HTMLElement>("#possibilities");
if (examples) {
  examples.classList.add("is-enhanced");
  for (const button of examples.querySelectorAll<HTMLButtonElement>(
    "[data-example]",
  )) {
    button.addEventListener("click", () => {
      for (const control of examples.querySelectorAll<HTMLButtonElement>(
        "[data-example]",
      ))
        control.setAttribute("aria-pressed", String(control === button));
      for (const panel of examples.querySelectorAll<HTMLElement>(
        "[data-panel]",
      ))
        panel.hidden = panel.dataset.panel !== button.dataset.example;
    });
  }
}

for (const example of document.querySelectorAll<HTMLElement>(".ci-explainer")) {
  example.classList.add("is-enhanced");
  for (const button of example.querySelectorAll<HTMLButtonElement>("[data-ci]"))
    button.addEventListener("click", () => {
      example.dataset.ciState = button.dataset.ci;
      for (const control of example.querySelectorAll<HTMLButtonElement>(
        "[data-ci]",
      ))
        control.setAttribute("aria-pressed", String(control === button));
      for (const result of example.querySelectorAll<HTMLElement>(
        "[data-ci-result]",
      ))
        result.hidden = result.dataset.ciResult !== button.dataset.ci;
    });
}
// The essential page never depends on the animation module loading.
let scrollStoryLoaded = false;
const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
function loadScrollStory() {
  if (scrollStoryLoaded || motionPreference.matches) return;
  scrollStoryLoaded = true;
  import("./scroll-story")
    .then(({ setupScrollStory }) => setupScrollStory())
    .catch(() => {
      scrollStoryLoaded = false;
      for (const element of document.querySelectorAll<HTMLElement>(
        "[data-enter]",
      )) {
        for (const property of ["opacity", "transform", "clip-path"])
          element.style.removeProperty(property);
        delete element.dataset.enterState;
      }
      document
        .querySelector("[data-scroll-story]")
        ?.classList.remove("is-scroll-ready");
    });
}
loadScrollStory();
motionPreference.addEventListener("change", loadScrollStory);
