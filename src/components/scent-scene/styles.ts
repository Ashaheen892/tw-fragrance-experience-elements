import { css } from 'lit';

export const componentStyles = css`
  .ssc-shell {
    display: grid;
    gap: 1rem;
  }

  .ssc-stage {
    position: relative;
    overflow: hidden;
    min-height: clamp(18rem, 52vw, 28rem);
    border-radius: var(--section-radius, 20px);
    border: 1px solid var(--border-color, #e6e0d6);
    background: color-mix(in srgb, var(--scene-color, var(--accent-color, var(--fs-store-primary))) 12%, var(--card-bg, #fff));
    box-shadow: 0 14px 34px rgba(90, 70, 40, 0.11);
    transition:
      background 0.28s ease,
      border-color 0.28s ease;
  }

  .ssc-stage__bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    transform: scale(1.02);
    transition: opacity 0.28s ease, transform 0.28s ease;
  }

  .ssc-stage__bg.is-visible {
    opacity: 1;
  }

  .ssc-stage__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      color-mix(in srgb, var(--scene-color, var(--text-color, #1f1a14)) 15%, transparent) 0%,
      color-mix(in srgb, var(--scene-color, var(--text-color, #1f1a14)) 72%, transparent) 58%,
      color-mix(in srgb, var(--scene-color, var(--text-color, #1f1a14)) 88%, var(--text-color, #1f1a14)) 100%
    );
    pointer-events: none;
  }

  .ssc-stage__content {
    position: relative;
    z-index: 1;
    display: grid;
    align-content: end;
    gap: 0.65rem;
    min-height: inherit;
    padding: clamp(1.05rem, 3vw, 1.75rem);
    color: var(--card-bg, #fff);
  }

  .ssc-stage__eyebrow {
    margin: 0;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: color-mix(in srgb, var(--scene-accent, var(--accent-color, var(--fs-store-primary))) 85%, var(--card-bg, #fff));
  }

  .ssc-stage__title {
    margin: 0;
    font-size: clamp(1.35rem, 3vw, 2rem);
    font-weight: 800;
    line-height: 1.2;
    text-shadow: 0 8px 24px color-mix(in srgb, var(--text-color, #1f1a14) 35%, transparent);
  }

  .ssc-stage__character {
    margin: 0;
    font-size: clamp(0.95rem, 2vw, 1.1rem);
    font-weight: 800;
    color: color-mix(in srgb, var(--card-bg, #fff) 92%, var(--scene-accent, var(--accent-color, var(--fs-store-primary))));
  }

  .ssc-stage__desc {
    margin: 0;
    max-width: 42rem;
    line-height: 1.7;
    font-size: 0.94rem;
    color: color-mix(in srgb, var(--card-bg, #fff) 88%, transparent);
  }

  .ssc-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin-top: 0.15rem;
  }

  .ssc-tag {
    padding: 0.28rem 0.62rem;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    background: color-mix(in srgb, var(--scene-accent, var(--accent-color, var(--fs-store-primary))) 28%, color-mix(in srgb, var(--card-bg, #fff) 12%, transparent));
    border: 1px solid color-mix(in srgb, var(--card-bg, #fff) 22%, transparent);
    backdrop-filter: blur(6px);
  }

  .ssc-stage__actions {
    margin-top: 0.35rem;
  }

  .ssc-chips {
    display: flex;
    gap: 0.65rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x proximity;
    padding-bottom: 0.25rem;
  }

  .ssc-chip {
    flex: 0 0 auto;
    scroll-snap-align: start;
    display: grid;
    gap: 0.35rem;
    min-width: 7.5rem;
    min-height: 44px;
    padding: 0.85rem 0.95rem;
    border-radius: calc(var(--section-radius, 20px) * 0.72);
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

  .ssc-chip:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--chip-accent, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .ssc-chip.is-active {
    border-color: var(--chip-accent, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--chip-accent, var(--accent-color, var(--fs-store-primary))) 9%,
      var(--card-bg, #fff)
    );
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--chip-accent, var(--accent-color, var(--fs-store-primary))) 18%, transparent),
      0 12px 28px rgba(90, 70, 40, 0.1);
    transform: translateY(-2px);
  }

  .ssc-chip:active {
    transform: translateY(0);
  }

  .ssc-chip__swatch {
    width: 100%;
    height: 0.35rem;
    border-radius: 999px;
    background: var(--chip-accent, var(--accent-color, var(--fs-store-primary)));
  }

  .ssc-chip__name {
    font-size: 0.84rem;
    font-weight: 800;
    line-height: 1.35;
  }

  @media (min-width: 960px) {
    .ssc-chips {
      flex-wrap: wrap;
      overflow: visible;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ssc-stage,
    .ssc-stage__bg,
    .ssc-chip {
      transition: none !important;
    }

    .ssc-chip:hover,
    .ssc-chip.is-active {
      transform: none;
    }
  }
`;
