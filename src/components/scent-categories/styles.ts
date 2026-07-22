import { css } from 'lit';

export const componentStyles = css`
  :host {
    direction: inherit;
  }

  .scat-shell {
    display: grid;
    gap: 1.1rem;
  }

  .scat-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem 1rem;
  }

  .scat-toolbar__hint {
    margin: 0;
    font-size: 0.84rem;
    font-weight: 650;
    color: var(--muted-color, #6e6558);
    line-height: 1.5;
  }

  .scat-toggle {
    display: inline-flex;
    gap: 0.3rem;
    padding: 0.25rem;
    border-radius: 999px;
    border: 1px solid color-mix(in srgb, var(--border-color, #e6e0d6) 85%, transparent);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, var(--section-bg, transparent));
  }

  .scat-toggle__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    min-height: 2.4rem;
    padding: 0.35rem 0.75rem;
    border: none;
    border-radius: 999px;
    background: transparent;
    color: var(--muted-color, #6e6558);
    font: inherit;
    font-size: 0.78rem;
    font-weight: 800;
    cursor: pointer;
    transition:
      color 0.2s ease,
      background 0.2s ease,
      box-shadow 0.2s ease;
  }

  .scat-toggle__btn.is-active {
    color: var(--button-color, #fff);
    background: linear-gradient(
      135deg,
      var(--button-bg, var(--accent-color, var(--fs-store-primary))),
      color-mix(in srgb, var(--button-bg, var(--accent-color, var(--fs-store-primary))) 62%, #5c4a32)
    );
    box-shadow: 0 6px 14px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 24%, transparent);
  }

  .scat-toggle__label {
    line-height: 1;
  }

  .scat-toggle__icon {
    width: 0.95rem;
    height: 0.95rem;
    stroke: currentColor;
    fill: none;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .scat-track--grid {
    display: grid;
    gap: 0.85rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 640px) {
    .scat-track--grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1rem;
    }
  }

  @media (min-width: 960px) {
    .scat-track--grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  .scat-swiper {
    overflow: hidden;
  }

  .scat-swiper .swiper-slide {
    width: auto;
  }

  .scat-swiper .scat-track__item {
    width: min(72vw, 16.5rem);
  }

  .scat-card {
    --cat-color: var(--accent-color, var(--fs-store-primary));
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    border: 1.5px solid color-mix(in srgb, var(--cat-color) 22%, var(--border-color, #e6e0d6));
    background: var(--card-bg, #fff);
    text-decoration: none;
    color: inherit;
    box-shadow: 0 6px 16px rgba(90, 70, 40, 0.07);
    transition:
      border-color 0.22s ease,
      box-shadow 0.22s ease,
      transform 0.22s ease;
  }

  a.scat-card {
    cursor: pointer;
  }

  .scat-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(in srgb, var(--cat-color) 48%, var(--border-color, #e6e0d6));
    box-shadow: 0 12px 28px rgba(90, 70, 40, 0.11);
  }

  .scat-card__media {
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: color-mix(in srgb, var(--cat-color) 14%, var(--card-bg, #fff));
  }

  .scat-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .scat-card:hover .scat-card__img {
    transform: scale(1.045);
  }

  .scat-card__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      color-mix(in srgb, var(--text-color, #1f1a14) 45%, transparent) 0%,
      transparent 58%
    );
    pointer-events: none;
  }

  .scat-card__icon {
    position: absolute;
    top: 0.7rem;
    inset-inline-end: 0.7rem;
    z-index: 1;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, transparent);
    color: var(--cat-color);
    font-size: 1rem;
    box-shadow: 0 4px 12px rgba(90, 70, 40, 0.12);
    -webkit-backdrop-filter: blur(6px);
    backdrop-filter: blur(6px);
  }

  .scat-card__fallback {
    font-size: 1.85rem;
    font-weight: 800;
    color: var(--cat-color);
  }

  .scat-card__media--empty {
    display: grid;
    place-items: center;
    background: linear-gradient(
      145deg,
      color-mix(in srgb, var(--cat-color) 16%, var(--card-bg, #fff)),
      color-mix(in srgb, var(--cat-color) 5%, var(--card-bg, #fff))
    );
  }

  .scat-card__body {
    display: grid;
    gap: 0.35rem;
    padding: 0.95rem 1rem 1.05rem;
    flex: 1 1 auto;
  }

  .scat-card__name {
    margin: 0;
    font-size: 1rem;
    font-weight: 800;
    line-height: 1.35;
    letter-spacing: -0.01em;
    color: var(--text-color, #1f1a14);
  }

  .scat-card__desc {
    margin: 0;
    font-size: 0.82rem;
    color: var(--muted-color, #6e6558);
    line-height: 1.55;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .scat-card__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.45rem;
    min-height: 2.2rem;
    padding: 0.35rem 0.9rem;
    width: fit-content;
    border-radius: 999px;
    border: 1.5px solid color-mix(in srgb, var(--cat-color) 45%, var(--border-color, #e6e0d6));
    background: color-mix(in srgb, var(--cat-color) 10%, var(--card-bg, #fff));
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    color: var(--cat-color);
  }

  .scat-card::after {
    content: '';
    display: block;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent 4%,
      var(--cat-color) 50%,
      transparent 96%
    );
    opacity: 0;
    transition: opacity 0.22s ease;
  }

  .scat-card:hover::after {
    opacity: 1;
  }

  @media (max-width: 479px) {
    .scat-toggle__label {
      display: none;
    }

    .scat-toggle__btn {
      width: 2.4rem;
      padding: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .scat-card,
    .scat-card__img,
    .scat-toggle__btn {
      transition: none !important;
    }

    .scat-card:hover {
      transform: none;
    }

    .scat-card:hover .scat-card__img {
      transform: none;
    }
  }
`;
