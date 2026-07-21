# Fragrance Experience Elements

عناصر تفاعلية لتجربة العطور على منصة سلة (Twilight) — Lit + Vite.

هذه العناصر إضافات Twilight لمتاجر قالب رائد وليست بديلاً كاملاً للقالب؛ ترث ألوان المتجر متى أمكن وتحوّل التفاعل إلى منتجات أو روابط CTA يضبطها التاجر.

## العناصر (15)

| العنصر | الوصف |
| --- | --- |
| `scent-personality-finder` | مستكشف الشخصية العطرية |
| `interactive-notes-pyramid` | هرم النوتات التفاعلي |
| `fragrance-family-map` | خريطة العائلات العطرية |
| `fragrance-layering-lab` | مختبر دمج العطور |
| `fragrance-performance-meter` | مؤشر الأداء العطري |
| `scent-evolution-timeline` | رحلة العطر عبر الوقت |
| `ingredient-stories` | مكتبة المكونات العطرية |
| `occasion-scent-guide` | دليل اختيار العطر حسب المناسبة |
| `scent-mood-compass` | بوصلة الطابع العطري |
| `spray-ritual-guide` | دليل قوة الاستخدام |
| `scent-passport` | جوازك العطري |
| `smart-gift-builder` | صندوق الهدية الذكي |
| `scent-scene` | مشهد الرائحة |
| `fragrance-wardrobe` | خزانة العطور |
| `perfume-quality-lab` | مختبر الجودة العطرية |

## البدء

```bash
pnpm install
pnpm run dev
pnpm run build
```

تحديث `twilight-bundle.json` بعد تعديل الحقول:

```bash
pnpm run generate:bundle
```

## البنية

```
src/
  components/<name>/
    index.ts    # LitElement
    styles.ts
    types.ts
    utils.ts
  utils/        # helpers, sharedStyles, localizedString
scripts/
  generate_bundle.py
```
