import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { keyed } from 'lit/directives/keyed.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { renderCommerceOutcome } from '../../utils/commerceOutcome.js';
import { componentStyles } from './styles.js';
import { parseSlides, resolveDirection } from './utils.js';
import type { BeforeAfterSlide, SplitDirection } from './types.js';

const DRAG_ICON_H = html`
  <svg class="sba-handle__svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M8 12H16M8 12l2.2-2.2M8 12l2.2 2.2M16 12l-2.2-2.2M16 12l-2.2 2.2"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;

const DRAG_ICON_V = html`
  <svg class="sba-handle__svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M12 8V16M12 8l-2.2 2.2M12 8l2.2 2.2M12 16l-2.2-2.2M12 16l2.2-2.2"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;

export default class ScentBeforeAfter extends LitElement {

  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private activeIndex = 0;
  @state() private position = 50;
  private dragging = false;

  private boundLangHandler = () => this.requestUpdate();

  static styles = [sharedSectionCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    window.removeEventListener('pointermove', this.onMove);
    window.removeEventListener('pointerup', this.onUp);
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      const slides = this.slides;
      if (this.activeIndex >= slides.length) {
        this.activeIndex = 0;
      }
      this.position = 50;
    }
  }

  private get slides(): BeforeAfterSlide[] {
    return parseSlides(this.config?.sba_slides);
  }

  private get direction(): SplitDirection {
    return resolveDirection(this.config || {});
  }

  private get active(): BeforeAfterSlide | null {
    return this.slides[this.activeIndex] ?? null;
  }

  private selectSlide(index: number): void {
    this.activeIndex = index;
    this.position = 50;
  }

  /* ── Drag handling ── */
  private onDown = (e: PointerEvent) => {
    e.preventDefault();
    this.dragging = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    window.addEventListener('pointermove', this.onMove);
    window.addEventListener('pointerup', this.onUp);
    this.updatePosition(e);
  };

  private onMove = (e: PointerEvent) => {
    if (!this.dragging) return;
    this.updatePosition(e);
  };

  private onUp = () => {
    this.dragging = false;
    window.removeEventListener('pointermove', this.onMove);
    window.removeEventListener('pointerup', this.onUp);
  };

  private updatePosition(e: PointerEvent): void {
    const container = this.renderRoot.querySelector('.sba-compare') as HTMLElement;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const isVertical = this.direction === 'vertical';
    const raw = isVertical
      ? ((e.clientX - rect.left) / rect.width) * 100
      : ((e.clientY - rect.top) / rect.height) * 100;
    this.position = Math.max(5, Math.min(95, raw));
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'sba_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.sba_title as string);
    const desc = localizedString(c.sba_desc as string);
    const slides = this.slides;
    const active = this.active;
    const dir = this.direction;

    if (!slides.length) {
      return html`<div class="fs-empty" role="status">
        ${t(
          'أضف شرائح قبل/بعد من إعدادات العنصر.',
          'Add before/after slides in the element settings.'
        )}
      </div>`;
    }

    const beforeLabel = active?.beforeLabel || t('قبل', 'BEFORE');
    const afterLabel = active?.afterLabel || t('بعد', 'AFTER');

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('مقارنة قبل وبعد', 'Before & after comparison')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          ${slides.length > 1
            ? html`<div class="sba-tabs" role="tablist">
                ${slides.map((s, i) => html`
                  <button
                    type="button"
                    role="tab"
                    class=${classMap({ 'sba-tab': true, 'fs-tap': true, 'is-active': i === this.activeIndex })}
                    aria-selected=${i === this.activeIndex ? 'true' : 'false'}
                    @click=${() => this.selectSlide(i)}
                  >${s.caption || `${i + 1}`}</button>
                `)}
              </div>`
            : nothing}

          ${active
            ? keyed(this.activeIndex, html`
              <div
                class=${classMap({
                  'sba-compare': true,
                  'sba-compare--vertical': dir === 'vertical',
                  'sba-compare--horizontal': dir === 'horizontal',
                  'fs-fade-swap': true,
                })}
                style=${styleMap({ '--sba-pos': `${this.position}%` })}
                @pointerdown=${this.onDown}
              >
                <img class="sba-compare__img sba-compare__before" src=${active.beforeImage} alt=${beforeLabel} loading="lazy" decoding="async" />
                <img class="sba-compare__img sba-compare__after" src=${active.afterImage} alt=${afterLabel} loading="lazy" decoding="async" />
                <span class="sba-label sba-label--before">${beforeLabel}</span>
                <span class="sba-label sba-label--after">${afterLabel}</span>
                <div
                  class="sba-handle"
                  @pointerdown=${this.onDown}
                  role="slider"
                  tabindex="0"
                  aria-orientation=${dir === 'vertical' ? 'horizontal' : 'vertical'}
                  aria-label=${t('اسحب للمقارنة', 'Drag to compare')}
                  aria-valuenow=${Math.round(this.position)}
                  aria-valuemin="5"
                  aria-valuemax="95"
                  @keydown=${(e: KeyboardEvent) => {
                    const step = e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -4 : e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 4 : 0;
                    if (!step) return;
                    e.preventDefault();
                    this.position = Math.max(5, Math.min(95, this.position + step));
                  }}
                >
                  <span class="sba-handle__rail" aria-hidden="true"></span>
                  <span class="sba-handle__grip" aria-hidden="true">
                    ${dir === 'vertical' ? DRAG_ICON_H : DRAG_ICON_V}
                  </span>
                </div>
              </div>
              ${active.caption ? html`<p class="sba-caption">${active.caption}</p>` : nothing}
            `)
            : nothing}

          ${renderCommerceOutcome({ config: c, prefix: 'sba_' })}
        </div>
      </section>
    `;
  }
}
