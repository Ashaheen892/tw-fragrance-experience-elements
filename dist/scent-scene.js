var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { keyed } from "lit/directives/keyed.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, e as extractLink, a as extractImageUrl, k as parseTags, l as localizedString, s as sharedSectionCss, t, i as isExternalUrl, p as prefersReducedMotion, r as readSectionTheme, b as themeStyleMap, c as renderCommerceOutcome } from "./commerceOutcome-DYfJre3y.js";
const componentStyles = css`
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
function parseScenes(raw) {
  return normalizeCollection(raw).map((item, i) => ({
    id: String(item.id ?? item.scene_id ?? "").trim() || `scene-${i + 1}`,
    name: localizedString(item.name),
    desc: localizedString(item.desc),
    scentCharacter: localizedString(item.scent_character),
    moodTags: parseTags(item.mood_tags ?? item.tags),
    image: extractImageUrl(item.image) || extractImageUrl(item.bg),
    color: String(item.color ?? "").trim(),
    accent: String(item.accent ?? item.accent_color ?? "").trim(),
    link: extractLink(item.link)
  })).filter((s) => s.name || s.desc || s.image);
}
__name(parseScenes, "parseScenes");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _ScentScene = class _ScentScene extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.activeId = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.ensureActive();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && this.ensureActive();
  }
  get scenes() {
    var _a;
    return parseScenes((_a = this.config) == null ? void 0 : _a.ssc_scenes);
  }
  ensureActive() {
    var _a;
    const list = this.scenes;
    list.some((scene) => scene.id === this.activeId) || (this.activeId = ((_a = list[0]) == null ? void 0 : _a.id) ?? "");
  }
  get active() {
    return this.scenes.find((scene) => scene.id === this.activeId) ?? this.scenes[0] ?? null;
  }
  select(id) {
    this.activeId = id;
  }
  renderChip(scene) {
    const active = scene.id === this.activeId, accent = scene.accent || scene.color || "#9a7b4f";
    return html`
      <button
        type="button"
        class=${classMap({ "ssc-chip": !0, "fs-tap": !0, "is-active": active })}
        style=${styleMap({ "--chip-accent": accent })}
        aria-pressed=${active ? "true" : "false"}
        aria-controls="ssc-stage"
        @click=${() => this.select(scene.id)}
      >
        <span class="ssc-chip__swatch" aria-hidden="true"></span>
        <span class="ssc-chip__name">${scene.name || t("مشهد", "Scene")}</span>
      </button>
    `;
  }
  renderStage(scene) {
    const sceneColor = scene.color || "#1f1a14", sceneAccent = scene.accent || scene.color || "#9a7b4f", external = scene.link ? isExternalUrl(scene.link) : !1, animate = !prefersReducedMotion();
    return html`
      <div
        id="ssc-stage"
        class="ssc-stage fs-fade-swap"
        role="region"
        aria-live="polite"
        style=${styleMap({
      "--scene-color": sceneColor,
      "--scene-accent": sceneAccent
    })}
      >
        ${scene.image ? html`<div
              class=${classMap({ "ssc-stage__bg": !0, "is-visible": !0 })}
              style=${styleMap({
      backgroundImage: `url("${scene.image}")`,
      opacity: animate ? "1" : "0.92"
    })}
              aria-hidden="true"
            ></div>` : nothing}
        <div class="ssc-stage__overlay" aria-hidden="true"></div>
        <div class="ssc-stage__content">
          <p class="ssc-stage__eyebrow">${t("مشهد الرائحة", "Scent scene")}</p>
          <h3 class="ssc-stage__title">${scene.name || t("مشهد عطري", "Fragrance scene")}</h3>
          ${scene.scentCharacter ? html`<p class="ssc-stage__character">${scene.scentCharacter}</p>` : nothing}
          ${scene.desc ? html`<p class="ssc-stage__desc">${scene.desc}</p>` : html`<p class="ssc-stage__desc">
                ${t("اختر مشهداً لاستكشاف أجوائه العطرية.", "Pick a scene to explore its scent mood.")}
              </p>`}
          ${scene.moodTags.length ? html`<div class="ssc-tags" aria-label=${t("وسوم المزاج", "Mood tags")}>
                ${scene.moodTags.map(
      (tag) => html`<span class="ssc-tag">${tag}</span>`
    )}
              </div>` : nothing}
          ${scene.link ? html`<div class="ssc-stage__actions">
                <a
                  class="fs-btn fs-tap"
                  href=${scene.link}
                  target=${external ? "_blank" : "_self"}
                  rel=${external ? "noopener noreferrer" : nothing}
                >
                  ${t("استكشف المشهد", "Explore scene")}
                </a>
              </div>` : nothing}
        </div>
      </div>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "ssc_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.ssc_title), desc = localizedString(c.ssc_desc), scenes = this.scenes, active = this.active;
    return scenes.length ? html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("مشهد الرائحة", "Scent scene")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div class="ssc-shell">
            ${active ? keyed(active.id, this.renderStage(active)) : nothing}
            <div class="ssc-chips" role="tablist" aria-label=${t("المشاهد", "Scenes")}>
              ${scenes.map((scene) => this.renderChip(scene))}
            </div>
          </div>
          ${renderCommerceOutcome({ config: c, prefix: "ssc_" })}
        </div>
      </section>
    ` : html`
        <section
          class=${classMap({ "fs-section": !0, "fs-animate": animate })}
          style=${styleMap(themeStyleMap(theme))}
          aria-label=${title || t("مشهد الرائحة", "Scent scene")}
        >
          <div class="fs-container">
            ${title || desc ? html`<div class="fs-header">
                  ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                  ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
                </div>` : nothing}
            <div class="fs-empty" role="status">
              ${t("أضف مشاهد عطرية من إعدادات العنصر.", "Add scent scenes in the element settings.")}
            </div>
          </div>
        </section>
      `;
  }
};
__name(_ScentScene, "ScentScene"), _ScentScene.styles = [sharedSectionCss, componentStyles];
let ScentScene = _ScentScene;
__decorateClass([
  property({ type: Object })
], ScentScene.prototype, "config");
__decorateClass([
  state()
], ScentScene.prototype, "activeId");
typeof ScentScene < "u" && ScentScene.registerSallaComponent("salla-scent-scene");
export {
  ScentScene as default
};
