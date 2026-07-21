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
import { parseScenes } from './utils.js';
import type { ScentScene as ScentSceneItem } from './types.js';

export default class ScentScene extends LitElement {

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

  private get scenes(): ScentSceneItem[] {
    return parseScenes(this.config?.ssc_scenes);
  }

  private ensureActive(): void {
    const list = this.scenes;
    if (!list.some((scene) => scene.id === this.activeId)) {
      this.activeId = list[0]?.id ?? '';
    }
  }

  private get active(): ScentSceneItem | null {
    return this.scenes.find((scene) => scene.id === this.activeId) ?? this.scenes[0] ?? null;
  }

  private select(id: string): void {
    this.activeId = id;
  }

  private renderChip(scene: ScentSceneItem) {
    const active = scene.id === this.activeId;
    const accent = scene.accent || scene.color || '#9a7b4f';

    return html`
      <button
        type="button"
        class=${classMap({ 'ssc-chip': true, 'fs-tap': true, 'is-active': active })}
        style=${styleMap({ '--chip-accent': accent })}
        aria-pressed=${active ? 'true' : 'false'}
        aria-controls="ssc-stage"
        @click=${() => this.select(scene.id)}
      >
        <span class="ssc-chip__swatch" aria-hidden="true"></span>
        <span class="ssc-chip__name">${scene.name || t('مشهد', 'Scene')}</span>
      </button>
    `;
  }

  private renderStage(scene: ScentSceneItem) {
    const sceneColor = scene.color || '#1f1a14';
    const sceneAccent = scene.accent || scene.color || '#9a7b4f';
    const external = scene.link ? isExternalUrl(scene.link) : false;
    const animate = !prefersReducedMotion();

    return html`
      <div
        id="ssc-stage"
        class="ssc-stage fs-fade-swap"
        role="region"
        aria-live="polite"
        style=${styleMap({
          '--scene-color': sceneColor,
          '--scene-accent': sceneAccent,
        })}
      >
        ${scene.image
          ? html`<div
              class=${classMap({ 'ssc-stage__bg': true, 'is-visible': true })}
              style=${styleMap({
                backgroundImage: `url("${scene.image}")`,
                opacity: animate ? '1' : '0.92',
              })}
              aria-hidden="true"
            ></div>`
          : nothing}
        <div class="ssc-stage__overlay" aria-hidden="true"></div>
        <div class="ssc-stage__content">
          <p class="ssc-stage__eyebrow">${t('مشهد الرائحة', 'Scent scene')}</p>
          <h3 class="ssc-stage__title">${scene.name || t('مشهد عطري', 'Fragrance scene')}</h3>
          ${scene.scentCharacter
            ? html`<p class="ssc-stage__character">${scene.scentCharacter}</p>`
            : nothing}
          ${scene.desc
            ? html`<p class="ssc-stage__desc">${scene.desc}</p>`
            : html`<p class="ssc-stage__desc">
                ${t('اختر مشهداً لاستكشاف أجوائه العطرية.', 'Pick a scene to explore its scent mood.')}
              </p>`}
          ${scene.moodTags.length
            ? html`<div class="ssc-tags" aria-label=${t('وسوم المزاج', 'Mood tags')}>
                ${scene.moodTags.map(
                  (tag) => html`<span class="ssc-tag">${tag}</span>`
                )}
              </div>`
            : nothing}
          ${scene.link
            ? html`<div class="ssc-stage__actions">
                <a
                  class="fs-btn"
                  href=${scene.link}
                  target=${external ? '_blank' : '_self'}
                  rel=${external ? 'noopener noreferrer' : nothing}
                >
                  ${t('استكشف المشهد', 'Explore scene')}
                </a>
              </div>`
            : nothing}
        </div>
      </div>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'ssc_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.ssc_title as string);
    const desc = localizedString(c.ssc_desc as string);
    const scenes = this.scenes;
    const active = this.active;

    if (!scenes.length) {
      return html`
        <section
          class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
          style=${styleMap(themeStyleMap(theme))}
          aria-label=${title || t('مشهد الرائحة', 'Scent scene')}
        >
          <div class="fs-container">
            ${title || desc
              ? html`<div class="fs-header">
                  ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                  ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
                </div>`
              : nothing}
            <div class="fs-empty" role="status">
              ${t('أضف مشاهد عطرية من إعدادات العنصر.', 'Add scent scenes in the element settings.')}
            </div>
          </div>
        </section>
      `;
    }

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('مشهد الرائحة', 'Scent scene')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div class="ssc-shell">
            ${active ? keyed(active.id, this.renderStage(active)) : nothing}
            <div class="ssc-chips" role="tablist" aria-label=${t('المشاهد', 'Scenes')}>
              ${scenes.map((scene) => this.renderChip(scene))}
            </div>
          </div>
          ${renderCommerceOutcome({ config: c, prefix: 'ssc_' })}
        </div>
      </section>
    `;
  }
}
