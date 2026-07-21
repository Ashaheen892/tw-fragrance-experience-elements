import { css } from 'lit';

export const componentStyles = css`
  :host {
    direction: inherit;
  }

  .smc-shell {
    display: grid;
    gap: 1rem;
  }

  .smc-board {
    position: relative;
    aspect-ratio: 1;
    border-radius: var(--section-radius, 20px);
    border: 1px solid var(--border-color, #e6e0d6);
    background:
      linear-gradient(
        to right,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, var(--card-bg, #fff)) 0%,
        var(--card-bg, #fff) 50%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff)) 100%
      ),
      linear-gradient(
        to bottom,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 5%, var(--card-bg, #fff)) 0%,
        var(--card-bg, #fff) 50%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, var(--card-bg, #fff)) 100%
      );
    box-shadow: 0 12px 32px rgba(90, 70, 40, 0.08);
    overflow: hidden;
  }

  .smc-axis {
    position: absolute;
    background: color-mix(in srgb, var(--border-color, #e6e0d6) 70%, transparent);
    pointer-events: none;
  }

  .smc-axis--x {
    top: 50%;
    left: 8%;
    right: 8%;
    height: 1px;
    transform: translateY(-50%);
  }

  .smc-axis--y {
    left: 50%;
    top: 8%;
    bottom: 8%;
    width: 1px;
    transform: translateX(-50%);
  }

  .smc-label {
    position: absolute;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--muted-color, #6e6558);
    pointer-events: none;
  }

  .smc-label--left {
    left: 0.65rem;
    top: 50%;
    transform: translateY(-50%);
  }

  .smc-label--right {
    right: 0.65rem;
    top: 50%;
    transform: translateY(-50%);
    text-align: end;
  }

  .smc-label--top {
    top: 0.55rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .smc-label--bottom {
    bottom: 0.55rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .smc-point {
    position: absolute;
    width: 2.75rem;
    height: 2.75rem;
    min-width: 44px;
    min-height: 44px;
    border-radius: 50%;
    border: 2px solid var(--card-bg, #fff);
    background: var(--point-color, var(--accent-color, var(--fs-store-primary)));
    color: var(--button-color, #fff);
    font-size: 0.68rem;
    font-weight: 800;
    display: grid;
    place-items: center;
    cursor: pointer;
    transform: translate(-50%, -50%);
    box-shadow: 0 8px 18px rgba(90, 70, 40, 0.14);
    transition:
      transform 0.24s ease,
      box-shadow 0.24s ease;
  }

  .smc-point:hover {
    transform: translate(-50%, calc(-50% - 2px));
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.16);
  }

  .smc-point.is-active {
    transform: translate(-50%, calc(-50% - 2px)) scale(1.06);
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--point-color, var(--accent-color, var(--fs-store-primary))) 18%, transparent),
      0 12px 28px rgba(90, 70, 40, 0.18);
  }

  .smc-panel__coords {
    margin: 0;
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted-color, #6e6558);
  }

  @media (min-width: 960px) {
    .smc-shell {
      grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
      align-items: start;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .smc-point {
      transition: none;
    }

    .smc-point:hover,
    .smc-point.is-active {
      transform: translate(-50%, -50%);
    }
  }
`;
