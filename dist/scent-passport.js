var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { keyed } from "lit/directives/keyed.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, a as extractImageUrl, l as localizedString, t, k as parseTags, s as sharedSectionCss, m as copyText, c as renderCommerceOutcome, r as readSectionTheme, p as prefersReducedMotion, b as themeStyleMap } from "./commerceOutcome-DYfJre3y.js";
const componentStyles = css`
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
function parseIds(raw) {
  if (Array.isArray(raw))
    return raw.map((item) => {
      if (typeof item == "string") return item.trim();
      if (item && typeof item == "object") {
        const obj = item;
        return String(obj.id ?? obj.value ?? obj.key ?? "").trim();
      }
      return "";
    }).filter(Boolean);
  const text = String(raw ?? "").trim();
  return text ? text.split(/[,،|/]/).map((part) => part.trim()).filter(Boolean) : [];
}
__name(parseIds, "parseIds");
function parseNotes(raw) {
  return normalizeCollection(raw).map((item, i) => ({
    id: String(item.id ?? item.note_id ?? "").trim() || `note-${i + 1}`,
    name: localizedString(item.name),
    color: String(item.color ?? "").trim(),
    icon: String(item.icon ?? "").trim(),
    image: extractImageUrl(item.image) || extractImageUrl(item.icon)
  })).filter((n) => n.name);
}
__name(parseNotes, "parseNotes");
function parseStrengths(raw) {
  return normalizeCollection(raw).map((item, i) => {
    const value = String(item.value ?? item.id ?? item.strength_id ?? "").trim();
    return {
      id: String(item.id ?? item.strength_id ?? value).trim() || `strength-${i + 1}`,
      name: localizedString(item.name),
      desc: localizedString(item.desc),
      value: value || `strength-${i + 1}`
    };
  }).filter((s) => s.name);
}
__name(parseStrengths, "parseStrengths");
function parseTimes(raw) {
  return normalizeCollection(raw).map((item, i) => ({
    id: String(item.id ?? item.time_id ?? "").trim() || `time-${i + 1}`,
    name: localizedString(item.name)
  })).filter((t2) => t2.name);
}
__name(parseTimes, "parseTimes");
function parseCharacters(raw) {
  return normalizeCollection(raw).map((item, i) => ({
    id: String(item.id ?? item.character_id ?? "").trim() || `character-${i + 1}`,
    name: localizedString(item.name),
    desc: localizedString(item.desc),
    color: String(item.color ?? "").trim(),
    icon: String(item.icon ?? "").trim()
  })).filter((c) => c.name);
}
__name(parseCharacters, "parseCharacters");
function parsePassportResults(raw) {
  return normalizeCollection(raw).map((item, i) => ({
    id: String(item.id ?? item.result_id ?? "").trim() || `result-${i + 1}`,
    summary: localizedString(item.summary),
    characterIds: parseIds(item.character_id ?? item.character_ids),
    tags: parseTags(item.tags)
  })).filter((r) => r.summary || r.characterIds.length || r.tags.length);
}
__name(parsePassportResults, "parsePassportResults");
function parseNavLabels(config) {
  return {
    next: localizedString(config.spa_next_btn) || t("التالي", "Next"),
    back: localizedString(config.spa_back_btn) || t("السابق", "Back"),
    see: localizedString(config.spa_see_btn) || t("اعرض جوازك", "See your passport"),
    reset: localizedString(config.spa_reset_btn) || t("ابدأ من جديد", "Start over"),
    share: localizedString(config.spa_share_btn) || t("نسخ الملخص", "Copy summary"),
    passportTitle: localizedString(config.spa_passport_title) || t("جوازك العطري", "Your scent passport"),
    holderLabel: localizedString(config.spa_holder_label) || t("حامل الجواز", "Passport holder"),
    ctaLabel: localizedString(config.spa_cta_label) || t("استكشف التوصية", "Explore recommendation")
  };
}
__name(parseNavLabels, "parseNavLabels");
function findMatchingResult(results, characterId, characterName) {
  if (!results.length) return null;
  const byCharacter = results.find((r) => r.characterIds.includes(characterId));
  if (byCharacter) return byCharacter;
  const nameToken = characterName.trim().toLowerCase();
  if (nameToken) {
    const byTag = results.find(
      (r) => r.tags.some((tag) => tag.toLowerCase() === nameToken || nameToken.includes(tag.toLowerCase()))
    );
    if (byTag) return byTag;
  }
  return results[0] ?? null;
}
__name(findMatchingResult, "findMatchingResult");
function buildGeneratedSummary(selections, liked, disliked, strength, times, character) {
  const parts = [], likedNames = liked.filter((n) => selections.likedIds.includes(n.id)).map((n) => n.name), dislikedNames = disliked.filter((n) => selections.dislikedIds.includes(n.id)).map((n) => n.name), timeNames = times.filter((t2) => selections.timeIds.includes(t2.id)).map((t2) => t2.name);
  return character != null && character.name && parts.push(
    t(
      `طابعك العطري: ${character.name}.`,
      `Your scent character: ${character.name}.`
    )
  ), likedNames.length && parts.push(
    t(
      `نوتات تحبها: ${likedNames.join("، ")}.`,
      `Notes you love: ${likedNames.join(", ")}.`
    )
  ), dislikedNames.length && parts.push(
    t(
      `تتجنّب: ${dislikedNames.join("، ")}.`,
      `You avoid: ${dislikedNames.join(", ")}.`
    )
  ), strength != null && strength.name && parts.push(
    t(
      `التركيز المفضّل: ${strength.name}.`,
      `Preferred intensity: ${strength.name}.`
    )
  ), timeNames.length && parts.push(
    t(
      `أوقات الارتداء: ${timeNames.join("، ")}.`,
      `Wear times: ${timeNames.join(", ")}.`
    )
  ), parts.length ? parts.join(" ") : t(
    "أكمل اختياراتك لبناء ملفك العطري الشخصي.",
    "Complete your picks to build your personal scent profile."
  );
}
__name(buildGeneratedSummary, "buildGeneratedSummary");
function buildShareText(summary, selections, liked, disliked, strength, times, character, passportTitle) {
  const header = passportTitle || t("جوازك العطري", "Your scent passport"), body = summary || buildGeneratedSummary(selections, liked, disliked, strength, times, character);
  return `${header}

${body}`;
}
__name(buildShareText, "buildShareText");
const PASSPORT_STEPS = [
  { key: "liked", labelAr: "النوتات المفضّلة", labelEn: "Liked notes" },
  { key: "disliked", labelAr: "نوتات تتجنّبها", labelEn: "Notes to avoid" },
  { key: "strength", labelAr: "قوّة العطر", labelEn: "Scent strength" },
  { key: "times", labelAr: "أوقات الارتداء", labelEn: "Wear times" },
  { key: "character", labelAr: "طابعك العطري", labelEn: "Scent character" }
];
function toggleId(list, id) {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
}
__name(toggleId, "toggleId");
function emptySelections() {
  return {
    likedIds: [],
    dislikedIds: [],
    strengthId: "",
    timeIds: [],
    characterId: ""
  };
}
__name(emptySelections, "emptySelections");
function resolveStrength(strengths, strengthId) {
  return strengths.find((s) => s.id === strengthId || s.value === strengthId) ?? null;
}
__name(resolveStrength, "resolveStrength");
function resolveCharacter(characters, characterId) {
  return characters.find((c) => c.id === characterId) ?? null;
}
__name(resolveCharacter, "resolveCharacter");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _ScentPassport = class _ScentPassport extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.stepIndex = 0, this.showResult = !1, this.selections = emptySelections(), this.shareNotice = "", this.boundLangHandler = () => this.requestUpdate(), this.shareTimer = null;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), this.shareTimer && clearTimeout(this.shareTimer), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && (this.stepIndex = 0, this.showResult = !1, this.selections = emptySelections(), this.shareNotice = "");
  }
  get likedNotes() {
    var _a;
    return parseNotes((_a = this.config) == null ? void 0 : _a.spa_liked_notes);
  }
  get dislikedNotes() {
    var _a;
    return parseNotes((_a = this.config) == null ? void 0 : _a.spa_disliked_notes);
  }
  get strengths() {
    var _a;
    return parseStrengths((_a = this.config) == null ? void 0 : _a.spa_strengths);
  }
  get times() {
    var _a;
    return parseTimes((_a = this.config) == null ? void 0 : _a.spa_times);
  }
  get characters() {
    var _a;
    return parseCharacters((_a = this.config) == null ? void 0 : _a.spa_characters);
  }
  get currentStepKey() {
    var _a;
    return ((_a = PASSPORT_STEPS[this.stepIndex]) == null ? void 0 : _a.key) ?? "liked";
  }
  canAdvance() {
    const key = this.currentStepKey;
    return key === "strength" ? !!this.selections.strengthId || !this.strengths.length : key === "character" ? !!this.selections.characterId || !this.characters.length : !0;
  }
  goNext() {
    if (this.canAdvance()) {
      if (this.stepIndex >= PASSPORT_STEPS.length - 1) {
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
    this.stepIndex = 0, this.showResult = !1, this.selections = emptySelections(), this.shareNotice = "";
  }
  async shareSummary() {
    const c = this.config || {}, labels = parseNavLabels(c), summary = this.resolveSummary(), text = buildShareText(
      summary,
      this.selections,
      this.likedNotes,
      this.dislikedNotes,
      this.selectedStrength,
      this.selectedTimes,
      this.selectedCharacter,
      labels.passportTitle
    ), ok = await copyText(text);
    this.shareNotice = ok ? t("تم نسخ الملخص.", "Summary copied.") : t("تعذّر النسخ.", "Could not copy."), this.shareTimer && clearTimeout(this.shareTimer), this.shareTimer = setTimeout(() => {
      this.shareNotice = "";
    }, 2400);
  }
  get selectedStrength() {
    return resolveStrength(this.strengths, this.selections.strengthId);
  }
  get selectedCharacter() {
    return resolveCharacter(this.characters, this.selections.characterId);
  }
  get selectedTimes() {
    return this.times.filter((item) => this.selections.timeIds.includes(item.id));
  }
  resolveSummary() {
    var _a, _b;
    const matched = findMatchingResult(
      parsePassportResults((_a = this.config) == null ? void 0 : _a.spa_results),
      this.selections.characterId,
      ((_b = this.selectedCharacter) == null ? void 0 : _b.name) ?? ""
    );
    return matched != null && matched.summary ? matched.summary : buildGeneratedSummary(
      this.selections,
      this.likedNotes,
      this.dislikedNotes,
      this.selectedStrength,
      this.selectedTimes,
      this.selectedCharacter
    );
  }
  renderIcon(icon, image) {
    return image ? html`<img src=${image} alt="" loading="lazy" decoding="async" />` : icon.startsWith("sicon-") ? html`<span class=${icon}></span>` : html`<span>${icon || "◆"}</span>`;
  }
  renderNoteChip(item, selectedIds, field) {
    const active = selectedIds.includes(item.id), style = item.color ? { "--item-color": item.color } : {};
    return html`
      <button
        type="button"
        class=${classMap({ "spa-chip": !0, "fs-tap": !0, "is-active": active })}
        style=${styleMap(style)}
        aria-pressed=${active ? "true" : "false"}
        @click=${() => {
      this.selections = {
        ...this.selections,
        [field]: toggleId(this.selections[field], item.id)
      };
    }}
      >
        <span class="spa-chip__icon">${this.renderIcon(item.icon, item.image)}</span>
        <span class="spa-chip__name">${item.name}</span>
      </button>
    `;
  }
  renderStrengthOption(item) {
    const active = this.selections.strengthId === item.id || this.selections.strengthId === item.value;
    return html`
      <button
        type="button"
        class=${classMap({ "spa-option": !0, "fs-tap": !0, "is-active": active })}
        aria-pressed=${active ? "true" : "false"}
        @click=${() => {
      this.selections = { ...this.selections, strengthId: item.id };
    }}
      >
        <span class="spa-option__name">${item.name}</span>
        ${item.desc ? html`<p class="spa-option__desc">${item.desc}</p>` : nothing}
      </button>
    `;
  }
  renderTimeChip(item) {
    const active = this.selections.timeIds.includes(item.id);
    return html`
      <button
        type="button"
        class=${classMap({ "spa-chip": !0, "fs-tap": !0, "is-active": active })}
        aria-pressed=${active ? "true" : "false"}
        @click=${() => {
      this.selections = {
        ...this.selections,
        timeIds: toggleId(this.selections.timeIds, item.id)
      };
    }}
      >
        <span class="spa-chip__name">${item.name}</span>
      </button>
    `;
  }
  renderCharacterOption(item) {
    const active = this.selections.characterId === item.id, style = item.color ? { "--item-color": item.color } : {};
    return html`
      <button
        type="button"
        class=${classMap({ "spa-option": !0, "fs-tap": !0, "is-active": active })}
        style=${styleMap(style)}
        aria-pressed=${active ? "true" : "false"}
        @click=${() => {
      this.selections = { ...this.selections, characterId: item.id };
    }}
      >
        <span class="spa-option__name">${item.icon ? `${item.icon} ` : nothing}${item.name}</span>
        ${item.desc ? html`<p class="spa-option__desc">${item.desc}</p>` : nothing}
      </button>
    `;
  }
  renderStepBody() {
    const key = this.currentStepKey, stepMeta = PASSPORT_STEPS[this.stepIndex];
    return key === "liked" ? html`
        <div class="spa-step" role="group" aria-label=${t(stepMeta.labelAr, stepMeta.labelEn)}>
          <h3 class="spa-step__title">${t(stepMeta.labelAr, stepMeta.labelEn)}</h3>
          <p class="fs-coach">
            <span class="fs-coach__mark" aria-hidden="true">✦</span>
            ${t("اختر واحدة أو أكثر", "Pick one or more")}
          </p>
          ${this.likedNotes.length ? html`<div class="spa-grid">
                ${this.likedNotes.map(
      (item) => this.renderNoteChip(item, this.selections.likedIds, "likedIds")
    )}
              </div>` : html`<div class="spa-step__empty">
                ${t("أضف نوتات مفضّلة من إعدادات العنصر.", "Add liked notes in element settings.")}
              </div>`}
        </div>
      ` : key === "disliked" ? html`
        <div class="spa-step" role="group" aria-label=${t(stepMeta.labelAr, stepMeta.labelEn)}>
          <h3 class="spa-step__title">${t(stepMeta.labelAr, stepMeta.labelEn)}</h3>
          <p class="fs-coach">
            <span class="fs-coach__mark" aria-hidden="true">✦</span>
            ${t("اختياري — لتجنّب ما لا يناسبك", "Optional — notes to skip")}
          </p>
          ${this.dislikedNotes.length ? html`<div class="spa-grid">
                ${this.dislikedNotes.map(
      (item) => this.renderNoteChip(item, this.selections.dislikedIds, "dislikedIds")
    )}
              </div>` : html`<div class="spa-step__empty">
                ${t("أضف نوتات مرفوضة من إعدادات العنصر.", "Add disliked notes in element settings.")}
              </div>`}
        </div>
      ` : key === "strength" ? html`
        <div class="spa-step" role="radiogroup" aria-label=${t(stepMeta.labelAr, stepMeta.labelEn)}>
          <h3 class="spa-step__title">${t(stepMeta.labelAr, stepMeta.labelEn)}</h3>
          ${this.strengths.length ? html`<div class="spa-list">
                ${this.strengths.map((item) => this.renderStrengthOption(item))}
              </div>` : html`<div class="spa-step__empty">
                ${t("أضف مستويات التركيز من إعدادات العنصر.", "Add strength levels in element settings.")}
              </div>`}
        </div>
      ` : key === "times" ? html`
        <div class="spa-step" role="group" aria-label=${t(stepMeta.labelAr, stepMeta.labelEn)}>
          <h3 class="spa-step__title">${t(stepMeta.labelAr, stepMeta.labelEn)}</h3>
          <p class="fs-coach">
            <span class="fs-coach__mark" aria-hidden="true">✦</span>
            ${t("متى ترتدي العطر؟", "When do you wear fragrance?")}
          </p>
          ${this.times.length ? html`<div class="spa-grid">
                ${this.times.map((item) => this.renderTimeChip(item))}
              </div>` : html`<div class="spa-step__empty">
                ${t("أضف أوقات الارتداء من إعدادات العنصر.", "Add wear times in element settings.")}
              </div>`}
        </div>
      ` : html`
      <div class="spa-step" role="radiogroup" aria-label=${t(stepMeta.labelAr, stepMeta.labelEn)}>
        <h3 class="spa-step__title">${t(stepMeta.labelAr, stepMeta.labelEn)}</h3>
        ${this.characters.length ? html`<div class="spa-list">
              ${this.characters.map((item) => this.renderCharacterOption(item))}
            </div>` : html`<div class="spa-step__empty">
              ${t("أضف شخصيات عطرية من إعدادات العنصر.", "Add scent characters in element settings.")}
            </div>`}
      </div>
    `;
  }
  renderPassport() {
    const c = this.config || {}, labels = parseNavLabels(c), character = this.selectedCharacter, accent = (character == null ? void 0 : character.color) || "#9a7b4f", likedNames = this.likedNotes.filter((n) => this.selections.likedIds.includes(n.id)).map((n) => n.name), dislikedNames = this.dislikedNotes.filter((n) => this.selections.dislikedIds.includes(n.id)).map((n) => n.name), summary = this.resolveSummary(), showShare = !!(localizedString(c.spa_share_btn) || labels.share);
    return html`
      <article
        class="spa-passport fs-result"
        style=${styleMap({ "--passport-accent": accent })}
        role="region"
        aria-live="polite"
      >
        <div class="spa-passport__head">
          <p class="spa-passport__brand">${labels.passportTitle}</p>
          <span class="spa-passport__seal" aria-hidden="true">${(character == null ? void 0 : character.icon) || "✦"}</span>
        </div>
        <h3 class="spa-passport__title">${(character == null ? void 0 : character.name) || t("ملفك العطري", "Your scent profile")}</h3>
        <p class="spa-passport__holder">${labels.holderLabel}</p>

        <div class="spa-passport__grid">
          ${likedNames.length ? html`<div class="spa-passport__row">
                <span class="spa-passport__label">${t("تحب", "You love")}</span>
                <p class="spa-passport__value">${likedNames.join(" · ")}</p>
              </div>` : nothing}
          ${dislikedNames.length ? html`<div class="spa-passport__row">
                <span class="spa-passport__label">${t("تتجنّب", "You avoid")}</span>
                <p class="spa-passport__value">${dislikedNames.join(" · ")}</p>
              </div>` : nothing}
          ${this.selectedStrength ? html`<div class="spa-passport__row">
                <span class="spa-passport__label">${t("التركيز", "Intensity")}</span>
                <p class="spa-passport__value">${this.selectedStrength.name}</p>
              </div>` : nothing}
          ${this.selectedTimes.length ? html`<div class="spa-passport__row">
                <span class="spa-passport__label">${t("أوقات الارتداء", "Wear times")}</span>
                <p class="spa-passport__value">
                  ${this.selectedTimes.map((item) => item.name).join(" · ")}
                </p>
              </div>` : nothing}
        </div>

        ${summary ? html`<p class="spa-passport__summary">${summary}</p>` : nothing}

        <div class="fs-actions">
          ${showShare ? html`<button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.shareSummary}>
                ${labels.share}
              </button>` : nothing}
          <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.reset}>
            ${labels.reset}
          </button>
        </div>
        ${renderCommerceOutcome({
      config: c,
      prefix: "spa_",
      ready: !0,
      matchTags: [
        this.selections.characterId,
        this.selections.strengthId,
        ...this.selections.likedIds,
        ...this.selections.timeIds
      ]
    })}
        ${this.shareNotice ? html`<p class="spa-toast" role="status">${this.shareNotice}</p>` : nothing}
      </article>
    `;
  }
  renderProgress() {
    const total = PASSPORT_STEPS.length, current = this.showResult ? total : this.stepIndex + 1, percent = Math.round(current / total * 100);
    return html`
      <div
        class="fs-progress"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${percent}
        aria-label=${t(`الخطوة ${current} من ${total}`, `Step ${current} of ${total}`)}
      >
        <div class="fs-progress__bar">
          <span style=${styleMap({ width: `${percent}%` })}></span>
        </div>
        <p class="fs-progress__label">
          ${t(`الخطوة ${current} من ${total}`, `Step ${current} of ${total}`)}
        </p>
      </div>
    `;
  }
  renderWizard() {
    const c = this.config || {}, labels = parseNavLabels(c), isLast = this.stepIndex >= PASSPORT_STEPS.length - 1, bodyKey = this.showResult ? "result" : `step-${this.stepIndex}`;
    return html`
      <div class="spa-shell">
        ${this.renderProgress()}

        ${keyed(
      bodyKey,
      html`<div class="fs-fade-swap">
            ${this.showResult ? this.renderPassport() : this.renderStepBody()}
          </div>`
    )}

        ${this.showResult ? nothing : html`<div class="fs-nav">
              ${this.stepIndex > 0 ? html`<button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.goBack}>
                    ${labels.back}
                  </button>` : nothing}
              <button
                type="button"
                class="fs-btn fs-tap"
                ?disabled=${!this.canAdvance()}
                aria-disabled=${this.canAdvance() ? "false" : "true"}
                title=${this.canAdvance() ? "" : t("اختر خياراً للمتابعة", "Choose an option to continue")}
                @click=${this.goNext}
              >
                ${isLast ? labels.see : labels.next}
              </button>
            </div>`}
      </div>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "spa_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.spa_title), desc = localizedString(c.spa_desc);
    return html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("جوازك العطري", "Scent passport")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}
          ${this.renderWizard()}
        </div>
      </section>
    `;
  }
};
__name(_ScentPassport, "ScentPassport"), _ScentPassport.styles = [sharedSectionCss, componentStyles];
let ScentPassport = _ScentPassport;
__decorateClass([
  property({ type: Object })
], ScentPassport.prototype, "config");
__decorateClass([
  state()
], ScentPassport.prototype, "stepIndex");
__decorateClass([
  state()
], ScentPassport.prototype, "showResult");
__decorateClass([
  state()
], ScentPassport.prototype, "selections");
__decorateClass([
  state()
], ScentPassport.prototype, "shareNotice");
typeof ScentPassport < "u" && ScentPassport.registerSallaComponent("salla-scent-passport");
export {
  ScentPassport as default
};
