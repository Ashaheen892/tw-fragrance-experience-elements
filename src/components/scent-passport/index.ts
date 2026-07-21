import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { keyed } from 'lit/directives/keyed.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  copyText,
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { renderCommerceOutcome } from '../../utils/commerceOutcome.js';
import { componentStyles } from './styles.js';
import type {
  CharacterOption,
  NoteOption,
  PassportSelections,
  PassportStepKey,
  StrengthOption,
  TimeOption,
} from './types.js';
import {
  PASSPORT_STEPS,
  buildGeneratedSummary,
  buildShareText,
  emptySelections,
  findMatchingResult,
  parseCharacters,
  parseNavLabels,
  parseNotes,
  parsePassportResults,
  parseStrengths,
  parseTimes,
  resolveCharacter,
  resolveStrength,
  toggleId,
} from './utils.js';

export default class ScentPassport extends LitElement {

  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private stepIndex = 0;
  @state() private showResult = false;
  @state() private selections: PassportSelections = emptySelections();
  @state() private shareNotice = '';

  private boundLangHandler = () => this.requestUpdate();
  private shareTimer: ReturnType<typeof setTimeout> | null = null;

  static styles = [sharedSectionCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    if (this.shareTimer) clearTimeout(this.shareTimer);
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      this.stepIndex = 0;
      this.showResult = false;
      this.selections = emptySelections();
      this.shareNotice = '';
    }
  }

  private get likedNotes(): NoteOption[] {
    return parseNotes(this.config?.spa_liked_notes);
  }

  private get dislikedNotes(): NoteOption[] {
    return parseNotes(this.config?.spa_disliked_notes);
  }

  private get strengths(): StrengthOption[] {
    return parseStrengths(this.config?.spa_strengths);
  }

  private get times(): TimeOption[] {
    return parseTimes(this.config?.spa_times);
  }

  private get characters(): CharacterOption[] {
    return parseCharacters(this.config?.spa_characters);
  }

  private get currentStepKey(): PassportStepKey {
    return PASSPORT_STEPS[this.stepIndex]?.key ?? 'liked';
  }

  private canAdvance(): boolean {
    const key = this.currentStepKey;
    if (key === 'strength') return !!this.selections.strengthId || !this.strengths.length;
    if (key === 'character') return !!this.selections.characterId || !this.characters.length;
    return true;
  }

  private goNext(): void {
    if (!this.canAdvance()) return;
    if (this.stepIndex >= PASSPORT_STEPS.length - 1) {
      this.showResult = true;
      return;
    }
    this.stepIndex += 1;
  }

  private goBack(): void {
    if (this.showResult) {
      this.showResult = false;
      return;
    }
    if (this.stepIndex > 0) this.stepIndex -= 1;
  }

  private reset(): void {
    this.stepIndex = 0;
    this.showResult = false;
    this.selections = emptySelections();
    this.shareNotice = '';
  }

  private async shareSummary(): Promise<void> {
    const c = this.config || {};
    const labels = parseNavLabels(c);
    const summary = this.resolveSummary();
    const text = buildShareText(
      summary,
      this.selections,
      this.likedNotes,
      this.dislikedNotes,
      this.selectedStrength,
      this.selectedTimes,
      this.selectedCharacter,
      labels.passportTitle
    );
    const ok = await copyText(text);
    this.shareNotice = ok
      ? t('تم نسخ الملخص.', 'Summary copied.')
      : t('تعذّر النسخ.', 'Could not copy.');
    if (this.shareTimer) clearTimeout(this.shareTimer);
    this.shareTimer = setTimeout(() => {
      this.shareNotice = '';
    }, 2400);
  }

  private get selectedStrength(): StrengthOption | null {
    return resolveStrength(this.strengths, this.selections.strengthId);
  }

  private get selectedCharacter(): CharacterOption | null {
    return resolveCharacter(this.characters, this.selections.characterId);
  }

  private get selectedTimes(): TimeOption[] {
    return this.times.filter((item) => this.selections.timeIds.includes(item.id));
  }

  private resolveSummary(): string {
    const matched = findMatchingResult(
      parsePassportResults(this.config?.spa_results),
      this.selections.characterId,
      this.selectedCharacter?.name ?? ''
    );
    if (matched?.summary) return matched.summary;
    return buildGeneratedSummary(
      this.selections,
      this.likedNotes,
      this.dislikedNotes,
      this.selectedStrength,
      this.selectedTimes,
      this.selectedCharacter
    );
  }

  private renderIcon(icon: string, image: string) {
    if (image) {
      return html`<img src=${image} alt="" loading="lazy" decoding="async" />`;
    }
    if (icon.startsWith('sicon-')) {
      return html`<span class=${icon}></span>`;
    }
    return html`<span>${icon || '◆'}</span>`;
  }

  private renderNoteChip(item: NoteOption, selectedIds: string[], field: 'likedIds' | 'dislikedIds') {
    const active = selectedIds.includes(item.id);
    const style: Record<string, string> = item.color ? { '--item-color': item.color } : {};

    return html`
      <button
        type="button"
        class=${classMap({ 'spa-chip': true, 'fs-tap': true, 'is-active': active })}
        style=${styleMap(style)}
        aria-pressed=${active ? 'true' : 'false'}
        @click=${() => {
          this.selections = {
            ...this.selections,
            [field]: toggleId(this.selections[field], item.id),
          };
        }}
      >
        <span class="spa-chip__icon">${this.renderIcon(item.icon, item.image)}</span>
        <span class="spa-chip__name">${item.name}</span>
      </button>
    `;
  }

  private renderStrengthOption(item: StrengthOption) {
    const active =
      this.selections.strengthId === item.id || this.selections.strengthId === item.value;

    return html`
      <button
        type="button"
        class=${classMap({ 'spa-option': true, 'fs-tap': true, 'is-active': active })}
        aria-pressed=${active ? 'true' : 'false'}
        @click=${() => {
          this.selections = { ...this.selections, strengthId: item.id };
        }}
      >
        <span class="spa-option__name">${item.name}</span>
        ${item.desc ? html`<p class="spa-option__desc">${item.desc}</p>` : nothing}
      </button>
    `;
  }

  private renderTimeChip(item: TimeOption) {
    const active = this.selections.timeIds.includes(item.id);

    return html`
      <button
        type="button"
        class=${classMap({ 'spa-chip': true, 'fs-tap': true, 'is-active': active })}
        aria-pressed=${active ? 'true' : 'false'}
        @click=${() => {
          this.selections = {
            ...this.selections,
            timeIds: toggleId(this.selections.timeIds, item.id),
          };
        }}
      >
        <span class="spa-chip__name">${item.name}</span>
      </button>
    `;
  }

  private renderCharacterOption(item: CharacterOption) {
    const active = this.selections.characterId === item.id;
    const style: Record<string, string> = item.color ? { '--item-color': item.color } : {};

    return html`
      <button
        type="button"
        class=${classMap({ 'spa-option': true, 'fs-tap': true, 'is-active': active })}
        style=${styleMap(style)}
        aria-pressed=${active ? 'true' : 'false'}
        @click=${() => {
          this.selections = { ...this.selections, characterId: item.id };
        }}
      >
        <span class="spa-option__name">${item.icon ? `${item.icon} ` : nothing}${item.name}</span>
        ${item.desc ? html`<p class="spa-option__desc">${item.desc}</p>` : nothing}
      </button>
    `;
  }

  private renderStepBody() {
    const key = this.currentStepKey;
    const stepMeta = PASSPORT_STEPS[this.stepIndex];

    if (key === 'liked') {
      return html`
        <div class="spa-step" role="group" aria-label=${t(stepMeta.labelAr, stepMeta.labelEn)}>
          <h3 class="spa-step__title">${t(stepMeta.labelAr, stepMeta.labelEn)}</h3>
          <p class="fs-coach">
            <span class="fs-coach__mark" aria-hidden="true">✦</span>
            ${t('اختر واحدة أو أكثر', 'Pick one or more')}
          </p>
          ${this.likedNotes.length
            ? html`<div class="spa-grid">
                ${this.likedNotes.map((item) =>
                  this.renderNoteChip(item, this.selections.likedIds, 'likedIds')
                )}
              </div>`
            : html`<div class="spa-step__empty">
                ${t('أضف نوتات مفضّلة من إعدادات العنصر.', 'Add liked notes in element settings.')}
              </div>`}
        </div>
      `;
    }

    if (key === 'disliked') {
      return html`
        <div class="spa-step" role="group" aria-label=${t(stepMeta.labelAr, stepMeta.labelEn)}>
          <h3 class="spa-step__title">${t(stepMeta.labelAr, stepMeta.labelEn)}</h3>
          <p class="fs-coach">
            <span class="fs-coach__mark" aria-hidden="true">✦</span>
            ${t('اختياري — لتجنّب ما لا يناسبك', 'Optional — notes to skip')}
          </p>
          ${this.dislikedNotes.length
            ? html`<div class="spa-grid">
                ${this.dislikedNotes.map((item) =>
                  this.renderNoteChip(item, this.selections.dislikedIds, 'dislikedIds')
                )}
              </div>`
            : html`<div class="spa-step__empty">
                ${t('أضف نوتات مرفوضة من إعدادات العنصر.', 'Add disliked notes in element settings.')}
              </div>`}
        </div>
      `;
    }

    if (key === 'strength') {
      return html`
        <div class="spa-step" role="radiogroup" aria-label=${t(stepMeta.labelAr, stepMeta.labelEn)}>
          <h3 class="spa-step__title">${t(stepMeta.labelAr, stepMeta.labelEn)}</h3>
          ${this.strengths.length
            ? html`<div class="spa-list">
                ${this.strengths.map((item) => this.renderStrengthOption(item))}
              </div>`
            : html`<div class="spa-step__empty">
                ${t('أضف مستويات التركيز من إعدادات العنصر.', 'Add strength levels in element settings.')}
              </div>`}
        </div>
      `;
    }

    if (key === 'times') {
      return html`
        <div class="spa-step" role="group" aria-label=${t(stepMeta.labelAr, stepMeta.labelEn)}>
          <h3 class="spa-step__title">${t(stepMeta.labelAr, stepMeta.labelEn)}</h3>
          <p class="fs-coach">
            <span class="fs-coach__mark" aria-hidden="true">✦</span>
            ${t('متى ترتدي العطر؟', 'When do you wear fragrance?')}
          </p>
          ${this.times.length
            ? html`<div class="spa-grid">
                ${this.times.map((item) => this.renderTimeChip(item))}
              </div>`
            : html`<div class="spa-step__empty">
                ${t('أضف أوقات الارتداء من إعدادات العنصر.', 'Add wear times in element settings.')}
              </div>`}
        </div>
      `;
    }

    return html`
      <div class="spa-step" role="radiogroup" aria-label=${t(stepMeta.labelAr, stepMeta.labelEn)}>
        <h3 class="spa-step__title">${t(stepMeta.labelAr, stepMeta.labelEn)}</h3>
        ${this.characters.length
          ? html`<div class="spa-list">
              ${this.characters.map((item) => this.renderCharacterOption(item))}
            </div>`
          : html`<div class="spa-step__empty">
              ${t('أضف شخصيات عطرية من إعدادات العنصر.', 'Add scent characters in element settings.')}
            </div>`}
      </div>
    `;
  }

  private renderPassport() {
    const c = this.config || {};
    const labels = parseNavLabels(c);
    const character = this.selectedCharacter;
    const accent = character?.color || '#9a7b4f';
    const likedNames = this.likedNotes
      .filter((n) => this.selections.likedIds.includes(n.id))
      .map((n) => n.name);
    const dislikedNames = this.dislikedNotes
      .filter((n) => this.selections.dislikedIds.includes(n.id))
      .map((n) => n.name);
    const summary = this.resolveSummary();
    const showShare = Boolean(localizedString(c.spa_share_btn as string) || labels.share);

    return html`
      <article
        class="spa-passport fs-result"
        style=${styleMap({ '--passport-accent': accent })}
        role="region"
        aria-live="polite"
      >
        <div class="spa-passport__head">
          <p class="spa-passport__brand">${labels.passportTitle}</p>
          <span class="spa-passport__seal" aria-hidden="true">${character?.icon || '✦'}</span>
        </div>
        <h3 class="spa-passport__title">${character?.name || t('ملفك العطري', 'Your scent profile')}</h3>
        <p class="spa-passport__holder">${labels.holderLabel}</p>

        <div class="spa-passport__grid">
          ${likedNames.length
            ? html`<div class="spa-passport__row">
                <span class="spa-passport__label">${t('تحب', 'You love')}</span>
                <p class="spa-passport__value">${likedNames.join(' · ')}</p>
              </div>`
            : nothing}
          ${dislikedNames.length
            ? html`<div class="spa-passport__row">
                <span class="spa-passport__label">${t('تتجنّب', 'You avoid')}</span>
                <p class="spa-passport__value">${dislikedNames.join(' · ')}</p>
              </div>`
            : nothing}
          ${this.selectedStrength
            ? html`<div class="spa-passport__row">
                <span class="spa-passport__label">${t('التركيز', 'Intensity')}</span>
                <p class="spa-passport__value">${this.selectedStrength.name}</p>
              </div>`
            : nothing}
          ${this.selectedTimes.length
            ? html`<div class="spa-passport__row">
                <span class="spa-passport__label">${t('أوقات الارتداء', 'Wear times')}</span>
                <p class="spa-passport__value">
                  ${this.selectedTimes.map((item) => item.name).join(' · ')}
                </p>
              </div>`
            : nothing}
        </div>

        ${summary ? html`<p class="spa-passport__summary">${summary}</p>` : nothing}

        <div class="fs-actions">
          ${showShare
            ? html`<button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.shareSummary}>
                ${labels.share}
              </button>`
            : nothing}
          <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.reset}>
            ${labels.reset}
          </button>
        </div>
        ${renderCommerceOutcome({
          config: c,
          prefix: 'spa_',
          matchTags: [
            this.selections.characterId,
            this.selections.strengthId,
            ...this.selections.likedIds,
            ...this.selections.timeIds,
          ],
        })}
        ${this.shareNotice ? html`<p class="spa-toast" role="status">${this.shareNotice}</p>` : nothing}
      </article>
    `;
  }

  private renderProgress() {
    const total = PASSPORT_STEPS.length;
    const current = this.showResult ? total : this.stepIndex + 1;
    const percent = Math.round((current / total) * 100);

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

  private renderWizard() {
    const c = this.config || {};
    const labels = parseNavLabels(c);
    const isLast = this.stepIndex >= PASSPORT_STEPS.length - 1;
    const bodyKey = this.showResult ? 'result' : `step-${this.stepIndex}`;

    return html`
      <div class="spa-shell">
        ${this.renderProgress()}

        ${keyed(
          bodyKey,
          html`<div class="fs-fade-swap">
            ${this.showResult ? this.renderPassport() : this.renderStepBody()}
          </div>`
        )}

        ${this.showResult
          ? nothing
          : html`<div class="fs-nav">
              ${this.stepIndex > 0
                ? html`<button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.goBack}>
                    ${labels.back}
                  </button>`
                : nothing}
              <button
                type="button"
                class="fs-btn fs-tap"
                ?disabled=${!this.canAdvance()}
                aria-disabled=${!this.canAdvance() ? 'true' : 'false'}
                title=${!this.canAdvance() ? t('اختر خياراً للمتابعة', 'Choose an option to continue') : ''}
                @click=${this.goNext}
              >
                ${isLast ? labels.see : labels.next}
              </button>
            </div>`}
      </div>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'spa_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.spa_title as string);
    const desc = localizedString(c.spa_desc as string);

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('جوازك العطري', 'Scent passport')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}
          ${this.renderWizard()}
        </div>
      </section>
    `;
  }
}
