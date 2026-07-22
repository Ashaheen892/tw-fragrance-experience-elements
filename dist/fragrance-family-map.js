import { css as $, LitElement as y, html as a, nothing as s } from "lit";
import { property as k, state as S } from "lit/decorators.js";
import { classMap as h } from "lit/directives/class-map.js";
import { keyed as C } from "lit/directives/keyed.js";
import { styleMap as p } from "lit/directives/style-map.js";
import { n as I, l as g, e as z, a as L, g as j, s as Y, i as A, t as l, r as E, p as O, b as u, c as U } from "./commerceOutcome-CCLcV5SW.js";
const H = $`
  .ffm-shell {
    display: grid;
    gap: 1rem;
    align-items: start;
    max-width: 1080px;
    margin-inline: auto;
  }

  @media (min-width: 900px) {
    .ffm-shell {
      grid-template-columns: minmax(240px, 0.9fr) minmax(0, 1.2fr);
      gap: 1.15rem;
    }
  }

  .ffm-selector {
    padding: 1.1rem 1.15rem;
    border-radius: var(--section-radius, 20px);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, var(--section-bg, transparent));
    border: 1px solid color-mix(in srgb, var(--border-color, #e6e0d6) 88%, #fff);
    box-shadow: 0 10px 28px rgba(90, 70, 40, 0.08);
  }

  .ffm-selector__label {
    margin: 0 0 0.75rem;
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted-color, #666666);
  }

  .ffm-chips {
    display: grid;
    gap: 0.65rem;
  }

  .ffm-chips--grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 900px) {
    .ffm-chips--grid {
      grid-template-columns: 1fr;
    }
  }

  .ffm-chip {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.65rem;
    min-height: 52px;
    padding: 0.65rem 0.85rem;
    border: 1.5px solid var(--border-color, #e6e0d6);
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    text-align: start;
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.05);
    transition:
      transform 0.24s ease,
      border-color 0.24s ease,
      box-shadow 0.24s ease,
      background 0.24s ease;
  }

  .ffm-chip:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--fam-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .ffm-chip.is-active {
    border-color: var(--fam-color, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--fam-color, var(--accent-color, var(--fs-store-primary))) 9%,
      var(--card-bg, #fff)
    );
    box-shadow:
      0 0 0 3px color-mix(
        in srgb,
        var(--fam-color, var(--accent-color, var(--fs-store-primary))) 18%,
        transparent
      ),
      0 12px 28px rgba(90, 70, 40, 0.1);
  }

  .ffm-chip:active {
    transform: translateY(0);
  }

  .ffm-chip__swatch {
    width: 2.15rem;
    height: 2.15rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--fam-color, var(--accent-color, var(--fs-store-primary)));
    color: #fff;
    font-size: 1rem;
    overflow: hidden;
  }

  .ffm-chip__swatch img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .ffm-chip__name {
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ffm-chip__dot {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: transparent;
    box-shadow: inset 0 0 0 1.5px color-mix(in srgb, var(--muted-color, #6e6558) 55%, transparent);
  }

  .ffm-chip.is-active .ffm-chip__dot {
    background: var(--fam-color, var(--accent-color, var(--fs-store-primary)));
    box-shadow: none;
  }

  .ffm-chips--wheel {
    position: relative;
    min-height: 280px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0.65rem;
    padding: 1.5rem 0.5rem;
  }

  .ffm-wheel-core {
    position: absolute;
    inset: 50% auto auto 50%;
    transform: translate(-50%, -50%);
    width: 4.5rem;
    height: 4.5rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, var(--border-color, #e6e0d6));
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    color: var(--accent-color, var(--fs-store-primary));
    pointer-events: none;
  }

  .ffm-chips--wheel .ffm-chip {
    position: absolute;
    top: 50%;
    left: 50%;
    width: min(140px, 38vw);
    transform:
      rotate(var(--i-angle, 0deg))
      translateY(calc(-1 * var(--wheel-r, 110px)))
      rotate(calc(-1 * var(--i-angle, 0deg)));
    margin: 0;
  }

  .ffm-chips--wheel .ffm-chip:hover {
    transform:
      rotate(var(--i-angle, 0deg))
      translateY(calc(-1 * var(--wheel-r, 110px) - 2px))
      rotate(calc(-1 * var(--i-angle, 0deg)));
  }

  .ffm-detail {
    border-color: color-mix(
      in srgb,
      var(--fam-color, var(--accent-color, var(--fs-store-primary))) 24%,
      var(--border-color, #e6e0d6)
    );
  }

  .ffm-detail__icon {
    width: 2.6rem;
    height: 2.6rem;
    display: grid;
    place-items: center;
    margin-bottom: 0.65rem;
    border-radius: 50%;
    background: color-mix(in srgb, var(--fam-color, var(--accent-color, var(--fs-store-primary))) 14%, var(--card-bg, #fff));
    color: var(--fam-color, var(--accent-color, var(--fs-store-primary)));
    font-size: 1.15rem;
    overflow: hidden;
  }

  .ffm-detail__icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .ffm-detail__media {
    margin-top: 0.85rem;
    border-radius: calc(var(--section-radius, 20px) * 0.65);
    overflow: hidden;
  }

  .ffm-detail__media img {
    display: block;
    width: 100%;
    max-height: 220px;
    object-fit: cover;
  }

  .ffm-detail__actions {
    margin-top: 0.85rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .ffm-chip {
      transition: none !important;
    }

    .ffm-chip:hover,
    .ffm-chips--wheel .ffm-chip:hover {
      transform: none;
    }

    .ffm-chips--wheel .ffm-chip {
      transform:
        rotate(var(--i-angle, 0deg))
        translateY(calc(-1 * var(--wheel-r, 110px)))
        rotate(calc(-1 * var(--i-angle, 0deg)));
    }
  }
`, M = ["wheel", "grid"];
function P(d) {
  return I(d).map((e, t) => {
    const o = g(e.name);
    return {
      id: String(e.id ?? e.family_id ?? "").trim() || `family-${t + 1}`,
      name: o,
      desc: g(e.desc),
      color: String(e.color ?? "").trim(),
      icon: String(e.icon ?? "").trim(),
      image: L(e.image),
      link: z(e.link)
    };
  }).filter((e) => e.name || e.desc);
}
function D(d) {
  const e = j(d.ffm_layout, "grid");
  return M.includes(e) ? e : "grid";
}
var R = Object.defineProperty, b = (d, e, t, o) => {
  for (var r = void 0, i = d.length - 1, n; i >= 0; i--)
    (n = d[i]) && (r = n(e, t, r) || r);
  return r && R(e, t, r), r;
};
const v = class v extends y {
  constructor() {
    super(...arguments), this.config = {}, this.activeId = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(e) {
    e.has("config") && (this.activeId = "");
  }
  get families() {
    var e;
    return P((e = this.config) == null ? void 0 : e.ffm_families);
  }
  resolveActive(e) {
    var o;
    if (!e.length) return null;
    if (this.activeId) {
      const r = e.find((i) => i.id === this.activeId);
      if (r) return r;
    }
    const t = String(((o = this.config) == null ? void 0 : o.ffm_default_family) ?? "").trim();
    if (t) {
      const r = e.find((i) => i.id === t);
      if (r) return r;
    }
    return e[0];
  }
  select(e) {
    this.activeId = e;
  }
  renderIcon(e, t) {
    const o = e.icon.startsWith("sicon-");
    return e.image ? a`<img src=${e.image} alt="" loading="lazy" decoding="async" />` : e.icon ? o ? a`<span class=${e.icon}></span>` : a`<span>${e.icon}</span>` : a`<span class=${t} aria-hidden="true">✦</span>`;
  }
  renderChip(e, t, o, r) {
    var c;
    const i = ((c = this.resolveActive(this.families)) == null ? void 0 : c.id) === e.id, n = e.color ? { "--fam-color": e.color } : {};
    return t === "wheel" && (n["--i-angle"] = `${360 / Math.max(r, 1) * o}deg`), a`
      <button
        type="button"
        class=${h({ "ffm-chip": !0, "fs-tap": !0, "is-active": i })}
        style=${p(n)}
        aria-pressed=${i ? "true" : "false"}
        aria-controls="ffm-detail"
        @click=${() => this.select(e.id)}
      >
        <span class="ffm-chip__swatch">${this.renderIcon(e, "")}</span>
        <span class="ffm-chip__name">${e.name}</span>
        ${t !== "wheel" ? a`<span class="ffm-chip__dot" aria-hidden="true"></span>` : s}
      </button>
    `;
  }
  renderDetail(e) {
    const t = e.color ? { "--fam-color": e.color } : {}, o = e.link ? A(e.link) : !1;
    return a`
      <article
        id="ffm-detail"
        class="ffm-detail fs-panel fs-fade-swap"
        style=${p(t)}
        role="region"
        aria-live="polite"
      >
        <div class="ffm-detail__icon">${this.renderIcon(e, "")}</div>
        <h3 class="fs-panel__title">${e.name}</h3>
        ${e.desc ? a`<p class="fs-panel__desc">${e.desc}</p>` : s}
        ${e.image ? a`<div class="ffm-detail__media">
              <img src=${e.image} alt="" loading="lazy" decoding="async" />
            </div>` : s}
        ${e.link ? a`<div class="ffm-detail__actions">
              <a
                class="fs-btn fs-tap"
                href=${e.link}
                target=${o ? "_blank" : "_self"}
                rel=${o ? "noopener noreferrer" : s}
              >
                ${l("استكشف العائلة", "Explore family")}
              </a>
            </div>` : s}
      </article>
    `;
  }
  render() {
    const e = this.config || {}, t = E(e, "ffm_"), o = t.animate && !O(), r = g(e.ffm_title), i = g(e.ffm_desc), n = this.families, c = D(e), m = this.resolveActive(n), x = n.length;
    return n.length ? a`
      <section
        class=${h({ "fs-section": !0, "fs-animate": o })}
        style=${p(u(t))}
        aria-label=${r || l("خريطة العائلات العطرية", "Fragrance family map")}
      >
        <div class="fs-container">
          ${r || i ? a`<div class="fs-header">
                ${r ? a`<h2 class="fs-title">${r}</h2>` : s}
                ${i ? a`<p class="fs-desc">${i}</p>` : s}
              </div>` : s}

          <div class="ffm-shell">
            <aside class="ffm-selector">
              <p class="ffm-selector__label">${l("اختَر عائلة", "Pick a family")}</p>
              <div
                class=${h({
      "ffm-chips": !0,
      [`ffm-chips--${c}`]: !0
    })}
                role="group"
                aria-label=${l("عائلات العطر", "Fragrance families")}
                style=${p(c === "wheel" ? { "--wheel-r": "110px" } : {})}
              >
                ${c === "wheel" ? a`<div class="ffm-wheel-core">${l("عائلات", "Families")}</div>` : s}
                ${n.map((w, _) => this.renderChip(w, c, _, x))}
              </div>
            </aside>
            ${m ? C(m.id, this.renderDetail(m)) : s}
          </div>
          ${U({ config: e, prefix: "ffm_", ready: !!m, selection: m })}
        </div>
      </section>
    ` : a`
        <section
          class=${h({ "fs-section": !0, "fs-animate": o })}
          style=${p(u(t))}
          aria-label=${r || l("خريطة العائلات العطرية", "Fragrance family map")}
        >
          <div class="fs-container">
            ${r || i ? a`<div class="fs-header">
                  ${r ? a`<h2 class="fs-title">${r}</h2>` : s}
                  ${i ? a`<p class="fs-desc">${i}</p>` : s}
                </div>` : s}
            <div class="fs-empty" role="status">
              ${l("أضف عائلات عطرية من إعدادات العنصر.", "Add fragrance families in the element settings.")}
            </div>
          </div>
        </section>
      `;
  }
};
v.styles = [Y, H];
let f = v;
b([
  k({ type: Object })
], f.prototype, "config");
b([
  S()
], f.prototype, "activeId");
typeof f < "u" && f.registerSallaComponent("salla-fragrance-family-map");
export {
  f as default
};
