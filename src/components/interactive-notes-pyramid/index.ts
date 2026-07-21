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
import { hasPyramidContent, parsePyramidTiers } from './utils.js';
import type { NoteLayer, PyramidNote, PyramidTier } from './types.js';

const TIER_SHORT: Record<NoteLayer, string> = {
  top: 'T',
  heart: 'H',
  base: 'B',
};

export default class InteractiveNotesPyramid extends LitElement {

  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private openTier: NoteLayer | '' = '';

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
      this.openTier = '';
    }
  }

  private get tiers(): PyramidTier[] {
    return parsePyramidTiers(this.config || {});
  }

  private toggleTier(key: NoteLayer): void {
    this.openTier = this.openTier === key ? '' : key;
  }

  private renderNoteIcon(note: PyramidNote) {
    const isSicon = note.icon.startsWith('sicon-');
    if (note.image && !note.image.startsWith('sicon-')) {
      return html`<img src=${note.image} alt="" loading="lazy" decoding="async" />`;
    }
    if (note.icon) {
      return isSicon ? html`<span class=${note.icon}></span>` : html`<span>${note.icon}</span>`;
    }
    return html`<span aria-hidden="true">•</span>`;
  }

  private renderNote(note: PyramidNote) {
    return html`
      <div class="inp-note" role="listitem">
        <span class="inp-note__icon">${this.renderNoteIcon(note)}</span>
        <div>
          <p class="inp-note__name">${note.name}</p>
          ${note.desc ? html`<p class="inp-note__desc">${note.desc}</p>` : nothing}
        </div>
      </div>
    `;
  }

  private renderTier(tier: PyramidTier) {
    const isOpen = this.openTier === tier.key;
    const style: Record<string, string> = tier.color ? { '--tier-color': tier.color } : {};

    return html`
      <div
        class=${classMap({ 'inp-tier': true, 'is-open': isOpen })}
        style=${styleMap(style)}
      >
        <button
          type="button"
          class="inp-tier__toggle fs-tap"
          aria-expanded=${isOpen ? 'true' : 'false'}
          aria-controls="inp-panel-${tier.key}"
          @click=${() => this.toggleTier(tier.key)}
        >
          <span class="inp-tier__badge">${TIER_SHORT[tier.key]}</span>
          <span class="inp-tier__meta">
            <span class="inp-tier__label">${tier.label}</span>
            ${tier.desc ? html`<p class="inp-tier__desc">${tier.desc}</p>` : nothing}
          </span>
          <span class="inp-tier__chevron" aria-hidden="true">▾</span>
        </button>
        ${isOpen
          ? keyed(tier.key, html`<div id="inp-panel-${tier.key}" class="inp-tier__panel fs-fade-swap" role="list">
              ${tier.notes.length
                ? tier.notes.map((note) => this.renderNote(note))
                : html`<p class="inp-tier__empty">${t('لا توجد نوتات بعد.', 'No notes yet.')}</p>`}
            </div>`)
          : nothing}
      </div>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'inp_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.inp_title as string);
    const desc = localizedString(c.inp_desc as string);
    const tiers = this.tiers;
    const hasContent = hasPyramidContent(tiers);

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('هرم النوتات التفاعلي', 'Interactive notes pyramid')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          ${hasContent
            ? html`<div class="inp-pyramid" role="group" aria-label=${t('هرم النوتات', 'Notes pyramid')}>
                ${tiers.map((tier) => this.renderTier(tier))}
              </div>`
            : html`<div class="fs-empty" role="status">
                ${t('أضف طبقات أو نوتات من إعدادات العنصر.', 'Add tiers or notes in the element settings.')}
              </div>`}
          ${renderCommerceOutcome({ config: c, prefix: 'inp_' })}
        </div>
      </section>
    `;
  }
}
