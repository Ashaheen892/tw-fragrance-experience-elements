import { css as T, LitElement as A, html as o, nothing as d } from "lit";
import { property as E, state as $ } from "lit/decorators.js";
import { classMap as g } from "lit/directives/class-map.js";
import { keyed as z } from "lit/directives/keyed.js";
import { styleMap as v } from "lit/directives/style-map.js";
import { n as _, a as I, l as c, t as a, k as j, s as L, m as R, c as P, r as Y, p as O, b as B } from "./commerceOutcome-CCLcV5SW.js";
const M = T`
  .spa-shell {
    display: grid;
    gap: clamp(1rem, 2.5vw, 1.35rem);
    max-width: 920px;
    margin-inline: auto;
  }

  .spa-step {
    display: grid;
    gap: 1rem;
  }

  .spa-step__title {
    margin: 0;
    font-size: clamp(1.05rem, 2.2vw, 1.25rem);
    font-weight: 800;
    text-align: center;
    color: var(--text-color, #000000);
  }

  .spa-step .fs-coach {
    justify-content: center;
    text-align: start;
    max-width: 36rem;
    margin-inline: auto;
    width: 100%;
  }

  .spa-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.7rem;
  }

  @media (min-width: 640px) {
    .spa-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.85rem;
    }
  }

  /* Card chips (wear times / notes) — not pill buttons */
  .spa-chip {
    display: grid;
    align-content: center;
    justify-items: center;
    gap: 0.45rem;
    min-height: 104px;
    padding: 1rem 0.85rem;
    border: 1.5px solid var(--border-color, #e6e0d6);
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    background: var(--fs-surface, var(--card-bg, #ffffff));
    color: var(--text-color, #000000);
    font: inherit;
    text-align: center;
    cursor: pointer;
    box-shadow: 0 4px 14px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, transparent);
    transition:
      transform 0.22s ease,
      border-color 0.22s ease,
      box-shadow 0.22s ease,
      background 0.22s ease,
      color 0.22s ease;
  }

  .spa-chip:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, transparent);
  }

  .spa-chip.is-active {
    border-color: var(--item-color, var(--button-bg, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--item-color, var(--button-bg, var(--fs-store-primary))) 14%,
      var(--fs-surface, var(--card-bg, #ffffff))
    );
    box-shadow:
      0 0 0 3px color-mix(
        in srgb,
        var(--item-color, var(--button-bg, var(--fs-store-primary))) 20%,
        transparent
      ),
      0 12px 28px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 16%, transparent);
  }

  .spa-chip:active {
    transform: translateY(0);
  }

  .spa-chip__icon {
    width: 2.35rem;
    height: 2.35rem;
    margin-inline: auto;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 16%,
      var(--card-bg, #ffffff)
    );
    color: var(--item-color, var(--accent-color, var(--fs-store-primary)));
    font-size: 1.05rem;
    overflow: hidden;
  }

  .spa-chip.is-active .spa-chip__icon {
    background: var(--item-color, var(--button-bg, var(--fs-store-primary)));
    color: #ffffff;
  }

  .spa-chip__icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .spa-chip__name {
    font-size: 0.9rem;
    font-weight: 800;
    line-height: 1.35;
    color: inherit;
  }

  :host([data-fs-theme='dark']) .spa-chip {
    background: var(--fs-surface, #0a0a0a);
    border-color: rgba(255, 255, 255, 0.14);
    color: #ffffff;
  }

  :host([data-fs-theme='dark']) .spa-chip.is-active {
    background: color-mix(
      in srgb,
      var(--item-color, var(--button-bg, var(--fs-store-primary))) 22%,
      var(--fs-surface, #0a0a0a)
    );
    border-color: var(--item-color, var(--button-bg, var(--fs-store-primary)));
    color: #ffffff;
  }

  :host([data-fs-theme='dark']) .spa-chip__icon {
    background: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 22%,
      #141414
    );
  }

  .spa-list {
    display: grid;
    gap: 0.55rem;
  }

  .spa-option {
    display: grid;
    gap: 0.2rem;
    padding: 0.85rem 1rem;
    border: 1.5px solid var(--border-color, #e6e0d6);
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    background: var(--fs-surface, var(--card-bg, #ffffff));
    color: var(--text-color, #000000);
    text-align: start;
    cursor: pointer;
    box-shadow: 0 4px 14px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, transparent);
    transition:
      transform 0.22s ease,
      border-color 0.22s ease,
      box-shadow 0.22s ease,
      background 0.22s ease;
  }

  :host([data-fs-theme='dark']) .spa-option {
    background: var(--fs-surface, #0a0a0a);
    border-color: rgba(255, 255, 255, 0.14);
    color: #ffffff;
  }

  .spa-option:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .spa-option.is-active {
    border-color: var(--item-color, var(--button-bg, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--item-color, var(--button-bg, var(--fs-store-primary))) 14%,
      var(--fs-surface, var(--card-bg, #ffffff))
    );
    box-shadow:
      0 0 0 3px color-mix(
        in srgb,
        var(--item-color, var(--button-bg, var(--fs-store-primary))) 20%,
        transparent
      ),
      0 12px 28px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 16%, transparent);
  }

  :host([data-fs-theme='dark']) .spa-option.is-active {
    background: color-mix(
      in srgb,
      var(--item-color, var(--button-bg, var(--fs-store-primary))) 22%,
      var(--fs-surface, #0a0a0a)
    );
    border-color: var(--item-color, var(--button-bg, var(--fs-store-primary)));
    color: #ffffff;
  }

  :host([data-fs-theme='dark']) .spa-option__desc {
    color: rgba(255, 255, 255, 0.72);
  }

  .spa-option:active {
    transform: translateY(0);
  }

  .spa-option__name {
    font-size: 0.94rem;
    font-weight: 800;
  }

  .spa-option__desc {
    margin: 0;
    font-size: 0.8rem;
    color: var(--muted-color, #666666);
    line-height: 1.55;
  }

  .spa-step__empty {
    padding: 1rem;
    border-radius: calc(var(--section-radius, 20px) * 0.7);
    border: 1px dashed var(--border-color, #e6e0d6);
    text-align: center;
    color: var(--muted-color, #666666);
    font-size: 0.88rem;
  }

  .spa-shell .fs-nav .fs-btn:not(.fs-btn--ghost):disabled {
    opacity: 0.45;
    filter: grayscale(0.12);
    box-shadow: none;
    transform: none;
    cursor: not-allowed;
  }

  .spa-passport {
    position: relative;
    overflow: hidden;
    padding: 0;
    border-radius: calc(var(--section-radius, 20px) * 1.05);
    background:
      linear-gradient(
        145deg,
        color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 18%, #fff) 0%,
        var(--card-bg, #fff) 42%,
        color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 8%, var(--card-bg, #fff)) 100%
      );
    border: 1px solid color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 28%, var(--border-color, #e6e0d6));
    box-shadow:
      0 18px 42px rgba(90, 70, 40, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.65);
  }

  .spa-passport::before {
    content: '';
    position: absolute;
    inset: 0 auto 0 0;
    width: 5px;
    background: linear-gradient(
      180deg,
      var(--passport-accent, var(--accent-color, var(--fs-store-primary))),
      color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 55%, #fff)
    );
  }

  .spa-passport__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 22%, var(--border-color, #e6e0d6));
  }

  .spa-passport__brand {
    margin: 0;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--passport-accent, var(--accent-color, var(--fs-store-primary)));
  }

  .spa-passport__seal {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 1.1rem;
    background: color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 16%, #fff);
    border: 1px solid color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 35%, transparent);
  }

  .spa-passport__title {
    margin: 0 0 0.35rem;
    font-size: clamp(1.2rem, 2.5vw, 1.55rem);
    font-weight: 800;
    line-height: 1.25;
  }

  .spa-passport__holder {
    margin: 0 0 1rem;
    font-size: 0.82rem;
    color: var(--muted-color, #666666);
  }

  .spa-passport__grid {
    display: grid;
    gap: 0.65rem;
  }

  .spa-passport__row {
    display: grid;
    gap: 0.2rem;
    padding: 0.65rem 0.75rem;
    border-radius: 12px;
    background: color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 6%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 14%, var(--border-color, #e6e0d6));
  }

  .spa-passport__label {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    color: var(--passport-accent, var(--accent-color, var(--fs-store-primary)));
  }

  .spa-passport__value {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.55;
  }

  .spa-passport__summary {
    margin: 0.85rem 0 0;
    padding-top: 0.85rem;
    border-top: 1px dashed color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 25%, var(--border-color, #e6e0d6));
    color: var(--muted-color, #666666);
    line-height: 1.7;
    font-size: 0.92rem;
  }

  .spa-toast {
    margin: 0;
    text-align: center;
    font-size: 0.82rem;
    color: var(--accent-color, var(--fs-store-primary));
    font-weight: 700;
  }

  @media (prefers-reduced-motion: reduce) {
    .spa-chip,
    .spa-option {
      transition: none !important;
    }

    .spa-chip:hover,
    .spa-option:hover,
    .spa-option.is-active {
      transform: none;
    }
  }
`;
function W(t) {
  if (Array.isArray(t))
    return t.map((e) => {
      if (typeof e == "string") return e.trim();
      if (e && typeof e == "object") {
        const r = e;
        return String(r.id ?? r.value ?? r.key ?? "").trim();
      }
      return "";
    }).filter(Boolean);
  const s = String(t ?? "").trim();
  return s ? s.split(/[,،|/]/).map((e) => e.trim()).filter(Boolean) : [];
}
function S(t) {
  return _(t).map((s, e) => ({
    id: String(s.id ?? s.note_id ?? "").trim() || `note-${e + 1}`,
    name: c(s.name),
    color: String(s.color ?? "").trim(),
    icon: String(s.icon ?? "").trim(),
    image: I(s.image) || I(s.icon)
  })).filter((s) => s.name);
}
function K(t) {
  return _(t).map((s, e) => {
    const r = String(s.value ?? s.id ?? s.strength_id ?? "").trim();
    return {
      id: String(s.id ?? s.strength_id ?? r).trim() || `strength-${e + 1}`,
      name: c(s.name),
      desc: c(s.desc),
      value: r || `strength-${e + 1}`
    };
  }).filter((s) => s.name);
}
function H(t) {
  return _(t).map((s, e) => ({
    id: String(s.id ?? s.time_id ?? "").trim() || `time-${e + 1}`,
    name: c(s.name)
  })).filter((s) => s.name);
}
function U(t) {
  return _(t).map((s, e) => ({
    id: String(s.id ?? s.character_id ?? "").trim() || `character-${e + 1}`,
    name: c(s.name),
    desc: c(s.desc),
    color: String(s.color ?? "").trim(),
    icon: String(s.icon ?? "").trim()
  })).filter((s) => s.name);
}
function q(t) {
  return _(t).map((s, e) => ({
    id: String(s.id ?? s.result_id ?? "").trim() || `result-${e + 1}`,
    summary: c(s.summary),
    characterIds: W(s.character_id ?? s.character_ids),
    tags: j(s.tags)
  })).filter((s) => s.summary || s.characterIds.length || s.tags.length);
}
function x(t) {
  return {
    next: c(t.spa_next_btn) || a("التالي", "Next"),
    back: c(t.spa_back_btn) || a("السابق", "Back"),
    see: c(t.spa_see_btn) || a("اعرض جوازك", "See your passport"),
    reset: c(t.spa_reset_btn) || a("ابدأ من جديد", "Start over"),
    share: c(t.spa_share_btn) || a("نسخ الملخص", "Copy summary"),
    passportTitle: c(t.spa_passport_title) || a("جوازك العطري", "Your scent passport"),
    holderLabel: c(t.spa_holder_label) || a("حامل الجواز", "Passport holder"),
    ctaLabel: c(t.spa_cta_label) || a("استكشف التوصية", "Explore recommendation")
  };
}
function G(t, s, e) {
  if (!t.length) return null;
  const r = t.find((n) => n.characterIds.includes(s));
  if (r) return r;
  const i = e.trim().toLowerCase();
  if (i) {
    const n = t.find(
      (l) => l.tags.some((h) => h.toLowerCase() === i || i.includes(h.toLowerCase()))
    );
    if (n) return n;
  }
  return t[0] ?? null;
}
function C(t, s, e, r, i, n) {
  const l = [], h = s.filter((m) => t.likedIds.includes(m.id)).map((m) => m.name), u = e.filter((m) => t.dislikedIds.includes(m.id)).map((m) => m.name), p = i.filter((m) => t.timeIds.includes(m.id)).map((m) => m.name);
  return n != null && n.name && l.push(
    a(
      `طابعك العطري: ${n.name}.`,
      `Your scent character: ${n.name}.`
    )
  ), h.length && l.push(
    a(
      `نوتات تحبها: ${h.join("، ")}.`,
      `Notes you love: ${h.join(", ")}.`
    )
  ), u.length && l.push(
    a(
      `تتجنّب: ${u.join("، ")}.`,
      `You avoid: ${u.join(", ")}.`
    )
  ), r != null && r.name && l.push(
    a(
      `التركيز المفضّل: ${r.name}.`,
      `Preferred intensity: ${r.name}.`
    )
  ), p.length && l.push(
    a(
      `أوقات الارتداء: ${p.join("، ")}.`,
      `Wear times: ${p.join(", ")}.`
    )
  ), l.length ? l.join(" ") : a(
    "أكمل اختياراتك لبناء ملفك العطري الشخصي.",
    "Complete your picks to build your personal scent profile."
  );
}
function D(t, s, e, r, i, n, l, h) {
  const u = h || a("جوازك العطري", "Your scent passport"), p = t || C(s, e, r, i, n, l);
  return `${u}

${p}`;
}
const b = [
  { key: "liked", labelAr: "النوتات المفضّلة", labelEn: "Liked notes" },
  { key: "disliked", labelAr: "نوتات تتجنّبها", labelEn: "Notes to avoid" },
  { key: "strength", labelAr: "قوّة العطر", labelEn: "Scent strength" },
  { key: "times", labelAr: "أوقات الارتداء", labelEn: "Wear times" },
  { key: "character", labelAr: "طابعك العطري", labelEn: "Scent character" }
];
function N(t, s) {
  return t.includes(s) ? t.filter((e) => e !== s) : [...t, s];
}
function k() {
  return {
    likedIds: [],
    dislikedIds: [],
    strengthId: "",
    timeIds: [],
    characterId: ""
  };
}
function F(t, s) {
  return t.find((e) => e.id === s || e.value === s) ?? null;
}
function J(t, s) {
  return t.find((e) => e.id === s) ?? null;
}
var Q = Object.defineProperty, y = (t, s, e, r) => {
  for (var i = void 0, n = t.length - 1, l; n >= 0; n--)
    (l = t[n]) && (i = l(s, e, i) || i);
  return i && Q(s, e, i), i;
};
const w = class w extends A {
  constructor() {
    super(...arguments), this.config = {}, this.stepIndex = 0, this.showResult = !1, this.selections = k(), this.shareNotice = "", this.boundLangHandler = () => this.requestUpdate(), this.shareTimer = null;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), this.shareTimer && clearTimeout(this.shareTimer), super.disconnectedCallback();
  }
  updated(s) {
    s.has("config") && (this.stepIndex = 0, this.showResult = !1, this.selections = k(), this.shareNotice = "");
  }
  get likedNotes() {
    var s;
    return S((s = this.config) == null ? void 0 : s.spa_liked_notes);
  }
  get dislikedNotes() {
    var s;
    return S((s = this.config) == null ? void 0 : s.spa_disliked_notes);
  }
  get strengths() {
    var s;
    return K((s = this.config) == null ? void 0 : s.spa_strengths);
  }
  get times() {
    var s;
    return H((s = this.config) == null ? void 0 : s.spa_times);
  }
  get characters() {
    var s;
    return U((s = this.config) == null ? void 0 : s.spa_characters);
  }
  get currentStepKey() {
    var s;
    return ((s = b[this.stepIndex]) == null ? void 0 : s.key) ?? "liked";
  }
  canAdvance() {
    const s = this.currentStepKey;
    return s === "strength" ? !!this.selections.strengthId || !this.strengths.length : s === "character" ? !!this.selections.characterId || !this.characters.length : !0;
  }
  goNext() {
    if (this.canAdvance()) {
      if (this.stepIndex >= b.length - 1) {
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
    this.stepIndex = 0, this.showResult = !1, this.selections = k(), this.shareNotice = "";
  }
  async shareSummary() {
    const s = this.config || {}, e = x(s), r = this.resolveSummary(), i = D(
      r,
      this.selections,
      this.likedNotes,
      this.dislikedNotes,
      this.selectedStrength,
      this.selectedTimes,
      this.selectedCharacter,
      e.passportTitle
    ), n = await R(i);
    this.shareNotice = n ? a("تم نسخ الملخص.", "Summary copied.") : a("تعذّر النسخ.", "Could not copy."), this.shareTimer && clearTimeout(this.shareTimer), this.shareTimer = setTimeout(() => {
      this.shareNotice = "";
    }, 2400);
  }
  get selectedStrength() {
    return F(this.strengths, this.selections.strengthId);
  }
  get selectedCharacter() {
    return J(this.characters, this.selections.characterId);
  }
  get selectedTimes() {
    return this.times.filter((s) => this.selections.timeIds.includes(s.id));
  }
  resolveSummary() {
    var e, r;
    const s = G(
      q((e = this.config) == null ? void 0 : e.spa_results),
      this.selections.characterId,
      ((r = this.selectedCharacter) == null ? void 0 : r.name) ?? ""
    );
    return s != null && s.summary ? s.summary : C(
      this.selections,
      this.likedNotes,
      this.dislikedNotes,
      this.selectedStrength,
      this.selectedTimes,
      this.selectedCharacter
    );
  }
  renderIcon(s, e) {
    return e ? o`<img src=${e} alt="" loading="lazy" decoding="async" />` : s.startsWith("sicon-") ? o`<span class=${s}></span>` : o`<span>${s || "◆"}</span>`;
  }
  renderNoteChip(s, e, r) {
    const i = e.includes(s.id), n = s.color ? { "--item-color": s.color } : {};
    return o`
      <button
        type="button"
        class=${g({ "spa-chip": !0, "fs-tap": !0, "is-active": i })}
        style=${v(n)}
        aria-pressed=${i ? "true" : "false"}
        @click=${() => {
      this.selections = {
        ...this.selections,
        [r]: N(this.selections[r], s.id)
      };
    }}
      >
        <span class="spa-chip__icon">${this.renderIcon(s.icon, s.image)}</span>
        <span class="spa-chip__name">${s.name}</span>
      </button>
    `;
  }
  renderStrengthOption(s) {
    const e = this.selections.strengthId === s.id || this.selections.strengthId === s.value;
    return o`
      <button
        type="button"
        class=${g({ "spa-option": !0, "fs-tap": !0, "is-active": e })}
        aria-pressed=${e ? "true" : "false"}
        @click=${() => {
      this.selections = { ...this.selections, strengthId: s.id };
    }}
      >
        <span class="spa-option__name">${s.name}</span>
        ${s.desc ? o`<p class="spa-option__desc">${s.desc}</p>` : d}
      </button>
    `;
  }
  renderTimeChip(s) {
    const e = this.selections.timeIds.includes(s.id);
    return o`
      <button
        type="button"
        class=${g({ "spa-chip": !0, "fs-tap": !0, "is-active": e })}
        aria-pressed=${e ? "true" : "false"}
        @click=${() => {
      this.selections = {
        ...this.selections,
        timeIds: N(this.selections.timeIds, s.id)
      };
    }}
      >
        <span class="spa-chip__name">${s.name}</span>
      </button>
    `;
  }
  renderCharacterOption(s) {
    const e = this.selections.characterId === s.id, r = s.color ? { "--item-color": s.color } : {};
    return o`
      <button
        type="button"
        class=${g({ "spa-option": !0, "fs-tap": !0, "is-active": e })}
        style=${v(r)}
        aria-pressed=${e ? "true" : "false"}
        @click=${() => {
      this.selections = { ...this.selections, characterId: s.id };
    }}
      >
        <span class="spa-option__name">${s.icon ? `${s.icon} ` : d}${s.name}</span>
        ${s.desc ? o`<p class="spa-option__desc">${s.desc}</p>` : d}
      </button>
    `;
  }
  renderStepBody() {
    const s = this.currentStepKey, e = b[this.stepIndex];
    return s === "liked" ? o`
        <div class="spa-step" role="group" aria-label=${a(e.labelAr, e.labelEn)}>
          <h3 class="spa-step__title">${a(e.labelAr, e.labelEn)}</h3>
          <p class="fs-coach">
            <span class="fs-coach__mark" aria-hidden="true">✦</span>
            ${a("اختر واحدة أو أكثر", "Pick one or more")}
          </p>
          ${this.likedNotes.length ? o`<div class="spa-grid">
                ${this.likedNotes.map(
      (r) => this.renderNoteChip(r, this.selections.likedIds, "likedIds")
    )}
              </div>` : o`<div class="spa-step__empty">
                ${a("أضف نوتات مفضّلة من إعدادات العنصر.", "Add liked notes in element settings.")}
              </div>`}
        </div>
      ` : s === "disliked" ? o`
        <div class="spa-step" role="group" aria-label=${a(e.labelAr, e.labelEn)}>
          <h3 class="spa-step__title">${a(e.labelAr, e.labelEn)}</h3>
          <p class="fs-coach">
            <span class="fs-coach__mark" aria-hidden="true">✦</span>
            ${a("اختياري — لتجنّب ما لا يناسبك", "Optional — notes to skip")}
          </p>
          ${this.dislikedNotes.length ? o`<div class="spa-grid">
                ${this.dislikedNotes.map(
      (r) => this.renderNoteChip(r, this.selections.dislikedIds, "dislikedIds")
    )}
              </div>` : o`<div class="spa-step__empty">
                ${a("أضف نوتات مرفوضة من إعدادات العنصر.", "Add disliked notes in element settings.")}
              </div>`}
        </div>
      ` : s === "strength" ? o`
        <div class="spa-step" role="radiogroup" aria-label=${a(e.labelAr, e.labelEn)}>
          <h3 class="spa-step__title">${a(e.labelAr, e.labelEn)}</h3>
          ${this.strengths.length ? o`<div class="spa-list">
                ${this.strengths.map((r) => this.renderStrengthOption(r))}
              </div>` : o`<div class="spa-step__empty">
                ${a("أضف مستويات التركيز من إعدادات العنصر.", "Add strength levels in element settings.")}
              </div>`}
        </div>
      ` : s === "times" ? o`
        <div class="spa-step" role="group" aria-label=${a(e.labelAr, e.labelEn)}>
          <h3 class="spa-step__title">${a(e.labelAr, e.labelEn)}</h3>
          <p class="fs-coach">
            <span class="fs-coach__mark" aria-hidden="true">✦</span>
            ${a("متى ترتدي العطر؟", "When do you wear fragrance?")}
          </p>
          ${this.times.length ? o`<div class="spa-grid">
                ${this.times.map((r) => this.renderTimeChip(r))}
              </div>` : o`<div class="spa-step__empty">
                ${a("أضف أوقات الارتداء من إعدادات العنصر.", "Add wear times in element settings.")}
              </div>`}
        </div>
      ` : o`
      <div class="spa-step" role="radiogroup" aria-label=${a(e.labelAr, e.labelEn)}>
        <h3 class="spa-step__title">${a(e.labelAr, e.labelEn)}</h3>
        ${this.characters.length ? o`<div class="spa-list">
              ${this.characters.map((r) => this.renderCharacterOption(r))}
            </div>` : o`<div class="spa-step__empty">
              ${a("أضف شخصيات عطرية من إعدادات العنصر.", "Add scent characters in element settings.")}
            </div>`}
      </div>
    `;
  }
  renderPassport() {
    const s = this.config || {}, e = x(s), r = this.selectedCharacter, i = (r == null ? void 0 : r.color) || "#9a7b4f", n = this.likedNotes.filter((p) => this.selections.likedIds.includes(p.id)).map((p) => p.name), l = this.dislikedNotes.filter((p) => this.selections.dislikedIds.includes(p.id)).map((p) => p.name), h = this.resolveSummary(), u = !!(c(s.spa_share_btn) || e.share);
    return o`
      <article
        class="spa-passport fs-result"
        style=${v({ "--passport-accent": i })}
        role="region"
        aria-live="polite"
      >
        <div class="spa-passport__head">
          <p class="spa-passport__brand">${e.passportTitle}</p>
          <span class="spa-passport__seal" aria-hidden="true">${(r == null ? void 0 : r.icon) || "✦"}</span>
        </div>
        <h3 class="spa-passport__title">${(r == null ? void 0 : r.name) || a("ملفك العطري", "Your scent profile")}</h3>
        <p class="spa-passport__holder">${e.holderLabel}</p>

        <div class="spa-passport__grid">
          ${n.length ? o`<div class="spa-passport__row">
                <span class="spa-passport__label">${a("تحب", "You love")}</span>
                <p class="spa-passport__value">${n.join(" · ")}</p>
              </div>` : d}
          ${l.length ? o`<div class="spa-passport__row">
                <span class="spa-passport__label">${a("تتجنّب", "You avoid")}</span>
                <p class="spa-passport__value">${l.join(" · ")}</p>
              </div>` : d}
          ${this.selectedStrength ? o`<div class="spa-passport__row">
                <span class="spa-passport__label">${a("التركيز", "Intensity")}</span>
                <p class="spa-passport__value">${this.selectedStrength.name}</p>
              </div>` : d}
          ${this.selectedTimes.length ? o`<div class="spa-passport__row">
                <span class="spa-passport__label">${a("أوقات الارتداء", "Wear times")}</span>
                <p class="spa-passport__value">
                  ${this.selectedTimes.map((p) => p.name).join(" · ")}
                </p>
              </div>` : d}
        </div>

        ${h ? o`<p class="spa-passport__summary">${h}</p>` : d}

        <div class="fs-actions">
          ${u ? o`<button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.shareSummary}>
                ${e.share}
              </button>` : d}
          <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.reset}>
            ${e.reset}
          </button>
        </div>
        ${P({
      config: s,
      prefix: "spa_",
      ready: !0,
      matchTags: [
        this.selections.characterId,
        this.selections.strengthId,
        ...this.selections.likedIds,
        ...this.selections.timeIds
      ]
    })}
        ${this.shareNotice ? o`<p class="spa-toast" role="status">${this.shareNotice}</p>` : d}
      </article>
    `;
  }
  renderProgress() {
    const s = b.length, e = this.showResult ? s : this.stepIndex + 1, r = Math.round(e / s * 100);
    return o`
      <div
        class="fs-progress"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${r}
        aria-label=${a(`الخطوة ${e} من ${s}`, `Step ${e} of ${s}`)}
      >
        <div class="fs-progress__bar">
          <span style=${v({ width: `${r}%` })}></span>
        </div>
        <p class="fs-progress__label">
          ${a(`الخطوة ${e} من ${s}`, `Step ${e} of ${s}`)}
        </p>
      </div>
    `;
  }
  renderWizard() {
    const s = this.config || {}, e = x(s), r = this.stepIndex >= b.length - 1, i = this.showResult ? "result" : `step-${this.stepIndex}`;
    return o`
      <div class="spa-shell">
        ${this.renderProgress()}

        ${z(
      i,
      o`<div class="fs-fade-swap">
            ${this.showResult ? this.renderPassport() : this.renderStepBody()}
          </div>`
    )}

        ${this.showResult ? d : o`<div class="fs-nav">
              ${this.stepIndex > 0 ? o`<button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.goBack}>
                    ${e.back}
                  </button>` : d}
              <button
                type="button"
                class="fs-btn fs-tap"
                ?disabled=${!this.canAdvance()}
                aria-disabled=${this.canAdvance() ? "false" : "true"}
                title=${this.canAdvance() ? "" : a("اختر خياراً للمتابعة", "Choose an option to continue")}
                @click=${this.goNext}
              >
                ${r ? e.see : e.next}
              </button>
            </div>`}
      </div>
    `;
  }
  render() {
    const s = this.config || {}, e = Y(s, "spa_"), r = e.animate && !O(), i = c(s.spa_title), n = c(s.spa_desc);
    return o`
      <section
        class=${g({ "fs-section": !0, "fs-animate": r })}
        style=${v(B(e))}
        aria-label=${i || a("جوازك العطري", "Scent passport")}
      >
        <div class="fs-container">
          ${i || n ? o`<div class="fs-header">
                ${i ? o`<h2 class="fs-title">${i}</h2>` : d}
                ${n ? o`<p class="fs-desc">${n}</p>` : d}
              </div>` : d}
          ${this.renderWizard()}
        </div>
      </section>
    `;
  }
};
w.styles = [L, M];
let f = w;
y([
  E({ type: Object })
], f.prototype, "config");
y([
  $()
], f.prototype, "stepIndex");
y([
  $()
], f.prototype, "showResult");
y([
  $()
], f.prototype, "selections");
y([
  $()
], f.prototype, "shareNotice");
typeof f < "u" && f.registerSallaComponent("salla-scent-passport");
export {
  f as default
};
