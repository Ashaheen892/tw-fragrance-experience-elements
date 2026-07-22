/**
 * Shared Swiper.js bootstrap for Twilight elements.
 * All product / content sliders should go through this helper.
 */
import Swiper from 'swiper';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export type FsSwiperOptions = SwiperOptions & {
  /** Force RTL; defaults to document/host direction. */
  rtl?: boolean;
};

const DIR_ATTR = 'dir';

function resolveRtl(el: HTMLElement, forced?: boolean): boolean {
  if (typeof forced === 'boolean') return forced;
  const hostDir =
    el.closest(`[${DIR_ATTR}]`)?.getAttribute(DIR_ATTR) ||
    document.documentElement.getAttribute(DIR_ATTR) ||
    document.body?.getAttribute(DIR_ATTR) ||
    '';
  return hostDir.toLowerCase() === 'rtl';
}

const DRAG_GUARD_FLAG = 'fsSwiperDragGuard';

/**
 * Native HTML5 drag on product images/links hijacks Swiper's mouse gesture
 * (a ghost image starts dragging and mousemove stops firing), which makes the
 * slider feel dead on desktop. `dragstart` is a composed event, so one capture
 * listener on the root also covers cards rendered inside nested shadow roots.
 */
function suppressNativeDrag(el: HTMLElement): void {
  const flagged = el.dataset[DRAG_GUARD_FLAG];
  if (flagged === '1') return;
  el.dataset[DRAG_GUARD_FLAG] = '1';
  el.addEventListener(
    'dragstart',
    (event) => {
      event.preventDefault();
    },
    { capture: true }
  );
}

/** Create / replace a Swiper instance on a root that already has .swiper markup. */
export function mountFsSwiper(
  el: HTMLElement,
  options: FsSwiperOptions = {}
): Swiper {
  const { rtl: rtlOpt, modules: extraModules, ...rest } = options;
  const rtl = resolveRtl(el, rtlOpt);
  el.setAttribute(DIR_ATTR, rtl ? 'rtl' : 'ltr');
  suppressNativeDrag(el);

  const existing = (el as HTMLElement & { swiper?: Swiper }).swiper;
  if (existing && !existing.destroyed) {
    existing.destroy(true, true);
  }

  return new Swiper(el, {
    modules: [Navigation, Pagination, A11y, ...(extraModules || [])],
    slidesPerView: 4.2,
    spaceBetween: 16,
    speed: 420,
    watchOverflow: true,
    grabCursor: true,
    allowTouchMove: true,
    simulateTouch: true,
    threshold: 8,
    touchStartPreventDefault: false,
    preventClicks: false,
    preventClicksPropagation: false,
    observer: true,
    observeParents: true,
    a11y: { enabled: true },
    ...rest,
    // Keep last so callers cannot accidentally drop RTL
    ...(rtl ? { rtl: true } : {}),
  });
}

export function destroyFsSwiper(instance?: Swiper | null): void {
  if (instance && !instance.destroyed) {
    instance.destroy(true, true);
  }
}

export { Swiper };
