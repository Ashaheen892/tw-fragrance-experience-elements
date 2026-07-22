import { css } from 'lit';

export const componentStyles = css`
  .fll-grid {
    display: grid;
    gap: 0.85rem;
    grid-template-columns: minmax(0, 1fr);
  }

  @media (min-width: 640px) {
    .fll-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 960px) {
    .fll-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .fll-card {
    display: grid;
    gap: 0.75rem;
    padding: 1rem 0.95rem;
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    background: var(--card-bg, #fff);
    border: 1.5px solid color-mix(in srgb, var(--recipe-color, var(--accent-color, var(--fs-store-primary))) 22%, var(--border-color, #e6e0d6));
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.05);
    transition:
      transform 0.22s ease,
      border-color 0.22s ease,
      box-shadow 0.22s ease;
  }

  .fll-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--recipe-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .fll-card__title {
    margin: 0;
    font-size: 0.98rem;
    font-weight: 800;
    line-height: 1.35;
    color: var(--recipe-color, var(--accent-color, var(--fs-store-primary)));
  }

  .fll-formula {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.35rem 0.45rem;
    font-size: 0.82rem;
    font-weight: 700;
    line-height: 1.4;
  }

  .fll-note {
    padding: 0.28rem 0.55rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--recipe-color, var(--accent-color, var(--fs-store-primary))) 10%, #fff);
    border: 1px solid color-mix(in srgb, var(--recipe-color, var(--accent-color, var(--fs-store-primary))) 24%, var(--border-color, #e6e0d6));
  }

  .fll-op {
    color: var(--muted-color, #666666);
    font-weight: 800;
  }

  .fll-result {
    padding: 0.55rem 0.65rem;
    border-radius: 12px;
    background: color-mix(in srgb, var(--recipe-color, var(--accent-color, var(--fs-store-primary))) 8%, var(--card-bg, #fff));
    font-size: 0.88rem;
    font-weight: 800;
    line-height: 1.45;
  }

  .fll-meta {
    display: grid;
    gap: 0.45rem;
  }

  .fll-meta__row {
    display: grid;
    gap: 0.15rem;
  }

  .fll-meta__label {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    color: var(--muted-color, #666666);
  }

  .fll-meta__value {
    margin: 0;
    font-size: 0.84rem;
    line-height: 1.55;
    color: var(--text-color, #000000);
  }

  @media (prefers-reduced-motion: reduce) {
    .fll-card {
      transition: none !important;
    }

    .fll-card:hover {
      transform: none;
    }
  }
`;
