import { css as _, LitElement as x, html as a, nothing as n } from "lit";
import { property as y, state as $ } from "lit/decorators.js";
import { classMap as m } from "lit/directives/class-map.js";
import { keyed as k } from "lit/directives/keyed.js";
import { styleMap as g } from "lit/directives/style-map.js";
import { n as I, l as c, f as S, e as z, a as C, h as L, s as j, t as i, i as A, r as D, p as E, b as h, c as N } from "./commerceOutcome-CCLcV5SW.js";
const O = _`
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
function M(p) {
  const r = I(p).map((e, t) => {
    const o = c(e.name);
    return {
      id: String(e.id ?? "").trim() || `slot-${t + 1}`,
      name: o,
      desc: c(e.desc),
      icon: String(e.icon ?? "").trim(),
      image: C(e.image),
      color: String(e.color ?? "").trim() || "#9a7b4f",
      link: z(e.link),
      order: S(e.order, t + 1)
    };
  }).filter((e) => e.name || e.desc || e.image);
  return L(r, "order");
}
var P = Object.defineProperty, b = (p, r, e, t) => {
  for (var o = void 0, s = p.length - 1, d; s >= 0; s--)
    (d = p[s]) && (o = d(r, e, o) || o);
  return o && P(r, e, o), o;
};
const v = class v extends x {
  constructor() {
    super(...arguments), this.config = {}, this.activeId = "", this.boundLangHandler = () => this.requestUpdate();
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
  get slots() {
    var r;
    return M((r = this.config) == null ? void 0 : r.fwd_slots);
  }
  get coachText() {
    var r;
    return c((r = this.config) == null ? void 0 : r.fwd_open_label) || i("اختَر خانة لفتح درج العطر المناسب", "Pick a slot to open that fragrance drawer");
  }
  get exploreLabel() {
    var r;
    return c((r = this.config) == null ? void 0 : r.fwd_close_label) || i("استكشف هذه الخانة", "Explore this slot");
  }
  ensureActive() {
    var e;
    const r = this.slots;
    r.some((t) => t.id === this.activeId) || (this.activeId = ((e = r[0]) == null ? void 0 : e.id) ?? "");
  }
  get active() {
    return this.slots.find((r) => r.id === this.activeId) ?? this.slots[0] ?? null;
  }
  select(r) {
    this.activeId = r;
  }
  step(r) {
    var s;
    const e = this.slots;
    if (e.length < 2) return;
    const o = (e.findIndex((d) => d.id === this.activeId) + r + e.length) % e.length;
    this.activeId = ((s = e[o]) == null ? void 0 : s.id) ?? "";
  }
  onKeyNav(r) {
    if (r.key === "ArrowRight" || r.key === "ArrowLeft") {
      r.preventDefault();
      const e = getComputedStyle(this).direction === "rtl", t = r.key === "ArrowRight";
      this.step(e ? t ? -1 : 1 : t ? 1 : -1);
    }
  }
  renderIcon(r) {
    if (r.image)
      return a`<img src=${r.image} alt="" loading="lazy" decoding="async" />`;
    const e = r.icon.startsWith("sicon-");
    return r.icon ? e ? a`<span class=${r.icon}></span>` : a`<span>${r.icon}</span>` : a`<span aria-hidden="true">${(r.name || "•").slice(0, 1)}</span>`;
  }
  renderDoor(r, e) {
    const t = r.id === this.activeId;
    return a`
      <button
        type="button"
        class=${m({ "fwd-door": !0, "fs-tap": !0, "is-active": t })}
        style=${g({ "--slot-color": r.color, "--door-i": String(e) })}
        role="listitem"
        aria-pressed=${t ? "true" : "false"}
        aria-controls="fwd-detail"
        title=${r.name}
        @click=${() => this.select(r.id)}
      >
        <span class="fwd-door__shine" aria-hidden="true"></span>
        <span class="fwd-door__handle" aria-hidden="true"></span>
        <span class="fwd-door__icon">${this.renderIcon(r)}</span>
        <span class="fwd-door__meta">
          <span class="fwd-door__name">${r.name || i("خزانة", "Drawer")}</span>
          ${t ? a`<span class="fwd-door__badge">${i("مفتوح", "Open")}</span>` : a`<span class="fwd-door__hint">${i("اضغط للفتح", "Tap to open")}</span>`}
        </span>
      </button>
    `;
  }
  renderDetail(r) {
    const e = r.link ? A(r.link) : !1, t = this.slots.length > 1;
    return a`
      <article
        class="fwd-detail fs-panel fs-fade-swap"
        id="fwd-detail"
        role="region"
        aria-live="polite"
        style=${g({ "--slot-color": r.color })}
      >
        <div class=${m({ "fwd-detail__hero": !0, "fwd-detail__hero--media": !!r.image })}>
          <div class="fwd-detail__body">
            <div class="fwd-detail__top">
              <span class="fwd-detail__icon" aria-hidden="true">${this.renderIcon(r)}</span>
              ${t ? a`<div class="fwd-detail__nav" role="group" aria-label=${i("تنقّل الخانات", "Browse slots")}>
                    <button
                      type="button"
                      class="fs-icon-btn fs-tap"
                      aria-label=${i("السابق", "Previous")}
                      @click=${() => this.step(-1)}
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      class="fs-icon-btn fs-tap"
                      aria-label=${i("التالي", "Next")}
                      @click=${() => this.step(1)}
                    >
                      ›
                    </button>
                  </div>` : n}
            </div>
            <h3 class="fs-panel__title">${r.name || i("خانة عطرية", "Fragrance slot")}</h3>
            ${r.desc ? a`<p class="fs-panel__desc">${r.desc}</p>` : n}
            ${r.link ? a`<div class="fwd-detail__actions fs-actions">
                  <a
                    class="fs-btn fs-tap"
                    href=${r.link}
                    target=${e ? "_blank" : n}
                    rel=${e ? "noopener noreferrer" : n}
                  >
                    ${this.exploreLabel}
                  </a>
                </div>` : n}
          </div>
          ${r.image ? a`<div class="fwd-detail__media">
                <img src=${r.image} alt="" loading="lazy" decoding="async" />
              </div>` : n}
        </div>
      </article>
    `;
  }
  render() {
    const r = this.config || {}, e = D(r, "fwd_"), t = e.animate && !E(), o = c(r.fwd_title), s = c(r.fwd_desc), d = this.slots, f = this.active;
    return d.length ? a`
      <section
        class=${m({ "fs-section": !0, "fs-animate": t })}
        style=${g(h(e))}
        aria-label=${o || i("خزانة العطور", "Fragrance wardrobe")}
      >
        <div class="fs-container">
          ${o || s ? a`<div class="fs-header">
                ${o ? a`<h2 class="fs-title">${o}</h2>` : n}
                ${s ? a`<p class="fs-desc">${s}</p>` : n}
              </div>` : n}

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
                aria-label=${i("خانات الخزانة", "Wardrobe slots")}
                @keydown=${this.onKeyNav}
              >
                ${d.map((w, u) => this.renderDoor(w, u))}
              </div>
            </div>

            ${f ? k(f.id, this.renderDetail(f)) : n}
          </div>

          ${N({
      config: r,
      prefix: "fwd_",
      ready: !!f,
      selection: f
    })}
        </div>
      </section>
    ` : a`
        <section
          class=${m({ "fs-section": !0, "fs-animate": t })}
          style=${g(h(e))}
          aria-label=${o || i("خزانة العطور", "Fragrance wardrobe")}
        >
          <div class="fs-container">
            ${o || s ? a`<div class="fs-header">
                  ${o ? a`<h2 class="fs-title">${o}</h2>` : n}
                  ${s ? a`<p class="fs-desc">${s}</p>` : n}
                </div>` : n}
            <div class="fs-empty" role="status">
              ${i(
      "أضف خانات خزانة العطور من إعدادات العنصر.",
      "Add fragrance wardrobe slots in the element settings."
    )}
              <p class="fwd-empty-hint">
                ${i(
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
v.styles = [j, O];
let l = v;
b([
  y({ type: Object })
], l.prototype, "config");
b([
  $()
], l.prototype, "activeId");
typeof l < "u" && l.registerSallaComponent("salla-fragrance-wardrobe");
export {
  l as default
};
