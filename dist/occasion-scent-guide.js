import { css as u, LitElement as x, nothing as o, html as s } from "lit";
import { property as _, state as $ } from "lit/decorators.js";
import { classMap as v } from "lit/directives/class-map.js";
import { styleMap as p } from "lit/directives/style-map.js";
import { n as y, e as k, l as c, a as w, s as C, t as i, i as z, r as I, p as P, b as L, c as E } from "./commerceOutcome-CkVkQjOd.js";
const O = u`
  :host {
    direction: inherit;
  }

  .osg-shell {
    display: grid;
    gap: 1rem;
  }

  .osg-cards {
    display: grid;
    gap: 0.65rem;
    grid-template-columns: repeat(auto-fill, minmax(10.5rem, 1fr));
  }

  .osg-card {
    display: grid;
    gap: 0.45rem;
    padding: 0.85rem;
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    border: 1.5px solid color-mix(in srgb, var(--border-color, #e6e0d6) 82%, transparent);
    background: var(--card-bg, #fff);
    text-align: start;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.05);
    transition:
      border-color 0.22s ease,
      box-shadow 0.22s ease,
      transform 0.22s ease,
      background 0.22s ease;
  }

  .osg-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--occ-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .osg-card.is-active {
    border-color: var(--occ-color, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--occ-color, var(--accent-color, var(--fs-store-primary))) 9%,
      var(--card-bg, #fff)
    );
    box-shadow:
      0 0 0 3px color-mix(
        in srgb,
        var(--occ-color, var(--accent-color, var(--fs-store-primary))) 18%,
        transparent
      ),
      0 12px 28px rgba(90, 70, 40, 0.1);
    transform: translateY(-2px);
  }

  .osg-card:active {
    transform: translateY(0);
  }

  .osg-card__media {
    aspect-ratio: 4 / 3;
    border-radius: calc(var(--section-radius, 20px) * 0.55);
    overflow: hidden;
    background: color-mix(in srgb, var(--occ-color, var(--accent-color, var(--fs-store-primary))) 18%, var(--card-bg, #fff));
  }

  .osg-card__media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .osg-card__name {
    margin: 0;
    font-size: 0.94rem;
    font-weight: 800;
    line-height: 1.35;
  }

  .osg-card__desc {
    margin: 0;
    font-size: 0.8rem;
    color: var(--muted-color, #6e6558);
    line-height: 1.55;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .osg-panel {
    border-radius: var(--section-radius, 20px);
    border: 1px solid var(--border-color, #e6e0d6);
    background: var(--card-bg, #fff);
    padding: 1.25rem;
    display: grid;
    gap: 0.75rem;
  }

  .osg-panel__title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 800;
  }

  .osg-panel__desc {
    margin: 0;
    color: var(--muted-color, #6e6558);
    line-height: 1.7;
    font-size: 0.92rem;
  }

  .osg-profile {
    padding: 0.85rem 0.95rem;
    border-radius: 14px;
    background: color-mix(in srgb, var(--occ-color, var(--accent-color, var(--fs-store-primary))) 10%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--occ-color, var(--accent-color, var(--fs-store-primary))) 24%, var(--border-color, #e6e0d6));
  }

  .osg-profile__label {
    display: block;
    margin-bottom: 0.35rem;
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .osg-profile__text {
    margin: 0;
    line-height: 1.65;
    font-size: 0.92rem;
  }

  @media (min-width: 960px) {
    .osg-shell {
      grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
      align-items: start;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .osg-card {
      transition: none;
    }

    .osg-card.is-active {
      transform: none;
    }
  }
`;
function S(d) {
  return y(d).map((e, r) => ({
    id: `occasion-${r}`,
    name: c(e.name),
    desc: c(e.desc),
    scentProfile: c(e.scent_profile),
    image: w(e.image),
    color: c(e.color) || "#9a7b4f",
    link: k(e.link)
  })).filter((e) => e.name || e.desc || e.scentProfile);
}
var A = Object.defineProperty, h = (d, e, r, g) => {
  for (var a = void 0, t = d.length - 1, l; t >= 0; t--)
    (l = d[t]) && (a = l(e, r, a) || a);
  return a && A(e, r, a), a;
};
const m = class m extends x {
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
  get occasions() {
    var e;
    return S((e = this.config) == null ? void 0 : e.osg_occasions);
  }
  ensureActive() {
    var r;
    const e = this.occasions;
    e.some((g) => g.id === this.activeId) || (this.activeId = ((r = e[0]) == null ? void 0 : r.id) ?? "");
  }
  get active() {
    return this.occasions.find((e) => e.id === this.activeId) ?? this.occasions[0] ?? null;
  }
  select(e) {
    this.activeId = e;
  }
  renderCard(e) {
    const r = e.id === this.activeId;
    return s`
      <button
        type="button"
        class=${v({ "osg-card": !0, "is-active": r, "fs-tap": !0 })}
        style=${p({ "--occ-color": e.color })}
        aria-pressed=${r ? "true" : "false"}
        aria-controls="osg-detail"
        @click=${() => this.select(e.id)}
      >
        ${e.image ? s`<div class="osg-card__media">
              <img src=${e.image} alt="" loading="lazy" decoding="async" />
            </div>` : s`<div class="osg-card__media" aria-hidden="true"></div>`}
        <h3 class="osg-card__name">${e.name || i("مناسبة", "Occasion")}</h3>
        ${e.desc ? s`<p class="osg-card__desc">${e.desc}</p>` : o}
      </button>
    `;
  }
  renderPanel(e) {
    const r = e.link ? z(e.link) : !1;
    return s`
      <div
        class="osg-panel"
        id="osg-detail"
        role="region"
        aria-live="polite"
        style=${p({ "--occ-color": e.color })}
      >
        <h3 class="osg-panel__title">${e.name || i("مناسبة", "Occasion")}</h3>
        ${e.desc ? s`<p class="osg-panel__desc">${e.desc}</p>` : o}
        ${e.scentProfile ? s`<div class="osg-profile">
              <span class="osg-profile__label">${i("الملف العطري المقترح", "Suggested scent profile")}</span>
              <p class="osg-profile__text">${e.scentProfile}</p>
            </div>` : o}
        ${e.link ? s`<a
              class="fs-btn"
              href=${e.link}
              target=${r ? "_blank" : "_self"}
              rel=${r ? "noopener noreferrer" : o}
            >
              ${i("استكشف التوصية", "Explore recommendation")}
            </a>` : o}
      </div>
    `;
  }
  render() {
    const e = this.config || {}, r = I(e, "osg_"), g = r.animate && !P(), a = c(e.osg_title), t = c(e.osg_desc), l = this.occasions, f = this.active;
    return l.length ? s`
      <section
        class=${v({ "fs-section": !0, "fs-animate": g })}
        style=${p(L(r))}
        aria-label=${a || i("دليل اختيار العطر حسب المناسبة", "Occasion scent guide")}
      >
        <div class="fs-container">
          ${a || t ? s`<div class="fs-header">
                ${a ? s`<h2 class="fs-title">${a}</h2>` : o}
                ${t ? s`<p class="fs-desc">${t}</p>` : o}
              </div>` : o}

          <div class="osg-shell">
            <div class="osg-cards" role="list">
              ${l.map((b) => this.renderCard(b))}
            </div>
            ${f ? this.renderPanel(f) : o}
          </div>
          ${E({ config: e, prefix: "osg_" })}
        </div>
      </section>
    ` : s`<div class="fs-empty" role="status">
        ${i(
      "أضف مناسبات من إعدادات العنصر.",
      "Add occasions in the element settings."
    )}
      </div>`;
  }
};
m.styles = [C, O];
let n = m;
h([
  _({ type: Object })
], n.prototype, "config");
h([
  $()
], n.prototype, "activeId");
typeof n < "u" && n.registerSallaComponent("salla-occasion-scent-guide");
export {
  n as default
};
