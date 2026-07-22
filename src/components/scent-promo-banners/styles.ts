import { css } from 'lit';

export const componentStyles = css`
  :host {
    direction: inherit;
  }

  .spb-carousel {
    position: relative;
  }

  .spb-swiper {
    position: relative;
    overflow: hidden;
    border-radius: var(--section-radius, 20px);
    border: 1px solid var(--border-color, #e6e0d6);
    box-shadow: 0 14px 34px rgba(90, 70, 40, 0.1);
  }

  .spb-slide-wrap {
    height: auto;
  }

  .spb-slide {
    position: relative;
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
    pointer-events: none;
  }

  .spb-slide__overlay {
    position: absolute;
    inset: 0;
    background: color-mix(
      in srgb,
      var(--text-color, #1f1a14) calc(var(--spb-overlay, 0.45) * 100%),
      transparent
    );
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
    text-shadow: 0 2px 12px
      color-mix(in srgb, var(--text-color, #1f1a14) 35%, transparent);
  }

  .spb-slide__sub {
    margin: 0;
    font-size: clamp(0.88rem, 1.5vw, 1.05rem);
    line-height: 1.6;
    color: color-mix(in srgb, var(--card-bg, #fff) 88%, transparent);
    max-width: 32rem;
  }

  /* Navigation arrows */
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

  .spb-nav.swiper-button-disabled {
    opacity: 0.35;
    pointer-events: none;
  }

  /* Pagination dots */
  .spb-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.35rem;
    margin-top: 0.75rem;
  }

  .spb-dot {
    display: inline-block;
    width: 0.45rem;
    height: 0.45rem;
    min-width: 0;
    min-height: 0;
    padding: 0;
    margin: 0 !important;
    border: 0;
    border-radius: 999px;
    background: color-mix(
      in srgb,
      var(--accent-color, var(--fs-store-primary)) 28%,
      transparent
    );
    cursor: pointer;
    opacity: 1;
    transition: width 0.2s ease, background 0.2s ease;
  }

  .spb-dot.is-active {
    width: 1rem;
    background: var(--accent-color, var(--fs-store-primary));
  }

  /* Rise animation */
  .fs-animate .spb-swiper {
    animation: spb-rise 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  @keyframes spb-rise {
    from {
      opacity: 0;
      transform: translateY(14px) scale(0.985);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @media (max-width: 639px) {
    .spb-slide {
      min-height: 240px;
      aspect-ratio: 16 / 9;
    }

    .spb-nav {
      display: none;
    }

    .spb-dots {
      margin-top: 0.6rem;
      gap: 0.28rem;
    }

    .spb-dot {
      width: 0.35rem;
      height: 0.35rem;
    }

    .spb-dot.is-active {
      width: 0.8rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .spb-nav,
    .spb-dot {
      transition: none;
    }

    .fs-animate .spb-swiper {
      animation: none;
    }
  }
`;
