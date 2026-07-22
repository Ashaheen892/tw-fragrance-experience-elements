var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { keyed } from "lit/directives/keyed.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, e as extractLink, a as extractImageUrl, g as getRadioValue, s as sharedSectionCss, i as isExternalUrl, t, r as readSectionTheme, p as prefersReducedMotion, b as themeStyleMap, c as renderCommerceOutcome } from "./commerceOutcome-DYfJre3y.js";
const componentStyles = css`
  .ffm-shell {
    display: grid;
    gap: 1rem;
    align-items: start;
    max-width: 1080px;
    margin-inline: auto;
  }

  @media (min-width: 900px) {
    .ffm-shell {
      grid-template-columns: minmax(240px, 0.9fr) minmax(0, 1.2fr);
      gap: 1.15rem;
    }
  }

  .ffm-selector {
    padding: 1.1rem 1.15rem;
    border-radius: var(--section-radius, 20px);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, var(--section-bg, transparent));
    border: 1px solid color-mix(in srgb, var(--border-color, #e6e0d6) 88%, #fff);
    box-shadow: 0 10px 28px rgba(90, 70, 40, 0.08);
  }

  .ffm-selector__label {
    margin: 0 0 0.75rem;
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted-color, #666666);
  }

  .ffm-chips {
    display: grid;
    gap: 0.65rem;
  }

  .ffm-chips--grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 900px) {
    .ffm-chips--grid {
      grid-template-columns: 1fr;
    }
  }

  .ffm-chip {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.65rem;
    min-height: 52px;
    padding: 0.65rem 0.85rem;
    border: 1.5px solid var(--border-color, #e6e0d6);
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    text-align: start;
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.05);
    transition:
      transform 0.24s ease,
      border-color 0.24s ease,
      box-shadow 0.24s ease,
      background 0.24s ease;
  }

  .ffm-chip:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--fam-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .ffm-chip.is-active {
    border-color: var(--fam-color, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--fam-color, var(--accent-color, var(--fs-store-primary))) 9%,
      var(--card-bg, #fff)
    );
    box-shadow:
      0 0 0 3px color-mix(
        in srgb,
        var(--fam-color, var(--accent-color, var(--fs-store-primary))) 18%,
        transparent
      ),
      0 12px 28px rgba(90, 70, 40, 0.1);
  }

  .ffm-chip:active {
    transform: translateY(0);
  }

  .ffm-chip__swatch {
    width: 2.15rem;
    height: 2.15rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--fam-color, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
    font-size: 1rem;
    overflow: hidden;
  }

  .ffm-chip__swatch img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .ffm-chip__name {
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ffm-chip__dot {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: transparent;
    box-shadow: inset 0 0 0 1.5px color-mix(in srgb, var(--muted-color, #6e6558) 55%, transparent);
  }

  .ffm-chip.is-active .ffm-chip__dot {
    background: var(--fam-color, var(--accent-color, var(--fs-store-primary)));
    box-shadow: none;
  }

  .ffm-chips--wheel {
    position: relative;
    min-height: 280px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0.65rem;
    padding: 1.5rem 0.5rem;
  }

  .ffm-wheel-core {
    position: absolute;
    inset: 50% auto auto 50%;
    transform: translate(-50%, -50%);
    width: 4.5rem;
    height: 4.5rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, var(--border-color, #e6e0d6));
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    color: var(--accent-color, var(--fs-store-primary));
    pointer-events: none;
  }

  .ffm-chips--wheel .ffm-chip {
    position: absolute;
    top: 50%;
    left: 50%;
    width: min(140px, 38vw);
    transform:
      rotate(var(--i-angle, 0deg))
      translateY(calc(-1 * var(--wheel-r, 110px)))
      rotate(calc(-1 * var(--i-angle, 0deg)));
    margin: 0;
  }

  .ffm-chips--wheel .ffm-chip:hover {
    transform:
      rotate(var(--i-angle, 0deg))
      translateY(calc(-1 * var(--wheel-r, 110px) - 2px))
      rotate(calc(-1 * var(--i-angle, 0deg)));
  }

  .ffm-detail {
    border-color: color-mix(
      in srgb,
      var(--fam-color, var(--accent-color, var(--fs-store-primary))) 24%,
      var(--border-color, #e6e0d6)
    );
  }

  .ffm-detail__icon {
    width: 2.6rem;
    height: 2.6rem;
    display: grid;
    place-items: center;
    margin-bottom: 0.65rem;
    border-radius: 50%;
    background: color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 14%, var(--card-bg, #fff));
    color: var(--fam-color, var(--accent-color, var(--fs-store-primary)));
    font-size: 1.15rem;
    overflow: hidden;
  }

  .ffm-detail__icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .ffm-detail__media {
    margin-top: 0.85rem;
    border-radius: calc(var(--section-radius, 20px) * 0.65);
    overflow: hidden;
  }

  .ffm-detail__media img {
    display: block;
    width: 100%;
    max-height: 220px;
    object-fit: cover;
  }

  .ffm-detail__actions {
    margin-top: 0.85rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .ffm-chip {
      transition: none !important;
    }

    .ffm-chip:hover,
    .ffm-chips--wheel .ffm-chip:hover {
      transform: none;
    }

    .ffm-chips--wheel .ffm-chip {
      transform:
        rotate(var(--i-angle, 0deg))
        translateY(calc(-1 * var(--wheel-r, 110px)))
        rotate(calc(-1 * var(--i-angle, 0deg)));
    }
  }
`, LAYOUTS = ["wheel", "grid"];
function parseFamilies(raw) {
  return normalizeCollection(raw).map((item, i) => {
    const name = localizedString(item.name);
    return {
      id: String(item.id ?? item.family_id ?? "").trim() || `family-${i + 1}`,
      name,
      desc: localizedString(item.desc),
      color: String(item.color ?? "").trim(),
      icon: String(item.icon ?? "").trim(),
      image: extractImageUrl(item.image),
      link: extractLink(item.link)
    };
  }).filter((f) => f.name || f.desc);
}
__name(parseFamilies, "parseFamilies");
function resolveLayout(config) {
  const value = getRadioValue(config.ffm_layout, "grid");
  return LAYOUTS.includes(value) ? value : "grid";
}
__name(resolveLayout, "resolveLayout");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _FragranceFamilyMap = class _FragranceFamilyMap extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.activeId = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && (this.activeId = "");
  }
  get families() {
    var _a;
    return parseFamilies((_a = this.config) == null ? void 0 : _a.ffm_families);
  }
  resolveActive(families) {
    var _a;
    if (!families.length) return null;
    if (this.activeId) {
      const found = families.find((f) => f.id === this.activeId);
      if (found) return found;
    }
    const preset = String(((_a = this.config) == null ? void 0 : _a.ffm_default_family) ?? "").trim();
    if (preset) {
      const found = families.find((f) => f.id === preset);
      if (found) return found;
    }
    return families[0];
  }
  select(id) {
    this.activeId = id;
  }
  renderIcon(family, className) {
    const isSicon = family.icon.startsWith("sicon-");
    return family.image ? html`<img src=${family.image} alt="" loading="lazy" decoding="async" />` : family.icon ? isSicon ? html`<span class=${family.icon}></span>` : html`<span>${family.icon}</span>` : html`<span class=${className} aria-hidden="true">✦</span>`;
  }
  renderChip(family, layout, index, total) {
    var _a;
    const active = ((_a = this.resolveActive(this.families)) == null ? void 0 : _a.id) === family.id, chipStyle = family.color ? { "--fam-color": family.color } : {};
    return layout === "wheel" && (chipStyle["--i-angle"] = `${360 / Math.max(total, 1) * index}deg`), html`
      <button
        type="button"
        class=${classMap({ "ffm-chip": !0, "fs-tap": !0, "is-active": active })}
        style=${styleMap(chipStyle)}
        aria-pressed=${active ? "true" : "false"}
        aria-controls="ffm-detail"
        @click=${() => this.select(family.id)}
      >
        <span class="ffm-chip__swatch">${this.renderIcon(family, "")}</span>
        <span class="ffm-chip__name">${family.name}</span>
        ${layout !== "wheel" ? html`<span class="ffm-chip__dot" aria-hidden="true"></span>` : nothing}
      </button>
    `;
  }
  renderDetail(family) {
    const style = family.color ? { "--fam-color": family.color } : {}, external = family.link ? isExternalUrl(family.link) : !1;
    return html`
      <article
        id="ffm-detail"
        class="ffm-detail fs-panel fs-fade-swap"
        style=${styleMap(style)}
        role="region"
        aria-live="polite"
      >
        <div class="ffm-detail__icon">${this.renderIcon(family, "")}</div>
        <h3 class="fs-panel__title">${family.name}</h3>
        ${family.desc ? html`<p class="fs-panel__desc">${family.desc}</p>` : nothing}
        ${family.image ? html`<div class="ffm-detail__media">
              <img src=${family.image} alt="" loading="lazy" decoding="async" />
            </div>` : nothing}
        ${family.link ? html`<div class="ffm-detail__actions">
              <a
                class="fs-btn fs-tap"
                href=${family.link}
                target=${external ? "_blank" : "_self"}
                rel=${external ? "noopener noreferrer" : nothing}
              >
                ${t("استكشف العائلة", "Explore family")}
              </a>
            </div>` : nothing}
      </article>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "ffm_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.ffm_title), desc = localizedString(c.ffm_desc), families = this.families, layout = resolveLayout(c), active = this.resolveActive(families), total = families.length;
    return families.length ? html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("خريطة العائلات العطرية", "Fragrance family map")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div class="ffm-shell">
            <aside class="ffm-selector">
              <p class="ffm-selector__label">${t("اختَر عائلة", "Pick a family")}</p>
              <div
                class=${classMap({
      "ffm-chips": !0,
      [`ffm-chips--${layout}`]: !0
    })}
                role="group"
                aria-label=${t("عائلات العطر", "Fragrance families")}
                style=${styleMap(layout === "wheel" ? { "--wheel-r": "110px" } : {})}
              >
                ${layout === "wheel" ? html`<div class="ffm-wheel-core">${t("عائلات", "Families")}</div>` : nothing}
                ${families.map((family, i) => this.renderChip(family, layout, i, total))}
              </div>
            </aside>
            ${active ? keyed(active.id, this.renderDetail(active)) : nothing}
          </div>
          ${renderCommerceOutcome({ config: c, prefix: "ffm_", ready: !!active, selection: active })}
        </div>
      </section>
    ` : html`
        <section
          class=${classMap({ "fs-section": !0, "fs-animate": animate })}
          style=${styleMap(themeStyleMap(theme))}
          aria-label=${title || t("خريطة العائلات العطرية", "Fragrance family map")}
        >
          <div class="fs-container">
            ${title || desc ? html`<div class="fs-header">
                  ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                  ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
                </div>` : nothing}
            <div class="fs-empty" role="status">
              ${t("أضف عائلات عطرية من إعدادات العنصر.", "Add fragrance families in the element settings.")}
            </div>
          </div>
        </section>
      `;
  }
};
__name(_FragranceFamilyMap, "FragranceFamilyMap"), _FragranceFamilyMap.styles = [sharedSectionCss, componentStyles];
let FragranceFamilyMap = _FragranceFamilyMap;
__decorateClass([
  property({ type: Object })
], FragranceFamilyMap.prototype, "config");
__decorateClass([
  state()
], FragranceFamilyMap.prototype, "activeId");
typeof FragranceFamilyMap < "u" && FragranceFamilyMap.registerSallaComponent("salla-fragrance-family-map");
export {
  FragranceFamilyMap as default
};
