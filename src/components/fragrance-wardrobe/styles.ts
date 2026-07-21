import { css } from 'lit';

export const componentStyles = css`
  :host {
    direction: inherit;
  }

  .fwd-cabinet {
    max-width: 980px;
    margin-inline: auto;
    padding: 1.15rem 1.2rem;
    border-radius: var(--section-radius, 20px);
    background: linear-gradient(
      165deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, var(--card-bg, #fff)) 0%,
      var(--card-bg, #fff) 42%,
      color-mix(in srgb, var(--border-color, #e6e0d6) 35%, var(--card-bg, #fff)) 100%
    );
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 22%, var(--border-color, #e6e0d6));
    box-shadow:
      inset 0 1px 0 color-mix(in srgb, var(--card-bg, #fff) 65%, transparent),
      0 14px 34px rgba(90, 70, 40, 0.1);
  }

  .fwd-grid {
    display: grid;
    gap: 0.75rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 720px) {
    .fwd-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .fwd-compartment {
    display: grid;
    gap: 0;
    min-height: 0;
  }

  .fwd-door {
    position: relative;
    display: grid;
    gap: 0.45rem;
    align-content: end;
    min-height: 7.5rem;
    padding: 1rem 0.85rem 1.05rem;
    border: 1.5px solid color-mix(in srgb, var(--slot-color, var(--accent-color, var(--fs-store-primary))) 30%, var(--border-color, #e6e0d6));
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    background: linear-gradient(
      180deg,
      color-mix(in srgb, var(--slot-color, var(--accent-color, var(--fs-store-primary))) 12%, var(--card-bg, #fff)),
      color-mix(in srgb, var(--slot-color, var(--accent-color, var(--fs-store-primary))) 4%, var(--card-bg, #fff))
    );
    color: var(--text-color, #1f1a14);
    text-align: start;
    cursor: pointer;
    transform-origin: left center;
    box-shadow:
      inset 0 -3px 0 color-mix(in srgb, var(--slot-color, var(--accent-color, var(--fs-store-primary))) 18%, transparent),
      0 6px 16px rgba(90, 70, 40, 0.08);
    transition:
      transform 0.28s ease,
      border-color 0.24s ease,
      box-shadow 0.24s ease;
  }

  .fwd-door:hover {
    transform: translateY(-2px);
    border-color: color-mix(in srgb, var(--slot-color, var(--accent-color, var(--fs-store-primary))) 55%, var(--border-color, #e6e0d6));
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .fwd-compartment.is-open .fwd-door {
    transform: perspective(720px) rotateY(-68deg);
    border-color: var(--slot-color, var(--accent-color, var(--fs-store-primary)));
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--slot-color, var(--accent-color, var(--fs-store-primary))) 18%, transparent),
      4px 0 16px rgba(90, 70, 40, 0.11);
  }

  .fwd-door__handle {
    position: absolute;
    inset-inline-end: 0.65rem;
    top: 50%;
    width: 0.35rem;
    height: 1.35rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--slot-color, var(--accent-color, var(--fs-store-primary))) 70%, var(--card-bg, #fff));
    transform: translateY(-50%);
    box-shadow: inset 0 1px 2px color-mix(in srgb, var(--text-color, #1f1a14) 15%, transparent);
  }

  .fwd-door__icon {
    width: 2.1rem;
    height: 2.1rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: color-mix(in srgb, var(--slot-color, var(--accent-color, var(--fs-store-primary))) 18%, var(--card-bg, #fff));
    color: var(--slot-color, var(--accent-color, var(--fs-store-primary)));
    font-size: 1rem;
    overflow: hidden;
  }

  .fwd-door__icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .fwd-door__name {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 800;
    line-height: 1.35;
  }

  .fwd-door__hint {
    margin: 0;
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    color: var(--muted-color, #6e6558);
  }

  .fwd-panel {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition:
      max-height 0.28s ease,
      opacity 0.24s ease,
      margin 0.24s ease;
    margin-top: 0;
  }

  .fwd-compartment.is-open .fwd-panel {
    max-height: 520px;
    opacity: 1;
    margin-top: 0.65rem;
  }

  .fwd-panel__inner {
    padding: 1.1rem 1.15rem;
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    border: 1px solid color-mix(in srgb, var(--slot-color, var(--accent-color, var(--fs-store-primary))) 24%, var(--border-color, #e6e0d6));
    background: var(--card-bg, #fff);
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.08);
  }

  .fwd-panel__media {
    margin-bottom: 0.75rem;
    border-radius: calc(var(--section-radius, 20px) * 0.55);
    overflow: hidden;
  }

  .fwd-panel__media img {
    display: block;
    width: 100%;
    max-height: 180px;
    object-fit: cover;
  }

  .fwd-panel__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    margin-top: 0.85rem;
  }

  .fwd-empty-hint {
    margin-top: 0.35rem;
    font-size: 0.82rem;
    color: var(--muted-color, #6e6558);
  }

  @media (prefers-reduced-motion: reduce) {
    .fwd-door,
    .fwd-panel {
      transition: none !important;
    }

    .fwd-door:hover {
      transform: none;
    }

    .fwd-compartment.is-open .fwd-door {
      transform: none;
      outline: 2px solid var(--slot-color, var(--accent-color, var(--fs-store-primary)));
    }

    .fwd-compartment.is-open .fwd-panel {
      max-height: none;
    }
  }
`;
