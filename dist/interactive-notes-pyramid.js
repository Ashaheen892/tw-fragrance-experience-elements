import { css as S, LitElement as C, html as a, nothing as p } from "lit";
import { property as L, state as k } from "lit/decorators.js";
import { classMap as v } from "lit/directives/class-map.js";
import { keyed as z } from "lit/directives/keyed.js";
import { styleMap as _ } from "lit/directives/style-map.js";
import { n as h, l as c, a as b, g as E, s as R, t as g, r as N, p as H, b as B, c as M } from "./commerceOutcome-CkVkQjOd.js";
const O = S`
  .inp-pyramid {
    display: grid;
    gap: 0.65rem;
    max-width: 720px;
    margin-inline: auto;
  }

  .inp-tier {
    border: 1.5px solid var(--border-color, #e6e0d6);
    border-radius: calc(var(--section-radius, 20px) * 0.85);
    background: var(--card-bg, #fff);
    overflow: hidden;
    box-shadow: 0 6px 16px rgba(90, 70, 40, 0.07);
    transition:
      border-color 0.24s ease,
      box-shadow 0.24s ease,
      transform 0.24s ease;
  }

  .inp-tier:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .inp-tier.is-open {
    border-color: color-mix(in srgb, var(--tier-color, var(--accent-color, var(--fs-store-primary))) 42%, var(--border-color, #e6e0d6));
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--tier-color, var(--accent-color, var(--fs-store-primary))) 18%, transparent),
      0 12px 28px rgba(90, 70, 40, 0.1);
    transform: translateY(-2px);
  }

  .inp-tier__toggle {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    min-height: 56px;
    padding: 0.85rem 1rem;
    border: none;
    background: transparent;
    color: var(--text-color, #1f1a14);
    font: inherit;
    text-align: start;
    cursor: pointer;
  }

  .inp-tier__badge {
    width: 2.35rem;
    height: 2.35rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: color-mix(in srgb, var(--tier-color, var(--accent-color, var(--fs-store-primary))) 16%, var(--card-bg, #fff));
    color: var(--tier-color, var(--accent-color, var(--fs-store-primary)));
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.04em;
  }

  .inp-tier__meta {
    min-width: 0;
  }

  .inp-tier__label {
    display: block;
    font-size: 0.95rem;
    font-weight: 800;
    line-height: 1.25;
  }

  .inp-tier__desc {
    margin: 0.15rem 0 0;
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    color: var(--muted-color, #6e6558);
    line-height: 1.45;
  }

  .inp-tier__chevron {
    font-size: 1.1rem;
    color: var(--muted-color, #6e6558);
    transition: transform 0.24s ease, color 0.24s ease;
  }

  .inp-tier.is-open .inp-tier__chevron {
    transform: rotate(180deg);
    color: var(--tier-color, var(--accent-color, var(--fs-store-primary)));
  }

  .inp-tier__panel {
    display: grid;
    gap: 0.65rem;
    padding: 0 1rem 1rem;
  }

  .inp-note {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.65rem;
    align-items: start;
    padding: 0.75rem 0.85rem;
    border-radius: calc(var(--section-radius, 20px) * 0.55);
    background: color-mix(in srgb, var(--tier-color, var(--accent-color, var(--fs-store-primary))) 6%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--tier-color, var(--accent-color, var(--fs-store-primary))) 18%, var(--border-color, #e6e0d6));
  }

  .inp-note__icon {
    width: 2rem;
    height: 2rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: color-mix(in srgb, var(--tier-color, var(--accent-color, var(--fs-store-primary))) 14%, var(--card-bg, #fff));
    color: var(--tier-color, var(--accent-color, var(--fs-store-primary)));
    font-size: 0.85rem;
    overflow: hidden;
  }

  .inp-note__icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .inp-note__name {
    margin: 0;
    font-size: 0.88rem;
    font-weight: 800;
    line-height: 1.35;
  }

  .inp-note__desc {
    margin: 0.15rem 0 0;
    font-size: 0.78rem;
    color: var(--muted-color, #6e6558);
    line-height: 1.5;
  }

  .inp-tier__empty {
    margin: 0;
    padding: 0.5rem 0.2rem;
    font-size: 0.82rem;
    color: var(--muted-color, #6e6558);
  }

  @media (prefers-reduced-motion: reduce) {
    .inp-tier,
    .inp-tier__chevron {
      transition: none !important;
    }

    .inp-tier:hover,
    .inp-tier.is-open {
      transform: none;
    }
  }
`, f = ["top", "heart", "base"], y = {
  top: "Top",
  heart: "Heart",
  base: "Base"
};
function $(n, e = "top") {
  const t = E(n, e).toLowerCase();
  return f.includes(t) ? t : e;
}
function x(n, e, t) {
  const i = c(n.name);
  return i ? {
    id: String(n.id ?? n.note_id ?? "").trim() || `note-${e + 1}`,
    name: i,
    desc: c(n.desc),
    icon: String(n.icon ?? "").trim(),
    image: b(n.image) || b(n.icon),
    layer: $(n.layer, t)
  } : null;
}
function A(n) {
  return h(n).map((e, t) => x(e, t, $(e.layer))).filter((e) => e !== null);
}
function Y(n, e, t, i) {
  const r = String(n.key ?? n.tier ?? n.layer ?? e).toLowerCase(), o = f.includes(r) ? r : e, s = h(n.notes).map((m, T) => x(m, T, o)).filter((m) => m !== null), l = c(n.label) || c(t[`inp_${o}_label`]) || y[o];
  return {
    key: o,
    label: l || (o === "top" ? "Top" : o === "heart" ? "Heart" : "Base"),
    desc: c(n.desc),
    color: String(n.color ?? "").trim() || String(t[`inp_${o}_color`] ?? "").trim(),
    notes: s.length ? s : i.get(o) || []
  };
}
function j(n) {
  const e = h(n.inp_tiers), t = A(n.inp_notes), i = /* @__PURE__ */ new Map();
  for (const r of t) {
    const o = i.get(r.layer) || [];
    o.push(r), i.set(r.layer, o);
  }
  return e.length ? f.map((r) => {
    const o = e.find((s) => String(s.key ?? s.tier ?? s.layer ?? "").toLowerCase() === r) || {};
    return Y(o, r, n, i);
  }).filter((r) => r.label || r.desc || r.notes.length) : f.map((r) => {
    const o = n[`inp_${r}_label`], s = n[`inp_${r}_desc`], l = c(o) || y[r];
    return {
      key: r,
      label: l,
      desc: c(s),
      color: String(n[`inp_${r}_color`] ?? "").trim(),
      notes: i.get(r) || []
    };
  }).filter((r) => r.label || r.desc || r.notes.length);
}
function U(n) {
  return n.some((e) => e.notes.length > 0 || e.label || e.desc);
}
var F = Object.defineProperty, w = (n, e, t, i) => {
  for (var r = void 0, o = n.length - 1, s; o >= 0; o--)
    (s = n[o]) && (r = s(e, t, r) || r);
  return r && F(e, t, r), r;
};
const K = {
  top: "T",
  heart: "H",
  base: "B"
}, u = class u extends C {
  constructor() {
    super(...arguments), this.config = {}, this.openTier = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(e) {
    e.has("config") && (this.openTier = "");
  }
  get tiers() {
    return j(this.config || {});
  }
  toggleTier(e) {
    this.openTier = this.openTier === e ? "" : e;
  }
  renderNoteIcon(e) {
    const t = e.icon.startsWith("sicon-");
    return e.image && !e.image.startsWith("sicon-") ? a`<img src=${e.image} alt="" loading="lazy" decoding="async" />` : e.icon ? t ? a`<span class=${e.icon}></span>` : a`<span>${e.icon}</span>` : a`<span aria-hidden="true">•</span>`;
  }
  renderNote(e) {
    return a`
      <div class="inp-note" role="listitem">
        <span class="inp-note__icon">${this.renderNoteIcon(e)}</span>
        <div>
          <p class="inp-note__name">${e.name}</p>
          ${e.desc ? a`<p class="inp-note__desc">${e.desc}</p>` : p}
        </div>
      </div>
    `;
  }
  renderTier(e) {
    const t = this.openTier === e.key, i = e.color ? { "--tier-color": e.color } : {};
    return a`
      <div
        class=${v({ "inp-tier": !0, "is-open": t })}
        style=${_(i)}
      >
        <button
          type="button"
          class="inp-tier__toggle fs-tap"
          aria-expanded=${t ? "true" : "false"}
          aria-controls="inp-panel-${e.key}"
          @click=${() => this.toggleTier(e.key)}
        >
          <span class="inp-tier__badge">${K[e.key]}</span>
          <span class="inp-tier__meta">
            <span class="inp-tier__label">${e.label}</span>
            ${e.desc ? a`<p class="inp-tier__desc">${e.desc}</p>` : p}
          </span>
          <span class="inp-tier__chevron" aria-hidden="true">▾</span>
        </button>
        ${t ? z(e.key, a`<div id="inp-panel-${e.key}" class="inp-tier__panel fs-fade-swap" role="list">
              ${e.notes.length ? e.notes.map((r) => this.renderNote(r)) : a`<p class="inp-tier__empty">${g("لا توجد نوتات بعد.", "No notes yet.")}</p>`}
            </div>`) : p}
      </div>
    `;
  }
  render() {
    const e = this.config || {}, t = N(e, "inp_"), i = t.animate && !H(), r = c(e.inp_title), o = c(e.inp_desc), s = this.tiers, l = U(s);
    return a`
      <section
        class=${v({ "fs-section": !0, "fs-animate": i })}
        style=${_(B(t))}
        aria-label=${r || g("هرم النوتات التفاعلي", "Interactive notes pyramid")}
      >
        <div class="fs-container">
          ${r || o ? a`<div class="fs-header">
                ${r ? a`<h2 class="fs-title">${r}</h2>` : p}
                ${o ? a`<p class="fs-desc">${o}</p>` : p}
              </div>` : p}

          ${l ? a`<div class="inp-pyramid" role="group" aria-label=${g("هرم النوتات", "Notes pyramid")}>
                ${s.map((m) => this.renderTier(m))}
              </div>` : a`<div class="fs-empty" role="status">
                ${g("أضف طبقات أو نوتات من إعدادات العنصر.", "Add tiers or notes in the element settings.")}
              </div>`}
          ${M({ config: e, prefix: "inp_" })}
        </div>
      </section>
    `;
  }
};
u.styles = [R, O];
let d = u;
w([
  L({ type: Object })
], d.prototype, "config");
w([
  k()
], d.prototype, "openTier");
typeof d < "u" && d.registerSallaComponent("salla-interactive-notes-pyramid");
export {
  d as default
};
