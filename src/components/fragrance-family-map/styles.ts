import { css } from 'lit';

export const componentStyles = css`
  .ffm-shell {
    display: grid;
    gap: 1rem;
    align-items: start;
    max-width: 1080px;
    margin-inline: auto;
  }

  @media (min-width: 900px) {
    .ffm-shell {
      grid-template-columns: minmax(240px, 0.9fr) minmax(0, 1.2fr);
      gap: 1.15rem;
    }
  }

  .ffm-selector {
    padding: 1.1rem 1.15rem;
    border-radius: var(--section-radius, 20px);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, var(--section-bg, transparent));
    border: 1px solid color-mix(in srgb, var(--border-color, #e6e0d6) 88%, #fff);
    box-shadow: 0 10px 28px rgba(90, 70, 40, 0.08);
  }

  .ffm-selector__label {
    margin: 0 0 0.75rem;
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted-color, #666666);
  }

  .ffm-chips {
    display: grid;
    gap: 0.65rem;
  }

  .ffm-chips--grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 900px) {
    .ffm-chips--grid {
      grid-template-columns: 1fr;
    }
  }

  .ffm-chip {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.65rem;
    min-height: 52px;
    padding: 0.65rem 0.85rem;
    border: 1.5px solid var(--border-color, #e6e0d6);
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    text-align: start;
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.05);
    transition:
      transform 0.24s ease,
      border-color 0.24s ease,
      box-shadow 0.24s ease,
      background 0.24s ease;
  }

  .ffm-chip:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--fam-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .ffm-chip.is-active {
    border-color: var(--fam-color, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--fam-color, var(--accent-color, var(--fs-store-primary))) 9%,
      var(--card-bg, #fff)
    );
    box-shadow:
      0 0 0 3px color-mix(
        in srgb,
        var(--fam-color, var(--accent-color, var(--fs-store-primary))) 18%,
        transparent
      ),
      0 12px 28px rgba(90, 70, 40, 0.1);
  }

  .ffm-chip:active {
    transform: translateY(0);
  }

  .ffm-chip__swatch {
    width: 2.15rem;
    height: 2.15rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--fam-color, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
    font-size: 1rem;
    overflow: hidden;
  }

  .ffm-chip__swatch img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .ffm-chip__name {
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ffm-chip__dot {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: transparent;
    box-shadow: inset 0 0 0 1.5px color-mix(in srgb, var(--muted-color, #6e6558) 55%, transparent);
  }

  .ffm-chip.is-active .ffm-chip__dot {
    background: var(--fam-color, var(--accent-color, var(--fs-store-primary)));
    box-shadow: none;
  }

  .ffm-chips--wheel {
    position: relative;
    min-height: 280px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0.65rem;
    padding: 1.5rem 0.5rem;
  }

  .ffm-wheel-core {
    position: absolute;
    inset: 50% auto auto 50%;
    transform: translate(-50%, -50%);
    width: 4.5rem;
    height: 4.5rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, var(--border-color, #e6e0d6));
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    color: var(--accent-color, var(--fs-store-primary));
    pointer-events: none;
  }

  .ffm-chips--wheel .ffm-chip {
    position: absolute;
    top: 50%;
    left: 50%;
    width: min(140px, 38vw);
    transform:
      rotate(var(--i-angle, 0deg))
      translateY(calc(-1 * var(--wheel-r, 110px)))
      rotate(calc(-1 * var(--i-angle, 0deg)));
    margin: 0;
  }

  .ffm-chips--wheel .ffm-chip:hover {
    transform:
      rotate(var(--i-angle, 0deg))
      translateY(calc(-1 * var(--wheel-r, 110px) - 2px))
      rotate(calc(-1 * var(--i-angle, 0deg)));
  }

  .ffm-detail {
    border-color: color-mix(
      in srgb,
      var(--fam-color, var(--accent-color, var(--fs-store-primary))) 24%,
      var(--border-color, #e6e0d6)
    );
  }

  .ffm-detail__icon {
    width: 2.6rem;
    height: 2.6rem;
    display: grid;
    place-items: center;
    margin-bottom: 0.65rem;
    border-radius: 50%;
    background: color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 14%, var(--card-bg, #fff));
    color: var(--fam-color, var(--accent-color, var(--fs-store-primary)));
    font-size: 1.15rem;
    overflow: hidden;
  }

  .ffm-detail__icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .ffm-detail__media {
    margin-top: 0.85rem;
    border-radius: calc(var(--section-radius, 20px) * 0.65);
    overflow: hidden;
  }

  .ffm-detail__media img {
    display: block;
    width: 100%;
    max-height: 220px;
    object-fit: cover;
  }

  .ffm-detail__actions {
    margin-top: 0.85rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .ffm-chip {
      transition: none !important;
    }

    .ffm-chip:hover,
    .ffm-chips--wheel .ffm-chip:hover {
      transform: none;
    }

    .ffm-chips--wheel .ffm-chip {
      transform:
        rotate(var(--i-angle, 0deg))
        translateY(calc(-1 * var(--wheel-r, 110px)))
        rotate(calc(-1 * var(--i-angle, 0deg)));
    }
  }
`;
