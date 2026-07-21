import { css as T, LitElement as A, html as i, nothing as d } from "lit";
import { property as E, state as y } from "lit/decorators.js";
import { classMap as f } from "lit/directives/class-map.js";
import { keyed as z } from "lit/directives/keyed.js";
import { styleMap as v } from "lit/directives/style-map.js";
import { n as _, a as I, l as c, t as a, k as j, s as L, m as R, c as P, r as Y, p as O, b as B } from "./commerceOutcome-CkVkQjOd.js";
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
  }

  .spa-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.65rem;
  }

  @media (min-width: 640px) {
    .spa-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.75rem;
    }
  }

  .spa-chip {
    display: grid;
    gap: 0.35rem;
    min-height: 96px;
    padding: 0.85rem 0.75rem;
    border: 1.5px solid var(--border-color, #e6e0d6);
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    background: var(--card-bg, #fff);
    color: var(--text-color, #1f1a14);
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

  .spa-chip:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .spa-chip.is-active {
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

  .spa-chip:active {
    transform: translateY(0);
  }

  .spa-chip__icon {
    width: 2rem;
    height: 2rem;
    margin-inline: auto;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: color-mix(in srgb, var(--item-color, var(--accent-color, var(--fs-store-primary))) 14%, #fff);
    color: var(--item-color, var(--accent-color, var(--fs-store-primary)));
    font-size: 1rem;
    overflow: hidden;
  }

  .spa-chip__icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .spa-chip__name {
    font-size: 0.86rem;
    font-weight: 800;
    line-height: 1.35;
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
    color: var(--muted-color, #6e6558);
    line-height: 1.55;
  }

  .spa-step__empty {
    padding: 1rem;
    border-radius: calc(var(--section-radius, 20px) * 0.7);
    border: 1px dashed var(--border-color, #e6e0d6);
    text-align: center;
    color: var(--muted-color, #6e6558);
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
    color: var(--muted-color, #6e6558);
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
    color: var(--muted-color, #6e6558);
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
function W(r) {
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
function S(r) {
  return _(r).map((s, e) => ({
    id: String(s.id ?? s.note_id ?? "").trim() || `note-${e + 1}`,
    name: c(s.name),
    color: String(s.color ?? "").trim(),
    icon: String(s.icon ?? "").trim(),
    image: I(s.image) || I(s.icon)
  })).filter((s) => s.name);
}
function K(r) {
  return _(r).map((s, e) => {
    const t = String(s.value ?? s.id ?? s.strength_id ?? "").trim();
    return {
      id: String(s.id ?? s.strength_id ?? t).trim() || `strength-${e + 1}`,
      name: c(s.name),
      desc: c(s.desc),
      value: t || `strength-${e + 1}`
    };
  }).filter((s) => s.name);
}
function H(r) {
  return _(r).map((s, e) => ({
    id: String(s.id ?? s.time_id ?? "").trim() || `time-${e + 1}`,
    name: c(s.name)
  })).filter((s) => s.name);
}
function U(r) {
  return _(r).map((s, e) => ({
    id: String(s.id ?? s.character_id ?? "").trim() || `character-${e + 1}`,
    name: c(s.name),
    desc: c(s.desc),
    color: String(s.color ?? "").trim(),
    icon: String(s.icon ?? "").trim()
  })).filter((s) => s.name);
}
function q(r) {
  return _(r).map((s, e) => ({
    id: String(s.id ?? s.result_id ?? "").trim() || `result-${e + 1}`,
    summary: c(s.summary),
    characterIds: W(s.character_id ?? s.character_ids),
    tags: j(s.tags)
  })).filter((s) => s.summary || s.characterIds.length || s.tags.length);
}
function x(r) {
  return {
    next: c(r.spa_next_btn) || a("التالي", "Next"),
    back: c(r.spa_back_btn) || a("السابق", "Back"),
    see: c(r.spa_see_btn) || a("اعرض جوازك", "See your passport"),
    reset: c(r.spa_reset_btn) || a("ابدأ من جديد", "Start over"),
    share: c(r.spa_share_btn) || a("نسخ الملخص", "Copy summary"),
    passportTitle: c(r.spa_passport_title) || a("جوازك العطري", "Your scent passport"),
    holderLabel: c(r.spa_holder_label) || a("حامل الجواز", "Passport holder"),
    ctaLabel: c(r.spa_cta_label) || a("استكشف التوصية", "Explore recommendation")
  };
}
function G(r, s, e) {
  if (!r.length) return null;
  const t = r.find((n) => n.characterIds.includes(s));
  if (t) return t;
  const o = e.trim().toLowerCase();
  if (o) {
    const n = r.find(
      (l) => l.tags.some((h) => h.toLowerCase() === o || o.includes(h.toLowerCase()))
    );
    if (n) return n;
  }
  return r[0] ?? null;
}
function C(r, s, e, t, o, n) {
  const l = [], h = s.filter((m) => r.likedIds.includes(m.id)).map((m) => m.name), g = e.filter((m) => r.dislikedIds.includes(m.id)).map((m) => m.name), p = o.filter((m) => r.timeIds.includes(m.id)).map((m) => m.name);
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
  ), g.length && l.push(
    a(
      `تتجنّب: ${g.join("، ")}.`,
      `You avoid: ${g.join(", ")}.`
    )
  ), t != null && t.name && l.push(
    a(
      `التركيز المفضّل: ${t.name}.`,
      `Preferred intensity: ${t.name}.`
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
function D(r, s, e, t, o, n, l, h) {
  const g = h || a("جوازك العطري", "Your scent passport"), p = r || C(s, e, t, o, n, l);
  return `${g}

${p}`;
}
const b = [
  { key: "liked", labelAr: "النوتات المفضّلة", labelEn: "Liked notes" },
  { key: "disliked", labelAr: "نوتات تتجنّبها", labelEn: "Notes to avoid" },
  { key: "strength", labelAr: "قوّة العطر", labelEn: "Scent strength" },
  { key: "times", labelAr: "أوقات الارتداء", labelEn: "Wear times" },
  { key: "character", labelAr: "طابعك العطري", labelEn: "Scent character" }
];
function N(r, s) {
  return r.includes(s) ? r.filter((e) => e !== s) : [...r, s];
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
function F(r, s) {
  return r.find((e) => e.id === s || e.value === s) ?? null;
}
function J(r, s) {
  return r.find((e) => e.id === s) ?? null;
}
var Q = Object.defineProperty, $ = (r, s, e, t) => {
  for (var o = void 0, n = r.length - 1, l; n >= 0; n--)
    (l = r[n]) && (o = l(s, e, o) || o);
  return o && Q(s, e, o), o;
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
    const s = this.config || {}, e = x(s), t = this.resolveSummary(), o = D(
      t,
      this.selections,
      this.likedNotes,
      this.dislikedNotes,
      this.selectedStrength,
      this.selectedTimes,
      this.selectedCharacter,
      e.passportTitle
    ), n = await R(o);
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
    var e, t;
    const s = G(
      q((e = this.config) == null ? void 0 : e.spa_results),
      this.selections.characterId,
      ((t = this.selectedCharacter) == null ? void 0 : t.name) ?? ""
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
    return e ? i`<img src=${e} alt="" loading="lazy" decoding="async" />` : s.startsWith("sicon-") ? i`<span class=${s}></span>` : i`<span>${s || "◆"}</span>`;
  }
  renderNoteChip(s, e, t) {
    const o = e.includes(s.id), n = s.color ? { "--item-color": s.color } : {};
    return i`
      <button
        type="button"
        class=${f({ "spa-chip": !0, "fs-tap": !0, "is-active": o })}
        style=${v(n)}
        aria-pressed=${o ? "true" : "false"}
        @click=${() => {
      this.selections = {
        ...this.selections,
        [t]: N(this.selections[t], s.id)
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
    return i`
      <button
        type="button"
        class=${f({ "spa-option": !0, "fs-tap": !0, "is-active": e })}
        aria-pressed=${e ? "true" : "false"}
        @click=${() => {
      this.selections = { ...this.selections, strengthId: s.id };
    }}
      >
        <span class="spa-option__name">${s.name}</span>
        ${s.desc ? i`<p class="spa-option__desc">${s.desc}</p>` : d}
      </button>
    `;
  }
  renderTimeChip(s) {
    const e = this.selections.timeIds.includes(s.id);
    return i`
      <button
        type="button"
        class=${f({ "spa-chip": !0, "fs-tap": !0, "is-active": e })}
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
    const e = this.selections.characterId === s.id, t = s.color ? { "--item-color": s.color } : {};
    return i`
      <button
        type="button"
        class=${f({ "spa-option": !0, "fs-tap": !0, "is-active": e })}
        style=${v(t)}
        aria-pressed=${e ? "true" : "false"}
        @click=${() => {
      this.selections = { ...this.selections, characterId: s.id };
    }}
      >
        <span class="spa-option__name">${s.icon ? `${s.icon} ` : d}${s.name}</span>
        ${s.desc ? i`<p class="spa-option__desc">${s.desc}</p>` : d}
      </button>
    `;
  }
  renderStepBody() {
    const s = this.currentStepKey, e = b[this.stepIndex];
    return s === "liked" ? i`
        <div class="spa-step" role="group" aria-label=${a(e.labelAr, e.labelEn)}>
          <h3 class="spa-step__title">${a(e.labelAr, e.labelEn)}</h3>
          <p class="fs-coach">
            <span class="fs-coach__mark" aria-hidden="true">✦</span>
            ${a("اختر واحدة أو أكثر", "Pick one or more")}
          </p>
          ${this.likedNotes.length ? i`<div class="spa-grid">
                ${this.likedNotes.map(
      (t) => this.renderNoteChip(t, this.selections.likedIds, "likedIds")
    )}
              </div>` : i`<div class="spa-step__empty">
                ${a("أضف نوتات مفضّلة من إعدادات العنصر.", "Add liked notes in element settings.")}
              </div>`}
        </div>
      ` : s === "disliked" ? i`
        <div class="spa-step" role="group" aria-label=${a(e.labelAr, e.labelEn)}>
          <h3 class="spa-step__title">${a(e.labelAr, e.labelEn)}</h3>
          <p class="fs-coach">
            <span class="fs-coach__mark" aria-hidden="true">✦</span>
            ${a("اختياري — لتجنّب ما لا يناسبك", "Optional — notes to skip")}
          </p>
          ${this.dislikedNotes.length ? i`<div class="spa-grid">
                ${this.dislikedNotes.map(
      (t) => this.renderNoteChip(t, this.selections.dislikedIds, "dislikedIds")
    )}
              </div>` : i`<div class="spa-step__empty">
                ${a("أضف نوتات مرفوضة من إعدادات العنصر.", "Add disliked notes in element settings.")}
              </div>`}
        </div>
      ` : s === "strength" ? i`
        <div class="spa-step" role="radiogroup" aria-label=${a(e.labelAr, e.labelEn)}>
          <h3 class="spa-step__title">${a(e.labelAr, e.labelEn)}</h3>
          ${this.strengths.length ? i`<div class="spa-list">
                ${this.strengths.map((t) => this.renderStrengthOption(t))}
              </div>` : i`<div class="spa-step__empty">
                ${a("أضف مستويات التركيز من إعدادات العنصر.", "Add strength levels in element settings.")}
              </div>`}
        </div>
      ` : s === "times" ? i`
        <div class="spa-step" role="group" aria-label=${a(e.labelAr, e.labelEn)}>
          <h3 class="spa-step__title">${a(e.labelAr, e.labelEn)}</h3>
          <p class="fs-coach">
            <span class="fs-coach__mark" aria-hidden="true">✦</span>
            ${a("متى ترتدي العطر؟", "When do you wear fragrance?")}
          </p>
          ${this.times.length ? i`<div class="spa-grid">
                ${this.times.map((t) => this.renderTimeChip(t))}
              </div>` : i`<div class="spa-step__empty">
                ${a("أضف أوقات الارتداء من إعدادات العنصر.", "Add wear times in element settings.")}
              </div>`}
        </div>
      ` : i`
      <div class="spa-step" role="radiogroup" aria-label=${a(e.labelAr, e.labelEn)}>
        <h3 class="spa-step__title">${a(e.labelAr, e.labelEn)}</h3>
        ${this.characters.length ? i`<div class="spa-list">
              ${this.characters.map((t) => this.renderCharacterOption(t))}
            </div>` : i`<div class="spa-step__empty">
              ${a("أضف شخصيات عطرية من إعدادات العنصر.", "Add scent characters in element settings.")}
            </div>`}
      </div>
    `;
  }
  renderPassport() {
    const s = this.config || {}, e = x(s), t = this.selectedCharacter, o = (t == null ? void 0 : t.color) || "#9a7b4f", n = this.likedNotes.filter((p) => this.selections.likedIds.includes(p.id)).map((p) => p.name), l = this.dislikedNotes.filter((p) => this.selections.dislikedIds.includes(p.id)).map((p) => p.name), h = this.resolveSummary(), g = !!(c(s.spa_share_btn) || e.share);
    return i`
      <article
        class="spa-passport fs-result"
        style=${v({ "--passport-accent": o })}
        role="region"
        aria-live="polite"
      >
        <div class="spa-passport__head">
          <p class="spa-passport__brand">${e.passportTitle}</p>
          <span class="spa-passport__seal" aria-hidden="true">${(t == null ? void 0 : t.icon) || "✦"}</span>
        </div>
        <h3 class="spa-passport__title">${(t == null ? void 0 : t.name) || a("ملفك العطري", "Your scent profile")}</h3>
        <p class="spa-passport__holder">${e.holderLabel}</p>

        <div class="spa-passport__grid">
          ${n.length ? i`<div class="spa-passport__row">
                <span class="spa-passport__label">${a("تحب", "You love")}</span>
                <p class="spa-passport__value">${n.join(" · ")}</p>
              </div>` : d}
          ${l.length ? i`<div class="spa-passport__row">
                <span class="spa-passport__label">${a("تتجنّب", "You avoid")}</span>
                <p class="spa-passport__value">${l.join(" · ")}</p>
              </div>` : d}
          ${this.selectedStrength ? i`<div class="spa-passport__row">
                <span class="spa-passport__label">${a("التركيز", "Intensity")}</span>
                <p class="spa-passport__value">${this.selectedStrength.name}</p>
              </div>` : d}
          ${this.selectedTimes.length ? i`<div class="spa-passport__row">
                <span class="spa-passport__label">${a("أوقات الارتداء", "Wear times")}</span>
                <p class="spa-passport__value">
                  ${this.selectedTimes.map((p) => p.name).join(" · ")}
                </p>
              </div>` : d}
        </div>

        ${h ? i`<p class="spa-passport__summary">${h}</p>` : d}

        <div class="fs-actions">
          ${g ? i`<button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.shareSummary}>
                ${e.share}
              </button>` : d}
          <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.reset}>
            ${e.reset}
          </button>
        </div>
        ${P({
      config: s,
      prefix: "spa_",
      matchTags: [
        this.selections.characterId,
        this.selections.strengthId,
        ...this.selections.likedIds,
        ...this.selections.timeIds
      ]
    })}
        ${this.shareNotice ? i`<p class="spa-toast" role="status">${this.shareNotice}</p>` : d}
      </article>
    `;
  }
  renderProgress() {
    const s = b.length, e = this.showResult ? s : this.stepIndex + 1, t = Math.round(e / s * 100);
    return i`
      <div
        class="fs-progress"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${t}
        aria-label=${a(`الخطوة ${e} من ${s}`, `Step ${e} of ${s}`)}
      >
        <div class="fs-progress__bar">
          <span style=${v({ width: `${t}%` })}></span>
        </div>
        <p class="fs-progress__label">
          ${a(`الخطوة ${e} من ${s}`, `Step ${e} of ${s}`)}
        </p>
      </div>
    `;
  }
  renderWizard() {
    const s = this.config || {}, e = x(s), t = this.stepIndex >= b.length - 1, o = this.showResult ? "result" : `step-${this.stepIndex}`;
    return i`
      <div class="spa-shell">
        ${this.renderProgress()}

        ${z(
      o,
      i`<div class="fs-fade-swap">
            ${this.showResult ? this.renderPassport() : this.renderStepBody()}
          </div>`
    )}

        ${this.showResult ? d : i`<div class="fs-nav">
              ${this.stepIndex > 0 ? i`<button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.goBack}>
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
                ${t ? e.see : e.next}
              </button>
            </div>`}
      </div>
    `;
  }
  render() {
    const s = this.config || {}, e = Y(s, "spa_"), t = e.animate && !O(), o = c(s.spa_title), n = c(s.spa_desc);
    return i`
      <section
        class=${f({ "fs-section": !0, "fs-animate": t })}
        style=${v(B(e))}
        aria-label=${o || a("جوازك العطري", "Scent passport")}
      >
        <div class="fs-container">
          ${o || n ? i`<div class="fs-header">
                ${o ? i`<h2 class="fs-title">${o}</h2>` : d}
                ${n ? i`<p class="fs-desc">${n}</p>` : d}
              </div>` : d}
          ${this.renderWizard()}
        </div>
      </section>
    `;
  }
};
w.styles = [L, M];
let u = w;
$([
  E({ type: Object })
], u.prototype, "config");
$([
  y()
], u.prototype, "stepIndex");
$([
  y()
], u.prototype, "showResult");
$([
  y()
], u.prototype, "selections");
$([
  y()
], u.prototype, "shareNotice");
typeof u < "u" && u.registerSallaComponent("salla-scent-passport");
export {
  u as default
};
