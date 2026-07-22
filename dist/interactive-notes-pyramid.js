var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { keyed } from "lit/directives/keyed.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, a as extractImageUrl, g as getRadioValue, s as sharedSectionCss, t, r as readSectionTheme, p as prefersReducedMotion, b as themeStyleMap, c as renderCommerceOutcome } from "./commerceOutcome-DYfJre3y.js";
const componentStyles = css`
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
    color: var(--text-color, #000000);
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
    color: var(--muted-color, #666666);
    line-height: 1.45;
  }

  .inp-tier__chevron {
    font-size: 1.1rem;
    color: var(--muted-color, #666666);
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
    color: var(--muted-color, #666666);
    line-height: 1.5;
  }

  .inp-tier__empty {
    margin: 0;
    padding: 0.5rem 0.2rem;
    font-size: 0.82rem;
    color: var(--muted-color, #666666);
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
`, LAYER_KEYS = ["top", "heart", "base"], DEFAULT_TIER_LABELS = {
  top: "Top",
  heart: "Heart",
  base: "Base"
};
function resolveLayer(raw, fallback = "top") {
  const value = getRadioValue(raw, fallback).toLowerCase();
  return LAYER_KEYS.includes(value) ? value : fallback;
}
__name(resolveLayer, "resolveLayer");
function parseNote(item, i, fallbackLayer) {
  const name = localizedString(item.name);
  return name ? {
    id: String(item.id ?? item.note_id ?? "").trim() || `note-${i + 1}`,
    name,
    desc: localizedString(item.desc),
    icon: String(item.icon ?? "").trim(),
    image: extractImageUrl(item.image) || extractImageUrl(item.icon),
    layer: resolveLayer(item.layer, fallbackLayer)
  } : null;
}
__name(parseNote, "parseNote");
function parseNotesCollection(raw) {
  return normalizeCollection(raw).map((item, i) => parseNote(item, i, resolveLayer(item.layer))).filter((n) => n !== null);
}
__name(parseNotesCollection, "parseNotesCollection");
function tierFromCollection(tierItem, key, config, notesByLayer) {
  const tierKey = String(tierItem.key ?? tierItem.tier ?? tierItem.layer ?? key).toLowerCase(), layer = LAYER_KEYS.includes(tierKey) ? tierKey : key, embeddedNotes = normalizeCollection(tierItem.notes).map((item, i) => parseNote(item, i, layer)).filter((n) => n !== null), label = localizedString(tierItem.label) || localizedString(config[`inp_${layer}_label`]) || DEFAULT_TIER_LABELS[layer];
  return {
    key: layer,
    label: label || (layer === "top" ? "Top" : layer === "heart" ? "Heart" : "Base"),
    desc: localizedString(tierItem.desc),
    color: String(tierItem.color ?? "").trim() || String(config[`inp_${layer}_color`] ?? "").trim(),
    notes: embeddedNotes.length ? embeddedNotes : notesByLayer.get(layer) || []
  };
}
__name(tierFromCollection, "tierFromCollection");
function parsePyramidTiers(config) {
  const tiersRaw = normalizeCollection(config.inp_tiers), flatNotes = parseNotesCollection(config.inp_notes), notesByLayer = /* @__PURE__ */ new Map();
  for (const note of flatNotes) {
    const list = notesByLayer.get(note.layer) || [];
    list.push(note), notesByLayer.set(note.layer, list);
  }
  return tiersRaw.length ? LAYER_KEYS.map((key) => {
    const match = tiersRaw.find((t2) => String(t2.key ?? t2.tier ?? t2.layer ?? "").toLowerCase() === key) || {};
    return tierFromCollection(match, key, config, notesByLayer);
  }).filter((tier) => tier.label || tier.desc || tier.notes.length) : LAYER_KEYS.map((key) => {
    const labelRaw = config[`inp_${key}_label`], descRaw = config[`inp_${key}_desc`], label = localizedString(labelRaw) || DEFAULT_TIER_LABELS[key];
    return {
      key,
      label,
      desc: localizedString(descRaw),
      color: String(config[`inp_${key}_color`] ?? "").trim(),
      notes: notesByLayer.get(key) || []
    };
  }).filter((tier) => tier.label || tier.desc || tier.notes.length);
}
__name(parsePyramidTiers, "parsePyramidTiers");
function hasPyramidContent(tiers) {
  return tiers.some((tier) => tier.notes.length > 0 || tier.label || tier.desc);
}
__name(hasPyramidContent, "hasPyramidContent");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const TIER_SHORT = {
  top: "T",
  heart: "H",
  base: "B"
}, _InteractiveNotesPyramid = class _InteractiveNotesPyramid extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.openTier = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && (this.openTier = "");
  }
  get tiers() {
    return parsePyramidTiers(this.config || {});
  }
  toggleTier(key) {
    this.openTier = this.openTier === key ? "" : key;
  }
  renderNoteIcon(note) {
    const isSicon = note.icon.startsWith("sicon-");
    return note.image && !note.image.startsWith("sicon-") ? html`<img src=${note.image} alt="" loading="lazy" decoding="async" />` : note.icon ? isSicon ? html`<span class=${note.icon}></span>` : html`<span>${note.icon}</span>` : html`<span aria-hidden="true">•</span>`;
  }
  renderNote(note) {
    return html`
      <div class="inp-note" role="listitem">
        <span class="inp-note__icon">${this.renderNoteIcon(note)}</span>
        <div>
          <p class="inp-note__name">${note.name}</p>
          ${note.desc ? html`<p class="inp-note__desc">${note.desc}</p>` : nothing}
        </div>
      </div>
    `;
  }
  renderTier(tier) {
    const isOpen = this.openTier === tier.key, style = tier.color ? { "--tier-color": tier.color } : {};
    return html`
      <div
        class=${classMap({ "inp-tier": !0, "is-open": isOpen })}
        style=${styleMap(style)}
      >
        <button
          type="button"
          class="inp-tier__toggle fs-tap"
          aria-expanded=${isOpen ? "true" : "false"}
          aria-controls="inp-panel-${tier.key}"
          @click=${() => this.toggleTier(tier.key)}
        >
          <span class="inp-tier__badge">${TIER_SHORT[tier.key]}</span>
          <span class="inp-tier__meta">
            <span class="inp-tier__label">${tier.label}</span>
            ${tier.desc ? html`<p class="inp-tier__desc">${tier.desc}</p>` : nothing}
          </span>
          <span class="inp-tier__chevron" aria-hidden="true">▾</span>
        </button>
        ${isOpen ? keyed(tier.key, html`<div id="inp-panel-${tier.key}" class="inp-tier__panel fs-fade-swap" role="list">
              ${tier.notes.length ? tier.notes.map((note) => this.renderNote(note)) : html`<p class="inp-tier__empty">${t("لا توجد نوتات بعد.", "No notes yet.")}</p>`}
            </div>`) : nothing}
      </div>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "inp_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.inp_title), desc = localizedString(c.inp_desc), tiers = this.tiers, hasContent = hasPyramidContent(tiers);
    return html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("هرم النوتات التفاعلي", "Interactive notes pyramid")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          ${hasContent ? html`<div class="inp-pyramid" role="group" aria-label=${t("هرم النوتات", "Notes pyramid")}>
                ${tiers.map((tier) => this.renderTier(tier))}
              </div>` : html`<div class="fs-empty" role="status">
                ${t("أضف طبقات أو نوتات من إعدادات العنصر.", "Add tiers or notes in the element settings.")}
              </div>`}
          ${renderCommerceOutcome({ config: c, prefix: "inp_" })}
        </div>
      </section>
    `;
  }
};
__name(_InteractiveNotesPyramid, "InteractiveNotesPyramid"), _InteractiveNotesPyramid.styles = [sharedSectionCss, componentStyles];
let InteractiveNotesPyramid = _InteractiveNotesPyramid;
__decorateClass([
  property({ type: Object })
], InteractiveNotesPyramid.prototype, "config");
__decorateClass([
  state()
], InteractiveNotesPyramid.prototype, "openTier");
typeof InteractiveNotesPyramid < "u" && InteractiveNotesPyramid.registerSallaComponent("salla-interactive-notes-pyramid");
export {
  InteractiveNotesPyramid as default
};
