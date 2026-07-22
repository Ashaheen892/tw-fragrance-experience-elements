import { css } from 'lit';

export const componentStyles = css`
  :host {
    direction: inherit;
  }

  .fwd-shell {
    display: grid;
    gap: 1.15rem;
    max-width: 980px;
    margin-inline: auto;
  }

  .fwd-cabinet {
    position: relative;
    padding: 1.15rem 1.1rem 1.25rem;
    border-radius: var(--section-radius, 20px);
    background:
      linear-gradient(
        180deg,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff)) 0%,
        var(--card-bg, #fff) 48%,
        color-mix(in srgb, var(--border-color, #e6e0d6) 28%, var(--card-bg, #fff)) 100%
      );
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 22%, var(--border-color, #e6e0d6));
    box-shadow:
      inset 0 1px 0 color-mix(in srgb, var(--card-bg, #fff) 70%, transparent),
      0 16px 40px rgba(90, 70, 40, 0.1);
  }

  .fwd-cabinet__rail {
    height: 4px;
    margin: 0 0.15rem 0.95rem;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      transparent,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, transparent),
      transparent
    );
  }

  .fwd-grid {
    display: grid;
    gap: 0.7rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 640px) {
    .fwd-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.8rem;
    }
  }

  .fwd-door {
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 0.7rem;
    min-height: 5.4rem;
    padding: 0.95rem 1.15rem 0.95rem 0.9rem;
    border: 1.5px solid color-mix(
      in srgb,
      var(--slot-color, var(--accent-color, var(--fs-store-primary))) 28%,
      var(--border-color, #e6e0d6)
    );
    border-radius: calc(var(--section-radius, 20px) * 0.68);
    background: linear-gradient(
      145deg,
      color-mix(in srgb, var(--slot-color, var(--accent-color, var(--fs-store-primary))) 14%, var(--card-bg, #fff)),
      color-mix(in srgb, var(--slot-color, var(--accent-color, var(--fs-store-primary))) 4%, var(--card-bg, #fff))
    );
    color: var(--text-color, #1f1a14);
    font: inherit;
    text-align: start;
    cursor: pointer;
    overflow: hidden;
    box-shadow: 0 6px 16px rgba(90, 70, 40, 0.07);
    transition:
      transform 0.24s ease,
      border-color 0.24s ease,
      box-shadow 0.24s ease,
      background 0.24s ease;
  }

  .fwd-door__shine {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      115deg,
      transparent 35%,
      color-mix(in srgb, var(--card-bg, #fff) 35%, transparent) 48%,
      transparent 62%
    );
    opacity: 0.45;
    pointer-events: none;
  }

  .fwd-door:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--slot-color, var(--accent-color, var(--fs-store-primary))) 55%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 12px 26px rgba(90, 70, 40, 0.1);
  }

  .fwd-door.is-active {
    border-color: var(--slot-color, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--slot-color, var(--accent-color, var(--fs-store-primary))) 12%,
      var(--card-bg, #fff)
    );
    box-shadow:
      0 0 0 3px color-mix(
        in srgb,
        var(--slot-color, var(--accent-color, var(--fs-store-primary))) 18%,
        transparent
      ),
      0 14px 30px rgba(90, 70, 40, 0.12);
  }

  .fwd-door__handle {
    position: absolute;
    inset-inline-end: 0.7rem;
    top: 50%;
    width: 0.32rem;
    height: 1.45rem;
    border-radius: 999px;
    background: color-mix(
      in srgb,
      var(--slot-color, var(--accent-color, var(--fs-store-primary))) 72%,
      var(--card-bg, #fff)
    );
    transform: translateY(-50%);
    box-shadow: inset 0 1px 2px color-mix(in srgb, var(--text-color, #1f1a14) 12%, transparent);
  }

  .fwd-door__icon {
    position: relative;
    z-index: 1;
    width: 2.35rem;
    height: 2.35rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: color-mix(
      in srgb,
      var(--slot-color, var(--accent-color, var(--fs-store-primary))) 18%,
      var(--card-bg, #fff)
    );
    color: var(--slot-color, var(--accent-color, var(--fs-store-primary)));
    font-size: 1.05rem;
    font-weight: 800;
    overflow: hidden;
    flex: 0 0 auto;
  }

  .fwd-door__icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .fwd-door__meta {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 0.2rem;
    min-width: 0;
    padding-inline-end: 0.85rem;
  }

  .fwd-door__name {
    font-size: 0.92rem;
    font-weight: 800;
    line-height: 1.3;
  }

  .fwd-door__hint,
  .fwd-door__badge {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.03em;
  }

  .fwd-door__hint {
    color: var(--muted-color, #6e6558);
  }

  .fwd-door__badge {
    display: inline-flex;
    width: fit-content;
    padding: 0.12rem 0.5rem;
    border-radius: 999px;
    background: color-mix(
      in srgb,
      var(--slot-color, var(--accent-color, var(--fs-store-primary))) 16%,
      var(--card-bg, #fff)
    );
    color: var(--slot-color, var(--accent-color, var(--fs-store-primary)));
  }

  .fwd-detail {
    --slot-color: var(--accent-color, var(--fs-store-primary));
    border-color: color-mix(in srgb, var(--slot-color) 26%, var(--border-color, #e6e0d6));
  }

  .fwd-detail__hero {
    display: grid;
    gap: 1rem;
  }

  @media (min-width: 720px) {
    .fwd-detail__hero--media {
      grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
      align-items: stretch;
      gap: 1.15rem;
    }
  }

  .fwd-detail__body {
    display: grid;
    gap: 0.65rem;
    align-content: start;
  }

  .fwd-detail__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.65rem;
  }

  .fwd-detail__icon {
    width: 2.6rem;
    height: 2.6rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: color-mix(in srgb, var(--slot-color) 16%, var(--card-bg, #fff));
    color: var(--slot-color);
    font-size: 1.15rem;
    font-weight: 800;
    overflow: hidden;
  }

  .fwd-detail__icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .fwd-detail__nav {
    display: inline-flex;
    gap: 0.35rem;
  }

  .fwd-detail__nav .fs-icon-btn {
    color: var(--slot-color, var(--accent-color, var(--fs-store-primary)));
    border-color: color-mix(in srgb, var(--slot-color, var(--accent-color, var(--fs-store-primary))) 40%, var(--border-color, #e6e0d6));
  }

  .fwd-detail__media {
    border-radius: calc(var(--section-radius, 20px) * 0.6);
    overflow: hidden;
    min-height: 160px;
    background: color-mix(in srgb, var(--slot-color) 10%, var(--border-color, #e6e0d6));
  }

  .fwd-detail__media img {
    display: block;
    width: 100%;
    height: 100%;
    max-height: 240px;
    object-fit: cover;
  }

  .fwd-detail__actions {
    margin-top: 0.35rem;
    justify-content: flex-start;
  }

  .fwd-empty-hint {
    margin-top: 0.35rem;
    font-size: 0.82rem;
    color: var(--muted-color, #6e6558);
  }

  @media (prefers-reduced-motion: reduce) {
    .fwd-door,
    .fwd-detail__nav .fs-icon-btn {
      transition: none !important;
    }

    .fwd-door:hover,
    .fwd-detail__nav .fs-icon-btn:hover {
      transform: none;
    }
  }
`;
