import { css as v, LitElement as u, nothing as n, html as a } from "lit";
import { property as h } from "lit/decorators.js";
import { classMap as b } from "lit/directives/class-map.js";
import { styleMap as m } from "lit/directives/style-map.js";
import { n as _, l as s, s as x, t as i, r as $, p as y, b as w, c as C } from "./commerceOutcome-CCLcV5SW.js";
const S = v`
  .fll-grid {
    display: grid;
    gap: 0.85rem;
    grid-template-columns: minmax(0, 1fr);
  }

  @media (min-width: 640px) {
    .fll-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 960px) {
    .fll-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .fll-card {
    display: grid;
    gap: 0.75rem;
    padding: 1rem 0.95rem;
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    background: var(--card-bg, #fff);
    border: 1.5px solid color-mix(in srgb, var(--recipe-color, var(--accent-color, var(--fs-store-primary))) 22%, var(--border-color, #e6e0d6));
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.05);
    transition:
      transform 0.22s ease,
      border-color 0.22s ease,
      box-shadow 0.22s ease;
  }

  .fll-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--recipe-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .fll-card__title {
    margin: 0;
    font-size: 0.98rem;
    font-weight: 800;
    line-height: 1.35;
    color: var(--recipe-color, var(--accent-color, var(--fs-store-primary)));
  }

  .fll-formula {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.35rem 0.45rem;
    font-size: 0.82rem;
    font-weight: 700;
    line-height: 1.4;
  }

  .fll-note {
    padding: 0.28rem 0.55rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--recipe-color, var(--accent-color, var(--fs-store-primary))) 10%, #fff);
    border: 1px solid color-mix(in srgb, var(--recipe-color, var(--accent-color, var(--fs-store-primary))) 24%, var(--border-color, #e6e0d6));
  }

  .fll-op {
    color: var(--muted-color, #666666);
    font-weight: 800;
  }

  .fll-result {
    padding: 0.55rem 0.65rem;
    border-radius: 12px;
    background: color-mix(in srgb, var(--recipe-color, var(--accent-color, var(--fs-store-primary))) 8%, var(--card-bg, #fff));
    font-size: 0.88rem;
    font-weight: 800;
    line-height: 1.45;
  }

  .fll-meta {
    display: grid;
    gap: 0.45rem;
  }

  .fll-meta__row {
    display: grid;
    gap: 0.15rem;
  }

  .fll-meta__label {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    color: var(--muted-color, #666666);
  }

  .fll-meta__value {
    margin: 0;
    font-size: 0.84rem;
    line-height: 1.55;
    color: var(--text-color, #000000);
  }

  @media (prefers-reduced-motion: reduce) {
    .fll-card {
      transition: none !important;
    }

    .fll-card:hover {
      transform: none;
    }
  }
`;
function k(d) {
  return _(d).map((e, l) => {
    const f = s(e.title), r = s(e.note_a), o = s(e.note_b), t = s(e.result);
    return {
      id: String(e.id ?? e.recipe_id ?? "").trim() || `recipe-${l + 1}`,
      title: f,
      noteA: r,
      noteB: o,
      noteC: s(e.note_c),
      result: t,
      occasion: s(e.occasion),
      howTo: s(e.how_to),
      color: String(e.color ?? e.accent_color ?? "").trim()
    };
  }).filter((e) => e.title || e.noteA || e.noteB || e.result);
}
var z = Object.defineProperty, A = (d, e, l, f) => {
  for (var r = void 0, o = d.length - 1, t; o >= 0; o--)
    (t = d[o]) && (r = t(e, l, r) || r);
  return r && z(e, l, r), r;
};
const p = class p extends u {
  constructor() {
    super(...arguments), this.config = {}, this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  get recipes() {
    var e;
    return k((e = this.config) == null ? void 0 : e.fll_recipes);
  }
  renderFormula(e) {
    return a`
      <div class="fll-formula" aria-label=${i("تركيبة الدمج", "Layering formula")}>
        <span class="fll-note">${e.noteA}</span>
        <span class="fll-op">+</span>
        <span class="fll-note">${e.noteB}</span>
        ${e.noteC ? a`
              <span class="fll-op">+</span>
              <span class="fll-note">${e.noteC}</span>
            ` : n}
        <span class="fll-op">=</span>
        <span class="fll-result">${e.result}</span>
      </div>
    `;
  }
  renderCard(e) {
    const l = e.color ? { "--recipe-color": e.color } : {};
    return a`
      <article class="fll-card" style=${m(l)}>
        ${e.title ? a`<h3 class="fll-card__title">${e.title}</h3>` : n}
        ${this.renderFormula(e)}
        <div class="fll-meta">
          ${e.occasion ? a`<div class="fll-meta__row">
                <span class="fll-meta__label">${i("المناسبة", "Occasion")}</span>
                <p class="fll-meta__value">${e.occasion}</p>
              </div>` : n}
          ${e.howTo ? a`<div class="fll-meta__row">
                <span class="fll-meta__label">${i("طريقة الاستخدام", "How to apply")}</span>
                <p class="fll-meta__value">${e.howTo}</p>
              </div>` : n}
        </div>
      </article>
    `;
  }
  render() {
    const e = this.config || {}, l = $(e, "fll_"), f = l.animate && !y(), r = s(e.fll_title), o = s(e.fll_desc), t = this.recipes;
    return a`
      <section
        class=${b({ "fs-section": !0, "fs-animate": f })}
        style=${m(w(l))}
        aria-label=${r || i("مختبر دمج العطور", "Fragrance layering lab")}
      >
        <div class="fs-container">
          ${r || o ? a`<div class="fs-header">
                ${r ? a`<h2 class="fs-title">${r}</h2>` : n}
                ${o ? a`<p class="fs-desc">${o}</p>` : n}
              </div>` : n}

          ${t.length ? a`<div class="fll-grid" role="list">
                ${t.map((g) => this.renderCard(g))}
              </div>` : a`<div class="fs-empty" role="status">
                ${i("أضف وصفات دمج من إعدادات العنصر.", "Add layering recipes in the element settings.")}
              </div>`}
          ${C({ config: e, prefix: "fll_" })}
        </div>
      </section>
    `;
  }
};
p.styles = [x, S];
let c = p;
A([
  h({ type: Object })
], c.prototype, "config");
typeof c < "u" && c.registerSallaComponent("salla-fragrance-layering-lab");
export {
  c as default
};
