import { css as k, LitElement as I, html as t, nothing as i } from "lit";
import { property as Z, state as _ } from "lit/decorators.js";
import { classMap as f } from "lit/directives/class-map.js";
import { keyed as h } from "lit/directives/keyed.js";
import { styleMap as v } from "lit/directives/style-map.js";
import { n as $, l as n, f as m, d as y, g as C, o as L, s as R, t as o, r as S, p as E, q as N, b as A, c as B } from "./commerceOutcome-CCLcV5SW.js";
const M = k`
  :host {
    direction: inherit;
  }

  .srg-shell {
    display: grid;
    gap: 1rem;
  }

  .srg-body-wrap {
    border-radius: var(--section-radius, 20px);
    border: 1px solid var(--border-color, #e6e0d6);
    background: var(--card-bg, #fff);
    padding: 1.05rem 1.1rem;
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.08);
  }

  .srg-body {
    position: relative;
    aspect-ratio: 2 / 3;
    max-width: 16rem;
    margin: 0 auto;
    border-radius: calc(var(--section-radius, 20px) * 0.75);
    background:
      radial-gradient(
        80% 70% at 50% 18%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff)),
        transparent 70%
      ),
      linear-gradient(
        180deg,
        color-mix(in srgb, var(--border-color, #e6e0d6) 35%, var(--card-bg, #fff)),
        var(--card-bg, #fff)
      );
    overflow: hidden;
  }

  .srg-body__silhouette {
    position: absolute;
    inset: 8% 22%;
    border-radius: 45% 45% 38% 38%;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, var(--card-bg, #fff));
    border: 1px dashed color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, var(--border-color, #e6e0d6));
  }

  .srg-dot {
    position: absolute;
    width: 2.75rem;
    height: 2.75rem;
    min-width: 44px;
    min-height: 44px;
    border-radius: 50%;
    border: 2px solid var(--card-bg, #fff);
    background: var(--accent-color, var(--fs-store-primary));
    color: var(--button-color, #fff);
    font-size: 0.62rem;
    font-weight: 800;
    display: grid;
    place-items: center;
    cursor: pointer;
    transform: translate(-50%, -50%);
    box-shadow: 0 6px 14px rgba(90, 70, 40, 0.14);
    transition: transform 0.24s ease, box-shadow 0.24s ease;
  }

  .srg-dot:hover {
    transform: translate(-50%, calc(-50% - 2px));
    box-shadow: 0 10px 22px rgba(90, 70, 40, 0.16);
  }

  .srg-dot.is-active {
    transform: translate(-50%, calc(-50% - 2px)) scale(1.06);
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 18%, transparent),
      0 10px 22px rgba(90, 70, 40, 0.18);
  }

  .srg-zone-tip {
    margin: 0.65rem 0 0;
    padding: 0.85rem 0.95rem;
    border-radius: calc(var(--section-radius, 20px) * 0.55);
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 20%, var(--border-color, #e6e0d6));
    font-size: 0.86rem;
    line-height: 1.55;
    color: var(--text-color, #000000);
  }

  .srg-zone-tip__label {
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .srg-cards {
    display: grid;
    gap: 0.65rem;
  }

  .srg-card {
    display: grid;
    gap: 0.55rem;
    min-height: 44px;
    padding: 1.05rem 1.1rem;
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

  .srg-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--rit-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .srg-card.is-active {
    border-color: var(--rit-color, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--rit-color, var(--accent-color, var(--fs-store-primary))) 9%,
      var(--card-bg, #fff)
    );
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--rit-color, var(--accent-color, var(--fs-store-primary))) 18%, transparent),
      0 12px 28px rgba(90, 70, 40, 0.1);
    transform: translateY(-2px);
  }

  .srg-card:active {
    transform: translateY(0);
  }

  .srg-card__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.65rem;
  }

  .srg-card__name {
    margin: 0;
    font-size: 0.96rem;
    font-weight: 800;
  }

  .srg-card__intensity {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    padding: 0.2rem 0.55rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--rit-color, var(--accent-color, var(--fs-store-primary))) 14%, var(--card-bg, #fff));
    color: var(--rit-color, var(--accent-color, var(--fs-store-primary)));
  }

  .srg-card__meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem 0.75rem;
    font-size: 0.82rem;
    color: var(--muted-color, #666666);
  }

  .srg-card__meta-label {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--text-color, #000000);
  }

  .srg-card__tips {
    margin: 0;
    font-size: 0.86rem;
    line-height: 1.6;
    color: var(--muted-color, #666666);
  }

  @media (min-width: 960px) {
    .srg-shell {
      grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
      align-items: start;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .srg-card,
    .srg-dot {
      transition: none;
    }

    .srg-card:hover,
    .srg-card.is-active,
    .srg-dot:hover,
    .srg-dot.is-active {
      transform: none;
    }
  }
`, g = {
  light: { ar: "خفيف", en: "Light" },
  daily: { ar: "يومي", en: "Daily" },
  strong: { ar: "قوي", en: "Strong" },
  event: { ar: "مناسبة", en: "Event" }
};
function x() {
  return L() === "en";
}
function T(c) {
  const r = C(c, "daily").toLowerCase().trim();
  if (r in g) {
    const a = r;
    return { key: a, label: x() ? g[a].en : g[a].ar };
  }
  const e = m(r, NaN);
  return Number.isFinite(e) ? { key: "custom", label: String(e) } : { key: "daily", label: x() ? g.daily.en : g.daily.ar };
}
function D(c) {
  return $(c).map((r, e) => {
    const a = T(r.intensity);
    return {
      id: `ritual-${e}`,
      name: n(r.name),
      intensity: a.key,
      intensityLabel: a.label,
      spraysCount: Math.max(0, m(r.sprays_count, 0)),
      zones: n(r.zones),
      distance: n(r.distance),
      tips: n(r.tips),
      color: n(r.color) || "#9a7b4f"
    };
  }).filter((r) => r.name || r.zones || r.tips);
}
function Y(c) {
  return $(c).map((r, e) => ({
    id: `zone-${e}`,
    label: n(r.label),
    x: y(m(r.x, 50), 0, 100),
    y: y(m(r.y, 50), 0, 100),
    tip: n(r.tip)
  })).filter((r) => r.label || r.tip);
}
var j = Object.defineProperty, b = (c, r, e, a) => {
  for (var s = void 0, d = c.length - 1, p; d >= 0; d--)
    (p = c[d]) && (s = p(r, e, s) || s);
  return s && j(r, e, s), s;
};
const u = class u extends I {
  constructor() {
    super(...arguments), this.config = {}, this.activeRitualId = "", this.activeZoneId = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.ensureActive();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(r) {
    r.has("config") && this.ensureActive();
  }
  get rituals() {
    var r;
    return D((r = this.config) == null ? void 0 : r.srg_rituals);
  }
  get zones() {
    var r;
    return Y((r = this.config) == null ? void 0 : r.srg_zones);
  }
  ensureActive() {
    var a;
    const r = this.rituals;
    r.some((s) => s.id === this.activeRitualId) || (this.activeRitualId = ((a = r[0]) == null ? void 0 : a.id) ?? "");
    const e = this.zones;
    this.activeZoneId && !e.some((s) => s.id === this.activeZoneId) && (this.activeZoneId = "");
  }
  get activeRitual() {
    return this.rituals.find((r) => r.id === this.activeRitualId) ?? this.rituals[0] ?? null;
  }
  get activeZone() {
    return this.zones.find((r) => r.id === this.activeZoneId) ?? null;
  }
  selectRitual(r) {
    this.activeRitualId = r;
  }
  selectZone(r) {
    this.activeZoneId = this.activeZoneId === r ? "" : r;
  }
  renderZoneDot(r, e) {
    const a = r.id === this.activeZoneId;
    return t`
      <button
        type="button"
        class=${f({ "srg-dot": !0, "is-active": a, "fs-tap": !0 })}
        style=${v({ left: `${r.x}%`, top: `${r.y}%` })}
        aria-pressed=${a ? "true" : "false"}
        aria-label=${r.label || o("منطقة", "Zone")}
        title=${r.label}
        @click=${() => this.selectZone(r.id)}
      >
        ${e + 1}
      </button>
    `;
  }
  renderBody(r) {
    if (!r || !this.zones.length) return i;
    const e = this.activeZone;
    return t`
      <div class="srg-body-wrap">
        <div class="srg-body" role="img" aria-label=${o("مناطق الرش على الجسم", "Body spray zones")}>
          <div class="srg-body__silhouette" aria-hidden="true"></div>
          ${this.zones.map((a, s) => this.renderZoneDot(a, s))}
        </div>
        ${e != null && e.tip ? h(e.id, t`<p class="srg-zone-tip fs-fade-swap">
              ${e.label ? t`<span class="srg-zone-tip__label">${e.label}</span> ` : i}${e.tip}
            </p>`) : t`<p class="srg-zone-tip">
              ${o("اضغط على نقطة لعرض نصيحة المنطقة.", "Tap a dot to see zone tips.")}
            </p>`}
      </div>
    `;
  }
  renderRitualCard(r) {
    const e = r.id === this.activeRitualId;
    return t`
      <button
        type="button"
        class=${f({ "srg-card": !0, "is-active": e, "fs-tap": !0 })}
        style=${v({ "--rit-color": r.color })}
        aria-pressed=${e ? "true" : "false"}
        @click=${() => this.selectRitual(r.id)}
      >
        <div class="srg-card__head">
          <h3 class="srg-card__name">${r.name || o("طقس الرش", "Spray ritual")}</h3>
          <span class="srg-card__intensity">${r.intensityLabel}</span>
        </div>
        <div class="srg-card__meta">
          ${r.spraysCount ? t`<span><span class="srg-card__meta-label">${o("عدد الرشات", "Sprays")}</span> ${r.spraysCount}</span>` : i}
          ${r.zones ? t`<span><span class="srg-card__meta-label">${o("المناطق", "Zones")}</span> ${r.zones}</span>` : i}
          ${r.distance ? t`<span><span class="srg-card__meta-label">${o("المسافة", "Distance")}</span> ${r.distance}</span>` : i}
        </div>
        ${e && r.tips ? h(`${r.id}-tips`, t`<p class="srg-card__tips fs-fade-swap">${r.tips}</p>`) : i}
      </button>
    `;
  }
  render() {
    const r = this.config || {}, e = S(r, "srg_"), a = e.animate && !E(), s = n(r.srg_title), d = n(r.srg_desc), p = this.rituals, w = N(r.srg_show_body, !1);
    return p.length ? t`
      <section
        class=${f({ "fs-section": !0, "fs-animate": a })}
        style=${v(A(e))}
        aria-label=${s || o("دليل قوة الاستخدام", "Spray ritual guide")}
      >
        <div class="fs-container">
          ${s || d ? t`<div class="fs-header">
                ${s ? t`<h2 class="fs-title">${s}</h2>` : i}
                ${d ? t`<p class="fs-desc">${d}</p>` : i}
              </div>` : i}

          <div class="srg-shell">
            ${this.renderBody(w)}
            <div class="srg-cards" role="list">
              ${p.map((z) => this.renderRitualCard(z))}
            </div>
          </div>
          ${B({ config: r, prefix: "srg_" })}
        </div>
      </section>
    ` : t`<div class="fs-empty" role="status">
        ${o(
      "أضف طقوس الرش من إعدادات العنصر.",
      "Add spray rituals in the element settings."
    )}
      </div>`;
  }
};
u.styles = [R, M];
let l = u;
b([
  Z({ type: Object })
], l.prototype, "config");
b([
  _()
], l.prototype, "activeRitualId");
b([
  _()
], l.prototype, "activeZoneId");
typeof l < "u" && l.registerSallaComponent("salla-spray-ritual-guide");
export {
  l as default
};
