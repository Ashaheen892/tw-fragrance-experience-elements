import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { keyed } from 'lit/directives/keyed.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  isExternalUrl,
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { renderCommerceOutcome } from '../../utils/commerceOutcome.js';
import { componentStyles } from './styles.js';
import { parseSlots } from './utils.js';
import type { WardrobeSlot } from './types.js';

/**
 * Luxury wardrobe of scent slots — pick a drawer, then read details below.
 * Sibling UX: fragrance-family-map / ingredient-stories (select → detail stage).
 */
export default class FragranceWardrobe extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private activeId = '';

  private boundLangHandler = () => this.requestUpdate();

  static styles = [sharedSectionCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
    this.ensureActive();
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) this.ensureActive();
  }

  private get slots(): WardrobeSlot[] {
    return parseSlots(this.config?.fwd_slots);
  }

  private get coachText(): string {
    return (
      localizedString(this.config?.fwd_open_label as string) ||
      t('اختَر خانة لفتح درج العطر المناسب', 'Pick a slot to open that fragrance drawer')
    );
  }

  private get exploreLabel(): string {
    return (
      localizedString(this.config?.fwd_close_label as string) ||
      t('استكشف هذه الخانة', 'Explore this slot')
    );
  }

  private ensureActive(): void {
    const list = this.slots;
    if (!list.some((s) => s.id === this.activeId)) {
      this.activeId = list[0]?.id ?? '';
    }
  }

  private get active(): WardrobeSlot | null {
    return this.slots.find((s) => s.id === this.activeId) ?? this.slots[0] ?? null;
  }

  private select(id: string): void {
    this.activeId = id;
  }

  private step(dir: number): void {
    const list = this.slots;
    if (list.length < 2) return;
    const idx = list.findIndex((s) => s.id === this.activeId);
    const next = (idx + dir + list.length) % list.length;
    this.activeId = list[next]?.id ?? '';
  }

  private onKeyNav(e: KeyboardEvent): void {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const rtl = getComputedStyle(this).direction === 'rtl';
      const forward = e.key === 'ArrowRight';
      this.step(rtl ? (forward ? -1 : 1) : forward ? 1 : -1);
    }
  }

  private renderIcon(slot: WardrobeSlot) {
    if (slot.image) {
      return html`<img src=${slot.image} alt="" loading="lazy" decoding="async" />`;
    }
    const isSicon = slot.icon.startsWith('sicon-');
    if (slot.icon) {
      return isSicon ? html`<span class=${slot.icon}></span>` : html`<span>${slot.icon}</span>`;
    }
    return html`<span aria-hidden="true">${(slot.name || '•').slice(0, 1)}</span>`;
  }

  private renderDoor(slot: WardrobeSlot, index: number) {
    const active = slot.id === this.activeId;
    return html`
      <button
        type="button"
        class=${classMap({ 'fwd-door': true, 'fs-tap': true, 'is-active': active })}
        style=${styleMap({ '--slot-color': slot.color, '--door-i': String(index) })}
        role="listitem"
        aria-pressed=${active ? 'true' : 'false'}
        aria-controls="fwd-detail"
        title=${slot.name}
        @click=${() => this.select(slot.id)}
      >
        <span class="fwd-door__shine" aria-hidden="true"></span>
        <span class="fwd-door__handle" aria-hidden="true"></span>
        <span class="fwd-door__icon">${this.renderIcon(slot)}</span>
        <span class="fwd-door__meta">
          <span class="fwd-door__name">${slot.name || t('خزانة', 'Drawer')}</span>
          ${active
            ? html`<span class="fwd-door__badge">${t('مفتوح', 'Open')}</span>`
            : html`<span class="fwd-door__hint">${t('اضغط للفتح', 'Tap to open')}</span>`}
        </span>
      </button>
    `;
  }

  private renderDetail(slot: WardrobeSlot) {
    const external = slot.link ? isExternalUrl(slot.link) : false;
    const showNav = this.slots.length > 1;

    return html`
      <article
        class="fwd-detail fs-panel fs-fade-swap"
        id="fwd-detail"
        role="region"
        aria-live="polite"
        style=${styleMap({ '--slot-color': slot.color })}
      >
        <div class=${classMap({ 'fwd-detail__hero': true, 'fwd-detail__hero--media': !!slot.image })}>
          <div class="fwd-detail__body">
            <div class="fwd-detail__top">
              <span class="fwd-detail__icon" aria-hidden="true">${this.renderIcon(slot)}</span>
              ${showNav
                ? html`<div class="fwd-detail__nav" role="group" aria-label=${t('تنقّل الخانات', 'Browse slots')}>
                    <button
                      type="button"
                      class="fs-icon-btn fs-tap"
                      aria-label=${t('السابق', 'Previous')}
                      @click=${() => this.step(-1)}
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      class="fs-icon-btn fs-tap"
                      aria-label=${t('التالي', 'Next')}
                      @click=${() => this.step(1)}
                    >
                      ›
                    </button>
                  </div>`
                : nothing}
            </div>
            <h3 class="fs-panel__title">${slot.name || t('خانة عطرية', 'Fragrance slot')}</h3>
            ${slot.desc ? html`<p class="fs-panel__desc">${slot.desc}</p>` : nothing}
            ${slot.link
              ? html`<div class="fwd-detail__actions fs-actions">
                  <a
                    class="fs-btn fs-tap"
                    href=${slot.link}
                    target=${external ? '_blank' : nothing}
                    rel=${external ? 'noopener noreferrer' : nothing}
                  >
                    ${this.exploreLabel}
                  </a>
                </div>`
              : nothing}
          </div>
          ${slot.image
            ? html`<div class="fwd-detail__media">
                <img src=${slot.image} alt="" loading="lazy" decoding="async" />
              </div>`
            : nothing}
        </div>
      </article>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'fwd_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.fwd_title as string);
    const desc = localizedString(c.fwd_desc as string);
    const slots = this.slots;
    const active = this.active;

    if (!slots.length) {
      return html`
        <section
          class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
          style=${styleMap(themeStyleMap(theme))}
          aria-label=${title || t('خزانة العطور', 'Fragrance wardrobe')}
        >
          <div class="fs-container">
            ${title || desc
              ? html`<div class="fs-header">
                  ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                  ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
                </div>`
              : nothing}
            <div class="fs-empty" role="status">
              ${t(
                'أضف خانات خزانة العطور من إعدادات العنصر.',
                'Add fragrance wardrobe slots in the element settings.'
              )}
              <p class="fwd-empty-hint">
                ${t(
                  'أفكار مقترحة: يومي، عمل، مساء، مناسبات، سفر، مواسم.',
                  'Suggested slots: daily, work, evening, events, travel, seasons.'
                )}
              </p>
            </div>
          </div>
        </section>
      `;
    }

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('خزانة العطور', 'Fragrance wardrobe')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div class="fwd-shell">
            <p class="fs-coach">
              <span class="fs-coach__mark" aria-hidden="true">✦</span>
              <span>${this.coachText}</span>
            </p>

            <div class="fwd-cabinet">
              <div class="fwd-cabinet__rail" aria-hidden="true"></div>
              <div
                class="fwd-grid"
                role="list"
                aria-label=${t('خانات الخزانة', 'Wardrobe slots')}
                @keydown=${this.onKeyNav}
              >
                ${slots.map((slot, i) => this.renderDoor(slot, i))}
              </div>
            </div>

            ${active
              ? keyed(active.id, this.renderDetail(active))
              : nothing}
          </div>

          ${renderCommerceOutcome({
            config: c,
            prefix: 'fwd_',
            ready: Boolean(active),
            selection: active,
          })}
        </div>
      </section>
    `;
  }
}
