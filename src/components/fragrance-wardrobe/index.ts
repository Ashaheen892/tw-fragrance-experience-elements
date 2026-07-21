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

export default class FragranceWardrobe extends LitElement {

  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private openId = '';

  private boundLangHandler = () => this.requestUpdate();

  static styles = [sharedSectionCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      this.openId = '';
    }
  }

  private get slots(): WardrobeSlot[] {
    return parseSlots(this.config?.fwd_slots);
  }

  private get openLabel(): string {
    return (
      localizedString(this.config?.fwd_open_label as string) ||
      t('افتح الخزانة', 'Open drawer')
    );
  }

  private get closeLabel(): string {
    return (
      localizedString(this.config?.fwd_close_label as string) ||
      t('أغلق', 'Close')
    );
  }

  private toggle(id: string): void {
    this.openId = this.openId === id ? '' : id;
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

  private renderCompartment(slot: WardrobeSlot) {
    const isOpen = slot.id === this.openId;
    const slotStyle = { '--slot-color': slot.color };
    const external = slot.link ? isExternalUrl(slot.link) : false;

    return html`
      <div
        class=${classMap({ 'fwd-compartment': true, 'is-open': isOpen })}
        style=${styleMap(slotStyle)}
      >
        <button
          type="button"
          class=${classMap({ 'fwd-door': true, 'fs-tap': true })}
          aria-expanded=${isOpen ? 'true' : 'false'}
          aria-controls=${`fwd-panel-${slot.id}`}
          @click=${() => this.toggle(slot.id)}
        >
          <span class="fwd-door__handle" aria-hidden="true"></span>
          <span class="fwd-door__icon">${this.renderIcon(slot)}</span>
          <p class="fwd-door__name">${slot.name || t('خزانة', 'Drawer')}</p>
          <p class="fwd-door__hint">${isOpen ? this.closeLabel : this.openLabel}</p>
        </button>

        <div
          id=${`fwd-panel-${slot.id}`}
          class="fwd-panel"
          role="region"
          aria-live="polite"
          ?hidden=${!isOpen}
        >
          ${isOpen ? keyed(slot.id, html`
          <div class="fwd-panel__inner fs-panel fs-fade-swap">
            ${slot.image
              ? html`<div class="fwd-panel__media">
                  <img src=${slot.image} alt="" loading="lazy" decoding="async" />
                </div>`
              : nothing}
            ${slot.desc ? html`<p class="fs-panel__desc">${slot.desc}</p>` : nothing}
            ${slot.link
              ? html`<div class="fwd-panel__actions">
                  <a
                    class="fs-btn"
                    href=${slot.link}
                    target=${external ? '_blank' : '_self'}
                    rel=${external ? 'noopener noreferrer' : nothing}
                  >
                    ${t('استكشف', 'Explore')}
                  </a>
                </div>`
              : nothing}
          </div>
          `) : nothing}
        </div>
      </div>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'fwd_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.fwd_title as string);
    const desc = localizedString(c.fwd_desc as string);
    const slots = this.slots;

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

          <div class="fwd-cabinet">
            <div class="fwd-grid" role="list" aria-label=${t('خانات الخزانة', 'Wardrobe slots')}>
              ${slots.map((slot) => this.renderCompartment(slot))}
            </div>
          </div>
          ${renderCommerceOutcome({ config: c, prefix: 'fwd_' })}
        </div>
      </section>
    `;
  }
}
