import { css } from 'lit';

export const componentStyles = css`
  :host {
    direction: inherit;
  }

  .igs-layout {
    display: grid;
    gap: 1rem;
  }

  .igs-grid {
    display: grid;
    gap: 0.65rem;
    grid-template-columns: repeat(auto-fill, minmax(9.5rem, 1fr));
  }

  .igs-grid--list {
    grid-template-columns: 1fr;
  }

  .igs-card {
    display: grid;
    gap: 0.45rem;
    min-height: 44px;
    padding: 1rem 0.95rem;
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

  .igs-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--ing-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .igs-card.is-active {
    border-color: var(--ing-color, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--ing-color, var(--accent-color, var(--fs-store-primary))) 9%,
      var(--card-bg, #fff)
    );
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--ing-color, var(--accent-color, var(--fs-store-primary))) 18%, transparent),
      0 12px 28px rgba(90, 70, 40, 0.1);
    transform: translateY(-2px);
  }

  .igs-card:active {
    transform: translateY(0);
  }

  .igs-card__badge {
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    overflow: hidden;
    font-size: 1.1rem;
    font-weight: 800;
    color: var(--button-color, #fff);
    background: var(--ing-color, var(--accent-color, var(--fs-store-primary)));
  }

  .igs-card__badge img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .igs-card__name {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 800;
    line-height: 1.35;
  }

  .igs-card__teaser {
    margin: 0;
    font-size: 0.78rem;
    color: var(--muted-color, #6e6558);
    line-height: 1.55;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .igs-panel__head {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .igs-meta {
    display: grid;
    gap: 0.45rem;
  }

  .igs-meta__row {
    margin: 0;
    font-size: 0.88rem;
    line-height: 1.6;
  }

  .igs-meta__label {
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--accent-color, var(--fs-store-primary));
  }

  @media (min-width: 960px) {
    .igs-layout {
      grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
      align-items: start;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .igs-card {
      transition: none;
    }

    .igs-card:hover,
    .igs-card.is-active {
      transform: none;
    }
  }
`;
