import { css as y, LitElement as $, html as r, nothing as t } from "lit";
import { property as x, state as w } from "lit/decorators.js";
import { classMap as f } from "lit/directives/class-map.js";
import { keyed as k } from "lit/directives/keyed.js";
import { styleMap as h } from "lit/directives/style-map.js";
import { n as C, l as i, a as I, g as z, s as S, t as c, r as L, p as T, b as M, c as O } from "./commerceOutcome-CCLcV5SW.js";
const P = y`
  :host {
    direction: inherit;
  }

  .igs-layout {
    display: grid;
    gap: 1rem;
  }

  .igs-grid {
    display: grid;
    gap: 0.65rem;
    grid-template-columns: repeat(auto-fill, minmax(9.5rem, 1fr));
  }

  .igs-grid--list {
    grid-template-columns: 1fr;
  }

  .igs-card {
    display: grid;
    gap: 0.45rem;
    min-height: 44px;
    padding: 1rem 0.95rem;
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

  .igs-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--ing-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .igs-card.is-active {
    border-color: var(--ing-color, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--ing-color, var(--accent-color, var(--fs-store-primary))) 9%,
      var(--card-bg, #fff)
    );
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--ing-color, var(--accent-color, var(--fs-store-primary))) 18%, transparent),
      0 12px 28px rgba(90, 70, 40, 0.1);
    transform: translateY(-2px);
  }

  .igs-card:active {
    transform: translateY(0);
  }

  .igs-card__badge {
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    overflow: hidden;
    font-size: 1.1rem;
    font-weight: 800;
    color: var(--button-color, #fff);
    background: var(--ing-color, var(--accent-color, var(--fs-store-primary)));
  }

  .igs-card__badge img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .igs-card__name {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 800;
    line-height: 1.35;
  }

  .igs-card__teaser {
    margin: 0;
    font-size: 0.78rem;
    color: var(--muted-color, #666666);
    line-height: 1.55;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .igs-panel__head {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .igs-meta {
    display: grid;
    gap: 0.45rem;
  }

  .igs-meta__row {
    margin: 0;
    font-size: 0.88rem;
    line-height: 1.6;
  }

  .igs-meta__label {
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--accent-color, var(--fs-store-primary));
  }

  @media (min-width: 960px) {
    .igs-layout {
      grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
      align-items: start;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .igs-card {
      transition: none;
    }

    .igs-card:hover,
    .igs-card.is-active {
      transform: none;
    }
  }
`;
function j(l) {
  return z(l.igs_layout, "grid") === "list" ? "list" : "grid";
}
function B(l) {
  return C(l).map((e, s) => ({
    id: `ingredient-${s}`,
    name: i(e.name),
    shortTeaser: i(e.short_teaser),
    story: i(e.story),
    origin: i(e.origin),
    character: i(e.character),
    mood: i(e.mood),
    image: I(e.image),
    color: i(e.color) || "#9a7b4f",
    icon: i(e.icon)
  })).filter(
    (e) => e.name || e.shortTeaser || e.story || e.image
  );
}
var E = Object.defineProperty, b = (l, e, s, p) => {
  for (var a = void 0, n = l.length - 1, g; n >= 0; n--)
    (g = l[n]) && (a = g(e, s, a) || a);
  return a && E(e, s, a), a;
};
const u = class u extends $ {
  constructor() {
    super(...arguments), this.config = {}, this.selectedId = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.ensureSelection();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(e) {
    e.has("config") && this.ensureSelection();
  }
  get ingredients() {
    var e;
    return B((e = this.config) == null ? void 0 : e.igs_ingredients);
  }
  ensureSelection() {
    var s;
    const e = this.ingredients;
    e.some((p) => p.id === this.selectedId) || (this.selectedId = ((s = e[0]) == null ? void 0 : s.id) ?? "");
  }
  get selected() {
    return this.ingredients.find((e) => e.id === this.selectedId) ?? null;
  }
  select(e) {
    this.selectedId = e;
  }
  renderBadge(e) {
    if (e.image)
      return r`<span class="igs-card__badge">
        <img src=${e.image} alt="" loading="lazy" decoding="async" />
      </span>`;
    const s = e.icon.startsWith("sicon-");
    return r`<span class="igs-card__badge" style=${h({ background: e.color })}>
      ${e.icon ? s ? r`<span class=${e.icon}></span>` : e.icon : (e.name || "•").slice(0, 1)}
    </span>`;
  }
  renderPanel(e) {
    return r`
      <div class="igs-panel fs-panel fs-fade-swap" id="igs-detail" role="region" aria-live="polite">
        <div class="igs-panel__head">
          ${this.renderBadge(e)}
          <h3 class="fs-panel__title">${e.name || c("مكوّن", "Ingredient")}</h3>
        </div>
        ${e.story ? r`<p class="igs-panel__story fs-panel__desc">${e.story}</p>` : e.shortTeaser ? r`<p class="igs-panel__story fs-panel__desc">${e.shortTeaser}</p>` : t}
        <div class="igs-meta">
          ${e.origin ? r`<p class="igs-meta__row"><span class="igs-meta__label">${c("الأصل", "Origin")}</span> ${e.origin}</p>` : t}
          ${e.character ? r`<p class="igs-meta__row"><span class="igs-meta__label">${c("الطابع", "Character")}</span> ${e.character}</p>` : t}
          ${e.mood ? r`<p class="igs-meta__row"><span class="igs-meta__label">${c("المزاج", "Mood")}</span> ${e.mood}</p>` : t}
        </div>
      </div>
    `;
  }
  render() {
    const e = this.config || {}, s = L(e, "igs_"), p = s.animate && !T(), a = i(e.igs_title), n = i(e.igs_desc), g = this.ingredients, _ = j(e), m = this.selected;
    return g.length ? r`
      <section
        class=${f({ "fs-section": !0, "fs-animate": p })}
        style=${h(M(s))}
        aria-label=${a || c("مكتبة المكونات العطرية", "Fragrance ingredient library")}
      >
        <div class="fs-container">
          ${a || n ? r`<div class="fs-header">
                ${a ? r`<h2 class="fs-title">${a}</h2>` : t}
                ${n ? r`<p class="fs-desc">${n}</p>` : t}
              </div>` : t}

          <div class="igs-layout">
            <div
              class=${f({
      "igs-grid": !0,
      "igs-grid--list": _ === "list"
    })}
              role="list"
            >
              ${g.map((o) => {
      const v = o.id === this.selectedId;
      return r`
                  <button
                    type="button"
                    class=${f({ "igs-card": !0, "is-active": v, "fs-tap": !0 })}
                    style=${h({ "--ing-color": o.color })}
                    role="listitem"
                    aria-pressed=${v ? "true" : "false"}
                    aria-controls="igs-detail"
                    @click=${() => this.select(o.id)}
                  >
                    ${this.renderBadge(o)}
                    <h3 class="igs-card__name">${o.name || c("مكوّن", "Ingredient")}</h3>
                    ${o.shortTeaser ? r`<p class="igs-card__teaser">${o.shortTeaser}</p>` : t}
                  </button>
                `;
    })}
            </div>
            ${m ? k(m.id, this.renderPanel(m)) : t}
          </div>
          ${O({ config: e, prefix: "igs_" })}
        </div>
      </section>
    ` : r`<div class="fs-empty" role="status">
        ${c(
      "أضف مكونات عطرية من إعدادات العنصر.",
      "Add fragrance ingredients in the element settings."
    )}
      </div>`;
  }
};
u.styles = [S, P];
let d = u;
b([
  x({ type: Object })
], d.prototype, "config");
b([
  w()
], d.prototype, "selectedId");
typeof d < "u" && d.registerSallaComponent("salla-ingredient-stories");
export {
  d as default
};
