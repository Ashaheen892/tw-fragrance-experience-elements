var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { keyed } from "lit/directives/keyed.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, f as toNumber, d as clamp, g as getRadioValue, o as getPageLocale, s as sharedSectionCss, t, r as readSectionTheme, p as prefersReducedMotion, q as isTruthy, b as themeStyleMap, c as renderCommerceOutcome } from "./commerceOutcome-DYfJre3y.js";
const componentStyles = css`
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
`, INTENSITY_LABELS = {
  light: { ar: "خفيف", en: "Light" },
  daily: { ar: "يومي", en: "Daily" },
  strong: { ar: "قوي", en: "Strong" },
  event: { ar: "مناسبة", en: "Event" }
};
function isEn() {
  return getPageLocale() === "en";
}
__name(isEn, "isEn");
function resolveIntensity(raw) {
  const value = getRadioValue(raw, "daily").toLowerCase().trim();
  if (value in INTENSITY_LABELS) {
    const key = value;
    return { key, label: isEn() ? INTENSITY_LABELS[key].en : INTENSITY_LABELS[key].ar };
  }
  const num = toNumber(value, NaN);
  return Number.isFinite(num) ? { key: "custom", label: String(num) } : { key: "daily", label: isEn() ? INTENSITY_LABELS.daily.en : INTENSITY_LABELS.daily.ar };
}
__name(resolveIntensity, "resolveIntensity");
function parseRituals(raw) {
  return normalizeCollection(raw).map((row, index) => {
    const intensity = resolveIntensity(row.intensity);
    return {
      id: `ritual-${index}`,
      name: localizedString(row.name),
      intensity: intensity.key,
      intensityLabel: intensity.label,
      spraysCount: Math.max(0, toNumber(row.sprays_count, 0)),
      zones: localizedString(row.zones),
      distance: localizedString(row.distance),
      tips: localizedString(row.tips),
      color: localizedString(row.color) || "#9a7b4f"
    };
  }).filter((ritual) => ritual.name || ritual.zones || ritual.tips);
}
__name(parseRituals, "parseRituals");
function parseZones(raw) {
  return normalizeCollection(raw).map((row, index) => ({
    id: `zone-${index}`,
    label: localizedString(row.label),
    x: clamp(toNumber(row.x, 50), 0, 100),
    y: clamp(toNumber(row.y, 50), 0, 100),
    tip: localizedString(row.tip)
  })).filter((zone) => zone.label || zone.tip);
}
__name(parseZones, "parseZones");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _SprayRitualGuide = class _SprayRitualGuide extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.activeRitualId = "", this.activeZoneId = "", this.boundLangHandler = () => this.requestUpdate();
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
  get rituals() {
    var _a;
    return parseRituals((_a = this.config) == null ? void 0 : _a.srg_rituals);
  }
  get zones() {
    var _a;
    return parseZones((_a = this.config) == null ? void 0 : _a.srg_zones);
  }
  ensureActive() {
    var _a;
    const rituals = this.rituals;
    rituals.some((r) => r.id === this.activeRitualId) || (this.activeRitualId = ((_a = rituals[0]) == null ? void 0 : _a.id) ?? "");
    const zones = this.zones;
    this.activeZoneId && !zones.some((z) => z.id === this.activeZoneId) && (this.activeZoneId = "");
  }
  get activeRitual() {
    return this.rituals.find((r) => r.id === this.activeRitualId) ?? this.rituals[0] ?? null;
  }
  get activeZone() {
    return this.zones.find((z) => z.id === this.activeZoneId) ?? null;
  }
  selectRitual(id) {
    this.activeRitualId = id;
  }
  selectZone(id) {
    this.activeZoneId = this.activeZoneId === id ? "" : id;
  }
  renderZoneDot(zone, index) {
    const active = zone.id === this.activeZoneId;
    return html`
      <button
        type="button"
        class=${classMap({ "srg-dot": !0, "is-active": active, "fs-tap": !0 })}
        style=${styleMap({ left: `${zone.x}%`, top: `${zone.y}%` })}
        aria-pressed=${active ? "true" : "false"}
        aria-label=${zone.label || t("منطقة", "Zone")}
        title=${zone.label}
        @click=${() => this.selectZone(zone.id)}
      >
        ${index + 1}
      </button>
    `;
  }
  renderBody(showBody) {
    if (!showBody || !this.zones.length) return nothing;
    const activeZone = this.activeZone;
    return html`
      <div class="srg-body-wrap">
        <div class="srg-body" role="img" aria-label=${t("مناطق الرش على الجسم", "Body spray zones")}>
          <div class="srg-body__silhouette" aria-hidden="true"></div>
          ${this.zones.map((zone, index) => this.renderZoneDot(zone, index))}
        </div>
        ${activeZone != null && activeZone.tip ? keyed(activeZone.id, html`<p class="srg-zone-tip fs-fade-swap">
              ${activeZone.label ? html`<span class="srg-zone-tip__label">${activeZone.label}</span> ` : nothing}${activeZone.tip}
            </p>`) : html`<p class="srg-zone-tip">
              ${t("اضغط على نقطة لعرض نصيحة المنطقة.", "Tap a dot to see zone tips.")}
            </p>`}
      </div>
    `;
  }
  renderRitualCard(ritual) {
    const active = ritual.id === this.activeRitualId;
    return html`
      <button
        type="button"
        class=${classMap({ "srg-card": !0, "is-active": active, "fs-tap": !0 })}
        style=${styleMap({ "--rit-color": ritual.color })}
        aria-pressed=${active ? "true" : "false"}
        @click=${() => this.selectRitual(ritual.id)}
      >
        <div class="srg-card__head">
          <h3 class="srg-card__name">${ritual.name || t("طقس الرش", "Spray ritual")}</h3>
          <span class="srg-card__intensity">${ritual.intensityLabel}</span>
        </div>
        <div class="srg-card__meta">
          ${ritual.spraysCount ? html`<span><span class="srg-card__meta-label">${t("عدد الرشات", "Sprays")}</span> ${ritual.spraysCount}</span>` : nothing}
          ${ritual.zones ? html`<span><span class="srg-card__meta-label">${t("المناطق", "Zones")}</span> ${ritual.zones}</span>` : nothing}
          ${ritual.distance ? html`<span><span class="srg-card__meta-label">${t("المسافة", "Distance")}</span> ${ritual.distance}</span>` : nothing}
        </div>
        ${active && ritual.tips ? keyed(`${ritual.id}-tips`, html`<p class="srg-card__tips fs-fade-swap">${ritual.tips}</p>`) : nothing}
      </button>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "srg_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.srg_title), desc = localizedString(c.srg_desc), rituals = this.rituals, showBody = isTruthy(c.srg_show_body, !1);
    return rituals.length ? html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("دليل قوة الاستخدام", "Spray ritual guide")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div class="srg-shell">
            ${this.renderBody(showBody)}
            <div class="srg-cards" role="list">
              ${rituals.map((ritual) => this.renderRitualCard(ritual))}
            </div>
          </div>
          ${renderCommerceOutcome({ config: c, prefix: "srg_" })}
        </div>
      </section>
    ` : html`<div class="fs-empty" role="status">
        ${t(
      "أضف طقوس الرش من إعدادات العنصر.",
      "Add spray rituals in the element settings."
    )}
      </div>`;
  }
};
__name(_SprayRitualGuide, "SprayRitualGuide"), _SprayRitualGuide.styles = [sharedSectionCss, componentStyles];
let SprayRitualGuide = _SprayRitualGuide;
__decorateClass([
  property({ type: Object })
], SprayRitualGuide.prototype, "config");
__decorateClass([
  state()
], SprayRitualGuide.prototype, "activeRitualId");
__decorateClass([
  state()
], SprayRitualGuide.prototype, "activeZoneId");
typeof SprayRitualGuide < "u" && SprayRitualGuide.registerSallaComponent("salla-spray-ritual-guide");
export {
  SprayRitualGuide as default
};
