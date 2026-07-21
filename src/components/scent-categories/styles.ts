import { css } from 'lit';

export const componentStyles = css`
  :host {
    direction: inherit;
  }

  /* ── Layout toggle ── */
  .scat-toggle {
    display: flex;
    justify-content: center;
    gap: 0.35rem;
    margin-bottom: 1.5rem;
  }

  .scat-toggle__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.4rem;
    height: 2.4rem;
    border: 1px solid color-mix(in srgb, var(--accent-color, #9a7b4f) 35%, var(--border-color, #e6e0d6));
    border-radius: 8px;
    background: transparent;
    color: var(--muted-color, #6e6558);
    cursor: pointer;
    transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
  }

  .scat-toggle__btn.is-active {
    border-color: var(--accent-color, #9a7b4f);
    color: var(--accent-color, #9a7b4f);
    background: color-mix(in srgb, var(--accent-color, #9a7b4f) 8%, transparent);
  }

  .scat-toggle__icon {
    width: 1rem;
    height: 1rem;
    stroke: currentColor;
    fill: none;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* ── Grid layout ── */
  .scat-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  }

  /* ── Slider layout ── */
  .scat-slider {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    scroll-snap-type: x proximity;
    scrollbar-width: thin;
    padding-bottom: 0.5rem;
  }

  .scat-slider > .scat-card {
    flex: 0 0 auto;
    width: min(78vw, 17rem);
    scroll-snap-align: start;
  }

  /* ── Card ── */
  .scat-card {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    border: 1.5px solid color-mix(in srgb, var(--accent-color, #9a7b4f) 18%, var(--border-color, #e6e0d6));
    background: var(--card-bg, #fff);
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.05);
    transition: border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease;
  }

  .scat-card:hover {
    border-color: color-mix(in srgb, var(--accent-color, #9a7b4f) 42%, var(--border-color, #e6e0d6));
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
    transform: translateY(-2px);
  }

  /* ── Image area ── */
  .scat-card__media {
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: color-mix(in srgb, var(--border-color, #e6e0d6) 45%, #fff);
  }

  .scat-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .scat-card:hover .scat-card__img {
    transform: scale(1.04);
  }

  .scat-card__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(31, 26, 20, 0.55) 0%,
      rgba(31, 26, 20, 0.1) 50%,
      transparent 100%
    );
    pointer-events: none;
  }

  .scat-card__icon {
    position: absolute;
    top: 0.75rem;
    inset-inline-end: 0.75rem;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: rgba(255, 255, 255, 0.92);
    font-size: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  /* ── Body ── */
  .scat-card__body {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding: 0.9rem 1rem;
  }

  .scat-card__name {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    line-height: 1.35;
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

  /* ── Gold hairline accent at bottom ── */
  .scat-card::after {
    content: '';
    display: block;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent 5%,
      var(--accent-color, #9a7b4f) 50%,
      transparent 95%
    );
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  .scat-card:hover::after {
    opacity: 1;
  }

  /* ── No-image fallback ── */
  .scat-card__media--empty {
    display: grid;
    place-items: center;
    background: linear-gradient(
      135deg,
      var(--section-bg, #f6f4f1),
      color-mix(in srgb, var(--accent-color, #9a7b4f) 12%, var(--card-bg, #fff))
    );
    font-size: 2rem;
  }

  @media (min-width: 960px) {
    .scat-grid {
      grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .scat-card,
    .scat-card__img {
      transition: none;
    }
    .scat-card:hover {
      transform: none;
    }
    .scat-card:hover .scat-card__img {
      transform: none;
    }
  }
`;
