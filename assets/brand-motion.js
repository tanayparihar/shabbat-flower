/**
 * Fades content up as it scrolls into view, once.
 * Only content below the first screen is hidden, so nothing flashes on load and
 * everything stays visible if this script does not run.
 */

/** Elements that fade up. An element inside another match moves with its parent. */
const TARGETS = [
  '.group-block[class*="color-custom-"]',
  '.text-block',
  '.image-block',
  '.button',
  '.button-secondary',
  '.option-pills',
  '.resource-list',
  '.product-card',
  '.how-it-works__header > *',
  '.how-it-works__steps',
  '.how-it-works__footer > *',
  '.feature-cards__heading',
  '.feature-cards__card',
  '.reviews__header',
  '.reviews__card',
  '.photo-strip__content',
].join(',');

/* The hero animates with CSS; forms and dialogs must never be hidden */
const EXCLUDED = '.hero, form, dialog';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// The theme editor re-renders sections, so content is left as it is there
const inThemeEditor = Boolean(window.Shopify?.designMode);

if (!prefersReducedMotion && !inThemeEditor) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;

      observer.unobserve(entry.target);
      entry.target.classList.replace('reveal-waiting', 'reveal-run');
    }
  });

  document.addEventListener('animationend', (event) => {
    if (event.animationName === 'brand-reveal-up' && event.target instanceof Element) {
      event.target.classList.remove('reveal-run');
    }
  });

  for (const element of document.querySelectorAll(`main :is(${TARGETS})`)) {
    if (element.closest(EXCLUDED) || element.parentElement?.closest(`main :is(${TARGETS})`)) continue;
    if (element.getBoundingClientRect().top < window.innerHeight) continue;

    element.classList.add('reveal-waiting');
    observer.observe(element);
  }
}
