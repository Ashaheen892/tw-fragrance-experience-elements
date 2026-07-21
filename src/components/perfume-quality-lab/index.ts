import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { keyed } from 'lit/directives/keyed.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  isDirectMediaUrl,
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { renderCommerceOutcome } from '../../utils/commerceOutcome.js';
import { componentStyles } from './styles.js';
import { parseStations } from './utils.js';
import type { QualityStation } from './types.js';

export default class PerfumeQualityLab extends LitElement {

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

  private get stations(): QualityStation[] {
    return parseStations(this.config?.pql_stations);
  }

  private get factLabel(): string {
    return (
      localizedString(this.config?.pql_fact_label as string) ||
      t('حقيقة', 'Fact')
    );
  }

  private get certLabel(): string {
    return (
      localizedString(this.config?.pql_cert_label as string) ||
      t('شهادة الجودة', 'Quality certificate')
    );
  }

  private ensureActive(): void {
    const list = this.stations;
    if (!list.some((s) => s.id === this.activeId)) {
      this.activeId = list[0]?.id ?? '';
    }
  }

  private get active(): QualityStation | null {
    return this.stations.find((s) => s.id === this.activeId) ?? this.stations[0] ?? null;
  }

  private select(id: string): void {
    this.activeId = id;
  }

  private renderBadge(station: QualityStation) {
    if (station.image) {
      return html`<img src=${station.image} alt="" loading="lazy" decoding="async" />`;
    }
    const isSicon = station.icon.startsWith('sicon-');
    if (station.icon) {
      return isSicon ? html`<span class=${station.icon}></span>` : html`<span>${station.icon}</span>`;
    }
    return html`<span aria-hidden="true">${(station.name || '•').slice(0, 1)}</span>`;
  }

  private renderVideo(station: QualityStation) {
    if (!station.videoUrl) return nothing;

    if (isDirectMediaUrl(station.videoUrl) && !station.videoUrl.includes('embed')) {
      return html`
        <div class="pql-detail__media">
          <div class="pql-detail__video">
            <video src=${station.videoUrl} controls playsinline preload="metadata"></video>
          </div>
        </div>
      `;
    }

    return html`
      <div class="pql-detail__media">
        <div class="pql-detail__video">
          <iframe
            src=${station.videoUrl}
            title=${station.name || t('فيديو المحطة', 'Station video')}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    `;
  }

  private renderStep(station: QualityStation) {
    const active = station.id === this.activeId;
    return html`
      <button
        type="button"
        class=${classMap({ 'pql-step': true, 'is-active': active, 'fs-tap': true })}
        style=${styleMap({ '--station-color': station.color })}
        aria-pressed=${active ? 'true' : 'false'}
        aria-controls="pql-detail"
        @click=${() => this.select(station.id)}
      >
        <span class="pql-step__badge">${this.renderBadge(station)}</span>
        <span>
          <p class="pql-step__name">${station.name || t('محطة', 'Station')}</p>
          ${station.shortDesc
            ? html`<p class="pql-step__short">${station.shortDesc}</p>`
            : nothing}
        </span>
      </button>
    `;
  }

  private renderDetail(station: QualityStation) {
    return html`
      <article
        id="pql-detail"
        class="pql-detail fs-panel fs-fade-swap"
        style=${styleMap({ '--station-color': station.color })}
        role="region"
        aria-live="polite"
      >
        <h3 class="fs-panel__title">${station.name || t('محطة الجودة', 'Quality station')}</h3>
        ${station.shortDesc
          ? html`<p class="fs-panel__desc pql-detail__short">${station.shortDesc}</p>`
          : nothing}
        ${this.renderVideo(station)}
        ${!station.videoUrl && station.image
          ? html`<div class="pql-detail__media">
              <img src=${station.image} alt="" loading="lazy" decoding="async" />
            </div>`
          : nothing}
        ${station.detail ? html`<p class="pql-detail__body">${station.detail}</p>` : nothing}
        ${station.fact
          ? html`<div class="pql-callout">
              <p class="pql-callout__label">${this.factLabel}</p>
              <p class="pql-callout__text">${station.fact}</p>
            </div>`
          : nothing}
        ${station.certificate
          ? html`<div class="pql-cert">
              <p class="pql-cert__label">${this.certLabel}</p>
              <p class="pql-cert__text">${station.certificate}</p>
            </div>`
          : nothing}
      </article>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'pql_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.pql_title as string);
    const desc = localizedString(c.pql_desc as string);
    const stations = this.stations;
    const active = this.active;

    if (!stations.length) {
      return html`
        <section
          class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
          style=${styleMap(themeStyleMap(theme))}
          aria-label=${title || t('مختبر الجودة العطرية', 'Perfume quality lab')}
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
                'أضف محطات مختبر الجودة من إعدادات العنصر.',
                'Add quality lab stations in the element settings.'
              )}
              <p class="pql-empty-hint">
                ${t(
                  'أفكار مقترحة: مكونات، تركيز، مزج، تعتيق، عبوة، ثبات.',
                  'Suggested stations: ingredients, concentration, blending, aging, packaging, longevity.'
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
        aria-label=${title || t('مختبر الجودة العطرية', 'Perfume quality lab')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div class="pql-shell">
            <div
              class="pql-track"
              role="tablist"
              aria-label=${t('محطات الجودة', 'Quality stations')}
            >
              ${stations.map((station) => this.renderStep(station))}
            </div>
            ${active ? keyed(active.id, this.renderDetail(active)) : nothing}
          </div>
          ${renderCommerceOutcome({ config: c, prefix: 'pql_' })}
        </div>
      </section>
    `;
  }
}
