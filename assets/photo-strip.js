import { Component } from '@theme/component';

/**
 * A sideways-scrolling row of photos with previous and next buttons.
 *
 * @typedef {object} Refs
 * @property {HTMLElement} track
 * @property {HTMLButtonElement} [previous]
 * @property {HTMLButtonElement} [next]
 *
 * @extends {Component<Refs>}
 */
class PhotoStrip extends Component {
  requiredRefs = ['track'];

  /** @type {ResizeObserver | undefined} */
  #resizeObserver;

  connectedCallback() {
    super.connectedCallback();

    this.refs.track.addEventListener('scroll', this.#updateButtons, { passive: true });
    this.#resizeObserver = new ResizeObserver(this.#updateButtons);
    this.#resizeObserver.observe(this.refs.track);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.refs.track?.removeEventListener('scroll', this.#updateButtons);
    this.#resizeObserver?.disconnect();
  }

  scrollPrevious() {
    this.#scrollByPhoto(-1);
  }

  scrollNext() {
    this.#scrollByPhoto(1);
  }

  /**
   * Moves the row by one photo and the gap after it.
   * @param {1 | -1} direction
   */
  #scrollByPhoto(direction) {
    const { track } = this.refs;
    const photo = track.firstElementChild;
    if (!photo) return;

    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (photo.getBoundingClientRect().width + gap) });
  }

  #updateButtons = () => {
    const { track, previous, next } = this.refs;
    // Right-to-left layouts report negative scroll positions
    const position = Math.abs(track.scrollLeft);

    if (previous) previous.disabled = position <= 4;
    if (next) next.disabled = position + track.clientWidth >= track.scrollWidth - 4;
  };
}

if (!customElements.get('photo-strip')) {
  customElements.define('photo-strip', PhotoStrip);
}
