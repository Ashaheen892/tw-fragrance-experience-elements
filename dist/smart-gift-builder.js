import { css as E, LitElement as R, nothing as p, html as a } from "lit";
import { property as O, state as w } from "lit/decorators.js";
import { classMap as h } from "lit/directives/class-map.js";
import { keyed as z } from "lit/directives/keyed.js";
import { styleMap as _ } from "lit/directives/style-map.js";
import { n as v, l, t as n, s as T, c as B, r as P, p as L, b as M } from "./commerceOutcome-CkVkQjOd.js";
const j = E`
  .sgb-shell {
    display: grid;
    gap: clamp(1rem, 2.5vw, 1.35rem);
    max-width: 920px;
    margin-inline: auto;
  }

  .sgb-step {
    display: grid;
    gap: 1rem;
  }

  .sgb-step__title {
    margin: 0;
    font-size: clamp(1.05rem, 2.2vw, 1.25rem);
    font-weight: 800;
    text-align: center;
  }

  .sgb-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.65rem;
  }

  @media (min-width: 640px) {
    .sgb-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.75rem;
    }
  }

  .sgb-card {
    display: grid;
    gap: 0.35rem;
    min-height: 96px;
    padding: 0.85rem 0.75rem;
    border: 1.5px solid var(--border-color, #e6e0d6);
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    background: var(--card-bg, #fff);
    text-align: center;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.05);
    transition:
      transform 0.22s ease,
      border-color 0.22s ease,
      box-shadow 0.22s ease,
      background 0.22s ease;
  }

  .sgb-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .sgb-card.is-active {
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

  .sgb-card:active {
    transform: translateY(0);
  }

  .sgb-card__icon {
    font-size: 1.35rem;
    line-height: 1;
  }

  .sgb-card__name {
    font-size: 0.88rem;
    font-weight: 800;
    line-height: 1.35;
  }

  .sgb-card__desc,
  .sgb-card__range {
    margin: 0;
    font-size: 0.74rem;
    color: var(--muted-color, #6e6558);
    line-height: 1.45;
  }

  .sgb-list {
    display: grid;
    gap: 0.55rem;
  }

  .sgb-option {
    display: grid;
    gap: 0.15rem;
    padding: 0.85rem 1rem;
    border: 1.5px solid var(--border-color, #e6e0d6);
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    background: var(--card-bg, #fff);
    text-align: start;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.05);
    transition:
      transform 0.22s ease,
      border-color 0.22s ease,
      box-shadow 0.22s ease,
      background 0.22s ease;
  }

  .sgb-option:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .sgb-option.is-active {
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

  .sgb-option:active {
    transform: translateY(0);
  }

  .sgb-option__label {
    font-size: 0.94rem;
    font-weight: 800;
  }

  .sgb-option__range {
    margin: 0;
    font-size: 0.8rem;
    color: var(--muted-color, #6e6558);
  }

  .sgb-step__empty {
    padding: 1rem;
    border-radius: calc(var(--section-radius, 20px) * 0.7);
    border: 1px dashed var(--border-color, #e6e0d6);
    text-align: center;
    color: var(--muted-color, #6e6558);
    font-size: 0.88rem;
  }

  .sgb-shell .fs-nav .fs-btn:not(.fs-btn--ghost):disabled {
    opacity: 0.45;
    filter: grayscale(0.12);
    box-shadow: none;
    transform: none;
    cursor: not-allowed;
  }

  .sgb-result {
    padding: 0;
    border-radius: var(--section-radius, 20px);
    border: 1px solid color-mix(in srgb, var(--gift-accent, var(--accent-color, var(--fs-store-primary))) 24%, var(--border-color, #e6e0d6));
    box-shadow: 0 14px 36px rgba(90, 70, 40, 0.1);
  }

  .sgb-result__box {
    width: 100%;
    height: 0.55rem;
    border-radius: 999px;
    background: var(--gift-accent, var(--accent-color, var(--fs-store-primary)));
  }

  .sgb-result__title {
    margin: 0;
    font-size: clamp(1.1rem, 2.3vw, 1.4rem);
    font-weight: 800;
  }

  .sgb-result__block {
    display: grid;
    gap: 0.25rem;
    padding: 0.75rem 0.85rem;
    border-radius: 12px;
    background: color-mix(in srgb, var(--gift-accent, var(--accent-color, var(--fs-store-primary))) 7%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--gift-accent, var(--accent-color, var(--fs-store-primary))) 16%, var(--border-color, #e6e0d6));
  }

  .sgb-result__label {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    color: var(--gift-accent, var(--accent-color, var(--fs-store-primary)));
  }

  .sgb-result__text {
    margin: 0;
    line-height: 1.65;
    font-size: 0.92rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .sgb-card,
    .sgb-option {
      transition: none !important;
    }

    .sgb-card:hover,
    .sgb-option:hover {
      transform: none;
    }
  }
`;
function $(r) {
  if (Array.isArray(r))
    return r.map((e) => {
      if (typeof e == "string") return e.trim();
      if (e && typeof e == "object") {
        const t = e;
        return String(t.id ?? t.value ?? t.key ?? "").trim();
      }
      return "";
    }).filter(Boolean);
  const s = String(r ?? "").trim();
  return s ? s.split(/[,،|/]/).map((e) => e.trim()).filter(Boolean) : [];
}
function Y(r) {
  return v(r).map((s, e) => ({
    id: String(s.id ?? s.person_id ?? "").trim() || `person-${e + 1}`,
    name: l(s.name),
    icon: String(s.icon ?? "").trim()
  })).filter((s) => s.name);
}
function K(r) {
  return v(r).map((s, e) => ({
    id: String(s.id ?? s.occasion_id ?? "").trim() || `occasion-${e + 1}`,
    name: l(s.name),
    desc: l(s.desc)
  })).filter((s) => s.name);
}
function N(r) {
  return v(r).map((s, e) => ({
    id: String(s.id ?? s.budget_id ?? "").trim() || `budget-${e + 1}`,
    label: l(s.label) || l(s.name),
    rangeText: l(s.range_text) || l(s.range) || l(s.desc)
  })).filter((s) => s.label);
}
function W(r) {
  return v(r).map((s, e) => ({
    id: String(s.id ?? s.style_id ?? "").trim() || `style-${e + 1}`,
    name: l(s.name),
    desc: l(s.desc),
    color: String(s.color ?? "").trim()
  })).filter((s) => s.name);
}
function F(r) {
  return v(r).map((s, e) => ({
    id: String(s.id ?? s.recipe_id ?? "").trim() || `recipe-${e + 1}`,
    personIds: $(s.person_id ?? s.person_ids),
    occasionIds: $(s.occasion_id ?? s.occasion_ids),
    budgetIds: $(s.budget_id ?? s.budget_ids),
    styleIds: $(s.style_id ?? s.style_ids),
    wrapSuggestion: l(s.wrap_suggestion),
    message: l(s.message),
    boxColor: String(s.box_color ?? s.color ?? "").trim(),
    scentCharacter: l(s.scent_character)
  })).filter(
    (s) => s.wrapSuggestion || s.message || s.scentCharacter || s.personIds.length || s.occasionIds.length
  );
}
function S(r) {
  return {
    next: l(r.sgb_next_btn) || n("التالي", "Next"),
    back: l(r.sgb_back_btn) || n("السابق", "Back"),
    see: l(r.sgb_see_btn) || n("اعرض الهدية", "See your gift"),
    reset: l(r.sgb_reset_btn) || n("ابدأ من جديد", "Start over"),
    ctaLabel: l(r.sgb_cta_label) || n("استكشف التوصية", "Explore recommendation")
  };
}
function H(r, s) {
  if (!r.length) return null;
  const { personId: e, occasionId: t, budgetId: o, styleId: d } = s, u = r.find((i) => {
    const c = !i.personIds.length || i.personIds.includes(e), y = !i.occasionIds.length || i.occasionIds.includes(t), A = !i.budgetIds.length || i.budgetIds.includes(o), C = !i.styleIds.length || i.styleIds.includes(d);
    return c && y && A && C && i.personIds.length > 0;
  });
  if (u) return u;
  let g = null, m = -1;
  for (const i of r) {
    let c = 0;
    e && i.personIds.includes(e) ? c += 4 : i.personIds.length || (c += 1), t && i.occasionIds.includes(t) ? c += 3 : i.occasionIds.length || (c += 1), d && i.styleIds.includes(d) ? c += 2 : i.styleIds.length || (c += 1), o && i.budgetIds.includes(o) ? c += 2 : i.budgetIds.length || (c += 1), c > m && (m = c, g = i);
  }
  return g;
}
function q(r, s, e, t) {
  const o = [];
  return r != null && r.name && o.push(n(`لـ ${r.name}`, `For ${r.name}`)), s != null && s.name && o.push(n(`مناسبة: ${s.name}`, `Occasion: ${s.name}`)), e != null && e.label && o.push(
    n(
      `الميزانية: ${e.label}${e.rangeText ? ` (${e.rangeText})` : ""}`,
      `Budget: ${e.label}${e.rangeText ? ` (${e.rangeText})` : ""}`
    )
  ), t != null && t.name && o.push(n(`الأسلوب: ${t.name}`, `Style: ${t.name}`)), o.length ? o.join(" · ") : n(
    "اختر التفاصيل لبناء صندوق هدية عطري مخصّص.",
    "Pick details to build a custom fragrance gift box."
  );
}
const f = [
  { key: "person", labelAr: "لمن الهدية؟", labelEn: "Who is it for?" },
  { key: "occasion", labelAr: "المناسبة", labelEn: "Occasion" },
  { key: "budget", labelAr: "الميزانية", labelEn: "Budget" },
  { key: "style", labelAr: "أسلوب التغليف", labelEn: "Presentation style" }
];
function I() {
  return {
    personId: "",
    occasionId: "",
    budgetId: "",
    styleId: ""
  };
}
function G(r, s) {
  return r.find((e) => e.id === s) ?? null;
}
function U(r, s) {
  return r.find((e) => e.id === s) ?? null;
}
function D(r, s) {
  return r.find((e) => e.id === s) ?? null;
}
function J(r, s) {
  return r.find((e) => e.id === s) ?? null;
}
var Q = Object.defineProperty, x = (r, s, e, t) => {
  for (var o = void 0, d = r.length - 1, u; d >= 0; d--)
    (u = r[d]) && (o = u(s, e, o) || o);
  return o && Q(s, e, o), o;
};
const k = class k extends R {
  constructor() {
    super(...arguments), this.config = {}, this.stepIndex = 0, this.showResult = !1, this.selections = I(), this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(s) {
    s.has("config") && (this.stepIndex = 0, this.showResult = !1, this.selections = I());
  }
  get persons() {
    var s;
    return Y((s = this.config) == null ? void 0 : s.sgb_persons);
  }
  get occasions() {
    var s;
    return K((s = this.config) == null ? void 0 : s.sgb_occasions);
  }
  get budgets() {
    var s;
    return N((s = this.config) == null ? void 0 : s.sgb_budgets);
  }
  get styles() {
    var s;
    return W((s = this.config) == null ? void 0 : s.sgb_styles);
  }
  get recipes() {
    var s;
    return F((s = this.config) == null ? void 0 : s.sgb_recipes);
  }
  get currentStepKey() {
    var s;
    return ((s = f[this.stepIndex]) == null ? void 0 : s.key) ?? "person";
  }
  canAdvance() {
    const s = this.currentStepKey;
    return s === "person" ? !!this.selections.personId || !this.persons.length : s === "occasion" ? !!this.selections.occasionId || !this.occasions.length : s === "budget" ? !!this.selections.budgetId || !this.budgets.length : s === "style" ? !!this.selections.styleId || !this.styles.length : !0;
  }
  goNext() {
    if (this.canAdvance()) {
      if (this.stepIndex >= f.length - 1) {
        this.showResult = !0;
        return;
      }
      this.stepIndex += 1;
    }
  }
  goBack() {
    if (this.showResult) {
      this.showResult = !1;
      return;
    }
    this.stepIndex > 0 && (this.stepIndex -= 1);
  }
  reset() {
    this.stepIndex = 0, this.showResult = !1, this.selections = I();
  }
  get matchedRecipe() {
    return H(this.recipes, this.selections);
  }
  renderPersonCard(s) {
    const e = this.selections.personId === s.id;
    return a`
      <button
        type="button"
        class=${h({ "sgb-card": !0, "fs-tap": !0, "is-active": e })}
        aria-pressed=${e ? "true" : "false"}
        @click=${() => {
      this.selections = { ...this.selections, personId: s.id };
    }}
      >
        ${s.icon ? a`<span class="sgb-card__icon">${s.icon}</span>` : p}
        <span class="sgb-card__name">${s.name}</span>
      </button>
    `;
  }
  renderOccasionCard(s) {
    const e = this.selections.occasionId === s.id;
    return a`
      <button
        type="button"
        class=${h({ "sgb-card": !0, "fs-tap": !0, "is-active": e })}
        aria-pressed=${e ? "true" : "false"}
        @click=${() => {
      this.selections = { ...this.selections, occasionId: s.id };
    }}
      >
        <span class="sgb-card__name">${s.name}</span>
        ${s.desc ? a`<p class="sgb-card__desc">${s.desc}</p>` : p}
      </button>
    `;
  }
  renderBudgetOption(s) {
    const e = this.selections.budgetId === s.id;
    return a`
      <button
        type="button"
        class=${h({ "sgb-option": !0, "fs-tap": !0, "is-active": e })}
        aria-pressed=${e ? "true" : "false"}
        @click=${() => {
      this.selections = { ...this.selections, budgetId: s.id };
    }}
      >
        <span class="sgb-option__label">${s.label}</span>
        ${s.rangeText ? a`<p class="sgb-option__range">${s.rangeText}</p>` : p}
      </button>
    `;
  }
  renderStyleCard(s) {
    const e = this.selections.styleId === s.id, t = s.color ? { "--item-color": s.color } : {};
    return a`
      <button
        type="button"
        class=${h({ "sgb-card": !0, "fs-tap": !0, "is-active": e })}
        style=${_(t)}
        aria-pressed=${e ? "true" : "false"}
        @click=${() => {
      this.selections = { ...this.selections, styleId: s.id };
    }}
      >
        <span class="sgb-card__name">${s.name}</span>
        ${s.desc ? a`<p class="sgb-card__desc">${s.desc}</p>` : p}
      </button>
    `;
  }
  renderStepBody() {
    const s = this.currentStepKey, e = f[this.stepIndex];
    return s === "person" ? a`
        <div class="sgb-step" role="radiogroup" aria-label=${n(e.labelAr, e.labelEn)}>
          <h3 class="sgb-step__title">${n(e.labelAr, e.labelEn)}</h3>
          ${this.persons.length ? a`<div class="sgb-grid">${this.persons.map((t) => this.renderPersonCard(t))}</div>` : a`<div class="sgb-step__empty">
                ${n("أضف خيارات الأشخاص من إعدادات العنصر.", "Add person options in element settings.")}
              </div>`}
        </div>
      ` : s === "occasion" ? a`
        <div class="sgb-step" role="radiogroup" aria-label=${n(e.labelAr, e.labelEn)}>
          <h3 class="sgb-step__title">${n(e.labelAr, e.labelEn)}</h3>
          ${this.occasions.length ? a`<div class="sgb-grid">${this.occasions.map((t) => this.renderOccasionCard(t))}</div>` : a`<div class="sgb-step__empty">
                ${n("أضف المناسبات من إعدادات العنصر.", "Add occasions in element settings.")}
              </div>`}
        </div>
      ` : s === "budget" ? a`
        <div class="sgb-step" role="radiogroup" aria-label=${n(e.labelAr, e.labelEn)}>
          <h3 class="sgb-step__title">${n(e.labelAr, e.labelEn)}</h3>
          ${this.budgets.length ? a`<div class="sgb-list">${this.budgets.map((t) => this.renderBudgetOption(t))}</div>` : a`<div class="sgb-step__empty">
                ${n("أضف خيارات الميزانية من إعدادات العنصر.", "Add budget options in element settings.")}
              </div>`}
        </div>
      ` : a`
      <div class="sgb-step" role="radiogroup" aria-label=${n(e.labelAr, e.labelEn)}>
        <h3 class="sgb-step__title">${n(e.labelAr, e.labelEn)}</h3>
        ${this.styles.length ? a`<div class="sgb-grid">${this.styles.map((t) => this.renderStyleCard(t))}</div>` : a`<div class="sgb-step__empty">
              ${n("أضف أساليب التغليف من إعدادات العنصر.", "Add presentation styles in element settings.")}
            </div>`}
      </div>
    `;
  }
  renderResult() {
    const s = this.config || {}, e = S(s), t = this.matchedRecipe, o = G(this.persons, this.selections.personId), d = U(this.occasions, this.selections.occasionId), u = D(this.budgets, this.selections.budgetId), g = J(this.styles, this.selections.styleId), m = (t == null ? void 0 : t.boxColor) || (g == null ? void 0 : g.color) || "#9a7b4f", i = (t == null ? void 0 : t.wrapSuggestion) || (g != null && g.name ? n(`تغليف ${g.name}`, `${g.name} wrapping`) : n("تغليف أنيق بشريط ذهبي", "Elegant wrap with a gold ribbon")), c = (t == null ? void 0 : t.message) || q(o, d, u, g), y = (t == null ? void 0 : t.scentCharacter) || n("عطر متوازن يناسب ذوق المُهدى إليه", "A balanced scent suited to the recipient");
    return a`
      <article
        class="sgb-result fs-result"
        style=${_({ "--gift-accent": m })}
        role="region"
        aria-live="polite"
      >
        <div class="sgb-result__box" aria-hidden="true"></div>
        <h3 class="sgb-result__title">${n("صندوق هديتك", "Your gift box")}</h3>

        <div class="sgb-result__block">
          <span class="sgb-result__label">${n("التغليف", "Wrapping")}</span>
          <p class="sgb-result__text">${i}</p>
        </div>

        <div class="sgb-result__block">
          <span class="sgb-result__label">${n("رسالة الهدية", "Gift message")}</span>
          <p class="sgb-result__text">${c}</p>
        </div>

        <div class="sgb-result__block">
          <span class="sgb-result__label">${n("الطابع العطري", "Scent character")}</span>
          <p class="sgb-result__text">${y}</p>
        </div>

        <div class="fs-actions">
          <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.reset}>
            ${e.reset}
          </button>
        </div>
        ${B({
      config: s,
      prefix: "sgb_",
      matchTags: [
        this.selections.personId,
        this.selections.occasionId,
        this.selections.budgetId,
        this.selections.styleId
      ]
    })}
      </article>
    `;
  }
  renderProgress() {
    const s = f.length, e = this.showResult ? s : this.stepIndex + 1, t = Math.round(e / s * 100);
    return a`
      <div
        class="fs-progress"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${t}
        aria-label=${n(`الخطوة ${e} من ${s}`, `Step ${e} of ${s}`)}
      >
        <div class="fs-progress__bar">
          <span style=${_({ width: `${t}%` })}></span>
        </div>
        <p class="fs-progress__label">
          ${n(`الخطوة ${e} من ${s}`, `Step ${e} of ${s}`)}
        </p>
      </div>
    `;
  }
  renderWizard() {
    const s = this.config || {}, e = S(s), t = this.stepIndex >= f.length - 1, o = this.showResult ? "result" : `step-${this.stepIndex}`;
    return a`
      <div class="sgb-shell">
        ${this.renderProgress()}

        ${z(
      o,
      a`<div class="fs-fade-swap">
            ${this.showResult ? this.renderResult() : this.renderStepBody()}
          </div>`
    )}

        ${this.showResult ? p : a`<div class="fs-nav">
              ${this.stepIndex > 0 ? a`<button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.goBack}>
                    ${e.back}
                  </button>` : p}
              <button
                type="button"
                class="fs-btn fs-tap"
                ?disabled=${!this.canAdvance()}
                aria-disabled=${this.canAdvance() ? "false" : "true"}
                title=${this.canAdvance() ? "" : n("اختر خياراً للمتابعة", "Choose an option to continue")}
                @click=${this.goNext}
              >
                ${t ? e.see : e.next}
              </button>
            </div>`}
      </div>
    `;
  }
  render() {
    const s = this.config || {}, e = P(s, "sgb_"), t = e.animate && !L(), o = l(s.sgb_title), d = l(s.sgb_desc);
    return a`
      <section
        class=${h({ "fs-section": !0, "fs-animate": t })}
        style=${_(M(e))}
        aria-label=${o || n("صندوق الهدية الذكي", "Smart gift builder")}
      >
        <div class="fs-container">
          ${o || d ? a`<div class="fs-header">
                ${o ? a`<h2 class="fs-title">${o}</h2>` : p}
                ${d ? a`<p class="fs-desc">${d}</p>` : p}
              </div>` : p}
          ${this.renderWizard()}
        </div>
      </section>
    `;
  }
};
k.styles = [T, j];
let b = k;
x([
  O({ type: Object })
], b.prototype, "config");
x([
  w()
], b.prototype, "stepIndex");
x([
  w()
], b.prototype, "showResult");
x([
  w()
], b.prototype, "selections");
typeof b < "u" && b.registerSallaComponent("salla-smart-gift-builder");
export {
  b as default
};
