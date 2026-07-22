import { html, nothing, type TemplateResult } from 'lit';
import {
  extractLink,
  isExternalUrl,
  isTruthy,
  t,
} from './helpers.js';
import { localizedString, type LocaleValue } from './localizedString.js';

export type CommerceRenderOptions = {
  config?: Record<string, unknown>;
  prefix?: string;
  matchTags?: string[];
  ready?: boolean;
  dynamicOnly?: boolean;
  selection?: unknown;
  defaultProductsTitle?: { ar: string; en: string };
  sliderOverride?: unknown;
};

export type CommerceCtaOptions = {
  className?: string;
  /** Per-item link, if the caller wants to override the merchant-level CTA. */
  href?: string;
};

function normalizeArgs(
  optionsOrConfig: CommerceRenderOptions | Record<string, unknown>,
  legacyPrefix?: string,
  legacyOptions?: CommerceRenderOptions | string[]
): Required<
  Pick<CommerceRenderOptions, 'config' | 'prefix'>
> &
  CommerceRenderOptions {
  if (
    optionsOrConfig &&
    typeof optionsOrConfig === 'object' &&
    'config' in optionsOrConfig &&
    'prefix' in optionsOrConfig
  ) {
    const o = optionsOrConfig as CommerceRenderOptions;
    return {
      ...o,
      config: o.config || {},
      prefix: o.prefix || '',
    };
  }

  const extra: CommerceRenderOptions =
    legacyOptions && !Array.isArray(legacyOptions) ? legacyOptions : {};
  return {
    ...extra,
    config: (optionsOrConfig as Record<string, unknown>) || {},
    prefix: legacyPrefix || '',
  };
}

export function renderCommerceCtaButton(
  config: Record<string, unknown>,
  prefix: string,
  options: CommerceCtaOptions = {}
): TemplateResult {
  const ctaLink =
    (options.href || '').trim() ||
    extractLink(config[`${prefix}result_link`] ?? config[`${prefix}cta_link`]) ||
    '/';
  const ctaLabel =
    localizedString(config[`${prefix}cta_label`] as LocaleValue, '').trim() ||
    t('تسوق الآن', 'Shop now');
  const className = ['fs-btn', 'fs-tap', options.className || '']
    .filter(Boolean)
    .join(' ');

  return html`<a
    class=${className}
    href=${ctaLink}
    target=${isExternalUrl(ctaLink) ? '_blank' : nothing}
    rel=${isExternalUrl(ctaLink) ? 'noopener noreferrer' : nothing}
  >
    ${ctaLabel}
  </a>`;
}

export function renderCommerceOutcome(
  options: CommerceRenderOptions
): TemplateResult | typeof nothing;
export function renderCommerceOutcome(
  config: Record<string, unknown>,
  prefix: string,
  options?: CommerceRenderOptions | string[]
): TemplateResult | typeof nothing;
export function renderCommerceOutcome(
  optionsOrConfig: CommerceRenderOptions | Record<string, unknown>,
  legacyPrefix?: string,
  legacyOptions?: CommerceRenderOptions | string[]
): TemplateResult | typeof nothing {
  const opts = normalizeArgs(optionsOrConfig, legacyPrefix, legacyOptions);
  if (opts.ready === false) return nothing;

  const c = opts.config || {};
  const prefix = opts.prefix || '';
  const ctaLink = extractLink(
    c[`${prefix}result_link`] ?? c[`${prefix}cta_link`]
  );
  const showCta =
    isTruthy(c[`${prefix}show_cta`], Boolean(ctaLink)) && Boolean(ctaLink);
  if (!showCta) return nothing;

  return html`
    <aside class="fs-commerce" aria-label=${t('التسوق', 'Shopping')}>
      <div class="fs-commerce__actions">
        ${renderCommerceCtaButton(c, prefix, { className: 'fs-commerce__cta' })}
      </div>
    </aside>
  `;
}
