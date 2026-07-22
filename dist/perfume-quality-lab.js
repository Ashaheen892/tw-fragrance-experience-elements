var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { keyed } from "lit/directives/keyed.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, f as toNumber, a as extractImageUrl, h as sortByOrder, j as isDirectMediaUrl, s as sharedSectionCss, t, r as readSectionTheme, p as prefersReducedMotion, b as themeStyleMap, c as renderCommerceOutcome } from "./commerceOutcome-DYfJre3y.js";
const componentStyles = css`
  :host {
    direction: inherit;
  }

  .pql-shell {
    display: grid;
    gap: 1rem;
  }

  @media (min-width: 960px) {
    .pql-shell {
      grid-template-columns: minmax(0, 300px) minmax(0, 1fr);
      align-items: start;
    }
  }

  .pql-track {
    display: flex;
    gap: 0.65rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x proximity;
    padding-bottom: 0.35rem;
  }

  @media (min-width: 960px) {
    .pql-track {
      flex-direction: column;
      overflow: visible;
      scroll-snap-type: none;
      padding-bottom: 0;
      position: relative;
    }

    .pql-track::before {
      content: '';
      position: absolute;
      inset-inline-start: 1.05rem;
      top: 0.5rem;
      bottom: 0.5rem;
      width: 2px;
      background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, var(--border-color, #e6e0d6));
      border-radius: 999px;
    }
  }

  .pql-step {
    flex: 0 0 auto;
    min-width: 8.75rem;
    scroll-snap-align: start;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 0.65rem;
    min-height: 44px;
    padding: 0.95rem 1rem;
    border-radius: calc(var(--section-radius, 20px) * 0.85);
    border: 1.5px solid color-mix(in srgb, var(--border-color, #e6e0d6) 82%, transparent);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    text-align: start;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.05);
    transition:
      border-color 0.24s ease,
      box-shadow 0.24s ease,
      transform 0.24s ease,
      background 0.24s ease;
  }

  @media (min-width: 960px) {
    .pql-step {
      min-width: 0;
      position: relative;
      z-index: 1;
    }
  }

  .pql-step:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--station-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .pql-step.is-active {
    border-color: var(--station-color, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--station-color, var(--accent-color, var(--fs-store-primary))) 9%,
      var(--card-bg, #fff)
    );
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--station-color, var(--accent-color, var(--fs-store-primary))) 18%, transparent),
      0 12px 28px rgba(90, 70, 40, 0.1);
    transform: translateY(-2px);
  }

  .pql-step:active {
    transform: translateY(0);
  }

  .pql-step__badge {
    width: 2.15rem;
    height: 2.15rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: color-mix(in srgb, var(--station-color, var(--accent-color, var(--fs-store-primary))) 16%, var(--card-bg, #fff));
    color: var(--station-color, var(--accent-color, var(--fs-store-primary)));
    font-size: 0.95rem;
    overflow: hidden;
  }

  .pql-step__badge img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .pql-step__name {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 800;
    line-height: 1.35;
  }

  .pql-step__short {
    margin: 0.15rem 0 0;
    font-size: 0.76rem;
    color: var(--muted-color, #666666);
    line-height: 1.4;
  }

  .pql-detail {
    border-color: color-mix(
      in srgb,
      var(--station-color, var(--accent-color, var(--fs-store-primary))) 24%,
      var(--border-color, #e6e0d6)
    );
  }

  .pql-detail__media {
    margin-bottom: 0.85rem;
    border-radius: calc(var(--section-radius, 20px) * 0.55);
    overflow: hidden;
  }

  .pql-detail__media img {
    display: block;
    width: 100%;
    max-height: 220px;
    object-fit: cover;
  }

  .pql-detail__video {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    background: color-mix(in srgb, var(--border-color, #e6e0d6) 40%, var(--text-color, #1f1a14));
  }

  .pql-detail__video iframe,
  .pql-detail__video video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
    object-fit: cover;
  }

  .pql-detail__body {
    margin: 0 0 0.85rem;
    color: var(--text-color, #000000);
    font-size: 0.92rem;
    line-height: 1.68;
  }

  .pql-callout {
    margin-bottom: 0.75rem;
    padding: 0.95rem 1rem;
    border-radius: calc(var(--section-radius, 20px) * 0.55);
    border-inline-start: 4px solid var(--station-color, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(in srgb, var(--station-color, var(--accent-color, var(--fs-store-primary))) 8%, var(--card-bg, #fff));
  }

  .pql-callout__label {
    margin: 0 0 0.35rem;
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--station-color, var(--accent-color, var(--fs-store-primary)));
  }

  .pql-callout__text {
    margin: 0;
    font-size: 0.88rem;
    line-height: 1.6;
    color: var(--text-color, #000000);
  }

  .pql-cert {
    padding: 0.85rem 0.95rem;
    border-radius: calc(var(--section-radius, 20px) * 0.55);
    border: 1px dashed color-mix(in srgb, var(--station-color, var(--accent-color, var(--fs-store-primary))) 40%, var(--border-color, #e6e0d6));
    background: color-mix(in srgb, var(--card-bg, #fff) 92%, var(--station-color, var(--accent-color, var(--fs-store-primary))));
  }

  .pql-cert__label {
    margin: 0 0 0.3rem;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted-color, #666666);
  }

  .pql-cert__text {
    margin: 0;
    font-size: 0.84rem;
    line-height: 1.55;
    color: var(--text-color, #000000);
  }

  .pql-empty-hint {
    margin-top: 0.35rem;
    font-size: 0.82rem;
    color: var(--muted-color, #666666);
  }

  @media (prefers-reduced-motion: reduce) {
    .pql-step {
      transition: none;
    }

    .pql-step:hover,
    .pql-step.is-active {
      transform: none;
    }
  }
`;
function resolveVideoEmbed(url) {
  const trimmed = String(url ?? "").trim();
  if (!trimmed) return "";
  const ytMatch = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]+)/i
  );
  if (ytMatch != null && ytMatch[1])
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  return vimeoMatch != null && vimeoMatch[1] ? `https://player.vimeo.com/video/${vimeoMatch[1]}` : isDirectMediaUrl(trimmed) ? trimmed : "";
}
__name(resolveVideoEmbed, "resolveVideoEmbed");
function parseStations(raw) {
  const items = normalizeCollection(raw).map((item, i) => {
    const name = localizedString(item.name), videoRaw = String(item.video_url ?? item.videoUrl ?? "").trim();
    return {
      id: String(item.id ?? "").trim() || `station-${i + 1}`,
      name,
      shortDesc: localizedString(item.short_desc),
      detail: localizedString(item.detail),
      fact: localizedString(item.fact),
      certificate: localizedString(item.certificate),
      image: extractImageUrl(item.image),
      videoUrl: resolveVideoEmbed(videoRaw) || videoRaw,
      color: String(item.color ?? "").trim() || "#9a7b4f",
      icon: String(item.icon ?? "").trim(),
      order: toNumber(item.order, i + 1)
    };
  }).filter(
    (station) => station.name || station.shortDesc || station.detail || station.fact || station.image
  );
  return sortByOrder(items, "order");
}
__name(parseStations, "parseStations");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _PerfumeQualityLab = class _PerfumeQualityLab extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.activeId = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.ensureActive();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && this.ensureActive();
  }
  get stations() {
    var _a;
    return parseStations((_a = this.config) == null ? void 0 : _a.pql_stations);
  }
  get factLabel() {
    var _a;
    return localizedString((_a = this.config) == null ? void 0 : _a.pql_fact_label) || t("حقيقة", "Fact");
  }
  get certLabel() {
    var _a;
    return localizedString((_a = this.config) == null ? void 0 : _a.pql_cert_label) || t("شهادة الجودة", "Quality certificate");
  }
  ensureActive() {
    var _a;
    const list = this.stations;
    list.some((s) => s.id === this.activeId) || (this.activeId = ((_a = list[0]) == null ? void 0 : _a.id) ?? "");
  }
  get active() {
    return this.stations.find((s) => s.id === this.activeId) ?? this.stations[0] ?? null;
  }
  select(id) {
    this.activeId = id;
  }
  renderBadge(station) {
    if (station.image)
      return html`<img src=${station.image} alt="" loading="lazy" decoding="async" />`;
    const isSicon = station.icon.startsWith("sicon-");
    return station.icon ? isSicon ? html`<span class=${station.icon}></span>` : html`<span>${station.icon}</span>` : html`<span aria-hidden="true">${(station.name || "•").slice(0, 1)}</span>`;
  }
  renderVideo(station) {
    return station.videoUrl ? isDirectMediaUrl(station.videoUrl) && !station.videoUrl.includes("embed") ? html`
        <div class="pql-detail__media">
          <div class="pql-detail__video">
            <video src=${station.videoUrl} controls playsinline preload="metadata"></video>
          </div>
        </div>
      ` : html`
      <div class="pql-detail__media">
        <div class="pql-detail__video">
          <iframe
            src=${station.videoUrl}
            title=${station.name || t("فيديو المحطة", "Station video")}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    ` : nothing;
  }
  renderStep(station) {
    const active = station.id === this.activeId;
    return html`
      <button
        type="button"
        class=${classMap({ "pql-step": !0, "is-active": active, "fs-tap": !0 })}
        style=${styleMap({ "--station-color": station.color })}
        aria-pressed=${active ? "true" : "false"}
        aria-controls="pql-detail"
        @click=${() => this.select(station.id)}
      >
        <span class="pql-step__badge">${this.renderBadge(station)}</span>
        <span>
          <p class="pql-step__name">${station.name || t("محطة", "Station")}</p>
          ${station.shortDesc ? html`<p class="pql-step__short">${station.shortDesc}</p>` : nothing}
        </span>
      </button>
    `;
  }
  renderDetail(station) {
    return html`
      <article
        id="pql-detail"
        class="pql-detail fs-panel fs-fade-swap"
        style=${styleMap({ "--station-color": station.color })}
        role="region"
        aria-live="polite"
      >
        <h3 class="fs-panel__title">${station.name || t("محطة الجودة", "Quality station")}</h3>
        ${station.shortDesc ? html`<p class="fs-panel__desc pql-detail__short">${station.shortDesc}</p>` : nothing}
        ${this.renderVideo(station)}
        ${!station.videoUrl && station.image ? html`<div class="pql-detail__media">
              <img src=${station.image} alt="" loading="lazy" decoding="async" />
            </div>` : nothing}
        ${station.detail ? html`<p class="pql-detail__body">${station.detail}</p>` : nothing}
        ${station.fact ? html`<div class="pql-callout">
              <p class="pql-callout__label">${this.factLabel}</p>
              <p class="pql-callout__text">${station.fact}</p>
            </div>` : nothing}
        ${station.certificate ? html`<div class="pql-cert">
              <p class="pql-cert__label">${this.certLabel}</p>
              <p class="pql-cert__text">${station.certificate}</p>
            </div>` : nothing}
      </article>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "pql_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.pql_title), desc = localizedString(c.pql_desc), stations = this.stations, active = this.active;
    return stations.length ? html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("مختبر الجودة العطرية", "Perfume quality lab")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div class="pql-shell">
            <div
              class="pql-track"
              role="tablist"
              aria-label=${t("محطات الجودة", "Quality stations")}
            >
              ${stations.map((station) => this.renderStep(station))}
            </div>
            ${active ? keyed(active.id, this.renderDetail(active)) : nothing}
          </div>
          ${renderCommerceOutcome({ config: c, prefix: "pql_" })}
        </div>
      </section>
    ` : html`
        <section
          class=${classMap({ "fs-section": !0, "fs-animate": animate })}
          style=${styleMap(themeStyleMap(theme))}
          aria-label=${title || t("مختبر الجودة العطرية", "Perfume quality lab")}
        >
          <div class="fs-container">
            ${title || desc ? html`<div class="fs-header">
                  ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                  ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
                </div>` : nothing}
            <div class="fs-empty" role="status">
              ${t(
      "أضف محطات مختبر الجودة من إعدادات العنصر.",
      "Add quality lab stations in the element settings."
    )}
              <p class="pql-empty-hint">
                ${t(
      "أفكار مقترحة: مكونات، تركيز، مزج، تعتيق، عبوة، ثبات.",
      "Suggested stations: ingredients, concentration, blending, aging, packaging, longevity."
    )}
              </p>
            </div>
          </div>
        </section>
      `;
  }
};
__name(_PerfumeQualityLab, "PerfumeQualityLab"), _PerfumeQualityLab.styles = [sharedSectionCss, componentStyles];
let PerfumeQualityLab = _PerfumeQualityLab;
__decorateClass([
  property({ type: Object })
], PerfumeQualityLab.prototype, "config");
__decorateClass([
  state()
], PerfumeQualityLab.prototype, "activeId");
typeof PerfumeQualityLab < "u" && PerfumeQualityLab.registerSallaComponent("salla-perfume-quality-lab");
export {
  PerfumeQualityLab as default
};
