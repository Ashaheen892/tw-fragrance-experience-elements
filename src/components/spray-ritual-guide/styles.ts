import { css } from 'lit';

export const componentStyles = css`
  :host {
    direction: inherit;
  }

  .srg-shell {
    display: grid;
    gap: 1rem;
  }

  .srg-body-wrap {
    border-radius: var(--section-radius, 20px);
    border: 1px solid var(--border-color, #e6e0d6);
    background: var(--card-bg, #fff);
    padding: 1.05rem 1.1rem;
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.08);
  }

  .srg-body {
    position: relative;
    aspect-ratio: 2 / 3;
    max-width: 16rem;
    margin: 0 auto;
    border-radius: calc(var(--section-radius, 20px) * 0.75);
    background:
      radial-gradient(
        80% 70% at 50% 18%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff)),
        transparent 70%
      ),
      linear-gradient(
        180deg,
        color-mix(in srgb, var(--border-color, #e6e0d6) 35%, var(--card-bg, #fff)),
        var(--card-bg, #fff)
      );
    overflow: hidden;
  }

  .srg-body__silhouette {
    position: absolute;
    inset: 8% 22%;
    border-radius: 45% 45% 38% 38%;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, var(--card-bg, #fff));
    border: 1px dashed color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, var(--border-color, #e6e0d6));
  }

  .srg-dot {
    position: absolute;
    width: 2.75rem;
    height: 2.75rem;
    min-width: 44px;
    min-height: 44px;
    border-radius: 50%;
    border: 2px solid var(--card-bg, #fff);
    background: var(--accent-color, var(--fs-store-primary));
    color: var(--button-color, #fff);
    font-size: 0.62rem;
    font-weight: 800;
    display: grid;
    place-items: center;
    cursor: pointer;
    transform: translate(-50%, -50%);
    box-shadow: 0 6px 14px rgba(90, 70, 40, 0.14);
    transition: transform 0.24s ease, box-shadow 0.24s ease;
  }

  .srg-dot:hover {
    transform: translate(-50%, calc(-50% - 2px));
    box-shadow: 0 10px 22px rgba(90, 70, 40, 0.16);
  }

  .srg-dot.is-active {
    transform: translate(-50%, calc(-50% - 2px)) scale(1.06);
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 18%, transparent),
      0 10px 22px rgba(90, 70, 40, 0.18);
  }

  .srg-zone-tip {
    margin: 0.65rem 0 0;
    padding: 0.85rem 0.95rem;
    border-radius: calc(var(--section-radius, 20px) * 0.55);
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 20%, var(--border-color, #e6e0d6));
    font-size: 0.86rem;
    line-height: 1.55;
    color: var(--text-color, #000000);
  }

  .srg-zone-tip__label {
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .srg-cards {
    display: grid;
    gap: 0.65rem;
  }

  .srg-card {
    display: grid;
    gap: 0.55rem;
    min-height: 44px;
    padding: 1.05rem 1.1rem;
    border-radius: calc(var(--section-radius, 20px) * 0.85);
    border: 1.5px solid color-mix(in srgb, var(--border-color, #e6e0d6) 82%, transparent);
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

  .srg-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--rit-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .srg-card.is-active {
    border-color: var(--rit-color, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--rit-color, var(--accent-color, var(--fs-store-primary))) 9%,
      var(--card-bg, #fff)
    );
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--rit-color, var(--accent-color, var(--fs-store-primary))) 18%, transparent),
      0 12px 28px rgba(90, 70, 40, 0.1);
    transform: translateY(-2px);
  }

  .srg-card:active {
    transform: translateY(0);
  }

  .srg-card__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.65rem;
  }

  .srg-card__name {
    margin: 0;
    font-size: 0.96rem;
    font-weight: 800;
  }

  .srg-card__intensity {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    padding: 0.2rem 0.55rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--rit-color, var(--accent-color, var(--fs-store-primary))) 14%, var(--card-bg, #fff));
    color: var(--rit-color, var(--accent-color, var(--fs-store-primary)));
  }

  .srg-card__meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem 0.75rem;
    font-size: 0.82rem;
    color: var(--muted-color, #666666);
  }

  .srg-card__meta-label {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--text-color, #000000);
  }

  .srg-card__tips {
    margin: 0;
    font-size: 0.86rem;
    line-height: 1.6;
    color: var(--muted-color, #666666);
  }

  @media (min-width: 960px) {
    .srg-shell {
      grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
      align-items: start;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .srg-card,
    .srg-dot {
      transition: none;
    }

    .srg-card:hover,
    .srg-card.is-active,
    .srg-dot:hover,
    .srg-dot.is-active {
      transform: none;
    }
  }
`;
