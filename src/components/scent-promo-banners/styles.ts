import { css } from 'lit';

export const componentStyles = css`
  :host {
    direction: inherit;
  }

  .spb-carousel {
    position: relative;
    overflow: hidden;
    border-radius: var(--section-radius, 20px);
    border: 1px solid var(--border-color, #e6e0d6);
    box-shadow: 0 14px 34px rgba(90, 70, 40, 0.1);
    touch-action: pan-y;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
  }

  .spb-carousel:active {
    cursor: grabbing;
  }

  .spb-track {
    display: flex;
    transition: transform 0.28s ease;
  }

  .spb-slide {
    position: relative;
    flex: 0 0 100%;
    min-height: 320px;
    max-height: 520px;
    aspect-ratio: 21 / 9;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .spb-slide__bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.28s ease;
  }

  .spb-slide.is-active .spb-slide__bg {
    transform: scale(1.03);
  }

  .spb-slide__overlay {
    position: absolute;
    inset: 0;
    background: color-mix(in srgb, var(--text-color, #1f1a14) calc(var(--spb-overlay, 0.45) * 100%), transparent);
    pointer-events: none;
  }

  .spb-slide__content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 2rem 1.5rem;
    max-width: 38rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.85rem;
  }

  .spb-slide__heading {
    margin: 0;
    font-size: clamp(1.5rem, 3.5vw, 2.4rem);
    font-weight: 800;
    letter-spacing: 0.03em;
    line-height: 1.25;
    color: var(--card-bg, #fff);
    text-shadow: 0 2px 12px color-mix(in srgb, var(--text-color, #1f1a14) 35%, transparent);
  }

  .spb-slide__sub {
    margin: 0;
    font-size: clamp(0.88rem, 1.5vw, 1.05rem);
    line-height: 1.6;
    color: color-mix(in srgb, var(--card-bg, #fff) 88%, transparent);
    max-width: 32rem;
  }

  .spb-nav {
    position: absolute;
    top: 50%;
    z-index: 10;
    transform: translateY(-50%);
  }

  .spb-nav--prev {
    inset-inline-start: 0.75rem;
  }

  .spb-nav--next {
    inset-inline-end: 0.75rem;
  }

  .spb-nav.fs-icon-btn--on-media:hover {
    transform: translateY(calc(-50% - 1px));
  }

  @media (max-width: 639px) {
    .spb-slide {
      min-height: 240px;
      aspect-ratio: 16 / 9;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .spb-track,
    .spb-slide__bg,
    .spb-nav {
      transition: none;
    }

    .spb-slide.is-active .spb-slide__bg,
    .spb-nav.fs-icon-btn--on-media:hover {
      transform: translateY(-50%);
    }
  }
`;
