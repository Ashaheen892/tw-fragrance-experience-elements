import { css } from 'lit';

export const componentStyles = css`
  .fpm-panel {
    max-width: 880px;
    margin-inline: auto;
  }

  .fpm-bars {
    display: grid;
    gap: 0.85rem;
  }

  .fpm-bar {
    display: grid;
    gap: 0.45rem;
  }

  .fpm-bar__head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .fpm-bar__label {
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted-color, #6e6558);
  }

  .fpm-bar__value {
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--metric-color, var(--accent-color, var(--fs-store-primary)));
  }

  .fpm-bar__track {
    height: 10px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e6e0d6) 80%, transparent);
    overflow: hidden;
  }

  .fpm-bar__fill {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      var(--metric-color, var(--accent-color, var(--fs-store-primary))),
      color-mix(in srgb, var(--metric-color, var(--accent-color, var(--fs-store-primary))) 65%, var(--text-color, #5c4a32))
    );
    transition: width 0.28s ease;
  }

  .fpm-rings {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  @media (min-width: 640px) {
    .fpm-rings {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .fpm-ring {
    display: grid;
    justify-items: center;
    gap: 0.55rem;
    text-align: center;
  }

  .fpm-ring__svg {
    width: 96px;
    height: 96px;
    transform: rotate(-90deg);
  }

  .fpm-ring__track {
    fill: none;
    stroke: color-mix(in srgb, var(--border-color, #e6e0d6) 85%, transparent);
    stroke-width: 8;
  }

  .fpm-ring__arc {
    fill: none;
    stroke: var(--metric-color, var(--accent-color, var(--fs-store-primary)));
    stroke-width: 8;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.28s ease;
  }

  .fpm-ring__value {
    font-size: 1rem;
    font-weight: 800;
    fill: var(--text-color, #1f1a14);
    transform: rotate(90deg);
    transform-origin: 50px 50px;
  }

  .fpm-ring__label {
    margin: 0;
    font-size: 0.82rem;
    font-weight: 800;
    color: var(--text-color, #1f1a14);
    line-height: 1.35;
  }

  @media (prefers-reduced-motion: reduce) {
    .fpm-bar__fill,
    .fpm-ring__arc {
      transition: none !important;
    }
  }
`;
