import { css } from 'lit';

export const componentStyles = css`
  :host {
    direction: inherit;
  }

  .pql-shell {
    display: grid;
    gap: 1rem;
  }

  @media (min-width: 960px) {
    .pql-shell {
      grid-template-columns: minmax(0, 300px) minmax(0, 1fr);
      align-items: start;
    }
  }

  .pql-track {
    display: flex;
    gap: 0.65rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x proximity;
    padding-bottom: 0.35rem;
  }

  @media (min-width: 960px) {
    .pql-track {
      flex-direction: column;
      overflow: visible;
      scroll-snap-type: none;
      padding-bottom: 0;
      position: relative;
    }

    .pql-track::before {
      content: '';
      position: absolute;
      inset-inline-start: 1.05rem;
      top: 0.5rem;
      bottom: 0.5rem;
      width: 2px;
      background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, var(--border-color, #e6e0d6));
      border-radius: 999px;
    }
  }

  .pql-step {
    flex: 0 0 auto;
    min-width: 8.75rem;
    scroll-snap-align: start;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 0.65rem;
    min-height: 44px;
    padding: 0.95rem 1rem;
    border-radius: calc(var(--section-radius, 20px) * 0.85);
    border: 1.5px solid color-mix(in srgb, var(--border-color, #e6e0d6) 82%, transparent);
    background: var(--card-bg, #fff);
    color: var(--text-color, #1f1a14);
    text-align: start;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.05);
    transition:
      border-color 0.24s ease,
      box-shadow 0.24s ease,
      transform 0.24s ease,
      background 0.24s ease;
  }

  @media (min-width: 960px) {
    .pql-step {
      min-width: 0;
      position: relative;
      z-index: 1;
    }
  }

  .pql-step:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--station-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .pql-step.is-active {
    border-color: var(--station-color, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--station-color, var(--accent-color, var(--fs-store-primary))) 9%,
      var(--card-bg, #fff)
    );
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--station-color, var(--accent-color, var(--fs-store-primary))) 18%, transparent),
      0 12px 28px rgba(90, 70, 40, 0.1);
    transform: translateY(-2px);
  }

  .pql-step:active {
    transform: translateY(0);
  }

  .pql-step__badge {
    width: 2.15rem;
    height: 2.15rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: color-mix(in srgb, var(--station-color, var(--accent-color, var(--fs-store-primary))) 16%, var(--card-bg, #fff));
    color: var(--station-color, var(--accent-color, var(--fs-store-primary)));
    font-size: 0.95rem;
    overflow: hidden;
  }

  .pql-step__badge img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .pql-step__name {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 800;
    line-height: 1.35;
  }

  .pql-step__short {
    margin: 0.15rem 0 0;
    font-size: 0.76rem;
    color: var(--muted-color, #6e6558);
    line-height: 1.4;
  }

  .pql-detail {
    border-color: color-mix(
      in srgb,
      var(--station-color, var(--accent-color, var(--fs-store-primary))) 24%,
      var(--border-color, #e6e0d6)
    );
  }

  .pql-detail__media {
    margin-bottom: 0.85rem;
    border-radius: calc(var(--section-radius, 20px) * 0.55);
    overflow: hidden;
  }

  .pql-detail__media img {
    display: block;
    width: 100%;
    max-height: 220px;
    object-fit: cover;
  }

  .pql-detail__video {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    background: color-mix(in srgb, var(--border-color, #e6e0d6) 40%, var(--text-color, #1f1a14));
  }

  .pql-detail__video iframe,
  .pql-detail__video video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
    object-fit: cover;
  }

  .pql-detail__body {
    margin: 0 0 0.85rem;
    color: var(--text-color, #1f1a14);
    font-size: 0.92rem;
    line-height: 1.68;
  }

  .pql-callout {
    margin-bottom: 0.75rem;
    padding: 0.95rem 1rem;
    border-radius: calc(var(--section-radius, 20px) * 0.55);
    border-inline-start: 4px solid var(--station-color, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(in srgb, var(--station-color, var(--accent-color, var(--fs-store-primary))) 8%, var(--card-bg, #fff));
  }

  .pql-callout__label {
    margin: 0 0 0.35rem;
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--station-color, var(--accent-color, var(--fs-store-primary)));
  }

  .pql-callout__text {
    margin: 0;
    font-size: 0.88rem;
    line-height: 1.6;
    color: var(--text-color, #1f1a14);
  }

  .pql-cert {
    padding: 0.85rem 0.95rem;
    border-radius: calc(var(--section-radius, 20px) * 0.55);
    border: 1px dashed color-mix(in srgb, var(--station-color, var(--accent-color, var(--fs-store-primary))) 40%, var(--border-color, #e6e0d6));
    background: color-mix(in srgb, var(--card-bg, #fff) 92%, var(--station-color, var(--accent-color, var(--fs-store-primary))));
  }

  .pql-cert__label {
    margin: 0 0 0.3rem;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted-color, #6e6558);
  }

  .pql-cert__text {
    margin: 0;
    font-size: 0.84rem;
    line-height: 1.55;
    color: var(--text-color, #1f1a14);
  }

  .pql-empty-hint {
    margin-top: 0.35rem;
    font-size: 0.82rem;
    color: var(--muted-color, #6e6558);
  }

  @media (prefers-reduced-motion: reduce) {
    .pql-step {
      transition: none;
    }

    .pql-step:hover,
    .pql-step.is-active {
      transform: none;
    }
  }
`;
