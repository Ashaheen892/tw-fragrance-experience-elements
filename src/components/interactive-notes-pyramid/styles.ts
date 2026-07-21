import { css } from 'lit';

export const componentStyles = css`
  .inp-pyramid {
    display: grid;
    gap: 0.65rem;
    max-width: 720px;
    margin-inline: auto;
  }

  .inp-tier {
    border: 1.5px solid var(--border-color, #e6e0d6);
    border-radius: calc(var(--section-radius, 20px) * 0.85);
    background: var(--card-bg, #fff);
    overflow: hidden;
    box-shadow: 0 6px 16px rgba(90, 70, 40, 0.07);
    transition:
      border-color 0.24s ease,
      box-shadow 0.24s ease,
      transform 0.24s ease;
  }

  .inp-tier:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .inp-tier.is-open {
    border-color: color-mix(in srgb, var(--tier-color, var(--accent-color, var(--fs-store-primary))) 42%, var(--border-color, #e6e0d6));
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--tier-color, var(--accent-color, var(--fs-store-primary))) 18%, transparent),
      0 12px 28px rgba(90, 70, 40, 0.1);
    transform: translateY(-2px);
  }

  .inp-tier__toggle {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    min-height: 56px;
    padding: 0.85rem 1rem;
    border: none;
    background: transparent;
    color: var(--text-color, #1f1a14);
    font: inherit;
    text-align: start;
    cursor: pointer;
  }

  .inp-tier__badge {
    width: 2.35rem;
    height: 2.35rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: color-mix(in srgb, var(--tier-color, var(--accent-color, var(--fs-store-primary))) 16%, var(--card-bg, #fff));
    color: var(--tier-color, var(--accent-color, var(--fs-store-primary)));
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.04em;
  }

  .inp-tier__meta {
    min-width: 0;
  }

  .inp-tier__label {
    display: block;
    font-size: 0.95rem;
    font-weight: 800;
    line-height: 1.25;
  }

  .inp-tier__desc {
    margin: 0.15rem 0 0;
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    color: var(--muted-color, #6e6558);
    line-height: 1.45;
  }

  .inp-tier__chevron {
    font-size: 1.1rem;
    color: var(--muted-color, #6e6558);
    transition: transform 0.24s ease, color 0.24s ease;
  }

  .inp-tier.is-open .inp-tier__chevron {
    transform: rotate(180deg);
    color: var(--tier-color, var(--accent-color, var(--fs-store-primary)));
  }

  .inp-tier__panel {
    display: grid;
    gap: 0.65rem;
    padding: 0 1rem 1rem;
  }

  .inp-note {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.65rem;
    align-items: start;
    padding: 0.75rem 0.85rem;
    border-radius: calc(var(--section-radius, 20px) * 0.55);
    background: color-mix(in srgb, var(--tier-color, var(--accent-color, var(--fs-store-primary))) 6%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--tier-color, var(--accent-color, var(--fs-store-primary))) 18%, var(--border-color, #e6e0d6));
  }

  .inp-note__icon {
    width: 2rem;
    height: 2rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: color-mix(in srgb, var(--tier-color, var(--accent-color, var(--fs-store-primary))) 14%, var(--card-bg, #fff));
    color: var(--tier-color, var(--accent-color, var(--fs-store-primary)));
    font-size: 0.85rem;
    overflow: hidden;
  }

  .inp-note__icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .inp-note__name {
    margin: 0;
    font-size: 0.88rem;
    font-weight: 800;
    line-height: 1.35;
  }

  .inp-note__desc {
    margin: 0.15rem 0 0;
    font-size: 0.78rem;
    color: var(--muted-color, #6e6558);
    line-height: 1.5;
  }

  .inp-tier__empty {
    margin: 0;
    padding: 0.5rem 0.2rem;
    font-size: 0.82rem;
    color: var(--muted-color, #6e6558);
  }

  @media (prefers-reduced-motion: reduce) {
    .inp-tier,
    .inp-tier__chevron {
      transition: none !important;
    }

    .inp-tier:hover,
    .inp-tier.is-open {
      transform: none;
    }
  }
`;
