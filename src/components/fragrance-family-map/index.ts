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
import { parseFamilies, resolveLayout } from './utils.js';
import type { FamilyMapLayout, FragranceFamilyItem } from './types.js';

export default class FragranceFamilyMap extends LitElement {

  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private activeId = '';

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
      this.activeId = '';
    }
  }

  private get families(): FragranceFamilyItem[] {
    return parseFamilies(this.config?.ffm_families);
  }

  private resolveActive(families: FragranceFamilyItem[]): FragranceFamilyItem | null {
    if (!families.length) return null;
    if (this.activeId) {
      const found = families.find((f) => f.id === this.activeId);
      if (found) return found;
    }
    const preset = String(this.config?.ffm_default_family ?? '').trim();
    if (preset) {
      const found = families.find((f) => f.id === preset);
      if (found) return found;
    }
    return families[0];
  }

  private select(id: string): void {
    this.activeId = id;
  }

  private renderIcon(family: FragranceFamilyItem, className: string) {
    const isSicon = family.icon.startsWith('sicon-');
    if (family.image) {
      return html`<img src=${family.image} alt="" loading="lazy" decoding="async" />`;
    }
    if (family.icon) {
      return isSicon ? html`<span class=${family.icon}></span>` : html`<span>${family.icon}</span>`;
    }
    return html`<span class=${className} aria-hidden="true">✦</span>`;
  }

  private renderChip(family: FragranceFamilyItem, layout: FamilyMapLayout, index: number, total: number) {
    const active = this.resolveActive(this.families)?.id === family.id;
    const chipStyle: Record<string, string> = family.color ? { '--fam-color': family.color } : {};
    if (layout === 'wheel') {
      chipStyle['--i-angle'] = `${(360 / Math.max(total, 1)) * index}deg`;
    }

    return html`
      <button
        type="button"
        class=${classMap({ 'ffm-chip': true, 'fs-tap': true, 'is-active': active })}
        style=${styleMap(chipStyle)}
        aria-pressed=${active ? 'true' : 'false'}
        aria-controls="ffm-detail"
        @click=${() => this.select(family.id)}
      >
        <span class="ffm-chip__swatch">${this.renderIcon(family, '')}</span>
        <span class="ffm-chip__name">${family.name}</span>
        ${layout !== 'wheel' ? html`<span class="ffm-chip__dot" aria-hidden="true"></span>` : nothing}
      </button>
    `;
  }

  private renderDetail(family: FragranceFamilyItem) {
    const style: Record<string, string> = family.color ? { '--fam-color': family.color } : {};
    const external = family.link ? isExternalUrl(family.link) : false;

    return html`
      <article
        id="ffm-detail"
        class="ffm-detail fs-panel fs-fade-swap"
        style=${styleMap(style)}
        role="region"
        aria-live="polite"
      >
        <div class="ffm-detail__icon">${this.renderIcon(family, '')}</div>
        <h3 class="fs-panel__title">${family.name}</h3>
        ${family.desc ? html`<p class="fs-panel__desc">${family.desc}</p>` : nothing}
        ${family.image
          ? html`<div class="ffm-detail__media">
              <img src=${family.image} alt="" loading="lazy" decoding="async" />
            </div>`
          : nothing}
        ${family.link
          ? html`<div class="ffm-detail__actions">
              <a
                class="fs-btn fs-tap"
                href=${family.link}
                target=${external ? '_blank' : '_self'}
                rel=${external ? 'noopener noreferrer' : nothing}
              >
                ${t('استكشف العائلة', 'Explore family')}
              </a>
            </div>`
          : nothing}
      </article>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'ffm_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.ffm_title as string);
    const desc = localizedString(c.ffm_desc as string);
    const families = this.families;
    const layout = resolveLayout(c);
    const active = this.resolveActive(families);
    const total = families.length;

    if (!families.length) {
      return html`
        <section
          class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
          style=${styleMap(themeStyleMap(theme))}
          aria-label=${title || t('خريطة العائلات العطرية', 'Fragrance family map')}
        >
          <div class="fs-container">
            ${title || desc
              ? html`<div class="fs-header">
                  ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                  ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
                </div>`
              : nothing}
            <div class="fs-empty" role="status">
              ${t('أضف عائلات عطرية من إعدادات العنصر.', 'Add fragrance families in the element settings.')}
            </div>
          </div>
        </section>
      `;
    }

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('خريطة العائلات العطرية', 'Fragrance family map')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div class="ffm-shell">
            <aside class="ffm-selector">
              <p class="ffm-selector__label">${t('اختَر عائلة', 'Pick a family')}</p>
              <div
                class=${classMap({
                  'ffm-chips': true,
                  [`ffm-chips--${layout}`]: true,
                })}
                role="group"
                aria-label=${t('عائلات العطر', 'Fragrance families')}
                style=${styleMap(layout === 'wheel' ? { '--wheel-r': '110px' } : {})}
              >
                ${layout === 'wheel'
                  ? html`<div class="ffm-wheel-core">${t('عائلات', 'Families')}</div>`
                  : nothing}
                ${families.map((family, i) => this.renderChip(family, layout, i, total))}
              </div>
            </aside>
            ${active ? keyed(active.id, this.renderDetail(active)) : nothing}
          </div>
          ${renderCommerceOutcome({ config: c, prefix: 'ffm_', ready: Boolean(active), selection: active })}
        </div>
      </section>
    `;
  }
}
