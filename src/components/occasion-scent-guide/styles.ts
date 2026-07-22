import { css } from 'lit';

export const componentStyles = css`
  :host {
    direction: inherit;
  }

  .osg-shell {
    display: grid;
    gap: 1rem;
  }

  .osg-cards {
    display: grid;
    gap: 0.65rem;
    grid-template-columns: repeat(auto-fill, minmax(10.5rem, 1fr));
  }

  .osg-card {
    display: grid;
    gap: 0.45rem;
    padding: 0.85rem;
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    border: 1.5px solid color-mix(in srgb, var(--border-color, #e6e0d6) 82%, transparent);
    background: var(--card-bg, #fff);
    text-align: start;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.05);
    transition:
      border-color 0.22s ease,
      box-shadow 0.22s ease,
      transform 0.22s ease,
      background 0.22s ease;
  }

  .osg-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--occ-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .osg-card.is-active {
    border-color: var(--occ-color, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--occ-color, var(--accent-color, var(--fs-store-primary))) 9%,
      var(--card-bg, #fff)
    );
    box-shadow:
      0 0 0 3px color-mix(
        in srgb,
        var(--occ-color, var(--accent-color, var(--fs-store-primary))) 18%,
        transparent
      ),
      0 12px 28px rgba(90, 70, 40, 0.1);
    transform: translateY(-2px);
  }

  .osg-card:active {
    transform: translateY(0);
  }

  .osg-card__media {
    aspect-ratio: 4 / 3;
    border-radius: calc(var(--section-radius, 20px) * 0.55);
    overflow: hidden;
    background: color-mix(in srgb, var(--occ-color, var(--accent-color, var(--fs-store-primary))) 18%, var(--card-bg, #fff));
  }

  .osg-card__media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .osg-card__name {
    margin: 0;
    font-size: 0.94rem;
    font-weight: 800;
    line-height: 1.35;
  }

  .osg-card__desc {
    margin: 0;
    font-size: 0.8rem;
    color: var(--muted-color, #666666);
    line-height: 1.55;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .osg-panel {
    border-radius: var(--section-radius, 20px);
    border: 1px solid var(--border-color, #e6e0d6);
    background: var(--card-bg, #fff);
    padding: 1.25rem;
    display: grid;
    gap: 0.75rem;
  }

  .osg-panel__title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 800;
  }

  .osg-panel__desc {
    margin: 0;
    color: var(--muted-color, #666666);
    line-height: 1.7;
    font-size: 0.92rem;
  }

  .osg-profile {
    padding: 0.85rem 0.95rem;
    border-radius: 14px;
    background: color-mix(in srgb, var(--occ-color, var(--accent-color, var(--fs-store-primary))) 10%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--occ-color, var(--accent-color, var(--fs-store-primary))) 24%, var(--border-color, #e6e0d6));
  }

  .osg-profile__label {
    display: block;
    margin-bottom: 0.35rem;
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .osg-profile__text {
    margin: 0;
    line-height: 1.65;
    font-size: 0.92rem;
  }

  @media (min-width: 960px) {
    .osg-shell {
      grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
      align-items: start;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .osg-card {
      transition: none;
    }

    .osg-card.is-active {
      transform: none;
    }
  }
`;
