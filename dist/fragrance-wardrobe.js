var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { keyed } from "lit/directives/keyed.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, f as toNumber, e as extractLink, a as extractImageUrl, h as sortByOrder, s as sharedSectionCss, t, i as isExternalUrl, r as readSectionTheme, p as prefersReducedMotion, b as themeStyleMap, c as renderCommerceOutcome } from "./commerceOutcome-DYfJre3y.js";
const componentStyles = css`
  :host {
    direction: inherit;
  }

  .fwd-shell {
    display: grid;
    gap: 1.15rem;
    max-width: 980px;
    margin-inline: auto;
  }

  .fwd-cabinet {
    position: relative;
    padding: 1.15rem 1.1rem 1.25rem;
    border-radius: var(--section-radius, 20px);
    background:
      linear-gradient(
        180deg,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff)) 0%,
        var(--card-bg, #fff) 48%,
        color-mix(in srgb, var(--border-color, #e6e0d6) 28%, var(--card-bg, #fff)) 100%
      );
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 22%, var(--border-color, #e6e0d6));
    box-shadow:
      inset 0 1px 0 color-mix(in srgb, var(--card-bg, #fff) 70%, transparent),
      0 16px 40px rgba(90, 70, 40, 0.1);
  }

  .fwd-cabinet__rail {
    height: 4px;
    margin: 0 0.15rem 0.95rem;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      transparent,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, transparent),
      transparent
    );
  }

  .fwd-grid {
    display: grid;
    gap: 0.7rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 640px) {
    .fwd-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.8rem;
    }
  }

  .fwd-door {
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 0.7rem;
    min-height: 5.4rem;
    padding: 0.95rem 1.15rem 0.95rem 0.9rem;
    border: 1.5px solid color-mix(
      in srgb,
      var(--slot-color, var(--accent-color, var(--fs-store-primary))) 28%,
      var(--border-color, #e6e0d6)
    );
    border-radius: calc(var(--section-radius, 20px) * 0.68);
    background: linear-gradient(
      145deg,
      color-mix(in srgb, var(--slot-color, var(--accent-color, var(--fs-store-primary))) 14%, var(--card-bg, #fff)),
      color-mix(in srgb, var(--slot-color, var(--accent-color, var(--fs-store-primary))) 4%, var(--card-bg, #fff))
    );
    color: var(--text-color, #1f1a14);
    font: inherit;
    text-align: start;
    cursor: pointer;
    overflow: hidden;
    box-shadow: 0 6px 16px rgba(90, 70, 40, 0.07);
    transition:
      transform 0.24s ease,
      border-color 0.24s ease,
      box-shadow 0.24s ease,
      background 0.24s ease;
  }

  .fwd-door__shine {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      115deg,
      transparent 35%,
      color-mix(in srgb, var(--card-bg, #fff) 35%, transparent) 48%,
      transparent 62%
    );
    opacity: 0.45;
    pointer-events: none;
  }

  .fwd-door:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--slot-color, var(--accent-color, var(--fs-store-primary))) 55%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 12px 26px rgba(90, 70, 40, 0.1);
  }

  .fwd-door.is-active {
    border-color: var(--slot-color, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--slot-color, var(--accent-color, var(--fs-store-primary))) 12%,
      var(--card-bg, #fff)
    );
    box-shadow:
      0 0 0 3px color-mix(
        in srgb,
        var(--slot-color, var(--accent-color, var(--fs-store-primary))) 18%,
        transparent
      ),
      0 14px 30px rgba(90, 70, 40, 0.12);
  }

  .fwd-door__handle {
    position: absolute;
    inset-inline-end: 0.7rem;
    top: 50%;
    width: 0.32rem;
    height: 1.45rem;
    border-radius: 999px;
    background: color-mix(
      in srgb,
      var(--slot-color, var(--accent-color, var(--fs-store-primary))) 72%,
      var(--card-bg, #fff)
    );
    transform: translateY(-50%);
    box-shadow: inset 0 1px 2px color-mix(in srgb, var(--text-color, #1f1a14) 12%, transparent);
  }

  .fwd-door__icon {
    position: relative;
    z-index: 1;
    width: 2.35rem;
    height: 2.35rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: color-mix(
      in srgb,
      var(--slot-color, var(--accent-color, var(--fs-store-primary))) 18%,
      var(--card-bg, #fff)
    );
    color: var(--slot-color, var(--accent-color, var(--fs-store-primary)));
    font-size: 1.05rem;
    font-weight: 800;
    overflow: hidden;
    flex: 0 0 auto;
  }

  .fwd-door__icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .fwd-door__meta {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 0.2rem;
    min-width: 0;
    padding-inline-end: 0.85rem;
  }

  .fwd-door__name {
    font-size: 0.92rem;
    font-weight: 800;
    line-height: 1.3;
  }

  .fwd-door__hint,
  .fwd-door__badge {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.03em;
  }

  .fwd-door__hint {
    color: var(--muted-color, #6e6558);
  }

  .fwd-door__badge {
    display: inline-flex;
    width: fit-content;
    padding: 0.12rem 0.5rem;
    border-radius: 999px;
    background: color-mix(
      in srgb,
      var(--slot-color, var(--accent-color, var(--fs-store-primary))) 16%,
      var(--card-bg, #fff)
    );
    color: var(--slot-color, var(--accent-color, var(--fs-store-primary)));
  }

  .fwd-detail {
    --slot-color: var(--accent-color, var(--fs-store-primary));
    border-color: color-mix(in srgb, var(--slot-color) 26%, var(--border-color, #e6e0d6));
  }

  .fwd-detail__hero {
    display: grid;
    gap: 1rem;
  }

  @media (min-width: 720px) {
    .fwd-detail__hero--media {
      grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
      align-items: stretch;
      gap: 1.15rem;
    }
  }

  .fwd-detail__body {
    display: grid;
    gap: 0.65rem;
    align-content: start;
  }

  .fwd-detail__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.65rem;
  }

  .fwd-detail__icon {
    width: 2.6rem;
    height: 2.6rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: color-mix(in srgb, var(--slot-color) 16%, var(--card-bg, #fff));
    color: var(--slot-color);
    font-size: 1.15rem;
    font-weight: 800;
    overflow: hidden;
  }

  .fwd-detail__icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .fwd-detail__nav {
    display: inline-flex;
    gap: 0.35rem;
  }

  .fwd-detail__nav .fs-icon-btn {
    color: var(--slot-color, var(--accent-color, var(--fs-store-primary)));
    border-color: color-mix(in srgb, var(--slot-color, var(--accent-color, var(--fs-store-primary))) 40%, var(--border-color, #e6e0d6));
  }

  .fwd-detail__media {
    border-radius: calc(var(--section-radius, 20px) * 0.6);
    overflow: hidden;
    min-height: 160px;
    background: color-mix(in srgb, var(--slot-color) 10%, var(--border-color, #e6e0d6));
  }

  .fwd-detail__media img {
    display: block;
    width: 100%;
    height: 100%;
    max-height: 240px;
    object-fit: cover;
  }

  .fwd-detail__actions {
    margin-top: 0.35rem;
    justify-content: flex-start;
  }

  .fwd-empty-hint {
    margin-top: 0.35rem;
    font-size: 0.82rem;
    color: var(--muted-color, #6e6558);
  }

  @media (prefers-reduced-motion: reduce) {
    .fwd-door,
    .fwd-detail__nav .fs-icon-btn {
      transition: none !important;
    }

    .fwd-door:hover,
    .fwd-detail__nav .fs-icon-btn:hover {
      transform: none;
    }
  }
`;
function parseSlots(raw) {
  const items = normalizeCollection(raw).map((item, i) => {
    const name = localizedString(item.name);
    return {
      id: String(item.id ?? "").trim() || `slot-${i + 1}`,
      name,
      desc: localizedString(item.desc),
      icon: String(item.icon ?? "").trim(),
      image: extractImageUrl(item.image),
      color: String(item.color ?? "").trim() || "#9a7b4f",
      link: extractLink(item.link),
      order: toNumber(item.order, i + 1)
    };
  }).filter((slot) => slot.name || slot.desc || slot.image);
  return sortByOrder(items, "order");
}
__name(parseSlots, "parseSlots");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _FragranceWardrobe = class _FragranceWardrobe extends LitElement {
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
  get slots() {
    var _a;
    return parseSlots((_a = this.config) == null ? void 0 : _a.fwd_slots);
  }
  get coachText() {
    var _a;
    return localizedString((_a = this.config) == null ? void 0 : _a.fwd_open_label) || t("اختَر خانة لفتح درج العطر المناسب", "Pick a slot to open that fragrance drawer");
  }
  get exploreLabel() {
    var _a;
    return localizedString((_a = this.config) == null ? void 0 : _a.fwd_close_label) || t("استكشف هذه الخانة", "Explore this slot");
  }
  ensureActive() {
    var _a;
    const list = this.slots;
    list.some((s) => s.id === this.activeId) || (this.activeId = ((_a = list[0]) == null ? void 0 : _a.id) ?? "");
  }
  get active() {
    return this.slots.find((s) => s.id === this.activeId) ?? this.slots[0] ?? null;
  }
  select(id) {
    this.activeId = id;
  }
  step(dir) {
    var _a;
    const list = this.slots;
    if (list.length < 2) return;
    const next = (list.findIndex((s) => s.id === this.activeId) + dir + list.length) % list.length;
    this.activeId = ((_a = list[next]) == null ? void 0 : _a.id) ?? "";
  }
  onKeyNav(e) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const rtl = getComputedStyle(this).direction === "rtl", forward = e.key === "ArrowRight";
      this.step(rtl ? forward ? -1 : 1 : forward ? 1 : -1);
    }
  }
  renderIcon(slot) {
    if (slot.image)
      return html`<img src=${slot.image} alt="" loading="lazy" decoding="async" />`;
    const isSicon = slot.icon.startsWith("sicon-");
    return slot.icon ? isSicon ? html`<span class=${slot.icon}></span>` : html`<span>${slot.icon}</span>` : html`<span aria-hidden="true">${(slot.name || "•").slice(0, 1)}</span>`;
  }
  renderDoor(slot, index) {
    const active = slot.id === this.activeId;
    return html`
      <button
        type="button"
        class=${classMap({ "fwd-door": !0, "fs-tap": !0, "is-active": active })}
        style=${styleMap({ "--slot-color": slot.color, "--door-i": String(index) })}
        role="listitem"
        aria-pressed=${active ? "true" : "false"}
        aria-controls="fwd-detail"
        title=${slot.name}
        @click=${() => this.select(slot.id)}
      >
        <span class="fwd-door__shine" aria-hidden="true"></span>
        <span class="fwd-door__handle" aria-hidden="true"></span>
        <span class="fwd-door__icon">${this.renderIcon(slot)}</span>
        <span class="fwd-door__meta">
          <span class="fwd-door__name">${slot.name || t("خزانة", "Drawer")}</span>
          ${active ? html`<span class="fwd-door__badge">${t("مفتوح", "Open")}</span>` : html`<span class="fwd-door__hint">${t("اضغط للفتح", "Tap to open")}</span>`}
        </span>
      </button>
    `;
  }
  renderDetail(slot) {
    const external = slot.link ? isExternalUrl(slot.link) : !1, showNav = this.slots.length > 1;
    return html`
      <article
        class="fwd-detail fs-panel fs-fade-swap"
        id="fwd-detail"
        role="region"
        aria-live="polite"
        style=${styleMap({ "--slot-color": slot.color })}
      >
        <div class=${classMap({ "fwd-detail__hero": !0, "fwd-detail__hero--media": !!slot.image })}>
          <div class="fwd-detail__body">
            <div class="fwd-detail__top">
              <span class="fwd-detail__icon" aria-hidden="true">${this.renderIcon(slot)}</span>
              ${showNav ? html`<div class="fwd-detail__nav" role="group" aria-label=${t("تنقّل الخانات", "Browse slots")}>
                    <button
                      type="button"
                      class="fs-icon-btn fs-tap"
                      aria-label=${t("السابق", "Previous")}
                      @click=${() => this.step(-1)}
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      class="fs-icon-btn fs-tap"
                      aria-label=${t("التالي", "Next")}
                      @click=${() => this.step(1)}
                    >
                      ›
                    </button>
                  </div>` : nothing}
            </div>
            <h3 class="fs-panel__title">${slot.name || t("خانة عطرية", "Fragrance slot")}</h3>
            ${slot.desc ? html`<p class="fs-panel__desc">${slot.desc}</p>` : nothing}
            ${slot.link ? html`<div class="fwd-detail__actions fs-actions">
                  <a
                    class="fs-btn fs-tap"
                    href=${slot.link}
                    target=${external ? "_blank" : nothing}
                    rel=${external ? "noopener noreferrer" : nothing}
                  >
                    ${this.exploreLabel}
                  </a>
                </div>` : nothing}
          </div>
          ${slot.image ? html`<div class="fwd-detail__media">
                <img src=${slot.image} alt="" loading="lazy" decoding="async" />
              </div>` : nothing}
        </div>
      </article>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "fwd_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.fwd_title), desc = localizedString(c.fwd_desc), slots = this.slots, active = this.active;
    return slots.length ? html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("خزانة العطور", "Fragrance wardrobe")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div class="fwd-shell">
            <p class="fs-coach">
              <span class="fs-coach__mark" aria-hidden="true">✦</span>
              <span>${this.coachText}</span>
            </p>

            <div class="fwd-cabinet">
              <div class="fwd-cabinet__rail" aria-hidden="true"></div>
              <div
                class="fwd-grid"
                role="list"
                aria-label=${t("خانات الخزانة", "Wardrobe slots")}
                @keydown=${this.onKeyNav}
              >
                ${slots.map((slot, i) => this.renderDoor(slot, i))}
              </div>
            </div>

            ${active ? keyed(active.id, this.renderDetail(active)) : nothing}
          </div>

          ${renderCommerceOutcome({
      config: c,
      prefix: "fwd_",
      ready: !!active,
      selection: active
    })}
        </div>
      </section>
    ` : html`
        <section
          class=${classMap({ "fs-section": !0, "fs-animate": animate })}
          style=${styleMap(themeStyleMap(theme))}
          aria-label=${title || t("خزانة العطور", "Fragrance wardrobe")}
        >
          <div class="fs-container">
            ${title || desc ? html`<div class="fs-header">
                  ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                  ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
                </div>` : nothing}
            <div class="fs-empty" role="status">
              ${t(
      "أضف خانات خزانة العطور من إعدادات العنصر.",
      "Add fragrance wardrobe slots in the element settings."
    )}
              <p class="fwd-empty-hint">
                ${t(
      "أفكار مقترحة: يومي، عمل، مساء، مناسبات، سفر، مواسم.",
      "Suggested slots: daily, work, evening, events, travel, seasons."
    )}
              </p>
            </div>
          </div>
        </section>
      `;
  }
};
__name(_FragranceWardrobe, "FragranceWardrobe"), _FragranceWardrobe.styles = [sharedSectionCss, componentStyles];
let FragranceWardrobe = _FragranceWardrobe;
__decorateClass([
  property({ type: Object })
], FragranceWardrobe.prototype, "config");
__decorateClass([
  state()
], FragranceWardrobe.prototype, "activeId");
typeof FragranceWardrobe < "u" && FragranceWardrobe.registerSallaComponent("salla-fragrance-wardrobe");
export {
  FragranceWardrobe as default
};
