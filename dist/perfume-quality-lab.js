import { css as q, LitElement as x, html as t, nothing as i } from "lit";
import { property as y, state as $ } from "lit/decorators.js";
import { classMap as f } from "lit/directives/class-map.js";
import { keyed as w } from "lit/directives/keyed.js";
import { styleMap as m } from "lit/directives/style-map.js";
import { n as k, l as c, f as S, a as z, h as U, j as u, s as C, t as l, r as D, p as I, b as h, c as L } from "./commerceOutcome-CkVkQjOd.js";
const j = q`
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
    color: var(--text-color, #1f1a14);
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
    color: var(--muted-color, #6e6558);
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
    color: var(--text-color, #1f1a14);
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
    color: var(--text-color, #1f1a14);
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
    color: var(--muted-color, #6e6558);
  }

  .pql-cert__text {
    margin: 0;
    font-size: 0.84rem;
    line-height: 1.55;
    color: var(--text-color, #1f1a14);
  }

  .pql-empty-hint {
    margin-top: 0.35rem;
    font-size: 0.82rem;
    color: var(--muted-color, #6e6558);
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
function A(n) {
  const e = String(n ?? "").trim();
  if (!e) return "";
  const r = e.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]+)/i
  );
  if (r != null && r[1])
    return `https://www.youtube.com/embed/${r[1]}`;
  const o = e.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  return o != null && o[1] ? `https://player.vimeo.com/video/${o[1]}` : u(e) ? e : "";
}
function E(n) {
  const e = k(n).map((r, o) => {
    const a = c(r.name), s = String(r.video_url ?? r.videoUrl ?? "").trim();
    return {
      id: String(r.id ?? "").trim() || `station-${o + 1}`,
      name: a,
      shortDesc: c(r.short_desc),
      detail: c(r.detail),
      fact: c(r.fact),
      certificate: c(r.certificate),
      image: z(r.image),
      videoUrl: A(s) || s,
      color: String(r.color ?? "").trim() || "#9a7b4f",
      icon: String(r.icon ?? "").trim(),
      order: S(r.order, o + 1)
    };
  }).filter(
    (r) => r.name || r.shortDesc || r.detail || r.fact || r.image
  );
  return U(e, "order");
}
var O = Object.defineProperty, b = (n, e, r, o) => {
  for (var a = void 0, s = n.length - 1, p; s >= 0; s--)
    (p = n[s]) && (a = p(e, r, a) || a);
  return a && O(e, r, a), a;
};
const g = class g extends x {
  constructor() {
    super(...arguments), this.config = {}, this.activeId = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.ensureActive();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(e) {
    e.has("config") && this.ensureActive();
  }
  get stations() {
    var e;
    return E((e = this.config) == null ? void 0 : e.pql_stations);
  }
  get factLabel() {
    var e;
    return c((e = this.config) == null ? void 0 : e.pql_fact_label) || l("حقيقة", "Fact");
  }
  get certLabel() {
    var e;
    return c((e = this.config) == null ? void 0 : e.pql_cert_label) || l("شهادة الجودة", "Quality certificate");
  }
  ensureActive() {
    var r;
    const e = this.stations;
    e.some((o) => o.id === this.activeId) || (this.activeId = ((r = e[0]) == null ? void 0 : r.id) ?? "");
  }
  get active() {
    return this.stations.find((e) => e.id === this.activeId) ?? this.stations[0] ?? null;
  }
  select(e) {
    this.activeId = e;
  }
  renderBadge(e) {
    if (e.image)
      return t`<img src=${e.image} alt="" loading="lazy" decoding="async" />`;
    const r = e.icon.startsWith("sicon-");
    return e.icon ? r ? t`<span class=${e.icon}></span>` : t`<span>${e.icon}</span>` : t`<span aria-hidden="true">${(e.name || "•").slice(0, 1)}</span>`;
  }
  renderVideo(e) {
    return e.videoUrl ? u(e.videoUrl) && !e.videoUrl.includes("embed") ? t`
        <div class="pql-detail__media">
          <div class="pql-detail__video">
            <video src=${e.videoUrl} controls playsinline preload="metadata"></video>
          </div>
        </div>
      ` : t`
      <div class="pql-detail__media">
        <div class="pql-detail__video">
          <iframe
            src=${e.videoUrl}
            title=${e.name || l("فيديو المحطة", "Station video")}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    ` : i;
  }
  renderStep(e) {
    const r = e.id === this.activeId;
    return t`
      <button
        type="button"
        class=${f({ "pql-step": !0, "is-active": r, "fs-tap": !0 })}
        style=${m({ "--station-color": e.color })}
        aria-pressed=${r ? "true" : "false"}
        aria-controls="pql-detail"
        @click=${() => this.select(e.id)}
      >
        <span class="pql-step__badge">${this.renderBadge(e)}</span>
        <span>
          <p class="pql-step__name">${e.name || l("محطة", "Station")}</p>
          ${e.shortDesc ? t`<p class="pql-step__short">${e.shortDesc}</p>` : i}
        </span>
      </button>
    `;
  }
  renderDetail(e) {
    return t`
      <article
        id="pql-detail"
        class="pql-detail fs-panel fs-fade-swap"
        style=${m({ "--station-color": e.color })}
        role="region"
        aria-live="polite"
      >
        <h3 class="fs-panel__title">${e.name || l("محطة الجودة", "Quality station")}</h3>
        ${e.shortDesc ? t`<p class="fs-panel__desc pql-detail__short">${e.shortDesc}</p>` : i}
        ${this.renderVideo(e)}
        ${!e.videoUrl && e.image ? t`<div class="pql-detail__media">
              <img src=${e.image} alt="" loading="lazy" decoding="async" />
            </div>` : i}
        ${e.detail ? t`<p class="pql-detail__body">${e.detail}</p>` : i}
        ${e.fact ? t`<div class="pql-callout">
              <p class="pql-callout__label">${this.factLabel}</p>
              <p class="pql-callout__text">${e.fact}</p>
            </div>` : i}
        ${e.certificate ? t`<div class="pql-cert">
              <p class="pql-cert__label">${this.certLabel}</p>
              <p class="pql-cert__text">${e.certificate}</p>
            </div>` : i}
      </article>
    `;
  }
  render() {
    const e = this.config || {}, r = D(e, "pql_"), o = r.animate && !I(), a = c(e.pql_title), s = c(e.pql_desc), p = this.stations, v = this.active;
    return p.length ? t`
      <section
        class=${f({ "fs-section": !0, "fs-animate": o })}
        style=${m(h(r))}
        aria-label=${a || l("مختبر الجودة العطرية", "Perfume quality lab")}
      >
        <div class="fs-container">
          ${a || s ? t`<div class="fs-header">
                ${a ? t`<h2 class="fs-title">${a}</h2>` : i}
                ${s ? t`<p class="fs-desc">${s}</p>` : i}
              </div>` : i}

          <div class="pql-shell">
            <div
              class="pql-track"
              role="tablist"
              aria-label=${l("محطات الجودة", "Quality stations")}
            >
              ${p.map((_) => this.renderStep(_))}
            </div>
            ${v ? w(v.id, this.renderDetail(v)) : i}
          </div>
          ${L({ config: e, prefix: "pql_" })}
        </div>
      </section>
    ` : t`
        <section
          class=${f({ "fs-section": !0, "fs-animate": o })}
          style=${m(h(r))}
          aria-label=${a || l("مختبر الجودة العطرية", "Perfume quality lab")}
        >
          <div class="fs-container">
            ${a || s ? t`<div class="fs-header">
                  ${a ? t`<h2 class="fs-title">${a}</h2>` : i}
                  ${s ? t`<p class="fs-desc">${s}</p>` : i}
                </div>` : i}
            <div class="fs-empty" role="status">
              ${l(
      "أضف محطات مختبر الجودة من إعدادات العنصر.",
      "Add quality lab stations in the element settings."
    )}
              <p class="pql-empty-hint">
                ${l(
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
g.styles = [C, j];
let d = g;
b([
  y({ type: Object })
], d.prototype, "config");
b([
  $()
], d.prototype, "activeId");
typeof d < "u" && d.registerSallaComponent("salla-perfume-quality-lab");
export {
  d as default
};
