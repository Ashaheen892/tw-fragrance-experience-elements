import { css as y, LitElement as $, html as s, nothing as o } from "lit";
import { property as x, state as w } from "lit/decorators.js";
import { classMap as g } from "lit/directives/class-map.js";
import { styleMap as m } from "lit/directives/style-map.js";
import { n as k, l, e as S, a as h, s as C, i as I, t as i, r as z, p as L, b as v, c as E } from "./commerceOutcome-CCLcV5SW.js";
const Y = y`
  .spf-shell {
    display: grid;
    gap: 1.35rem;
    max-width: 960px;
    margin-inline: auto;
  }

  .spf-selector__label {
    margin: 0;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    color: var(--muted-color, #666666);
    text-align: center;
  }

  .spf-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.65rem;
  }

  @media (min-width: 640px) {
    .spf-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.75rem;
    }
  }

  .spf-card {
    display: grid;
    gap: 0.45rem;
    min-height: 118px;
    padding: 0.85rem 0.75rem;
    border: 1.5px solid var(--border-color, #e6e0d6);
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    text-align: center;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.05);
    transition:
      transform 0.22s ease,
      border-color 0.22s ease,
      box-shadow 0.22s ease,
      background 0.22s ease;
  }

  .spf-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .spf-card.is-active {
    border-color: var(--item-color, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 9%,
      var(--card-bg, #fff)
    );
    box-shadow:
      0 0 0 3px color-mix(
        in srgb,
        var(--item-color, var(--accent-color, var(--fs-store-primary))) 18%,
        transparent
      ),
      0 12px 28px rgba(90, 70, 40, 0.1);
  }

  .spf-card:active {
    transform: translateY(0);
  }

  .spf-card__icon {
    width: 2.4rem;
    height: 2.4rem;
    margin-inline: auto;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: color-mix(in srgb, var(--item-color, var(--accent-color, var(--fs-store-primary))) 14%, #fff);
    color: var(--item-color, var(--accent-color, var(--fs-store-primary)));
    font-size: 1.1rem;
    overflow: hidden;
  }

  .spf-card__icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .spf-card__name {
    font-size: 0.92rem;
    font-weight: 800;
    line-height: 1.3;
  }

  .spf-card__desc {
    margin: 0;
    font-size: 0.76rem;
    color: var(--muted-color, #666666);
    line-height: 1.45;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .spf-result {
    padding: 1.15rem 1.1rem;
    border-radius: var(--section-radius, 20px);
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--item-color, var(--accent-color, var(--fs-store-primary))) 24%, var(--border-color, #e6e0d6));
    box-shadow: 0 12px 32px rgba(90, 70, 40, 0.08);
    animation: spf-fade-in 0.35s ease;
  }

  @keyframes spf-fade-in {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .spf-result__eyebrow {
    margin: 0 0 0.35rem;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    color: var(--item-color, var(--accent-color, var(--fs-store-primary)));
  }

  .spf-result__title {
    margin: 0 0 0.55rem;
    font-size: clamp(1.15rem, 2.4vw, 1.45rem);
    font-weight: 800;
    line-height: 1.3;
  }

  .spf-result__desc {
    margin: 0;
    color: var(--muted-color, #666666);
    font-size: 0.92rem;
    line-height: 1.65;
  }

  .spf-result__actions {
    margin-top: 1rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .spf-card,
    .spf-result {
      transition: none !important;
      animation: none !important;
    }

    .spf-card:hover {
      transform: none;
    }
  }
`;
function M(p) {
  return k(p).map((e, r) => {
    const t = l(e.name);
    return {
      id: String(e.id ?? e.personality_id ?? "").trim() || `personality-${r + 1}`,
      name: t,
      desc: l(e.desc),
      icon: String(e.icon ?? "").trim(),
      image: h(e.image) || h(e.icon),
      color: String(e.color ?? "").trim(),
      resultFamily: l(e.result_family),
      resultDesc: l(e.result_desc),
      link: S(e.link)
    };
  }).filter((e) => e.name || e.desc);
}
var j = Object.defineProperty, b = (p, e, r, t) => {
  for (var a = void 0, n = p.length - 1, c; n >= 0; n--)
    (c = p[n]) && (a = c(e, r, a) || a);
  return a && j(e, r, a), a;
};
const u = class u extends $ {
  constructor() {
    super(...arguments), this.config = {}, this.selectedId = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(e) {
    e.has("config") && (this.selectedId = "");
  }
  get personalities() {
    var e;
    return M((e = this.config) == null ? void 0 : e.spf_personalities);
  }
  resolveSelected(e) {
    if (!e.length) return null;
    if (this.selectedId) {
      const r = e.find((t) => t.id === this.selectedId);
      if (r) return r;
    }
    return null;
  }
  select(e) {
    this.selectedId = this.selectedId === e ? "" : e;
  }
  renderIcon(e) {
    const r = e.icon.startsWith("sicon-");
    return e.image ? s`<img src=${e.image} alt="" loading="lazy" decoding="async" />` : e.icon ? r ? s`<span class=${e.icon}></span>` : s`<span>${e.icon}</span>` : s`<span aria-hidden="true">◆</span>`;
  }
  renderCard(e) {
    const r = this.selectedId === e.id, t = e.color ? { "--item-color": e.color } : {};
    return s`
      <button
        type="button"
        class=${g({ "spf-card": !0, "fs-tap": !0, "is-active": r })}
        style=${m(t)}
        aria-pressed=${r ? "true" : "false"}
        aria-controls="spf-result"
        @click=${() => this.select(e.id)}
      >
        <span class="spf-card__icon">${this.renderIcon(e)}</span>
        <span class="spf-card__name">${e.name}</span>
        ${e.desc ? s`<p class="spf-card__desc">${e.desc}</p>` : o}
      </button>
    `;
  }
  renderResult(e) {
    const r = e.color ? { "--item-color": e.color } : {}, t = e.link ? I(e.link) : !1;
    return s`
      <article
        id="spf-result"
        class="spf-result"
        style=${m(r)}
        role="region"
        aria-live="polite"
      >
        <p class="spf-result__eyebrow">${i("عائلتك العطرية", "Your fragrance family")}</p>
        <h3 class="spf-result__title">${e.resultFamily || e.name}</h3>
        ${e.resultDesc ? s`<p class="spf-result__desc">${e.resultDesc}</p>` : e.desc ? s`<p class="spf-result__desc">${e.desc}</p>` : o}
        ${e.link ? s`<div class="spf-result__actions">
              <a
                class="fs-btn fs-tap"
                href=${e.link}
                target=${t ? "_blank" : "_self"}
                rel=${t ? "noopener noreferrer" : o}
              >
                ${i("استكشف العائلة", "Explore this family")}
              </a>
            </div>` : o}
      </article>
    `;
  }
  render() {
    const e = this.config || {}, r = z(e, "spf_"), t = r.animate && !L(), a = l(e.spf_title), n = l(e.spf_desc), c = this.personalities, f = this.resolveSelected(c);
    return c.length ? s`
      <section
        class=${g({ "fs-section": !0, "fs-animate": t })}
        style=${m(v(r))}
        aria-label=${a || i("مستكشف الشخصية العطرية", "Scent personality finder")}
      >
        <div class="fs-container">
          ${a || n ? s`<div class="fs-header">
                ${a ? s`<h2 class="fs-title">${a}</h2>` : o}
                ${n ? s`<p class="fs-desc">${n}</p>` : o}
              </div>` : o}

          <div class="spf-shell">
            <p class="spf-selector__label">${i("اختر شخصيتك", "Choose your personality")}</p>
            <div class="spf-grid" role="group" aria-label=${i("الشخصيات العطرية", "Scent personalities")}>
              ${c.map((_) => this.renderCard(_))}
            </div>
            ${f ? this.renderResult(f) : o}
          </div>
          ${E({ config: e, prefix: "spf_", ready: !!f, selection: f })}
        </div>
      </section>
    ` : s`
        <section
          class=${g({ "fs-section": !0, "fs-animate": t })}
          style=${m(v(r))}
          aria-label=${a || i("مستكشف الشخصية العطرية", "Scent personality finder")}
        >
          <div class="fs-container">
            ${a || n ? s`<div class="fs-header">
                  ${a ? s`<h2 class="fs-title">${a}</h2>` : o}
                  ${n ? s`<p class="fs-desc">${n}</p>` : o}
                </div>` : o}
            <div class="fs-empty" role="status">
              ${i("أضف شخصيات عطرية من إعدادات العنصر.", "Add scent personalities in the element settings.")}
            </div>
          </div>
        </section>
      `;
  }
};
u.styles = [C, Y];
let d = u;
b([
  x({ type: Object })
], d.prototype, "config");
b([
  w()
], d.prototype, "selectedId");
typeof d < "u" && d.registerSallaComponent("salla-scent-personality-finder");
export {
  d as default
};
