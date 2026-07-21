import { css } from 'lit';

export const componentStyles = css`
  .spa-shell {
    display: grid;
    gap: clamp(1rem, 2.5vw, 1.35rem);
    max-width: 920px;
    margin-inline: auto;
  }

  .spa-step {
    display: grid;
    gap: 1rem;
  }

  .spa-step__title {
    margin: 0;
    font-size: clamp(1.05rem, 2.2vw, 1.25rem);
    font-weight: 800;
    text-align: center;
  }

  .spa-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.65rem;
  }

  @media (min-width: 640px) {
    .spa-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.75rem;
    }
  }

  .spa-chip {
    display: grid;
    gap: 0.35rem;
    min-height: 96px;
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

  .spa-chip:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .spa-chip.is-active {
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

  .spa-chip:active {
    transform: translateY(0);
  }

  .spa-chip__icon {
    width: 2rem;
    height: 2rem;
    margin-inline: auto;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: color-mix(in srgb, var(--item-color, var(--accent-color, var(--fs-store-primary))) 14%, #fff);
    color: var(--item-color, var(--accent-color, var(--fs-store-primary)));
    font-size: 1rem;
    overflow: hidden;
  }

  .spa-chip__icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .spa-chip__name {
    font-size: 0.86rem;
    font-weight: 800;
    line-height: 1.35;
  }

  .spa-list {
    display: grid;
    gap: 0.55rem;
  }

  .spa-option {
    display: grid;
    gap: 0.2rem;
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

  .spa-option:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .spa-option.is-active {
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

  .spa-option:active {
    transform: translateY(0);
  }

  .spa-option__name {
    font-size: 0.94rem;
    font-weight: 800;
  }

  .spa-option__desc {
    margin: 0;
    font-size: 0.8rem;
    color: var(--muted-color, #6e6558);
    line-height: 1.55;
  }

  .spa-step__empty {
    padding: 1rem;
    border-radius: calc(var(--section-radius, 20px) * 0.7);
    border: 1px dashed var(--border-color, #e6e0d6);
    text-align: center;
    color: var(--muted-color, #6e6558);
    font-size: 0.88rem;
  }

  .spa-shell .fs-nav .fs-btn:not(.fs-btn--ghost):disabled {
    opacity: 0.45;
    filter: grayscale(0.12);
    box-shadow: none;
    transform: none;
    cursor: not-allowed;
  }

  .spa-passport {
    position: relative;
    overflow: hidden;
    padding: 0;
    border-radius: calc(var(--section-radius, 20px) * 1.05);
    background:
      linear-gradient(
        145deg,
        color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 18%, #fff) 0%,
        var(--card-bg, #fff) 42%,
        color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 8%, var(--card-bg, #fff)) 100%
      );
    border: 1px solid color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 28%, var(--border-color, #e6e0d6));
    box-shadow:
      0 18px 42px rgba(90, 70, 40, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.65);
  }

  .spa-passport::before {
    content: '';
    position: absolute;
    inset: 0 auto 0 0;
    width: 5px;
    background: linear-gradient(
      180deg,
      var(--passport-accent, var(--accent-color, var(--fs-store-primary))),
      color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 55%, #fff)
    );
  }

  .spa-passport__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 22%, var(--border-color, #e6e0d6));
  }

  .spa-passport__brand {
    margin: 0;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--passport-accent, var(--accent-color, var(--fs-store-primary)));
  }

  .spa-passport__seal {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 1.1rem;
    background: color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 16%, #fff);
    border: 1px solid color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 35%, transparent);
  }

  .spa-passport__title {
    margin: 0 0 0.35rem;
    font-size: clamp(1.2rem, 2.5vw, 1.55rem);
    font-weight: 800;
    line-height: 1.25;
  }

  .spa-passport__holder {
    margin: 0 0 1rem;
    font-size: 0.82rem;
    color: var(--muted-color, #6e6558);
  }

  .spa-passport__grid {
    display: grid;
    gap: 0.65rem;
  }

  .spa-passport__row {
    display: grid;
    gap: 0.2rem;
    padding: 0.65rem 0.75rem;
    border-radius: 12px;
    background: color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 6%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 14%, var(--border-color, #e6e0d6));
  }

  .spa-passport__label {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    color: var(--passport-accent, var(--accent-color, var(--fs-store-primary)));
  }

  .spa-passport__value {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.55;
  }

  .spa-passport__summary {
    margin: 0.85rem 0 0;
    padding-top: 0.85rem;
    border-top: 1px dashed color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 25%, var(--border-color, #e6e0d6));
    color: var(--muted-color, #6e6558);
    line-height: 1.7;
    font-size: 0.92rem;
  }

  .spa-toast {
    margin: 0;
    text-align: center;
    font-size: 0.82rem;
    color: var(--accent-color, var(--fs-store-primary));
    font-weight: 700;
  }

  @media (prefers-reduced-motion: reduce) {
    .spa-chip,
    .spa-option {
      transition: none !important;
    }

    .spa-chip:hover,
    .spa-option:hover,
    .spa-option.is-active {
      transform: none;
    }
  }
`;
