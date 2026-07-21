import { css } from 'lit';

export const componentStyles = css`
  .spf-shell {
    display: grid;
    gap: 1.35rem;
    max-width: 960px;
    margin-inline: auto;
  }

  .spf-selector__label {
    margin: 0;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    color: var(--muted-color, #6e6558);
    text-align: center;
  }

  .spf-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.65rem;
  }

  @media (min-width: 640px) {
    .spf-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.75rem;
    }
  }

  .spf-card {
    display: grid;
    gap: 0.45rem;
    min-height: 118px;
    padding: 0.85rem 0.75rem;
    border: 1.5px solid var(--border-color, #e6e0d6);
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    background: var(--card-bg, #fff);
    color: var(--text-color, #1f1a14);
    font: inherit;
    text-align: center;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.05);
    transition:
      transform 0.22s ease,
      border-color 0.22s ease,
      box-shadow 0.22s ease,
      background 0.22s ease;
  }

  .spf-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .spf-card.is-active {
    border-color: var(--item-color, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 9%,
      var(--card-bg, #fff)
    );
    box-shadow:
      0 0 0 3px color-mix(
        in srgb,
        var(--item-color, var(--accent-color, var(--fs-store-primary))) 18%,
        transparent
      ),
      0 12px 28px rgba(90, 70, 40, 0.1);
  }

  .spf-card:active {
    transform: translateY(0);
  }

  .spf-card__icon {
    width: 2.4rem;
    height: 2.4rem;
    margin-inline: auto;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: color-mix(in srgb, var(--item-color, var(--accent-color, var(--fs-store-primary))) 14%, #fff);
    color: var(--item-color, var(--accent-color, var(--fs-store-primary)));
    font-size: 1.1rem;
    overflow: hidden;
  }

  .spf-card__icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .spf-card__name {
    font-size: 0.92rem;
    font-weight: 800;
    line-height: 1.3;
  }

  .spf-card__desc {
    margin: 0;
    font-size: 0.76rem;
    color: var(--muted-color, #6e6558);
    line-height: 1.45;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .spf-result {
    padding: 1.15rem 1.1rem;
    border-radius: var(--section-radius, 20px);
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--item-color, var(--accent-color, var(--fs-store-primary))) 24%, var(--border-color, #e6e0d6));
    box-shadow: 0 12px 32px rgba(90, 70, 40, 0.08);
    animation: spf-fade-in 0.35s ease;
  }

  @keyframes spf-fade-in {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .spf-result__eyebrow {
    margin: 0 0 0.35rem;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    color: var(--item-color, var(--accent-color, var(--fs-store-primary)));
  }

  .spf-result__title {
    margin: 0 0 0.55rem;
    font-size: clamp(1.15rem, 2.4vw, 1.45rem);
    font-weight: 800;
    line-height: 1.3;
  }

  .spf-result__desc {
    margin: 0;
    color: var(--muted-color, #6e6558);
    font-size: 0.92rem;
    line-height: 1.65;
  }

  .spf-result__actions {
    margin-top: 1rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .spf-card,
    .spf-result {
      transition: none !important;
      animation: none !important;
    }

    .spf-card:hover {
      transform: none;
    }
  }
`;
