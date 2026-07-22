import { css } from 'lit';

export const componentStyles = css`
  :host {
    direction: inherit;
  }

  .sba-tabs {
    display: flex;
    justify-content: center;
    gap: 0.65rem;
    margin-bottom: 1.15rem;
    flex-wrap: wrap;
  }

  .sba-tab {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    min-height: 44px;
    padding: 0.45rem 1rem;
    border: 1.5px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 30%, var(--border-color, #e6e0d6));
    border-radius: 999px;
    background: transparent;
    color: var(--muted-color, #666666);
    font: inherit;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    cursor: pointer;
    transition:
      border-color 0.24s ease,
      color 0.24s ease,
      background 0.24s ease,
      transform 0.24s ease,
      box-shadow 0.24s ease;
  }

  .sba-tab:hover {
    transform: translateY(-2px);
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e6e0d6));
    box-shadow: 0 8px 18px rgba(90, 70, 40, 0.08);
  }

  .sba-tab.is-active {
    border-color: var(--accent-color, var(--fs-store-primary));
    color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 9%, var(--card-bg, #fff));
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 18%, transparent),
      0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .sba-compare {
    position: relative;
    overflow: hidden;
    border-radius: var(--section-radius, 20px);
    border: 1px solid var(--border-color, #e6e0d6);
    box-shadow: 0 14px 34px rgba(90, 70, 40, 0.1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: none;
    aspect-ratio: 16 / 10;
    max-height: 560px;
    width: 100%;
    background: var(--text-color, #1f1a14);
  }

  .sba-compare__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    pointer-events: none;
  }

  .sba-compare__before {
    z-index: 1;
  }

  .sba-compare__after {
    z-index: 0;
  }

  .sba-compare--vertical .sba-compare__before {
    clip-path: inset(0 calc(100% - var(--sba-pos, 50%)) 0 0);
  }

  .sba-compare--horizontal .sba-compare__before {
    clip-path: inset(0 0 calc(100% - var(--sba-pos, 50%)) 0);
  }

  .sba-handle {
    position: absolute;
    z-index: 6;
    display: grid;
    place-items: center;
    touch-action: none;
  }

  .sba-compare--vertical .sba-handle {
    top: 0;
    bottom: 0;
    width: 2.75rem;
    left: var(--sba-pos, 50%);
    transform: translateX(-50%);
    cursor: ew-resize;
  }

  .sba-compare--horizontal .sba-handle {
    left: 0;
    right: 0;
    height: 2.75rem;
    top: var(--sba-pos, 50%);
    transform: translateY(-50%);
    cursor: ns-resize;
  }

  .sba-handle__rail {
    position: absolute;
    inset: 0;
    margin: auto;
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, transparent);
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 55%, transparent);
    pointer-events: none;
  }

  .sba-compare--vertical .sba-handle__rail {
    width: 3px;
    height: 100%;
  }

  .sba-compare--horizontal .sba-handle__rail {
    height: 3px;
    width: 100%;
  }

  .sba-handle__grip {
    position: relative;
    z-index: 1;
    width: 2.75rem;
    height: 2.75rem;
    min-width: 44px;
    min-height: 44px;
    border-radius: 50%;
    border: 2px solid var(--accent-color, var(--fs-store-primary));
    background: var(--card-bg, #fff);
    color: var(--accent-color, var(--fs-store-primary));
    display: grid;
    place-items: center;
    box-shadow:
      0 0 0 4px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 16%, transparent),
      0 8px 20px rgba(90, 70, 40, 0.28);
    transition: transform 0.22s ease, box-shadow 0.22s ease;
  }

  .sba-handle:hover .sba-handle__grip,
  .sba-handle:focus-visible .sba-handle__grip {
    transform: scale(1.08);
    box-shadow:
      0 0 0 5px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 22%, transparent),
      0 10px 24px rgba(90, 70, 40, 0.32);
  }

  .sba-handle__svg {
    width: 1.15rem;
    height: 1.15rem;
    display: block;
  }

  .sba-label {
    position: absolute;
    z-index: 4;
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--text-color, #1f1a14) 65%, transparent);
    backdrop-filter: blur(4px);
    color: var(--card-bg, #fff);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    pointer-events: none;
  }

  .sba-label--before {
    bottom: 1rem;
    inset-inline-start: 1rem;
  }

  .sba-label--after {
    bottom: 1rem;
    inset-inline-end: 1rem;
  }

  .sba-compare--horizontal .sba-label--before {
    top: 1rem;
    bottom: auto;
    inset-inline-start: 1rem;
  }

  .sba-compare--horizontal .sba-label--after {
    bottom: 1rem;
    inset-inline-start: 1rem;
  }

  .sba-caption {
    margin: 0.85rem 0 0;
    text-align: center;
    color: var(--muted-color, #666666);
    font-size: 0.88rem;
    line-height: 1.55;
    font-style: italic;
  }

  @media (max-width: 639px) {
    .sba-compare {
      aspect-ratio: 4 / 3;
      max-height: 380px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .sba-tab,
    .sba-handle__grip {
      transition: none;
    }

    .sba-tab:hover {
      transform: none;
    }

    .sba-handle:hover .sba-handle__grip,
    .sba-handle:focus-visible .sba-handle__grip {
      transform: none;
    }
  }
`;
