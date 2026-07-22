import { css as $, LitElement as y, html as r, nothing as c } from "lit";
import { property as w, state as k } from "lit/decorators.js";
import { classMap as m } from "lit/directives/class-map.js";
import { keyed as C } from "lit/directives/keyed.js";
import { styleMap as d } from "lit/directives/style-map.js";
import { n as S, e as z, a as h, k as I, l as p, s as L, t as i, i as A, p as b, r as E, b as u, c as M } from "./commerceOutcome-CCLcV5SW.js";
const T = $`
  .ssc-shell {
    display: grid;
    gap: 1rem;
  }

  .ssc-stage {
    position: relative;
    overflow: hidden;
    min-height: clamp(18rem, 52vw, 28rem);
    border-radius: var(--section-radius, 20px);
    border: 1px solid var(--border-color, #e6e0d6);
    background: color-mix(in srgb, var(--scene-color, var(--accent-color, var(--fs-store-primary))) 12%, var(--card-bg, #fff));
    box-shadow: 0 14px 34px rgba(90, 70, 40, 0.11);
    transition:
      background 0.28s ease,
      border-color 0.28s ease;
  }

  .ssc-stage__bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    transform: scale(1.02);
    transition: opacity 0.28s ease, transform 0.28s ease;
  }

  .ssc-stage__bg.is-visible {
    opacity: 1;
  }

  .ssc-stage__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      color-mix(in srgb, var(--scene-color, var(--text-color, #1f1a14)) 15%, transparent) 0%,
      color-mix(in srgb, var(--scene-color, var(--text-color, #1f1a14)) 72%, transparent) 58%,
      color-mix(in srgb, var(--scene-color, var(--text-color, #1f1a14)) 88%, var(--text-color, #1f1a14)) 100%
    );
    pointer-events: none;
  }

  .ssc-stage__content {
    position: relative;
    z-index: 1;
    display: grid;
    align-content: end;
    gap: 0.65rem;
    min-height: inherit;
    padding: clamp(1.05rem, 3vw, 1.75rem);
    color: var(--card-bg, #fff);
  }

  .ssc-stage__eyebrow {
    margin: 0;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: color-mix(in srgb, var(--scene-accent, var(--accent-color, var(--fs-store-primary))) 85%, var(--card-bg, #fff));
  }

  .ssc-stage__title {
    margin: 0;
    font-size: clamp(1.35rem, 3vw, 2rem);
    font-weight: 800;
    line-height: 1.2;
    text-shadow: 0 8px 24px color-mix(in srgb, var(--text-color, #1f1a14) 35%, transparent);
  }

  .ssc-stage__character {
    margin: 0;
    font-size: clamp(0.95rem, 2vw, 1.1rem);
    font-weight: 800;
    color: color-mix(in srgb, var(--card-bg, #fff) 92%, var(--scene-accent, var(--accent-color, var(--fs-store-primary))));
  }

  .ssc-stage__desc {
    margin: 0;
    max-width: 42rem;
    line-height: 1.7;
    font-size: 0.94rem;
    color: color-mix(in srgb, var(--card-bg, #fff) 88%, transparent);
  }

  .ssc-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin-top: 0.15rem;
  }

  .ssc-tag {
    padding: 0.28rem 0.62rem;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    background: color-mix(in srgb, var(--scene-accent, var(--accent-color, var(--fs-store-primary))) 28%, color-mix(in srgb, var(--card-bg, #fff) 12%, transparent));
    border: 1px solid color-mix(in srgb, var(--card-bg, #fff) 22%, transparent);
    backdrop-filter: blur(6px);
  }

  .ssc-stage__actions {
    margin-top: 0.35rem;
  }

  .ssc-chips {
    display: flex;
    gap: 0.65rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x proximity;
    padding-bottom: 0.25rem;
  }

  .ssc-chip {
    flex: 0 0 auto;
    scroll-snap-align: start;
    display: grid;
    gap: 0.35rem;
    min-width: 7.5rem;
    min-height: 44px;
    padding: 0.85rem 0.95rem;
    border-radius: calc(var(--section-radius, 20px) * 0.72);
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

  .ssc-chip:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--chip-accent, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .ssc-chip.is-active {
    border-color: var(--chip-accent, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--chip-accent, var(--accent-color, var(--fs-store-primary))) 9%,
      var(--card-bg, #fff)
    );
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--chip-accent, var(--accent-color, var(--fs-store-primary))) 18%, transparent),
      0 12px 28px rgba(90, 70, 40, 0.1);
    transform: translateY(-2px);
  }

  .ssc-chip:active {
    transform: translateY(0);
  }

  .ssc-chip__swatch {
    width: 100%;
    height: 0.35rem;
    border-radius: 999px;
    background: var(--chip-accent, var(--accent-color, var(--fs-store-primary)));
  }

  .ssc-chip__name {
    font-size: 0.84rem;
    font-weight: 800;
    line-height: 1.35;
  }

  @media (min-width: 960px) {
    .ssc-chips {
      flex-wrap: wrap;
      overflow: visible;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ssc-stage,
    .ssc-stage__bg,
    .ssc-chip {
      transition: none !important;
    }

    .ssc-chip:hover,
    .ssc-chip.is-active {
      transform: none;
    }
  }
`;
function H(g) {
  return S(g).map((s, a) => ({
    id: String(s.id ?? s.scene_id ?? "").trim() || `scene-${a + 1}`,
    name: p(s.name),
    desc: p(s.desc),
    scentCharacter: p(s.scent_character),
    moodTags: I(s.mood_tags ?? s.tags),
    image: h(s.image) || h(s.bg),
    color: String(s.color ?? "").trim(),
    accent: String(s.accent ?? s.accent_color ?? "").trim(),
    link: z(s.link)
  })).filter((s) => s.name || s.desc || s.image);
}
var O = Object.defineProperty, x = (g, s, a, o) => {
  for (var e = void 0, t = g.length - 1, n; t >= 0; t--)
    (n = g[t]) && (e = n(s, a, e) || e);
  return e && O(s, a, e), e;
};
const v = class v extends y {
  constructor() {
    super(...arguments), this.config = {}, this.activeId = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.ensureActive();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(s) {
    s.has("config") && this.ensureActive();
  }
  get scenes() {
    var s;
    return H((s = this.config) == null ? void 0 : s.ssc_scenes);
  }
  ensureActive() {
    var a;
    const s = this.scenes;
    s.some((o) => o.id === this.activeId) || (this.activeId = ((a = s[0]) == null ? void 0 : a.id) ?? "");
  }
  get active() {
    return this.scenes.find((s) => s.id === this.activeId) ?? this.scenes[0] ?? null;
  }
  select(s) {
    this.activeId = s;
  }
  renderChip(s) {
    const a = s.id === this.activeId, o = s.accent || s.color || "#9a7b4f";
    return r`
      <button
        type="button"
        class=${m({ "ssc-chip": !0, "fs-tap": !0, "is-active": a })}
        style=${d({ "--chip-accent": o })}
        aria-pressed=${a ? "true" : "false"}
        aria-controls="ssc-stage"
        @click=${() => this.select(s.id)}
      >
        <span class="ssc-chip__swatch" aria-hidden="true"></span>
        <span class="ssc-chip__name">${s.name || i("مشهد", "Scene")}</span>
      </button>
    `;
  }
  renderStage(s) {
    const a = s.color || "#1f1a14", o = s.accent || s.color || "#9a7b4f", e = s.link ? A(s.link) : !1, t = !b();
    return r`
      <div
        id="ssc-stage"
        class="ssc-stage fs-fade-swap"
        role="region"
        aria-live="polite"
        style=${d({
      "--scene-color": a,
      "--scene-accent": o
    })}
      >
        ${s.image ? r`<div
              class=${m({ "ssc-stage__bg": !0, "is-visible": !0 })}
              style=${d({
      backgroundImage: `url("${s.image}")`,
      opacity: t ? "1" : "0.92"
    })}
              aria-hidden="true"
            ></div>` : c}
        <div class="ssc-stage__overlay" aria-hidden="true"></div>
        <div class="ssc-stage__content">
          <p class="ssc-stage__eyebrow">${i("مشهد الرائحة", "Scent scene")}</p>
          <h3 class="ssc-stage__title">${s.name || i("مشهد عطري", "Fragrance scene")}</h3>
          ${s.scentCharacter ? r`<p class="ssc-stage__character">${s.scentCharacter}</p>` : c}
          ${s.desc ? r`<p class="ssc-stage__desc">${s.desc}</p>` : r`<p class="ssc-stage__desc">
                ${i("اختر مشهداً لاستكشاف أجوائه العطرية.", "Pick a scene to explore its scent mood.")}
              </p>`}
          ${s.moodTags.length ? r`<div class="ssc-tags" aria-label=${i("وسوم المزاج", "Mood tags")}>
                ${s.moodTags.map(
      (n) => r`<span class="ssc-tag">${n}</span>`
    )}
              </div>` : c}
          ${s.link ? r`<div class="ssc-stage__actions">
                <a
                  class="fs-btn fs-tap"
                  href=${s.link}
                  target=${e ? "_blank" : "_self"}
                  rel=${e ? "noopener noreferrer" : c}
                >
                  ${i("استكشف المشهد", "Explore scene")}
                </a>
              </div>` : c}
        </div>
      </div>
    `;
  }
  render() {
    const s = this.config || {}, a = E(s, "ssc_"), o = a.animate && !b(), e = p(s.ssc_title), t = p(s.ssc_desc), n = this.scenes, f = this.active;
    return n.length ? r`
      <section
        class=${m({ "fs-section": !0, "fs-animate": o })}
        style=${d(u(a))}
        aria-label=${e || i("مشهد الرائحة", "Scent scene")}
      >
        <div class="fs-container">
          ${e || t ? r`<div class="fs-header">
                ${e ? r`<h2 class="fs-title">${e}</h2>` : c}
                ${t ? r`<p class="fs-desc">${t}</p>` : c}
              </div>` : c}

          <div class="ssc-shell">
            ${f ? C(f.id, this.renderStage(f)) : c}
            <div class="ssc-chips" role="tablist" aria-label=${i("المشاهد", "Scenes")}>
              ${n.map((_) => this.renderChip(_))}
            </div>
          </div>
          ${M({ config: s, prefix: "ssc_" })}
        </div>
      </section>
    ` : r`
        <section
          class=${m({ "fs-section": !0, "fs-animate": o })}
          style=${d(u(a))}
          aria-label=${e || i("مشهد الرائحة", "Scent scene")}
        >
          <div class="fs-container">
            ${e || t ? r`<div class="fs-header">
                  ${e ? r`<h2 class="fs-title">${e}</h2>` : c}
                  ${t ? r`<p class="fs-desc">${t}</p>` : c}
                </div>` : c}
            <div class="fs-empty" role="status">
              ${i("أضف مشاهد عطرية من إعدادات العنصر.", "Add scent scenes in the element settings.")}
            </div>
          </div>
        </section>
      `;
  }
};
v.styles = [L, T];
let l = v;
x([
  w({ type: Object })
], l.prototype, "config");
x([
  k()
], l.prototype, "activeId");
typeof l < "u" && l.registerSallaComponent("salla-scent-scene");
export {
  l as default
};
