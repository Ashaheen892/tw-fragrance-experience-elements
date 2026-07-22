/**
 * Build Notion page payloads + USER-GUIDE.md for fragrance elements.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const bundle = JSON.parse(fs.readFileSync(path.join(ROOT, 'twilight-bundle.json'), 'utf8'));
const urlsPathCandidates = [
  path.join(ROOT, 'notion-screenshots', 'webp-urls.json'),
  path.join(ROOT, 'notion-screenshots', 'webps', 'urls.json'),
];
let urls = {};
for (const p of urlsPathCandidates) {
  if (fs.existsSync(p)) {
    urls = JSON.parse(fs.readFileSync(p, 'utf8'));
    break;
  }
}

const CATEGORIES = {
  'scent-personality-finder': 'اكتشاف واختيار',
  'fragrance-family-map': 'اكتشاف واختيار',
  'scent-mood-compass': 'اكتشاف واختيار',
  'occasion-scent-guide': 'اكتشاف واختيار',
  'interactive-notes-pyramid': 'معرفة العطر',
  'scent-evolution-timeline': 'معرفة العطر',
  'ingredient-stories': 'معرفة العطر',
  'fragrance-performance-meter': 'معرفة العطر',
  'perfume-quality-lab': 'معرفة العطر',
  'fragrance-layering-lab': 'أدوات تفاعلية',
  'spray-ritual-guide': 'أدوات تفاعلية',
  'scent-passport': 'أدوات تفاعلية',
  'smart-gift-builder': 'أدوات تفاعلية',
  'fragrance-wardrobe': 'عرض وتجربة',
  'scent-scene': 'عرض وتجربة',
  'scent-categories': 'عرض وتجربة',
  'scent-before-after': 'عرض وتجربة',
  'scent-promo-banners': 'عرض وتجربة',
};

const IDEAS = {
  'scent-personality-finder': {
    role: 'يساعد الزائر على اكتشاف شخصيته العطرية عبر بطاقات تفاعلية ثم يعرض العائلة المناسبة ودعوة للتسوق.',
    uses: ['تقليل التردد قبل الشراء', 'تثقيف حول العائلات العطرية', 'ربط النتيجة بزر استكشاف أو منتجات'],
    tip: 'اجعل أوصاف الشخصيات قصيرة وحسية، وفعّل زر الدعوة بعد النتيجة.',
  },
  'interactive-notes-pyramid': {
    role: 'يعرض هرم النوتات (مقدمة / قلب / قاعدة) بشكل تفاعلي مع صور وتفاصيل لكل طبقة.',
    uses: ['شرح تركيبة العطر', 'رفع ثقة المنتج', 'تجربة بصرية راقية في صفحة المنتج'],
    tip: 'أضف صورًا واضحة لكل نوتة ونصوصًا قصيرة سهلة القراءة.',
  },
  'fragrance-family-map': {
    role: 'خريطة تفاعلية لعائلات العطور مع تفاصيل كل عائلة وروابط استكشاف.',
    uses: ['توجيه المبتدئين', 'اكتشاف عائلات جديدة', 'تنظيم المحتوى العطري'],
    tip: 'اختر ألوانًا مميزة لكل عائلة واترك الوصف مختصرًا.',
  },
  'fragrance-layering-lab': {
    role: 'يعرض وصفات دمج عطور مقترحة مع التركيبة والمناسبة والنتيجة.',
    uses: ['زيادة متوسط الطلب', 'تعليم فن الدمج', 'إلهام لوكات عطرية'],
    tip: 'قدّم 3–5 وصفات واضحة مع نسبة المزج المناسبة.',
  },
  'fragrance-performance-meter': {
    role: 'مؤشرات مرئية للثبات والفوحان والبروجكشن لمساعدة قرار الشراء.',
    uses: ['مقارنة الأداء', 'شفافية التوقعات', 'تقليل الإرجاع'],
    tip: 'اجعل القيم واقعية ومتسقة مع وصف المنتج.',
  },
  'scent-evolution-timeline': {
    role: 'رحلة زمنية توضح كيف يتغيّر العطر من اللحظات الأولى حتى نهاية اليوم.',
    uses: ['شرح التطوّر العطري', 'إدارة توقعات العميل', 'تجربة سردية جذابة'],
    tip: 'استخدم مراحل زمنية واضحة (0 / 30 / 4 ساعات / نهاية اليوم).',
  },
  'ingredient-stories': {
    role: 'مكتبة تفاعلية لقصص المكونات ومصادرها وفوائدها الحسية.',
    uses: ['بناء علامة فاخرة', 'تثقيف العميل', 'إبراز جودة المكوّنات'],
    tip: 'اختر صورًا عالية الجودة ونصوصًا قصيرة لكل مكوّن.',
  },
  'occasion-scent-guide': {
    role: 'يرشد لاختيار العطر حسب المناسبة (عمل، سهرة، يومي، سفر...).',
    uses: ['تسريع القرار', 'ربط المنتجات بالمناسبات', 'رفع التحويل'],
    tip: 'اربط كل مناسبة بصفات واضحة ورابط استكشاف.',
  },
  'scent-mood-compass': {
    role: 'بوصلة طابع عطري تساعد على اختيار النمط حسب المزاج والطاقة.',
    uses: ['تجربة اكتشاف مرحة', 'تصنيف المحتوى', 'إلهام الشراء'],
    tip: 'وزّع النقاط على المحاور بوضوح دون ازدحام.',
  },
  'spray-ritual-guide': {
    role: 'دليل تفاعلي لقوة الرش ومناطق الجسم ونصائح التطبيق.',
    uses: ['تعليم الاستخدام الصحيح', 'تقليل الهدر', 'خدمة ما بعد الشراء'],
    tip: 'اجعل مستويات الرش واضحة مع نصائح عملية قصيرة.',
  },
  'scent-passport': {
    role: 'معالج متعدد الخطوات يبني «جوازًا عطريًا» حسب تفضيلات الزائر.',
    uses: ['تجربة شخصية عميقة', 'جمع تفضيلات', 'تحويل إلى تسوق'],
    tip: 'اختصر الخطوات (3–5) وفعّل زر النتيجة بوضوح.',
  },
  'smart-gift-builder': {
    role: 'يبني اقتراح هدية عطرية حسب المستلم والمناسبة والميزانية والتغليف.',
    uses: ['موسم الهدايا', 'رفع قيمة السلة', 'تسهيل اختيار الهدية'],
    tip: 'فعّل زر «تسوق الآن» بعد النتيجة واربطه بتصنيف الهدايا.',
  },
  'scent-scene': {
    role: 'مشاهد بصرية تغيّر الخلفية والطابع حسب اختيار الزائر.',
    uses: ['إطلاق مجموعة موسمية', 'تجربة غامرة', 'ربط المشهد بمنتجات'],
    tip: 'استخدم صور خلفية قوية ومتناسقة مع هوية المتجر.',
  },
  'fragrance-wardrobe': {
    role: 'خزانة عطور تفاعلية تنظّم العطور حسب الوقت أو المناسبة.',
    uses: ['تنظيم المجموعة', 'اقتراح استخدام يومي', 'عرض راقٍ'],
    tip: 'اجعل كل خانة بصورة واسم واضح وتفاصيل قصيرة.',
  },
  'perfume-quality-lab': {
    role: 'محطات تفاعلية تشرح مراحل الجودة والشهادات والحقائق.',
    uses: ['بناء الثقة', 'شفافية التصنيع', 'تمييز العلامة'],
    tip: 'رتّب المحطات منطقيًا من المصدر إلى التعبئة.',
  },
  'scent-categories': {
    role: 'عرض تصنيفات العطور بشريط أو شبكة مع صور وروابط.',
    uses: ['تنقل سريع', 'تنظيم الكتالوج', 'تحسين الاكتشاف'],
    tip: 'وفّر صورًا متناسقة وفعّل التبديل بين الشريط والشبكة.',
  },
  'scent-before-after': {
    role: 'مقارنة بصرية قبل/بعد بسحب الشريط لعرض التحوّل.',
    uses: ['حملات الإطلاق', 'إبراز الفرق', 'محتوى ترويجي قوي'],
    tip: 'استخدم صورتين بنفس الزاوية والإضاءة لنتائج مقنعة.',
  },
  'scent-promo-banners': {
    role: 'بانرات ترويجية متحركة مع أسهم وسحب ونص دعوة.',
    uses: ['عروض موسمية', 'إطلاقات جديدة', 'توجيه لحملات'],
    tip: 'اجعل النص قصيرًا والزر واضحًا، وتجنّب ازدحام الشريحة.',
  },
};

function titleOf(comp) {
  const t = comp.title;
  if (typeof t === 'string') return t;
  if (t && typeof t === 'object') return t.ar || t.en || comp.name;
  return comp.name;
}

function labelOf(field) {
  if (!field) return '';
  if (typeof field.label === 'string') return field.label;
  if (field.label && typeof field.label === 'object') return field.label.ar || field.label.en || '';
  return field.id || '';
}

function typeOf(field) {
  if (field.type === 'collection') return 'مجموعة';
  if (field.format === 'color' || field.inputType === 'color') return 'لون';
  if (field.format === 'switch' || field.type === 'boolean') return 'تبديل';
  if (field.format === 'dropdown-list' || field.format === 'items') return 'قائمة';
  if (field.format === 'image' || field.inputType === 'image') return 'صورة';
  if (field.type === 'number' || field.format === 'units') return 'رقم/وحدة';
  if (field.format === 'textarea') return 'نص طويل';
  if (field.format === 'text') return 'نص';
  if (field.format === 'url' || field.type === 'url') return 'رابط';
  return field.format || field.type || 'حقل';
}

function descOf(field) {
  const d = field.description;
  if (!d) {
    if (field.type === 'collection') return 'مجموعة عناصر قابلة للإضافة والترتيب';
    if (field.format === 'color') return 'لون عنصر الواجهة';
    if (field.format === 'switch') return 'تفعيل/إيقاف خيار العرض';
    return 'خيار قابل للتخصيص من محرر سلة';
  }
  if (typeof d === 'string') return d;
  return d.ar || d.en || 'خيار قابل للتخصيص من محرر سلة';
}

function sectionTitle(field) {
  if (field.type !== 'static' || field.format !== 'title') return null;
  const v = String(field.value || '');
  const m = v.match(/<h6[^>]*>([^<]+)<\/h6>/i) || v.match(/>([^<]{3,40})</);
  return m ? m[1].trim() : null;
}

function groupFields(fields) {
  const groups = [];
  let current = { title: 'محتوى العنصر', fields: [] };
  for (const f of fields || []) {
    const st = sectionTitle(f);
    if (st) {
      if (current.fields.length) groups.push(current);
      current = { title: st, fields: [] };
      continue;
    }
    if (!f?.id || f.type === 'static') continue;
    if (String(f.id).startsWith('static-')) continue;
    if (
      ['notmrb', 'has_container', 'add_component_background_color', 'component_background_color'].includes(
        f.id
      )
    ) {
      continue;
    }
    current.fields.push(f);
  }
  if (current.fields.length) groups.push(current);
  return groups;
}

function tableFor(fields) {
  const rows = fields
    .map((f) => {
      const label = labelOf(f).replace(/\|/g, '\\|');
      const type = typeOf(f).replace(/\|/g, '\\|');
      const desc = descOf(f).replace(/\|/g, '\\|').replace(/\n/g, ' ');
      return `<tr>\n<td>${label}</td>\n<td>${type}</td>\n<td>${desc}</td>\n</tr>`;
    })
    .join('\n');
  return `<table fit-page-width="true" header-row="true">
<tr>
<td>**الخيار**</td>
<td>**النوع**</td>
<td>**الشرح**</td>
</tr>
${rows}
</table>`;
}

function mdTable(fields) {
  const rows = fields
    .map((f) => `| ${labelOf(f).replace(/\|/g, '\\|')} | ${typeOf(f)} | ${descOf(f).replace(/\|/g, '\\|').replace(/\n/g, ' ')} |`)
    .join('\n');
  return `| الخيار | النوع | الشرح |\n|---|---|---|\n${rows}`;
}

function buildPage(comp) {
  const title = titleOf(comp);
  const idea = IDEAS[comp.name] || {
    role: 'عنصر تفاعلي لتحسين تجربة متجر العطور.',
    uses: ['تحسين تجربة العميل', 'دعم قرار الشراء', 'رفع التفاعل'],
    tip: 'ابدأ بالمحتوى ثم الألوان، واختبر على الجوال.',
  };
  const webp = urls[comp.name] || comp.image || '';
  const groups = groupFields(comp.fields);
  const settings = groups.map((g) => `### ${g.title}\n${tableFor(g.fields)}`).join('\n');

  return {
    name: comp.name,
    title: `عنصر ${title}`,
    category: CATEGORIES[comp.name] || 'عرض وتجربة',
    cover: webp,
    content: `${webp ? `![${title}](${webp})` : ''}
# دليل استخدام عنصر ${title}
${idea.role}
---
## وظيفة العنصر
${idea.uses.map((u) => `- ${u}`).join('\n')}
---
## كيفية الإضافة
1. لوحة سلة → **التصميم** → الصفحة المطلوبة → **إضافة عنصر**
2. اختر **${title}**
3. رتّب موقعه ثم **احفظ**
---
## إعدادات العنصر
${settings}
### خيارات الحاوية والمظهر العام
<table fit-page-width="true" header-row="true">
<tr>
<td>**الخيار**</td>
<td>**النوع**</td>
<td>**الشرح**</td>
</tr>
<tr>
<td>إزالة المسافة السفلية</td>
<td>تبديل</td>
<td>يزيل المسافة السفلية أسفل العنصر</td>
</tr>
<tr>
<td>إضافة العنصر داخل حاوية (Container)</td>
<td>تبديل</td>
<td>يعرض العنصر داخل حاوية بعرض منسّق مع باقي الأقسام</td>
</tr>
<tr>
<td>إضافة لون خلفية للعنصر</td>
<td>تبديل</td>
<td>يفعّل اختيار لون خلفية كامل للعنصر</td>
</tr>
<tr>
<td>لون خلفية العنصر</td>
<td>لون</td>
<td>يظهر عند تفعيل خيار خلفية العنصر</td>
</tr>
</table>
---
## كيفية العمل
1. أضف العنصر في المكان المناسب من الصفحة.
2. املأ المحتوى والمجموعات أولًا.
3. اضبط الألوان والمسافات لتطابق هوية المتجر.
4. احفظ وراجع المعاينة على الجوال والكمبيوتر.
---
## أفضل الممارسات
- ابدأ بالمحتوى قبل الألوان.
- استخدم صورًا واضحة وبنفس الأسلوب البصري.
- اختبر الروابط والأزرار قبل النشر.
---
<callout icon="💡" color="yellow_bg">
	**نصيحة:** ${idea.tip}
</callout>
`,
  };
}

const pages = (bundle.components || []).map(buildPage);
const out = path.join(ROOT, 'notion-screenshots', 'notion-pages.json');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(pages, null, 2));

// USER-GUIDE.md (merchant-facing)
let md = `# عناصر تجربة العطور | دليل المستخدم

حوّل تجربة متجر العطور إلى رحلة تفاعلية راقية — من اكتشاف الشخصية العطرية حتى بناء الهدية والجواز العطري.

تم إعداد هذا الدليل ليشرح كل عنصر: وظيفته، طريقة إضافته، وأهم إعداداته في محرر سلة.

## نظرة عامة على المجموعة

تشمل المجموعة ${pages.length} عنصرًا تفاعليًا تغطي:

- اكتشاف واختيار العطر المناسب
- شرح النوتات والأداء والجودة
- أدوات تفاعلية (دمج، جواز، هدية، رش)
- عروض بصرية (خزانة، مشاهد، قبل/بعد، بانرات)

> **نصيحة:** ابدأ بعنصر أو اثنين في الصفحة، وخصّص المحتوى قبل التوسع.

---

`;

for (const p of pages) {
  const comp = bundle.components.find((c) => c.name === p.name);
  const title = titleOf(comp);
  const idea = IDEAS[p.name] || { role: '', uses: [], tip: '' };
  const groups = groupFields(comp.fields);
  md += `## ${title}\n\n`;
  md += `**المعرّف التقني:** \`${p.name}\`  \n`;
  md += `**التصنيف:** ${p.category}\n\n`;
  if (p.cover) md += `![${title}](${p.cover})\n\n`;
  md += `${idea.role}\n\n`;
  md += `### الوظيفة\n${idea.uses.map((u) => `- ${u}`).join('\n')}\n\n`;
  md += `### أهم الإعدادات / المتغيرات\n\n`;
  for (const g of groups.slice(0, 6)) {
    md += `#### ${g.title}\n\n${mdTable(g.fields.slice(0, 24))}\n\n`;
  }
  md += `### نصيحة\n${idea.tip}\n\n---\n\n`;
}

md += `## تواصل مع الدعم الفني

- واتساب: https://wa.me/201153958512
- تيليجرام: https://t.me/Saji_theme
- بريد: sajispprt@gmail.com
`;

fs.writeFileSync(path.join(ROOT, 'USER-GUIDE.md'), md);
console.log('Wrote', pages.length, 'page payloads →', out);
console.log('Wrote USER-GUIDE.md');
