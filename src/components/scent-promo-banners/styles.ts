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

  .spb-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    min-height: 46px;
    padding: 0.65rem 1.8rem;
    border: 1.5px solid var(--accent-color, var(--fs-store-primary));
    border-radius: 999px;
    background: transparent;
    color: var(--card-bg, #fff);
    font: inherit;
    font-size: 0.84rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-decoration: none;
    cursor: pointer;
    transition:
      background 0.24s ease,
      color 0.24s ease,
      transform 0.24s ease,
      box-shadow 0.24s ease;
  }

  .spb-cta:hover {
    background: var(--accent-color, var(--fs-store-primary));
    color: var(--button-color, #fff);
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.14);
  }

  .spb-dots {
    display: flex;
    justify-content: center;
    gap: 0.65rem;
    margin-top: 1rem;
  }

  .spb-dot {
    width: 44px;
    height: 44px;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    display: grid;
    place-items: center;
  }

  .spb-dot::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 999px;
    border: 1.5px solid var(--accent-color, var(--fs-store-primary));
    background: transparent;
    transition: background 0.24s ease, transform 0.24s ease;
  }

  .spb-dot.is-active::after {
    background: var(--accent-color, var(--fs-store-primary));
    transform: scale(1.25);
  }

  .spb-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    min-width: 44px;
    min-height: 44px;
    border: 1.5px solid color-mix(in srgb, var(--card-bg, #fff) 35%, transparent);
    border-radius: 50%;
    background: color-mix(in srgb, var(--text-color, #1f1a14) 40%, transparent);
    backdrop-filter: blur(4px);
    color: var(--card-bg, #fff);
    font-size: 1.1rem;
    cursor: pointer;
    transition:
      background 0.24s ease,
      border-color 0.24s ease,
      transform 0.24s ease;
    padding: 0;
  }

  .spb-nav:hover {
    background: color-mix(in srgb, var(--text-color, #1f1a14) 65%, transparent);
    border-color: var(--accent-color, var(--fs-store-primary));
    transform: translateY(calc(-50% - 2px));
  }

  .spb-nav--prev {
    inset-inline-start: 0.75rem;
  }

  .spb-nav--next {
    inset-inline-end: 0.75rem;
  }

  @media (max-width: 639px) {
    .spb-slide {
      min-height: 240px;
      aspect-ratio: 16 / 9;
    }

    .spb-nav {
      width: 2.75rem;
      height: 2.75rem;
      font-size: 0.9rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .spb-track,
    .spb-slide__bg,
    .spb-cta,
    .spb-nav,
    .spb-dot::after {
      transition: none;
    }

    .spb-slide.is-active .spb-slide__bg,
    .spb-cta:hover,
    .spb-nav:hover {
      transform: none;
    }
  }
`;
