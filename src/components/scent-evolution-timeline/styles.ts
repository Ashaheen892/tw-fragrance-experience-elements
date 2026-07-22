import { css } from 'lit';

export const componentStyles = css`
  :host {
    direction: inherit;
  }

  .set-shell {
    display: grid;
    gap: 1rem;
  }

  .set-track {
    display: flex;
    gap: 0.65rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x proximity;
    padding-bottom: 0.35rem;
  }

  .set-track--vertical {
    flex-direction: column;
    overflow: visible;
    scroll-snap-type: none;
    padding-bottom: 0;
  }

  .set-step {
    flex: 0 0 auto;
    min-width: 8.5rem;
    scroll-snap-align: start;
    display: grid;
    gap: 0.45rem;
    min-height: 44px;
    padding: 0.95rem 1.05rem;
    border-radius: calc(var(--section-radius, 20px) * 0.85);
    border: 1.5px solid color-mix(in srgb, var(--border-color, #e6e0d6) 80%, transparent);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    text-align: start;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.05);
    transition:
      border-color 0.24s ease,
      box-shadow 0.24s ease,
      transform 0.24s ease,
      background 0.24s ease;
  }

  .set-track--vertical .set-step {
    min-width: 0;
    grid-template-columns: auto 1fr;
    align-items: center;
  }

  .set-step:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--step-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .set-step.is-active {
    border-color: var(--step-color, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--step-color, var(--accent-color, var(--fs-store-primary))) 9%,
      var(--card-bg, #fff)
    );
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--step-color, var(--accent-color, var(--fs-store-primary))) 18%, transparent),
      0 12px 28px rgba(90, 70, 40, 0.1);
    transform: translateY(-2px);
  }

  .set-step:active {
    transform: translateY(0);
  }

  .set-step__dot {
    width: 0.85rem;
    height: 0.85rem;
    border-radius: 50%;
    background: var(--step-color, var(--accent-color, var(--fs-store-primary)));
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--step-color, var(--accent-color, var(--fs-store-primary))) 18%, transparent);
  }

  .set-step__label {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 800;
    line-height: 1.35;
  }

  .set-step__time {
    margin: 0;
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    color: var(--muted-color, #666666);
  }

  .set-detail {
    position: relative;
    overflow: hidden;
    min-height: 10rem;
  }

  .set-detail__bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.22;
    pointer-events: none;
  }

  .set-detail__bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      color-mix(in srgb, var(--card-bg, #fff) 15%, transparent),
      var(--card-bg, #fff)
    );
  }

  .set-detail__body {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 0.55rem;
  }

  .set-detail__time {
    margin: 0;
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--accent-color, var(--fs-store-primary));
  }

  @media (min-width: 960px) {
    .set-shell--vertical {
      grid-template-columns: minmax(0, 280px) minmax(0, 1fr);
      align-items: start;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .set-step {
      transition: none;
    }

    .set-step:hover,
    .set-step.is-active {
      transform: none;
    }
  }
`;
