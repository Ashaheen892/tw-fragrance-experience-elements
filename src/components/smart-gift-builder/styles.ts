import { css } from 'lit';

export const componentStyles = css`
  .sgb-shell {
    display: grid;
    gap: clamp(1rem, 2.5vw, 1.35rem);
    max-width: 920px;
    margin-inline: auto;
  }

  .sgb-step {
    display: grid;
    gap: 1rem;
  }

  .sgb-step__title {
    margin: 0;
    font-size: clamp(1.05rem, 2.2vw, 1.25rem);
    font-weight: 800;
    text-align: center;
  }

  .sgb-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.65rem;
  }

  @media (min-width: 640px) {
    .sgb-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.75rem;
    }
  }

  .sgb-card {
    display: grid;
    gap: 0.35rem;
    min-height: 96px;
    padding: 0.85rem 0.75rem;
    border: 1.5px solid var(--border-color, #e6e0d6);
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    background: var(--card-bg, #fff);
    text-align: center;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.05);
    transition:
      transform 0.22s ease,
      border-color 0.22s ease,
      box-shadow 0.22s ease,
      background 0.22s ease;
  }

  .sgb-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .sgb-card.is-active {
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

  .sgb-card:active {
    transform: translateY(0);
  }

  .sgb-card__icon {
    font-size: 1.35rem;
    line-height: 1;
  }

  .sgb-card__name {
    font-size: 0.88rem;
    font-weight: 800;
    line-height: 1.35;
  }

  .sgb-card__desc,
  .sgb-card__range {
    margin: 0;
    font-size: 0.74rem;
    color: var(--muted-color, #666666);
    line-height: 1.45;
  }

  .sgb-list {
    display: grid;
    gap: 0.55rem;
  }

  .sgb-option {
    display: grid;
    gap: 0.15rem;
    padding: 0.85rem 1rem;
    border: 1.5px solid var(--border-color, #e6e0d6);
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    background: var(--card-bg, #fff);
    text-align: start;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.05);
    transition:
      transform 0.22s ease,
      border-color 0.22s ease,
      box-shadow 0.22s ease,
      background 0.22s ease;
  }

  .sgb-option:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .sgb-option.is-active {
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

  .sgb-option:active {
    transform: translateY(0);
  }

  .sgb-option__label {
    font-size: 0.94rem;
    font-weight: 800;
  }

  .sgb-option__range {
    margin: 0;
    font-size: 0.8rem;
    color: var(--muted-color, #666666);
  }

  .sgb-step__empty {
    padding: 1rem;
    border-radius: calc(var(--section-radius, 20px) * 0.7);
    border: 1px dashed var(--border-color, #e6e0d6);
    text-align: center;
    color: var(--muted-color, #666666);
    font-size: 0.88rem;
  }

  .sgb-shell .fs-nav .fs-btn:not(.fs-btn--ghost):disabled {
    opacity: 0.45;
    filter: grayscale(0.12);
    box-shadow: none;
    transform: none;
    cursor: not-allowed;
  }

  .sgb-result {
    padding: 0;
    border-radius: var(--section-radius, 20px);
    border: 1px solid color-mix(in srgb, var(--gift-accent, var(--accent-color, var(--fs-store-primary))) 24%, var(--border-color, #e6e0d6));
    box-shadow: 0 14px 36px rgba(90, 70, 40, 0.1);
  }

  .sgb-result__box {
    width: 100%;
    height: 0.55rem;
    border-radius: 999px;
    background: var(--gift-accent, var(--accent-color, var(--fs-store-primary)));
  }

  .sgb-result__title {
    margin: 0;
    font-size: clamp(1.1rem, 2.3vw, 1.4rem);
    font-weight: 800;
  }

  .sgb-result__block {
    display: grid;
    gap: 0.25rem;
    padding: 0.75rem 0.85rem;
    border-radius: 12px;
    background: color-mix(in srgb, var(--gift-accent, var(--accent-color, var(--fs-store-primary))) 7%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--gift-accent, var(--accent-color, var(--fs-store-primary))) 16%, var(--border-color, #e6e0d6));
  }

  .sgb-result__label {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    color: var(--gift-accent, var(--accent-color, var(--fs-store-primary)));
  }

  .sgb-result__text {
    margin: 0;
    line-height: 1.65;
    font-size: 0.92rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .sgb-card,
    .sgb-option {
      transition: none !important;
    }

    .sgb-card:hover,
    .sgb-option:hover {
      transform: none;
    }
  }
`;
