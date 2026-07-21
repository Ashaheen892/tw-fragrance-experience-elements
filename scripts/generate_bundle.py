# -*- coding: utf-8 -*-
"""Generate twilight-bundle.json for the fragrance experience storefront elements.

All 19 components are fragrance-native, product-free interactive/educational
tools with field ids that match exactly what each Lit component reads from
``config``. Every component is prepended with the standard Salla element
editor controls (background).
"""
import json
import uuid
from copy import deepcopy
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BUNDLE_PATH = ROOT / "twilight-bundle.json"

PLACEHOLDER = "https://cdn.salla.network/images/themes/default/placeholder.jpg"

# Fragrance theme defaults (aligned with readSectionTheme in helpers.ts)
THEME_ACCENT = "#9a7b4f"
THEME_BG = "#f6f4f1"
THEME_CARD = "#ffffff"
THEME_TEXT = "#1f1a14"
THEME_MUTED = "#6e6558"
THEME_BORDER = "#e6e0d6"
EDITOR_BG = "#F6F4F1"


def unsplash(pid, w=900):
    return f"https://images.unsplash.com/photo-{pid}?auto=format&fit=crop&w={w}&q=80"


PREVIEW_IMAGES = {
    "scent-personality-finder": "1541643600914-78b084683601",
    "interactive-notes-pyramid": "1615634260167-c8cdede054de",
    "fragrance-family-map": "1594035910387-fea47794261f",
    "fragrance-layering-lab": "1592945403244-b3fbafd7f539",
    "fragrance-performance-meter": "1541643600914-78b084683601",
    "scent-evolution-timeline": "1615634260167-c8cdede054de",
    "ingredient-stories": "1594035910387-fea47794261f",
    "occasion-scent-guide": "1592945403244-b3fbafd7f539",
    "scent-mood-compass": "1541643600914-78b084683601",
    "spray-ritual-guide": "1615634260167-c8cdede054de",
    "scent-passport": "1541643600914-78b084683601",
    "smart-gift-builder": "1592945403244-b3fbafd7f539",
    "scent-scene": "1594035910387-fea47794261f",
    "fragrance-wardrobe": "1615634260167-c8cdede054de",
    "perfume-quality-lab": "1541643600914-78b084683601",
    "scent-categories": "1594035910387-fea47794261f",
    "scent-before-after": "1615634260167-c8cdede054de",
    "scent-promo-banners": "1592945403244-b3fbafd7f539",
}

PERFUME_IMAGES = [
    unsplash("1541643600914-78b084683601", 800),
    unsplash("1594035910387-fea47794261f", 800),
    unsplash("1615634260167-c8cdede054de", 800),
    unsplash("1592945403244-b3fbafd7f539", 800),
    unsplash("1541643600914-78b084683601", 700),
    unsplash("1615634260167-c8cdede054de", 700),
]


def apply_preview_images(components):
    for c in components:
        pid = PREVIEW_IMAGES.get(c["name"])
        if pid:
            url = unsplash(pid)
            c["image"] = url
            c["preview_image"] = url


def u():
    return str(uuid.uuid4())


# ---------------------------------------------------------------------------
# Shared field builders
# ---------------------------------------------------------------------------

LINK_SOURCES = [
    {"label": "منتج", "key": "products", "value": "products"},
    {"label": "تصنيف", "key": "categories", "value": "categories"},
    {"label": "ماركة تجارية", "key": "brands", "value": "brands"},
    {"label": "صفحة تعريفية", "key": "pages", "value": "pages"},
    {"label": "مقالة", "key": "blog_articles", "value": "blog_articles"},
    {"label": "تصنيف ضمن المدونة", "key": "blog_categories", "value": "blog_categories"},
    {"label": "التخفيضات", "key": "offers_link", "value": "offers_link"},
    {"label": "الماركات التجارية", "key": "brands_link", "value": "brands_link"},
    {"label": "المدونة", "key": "blog_link", "value": "blog_link"},
    {"label": "رابط خارجي", "key": "custom", "value": "custom"},
]


def cond_eq(field_id, value):
    return [{"id": field_id, "value": value, "operation": "="}]


def with_conditions(field, conditions=None):
    if conditions:
        field["conditions"] = conditions
    return field


def static_title(fid, title, conditions=None):
    return with_conditions(
        {
            "type": "static",
            "format": "title",
            "id": fid,
            "value": (
                "<div style='background: linear-gradient(135deg, #f6f4f1 0%, #ebe4d8 100%); "
                "border-inline-start: 4px solid #9a7b4f; border-radius: 12px; "
                "padding: 13px 16px; margin-bottom: 18px !important; display: flex; "
                "align-items: center; gap: 10px;'>"
                "<span style='width: 8px; height: 8px; border-radius: 50%; background: #9a7b4f; "
                "box-shadow: 0 0 0 4px rgba(154,123,79,0.16); flex: 0 0 auto;'></span>"
                "<h6 style='color: #5c4a32; font-size: 14px; font-weight: 800; margin: 0; "
                f"letter-spacing: 0.2px;'>{title}</h6> </div>"
            ),
            "key": u(),
        },
        conditions,
    )


def multilang(fid, label, ar="", en="", fmt="text", max_len="160", desc=None, conditions=None):
    return with_conditions(
        {
            "id": fid,
            "key": u(),
            "type": "string",
            "format": fmt,
            "label": label,
            "description": desc,
            "labelHTML": None,
            "placeholder": label,
            "icon": "sicon-format-text-alt",
            "value": {"en": en, "ar": ar},
            "multilanguage": True,
            "required": False,
            "minLength": 0,
            "maxLength": max_len,
        },
        conditions,
    )


def text(fid, label, value="", fmt="text", max_len="200", desc=None,
         icon="sicon-format-text-alt", conditions=None):
    return with_conditions(
        {
            "id": fid,
            "key": u(),
            "type": "string",
            "format": fmt,
            "label": label,
            "description": desc,
            "labelHTML": None,
            "placeholder": label,
            "icon": icon,
            "value": value,
            "required": False,
            "minLength": 0,
            "maxLength": max_len,
        },
        conditions,
    )


def image(fid, label, value="", desc=None, conditions=None):
    return with_conditions(
        {
            "id": fid,
            "key": u(),
            "type": "string",
            "format": "image",
            "label": label,
            "description": desc,
            "labelHTML": None,
            "placeholder": "e.g. https://hostname.com/image.png",
            "icon": "sicon-image",
            "value": value,
            "required": False,
        },
        conditions,
    )


def color(fid, label, value, desc=None, conditions=None):
    return with_conditions(
        {
            "id": fid,
            "key": u(),
            "type": "string",
            "format": "color",
            "inputType": "color",
            "label": label,
            "description": desc,
            "labelHTML": None,
            "icon": "sicon-format-fill",
            "value": value,
            "required": False,
        },
        conditions,
    )


def number(fid, label, value, minimum=0, maximum=500, unit="px", desc=None, conditions=None):
    return with_conditions(
        {
            "id": fid,
            "class": "rounded-lg text-primary border hover:bg-gray-50 p-2",
            "key": u(),
            "type": "number",
            "format": "units",
            "label": label,
            "description": desc,
            "labelHTML": None,
            "placeholder": str(value),
            "icon": "sicon-percentage",
            "value": value,
            "required": False,
            "unit": unit,
            "minimum": minimum,
            "maximum": str(maximum),
        },
        conditions,
    )


def boolean(fid, label, value=True, desc=None, conditions=None):
    return with_conditions(
        {
            "id": fid,
            "key": u(),
            "type": "boolean",
            "format": "switch",
            "label": label,
            "description": desc,
            "labelHTML": None,
            "icon": "sicon-toggle-off",
            "value": value,
            "selected": bool(value),
            "required": False,
        },
        conditions,
    )


def variable_list(fid, label="الرابط", conditions=None):
    return with_conditions(
        {
            "type": "items",
            "icon": "sicon-link",
            "label": label,
            "id": fid,
            "value": None,
            "description": None,
            "required": False,
            "format": "variable-list",
            "searchable": True,
            "source": "offers_link",
            "sources": deepcopy(LINK_SOURCES),
            "key": u(),
        },
        conditions,
    )


def products_picker(
    fid,
    label="اختر المنتج",
    *,
    multichoice=True,
    required=False,
    max_length=24,
    min_length=0,
    desc=None,
    conditions=None,
):
    """Raed/Saji-style picker for real store products."""
    return with_conditions(
        {
            "id": fid,
            "icon": "sicon-keyboard_arrow_down",
            "type": "items",
            "label": label,
            "format": "dropdown-list",
            "source": "products",
            "options": [],
            "required": required,
            "selected": [],
            "maxLength": max_length,
            "minLength": min_length,
            "searchable": True,
            "description": desc,
            "multichoice": multichoice,
            "key": u(),
        },
        conditions,
    )


def dropdown_manual(fid, label, options, selected_value, *, icon="sicon-keyboard_arrow_down",
                    multichoice=False, desc=None, conditions=None):
    opts = [{"key": val, "label": lbl, "value": val} for lbl, val in options]
    selected = next((o for o in opts if o["value"] == selected_value), opts[0])
    return with_conditions(
        {
            "id": fid,
            "icon": icon,
            "type": "items",
            "label": label,
            "format": "dropdown-list",
            "source": "Manual",
            "options": opts,
            "required": False,
            "selected": [selected],
            "description": desc,
            "multichoice": multichoice,
            "key": u(),
        },
        conditions,
    )


def collection(fid, label, fields, value, min_len=0, max_len=60, required=False, conditions=None):
    return with_conditions(
        {
            "id": fid,
            "type": "collection",
            "format": "collection",
            "required": required,
            "minLength": min_len,
            "maxLength": max_len,
            "item_label": label,
            "value": value,
            "fields": fields,
            "key": u(),
            "label": label,
        },
        conditions,
    )


def theme_fields(p, *, accent=THEME_ACCENT, bg=THEME_BG, card=THEME_CARD):
    return [
        static_title(f"{p}theme_title", "الألوان والتنسيق"),
        color(f"{p}bg", "لون الخلفية", bg),
        color(f"{p}text", "لون النص", THEME_TEXT),
        color(f"{p}muted", "لون النص الثانوي", THEME_MUTED),
        color(f"{p}accent", "اللون الرئيسي", accent),
        color(f"{p}card", "لون البطاقات", card),
        color(f"{p}border", "لون الحدود", THEME_BORDER),
        color(f"{p}button_bg", "خلفية الأزرار", accent),
        color(f"{p}button_color", "لون نص الأزرار", "#ffffff"),
        number(f"{p}radius", "تدوير الحواف", 20, 0, 40, "px"),
        boolean(f"{p}animate", "تفعيل الحركات والانتقالات", True,
                "يتوقف تلقائياً عند تفعيل خيار تقليل الحركة في الجهاز."),
    ]


def editor_controls():
    return [
        boolean(
            "add_component_background_color", "إضافة لون خلفية للعنصر", False,
            "فعّل هذا الخيار لتخصيص لون خلفية كامل للعنصر.",
        ),
        color(
            "component_background_color", "لون خلفية العنصر", EDITOR_BG,
            "اختر لونًا مناسبًا يتناسق مع هوية متجرك.",
            conditions=cond_eq("add_component_background_color", True),
        ),
    ]


def commerce_fields(prefix):
    """Conversion outcome: real Salla product picker + optional CTA."""
    return [
        static_title(f"{prefix}commerce_title", "التوصيات التجارية"),
        boolean(
            f"{prefix}show_products",
            "عرض منتجات بعد النتيجة",
            False,
            "فعّل الخيار ثم اختر منتجات حقيقية من متجرك.",
        ),
        products_picker(
            f"{prefix}chosen_products",
            "المنتجات المختارة",
            multichoice=True,
            max_length=24,
            min_length=0,
            desc="منتجات سلة الحقيقية (مثل ثيم رائد) — بدون عينات وهمية.",
            conditions=cond_eq(f"{prefix}show_products", True),
        ),
        number(
            f"{prefix}products_limit",
            "عدد المنتجات المعروضة",
            8,
            1,
            24,
            "",
            "الحد الأقصى لعرض المنتجات المختارة.",
            conditions=cond_eq(f"{prefix}show_products", True),
        ),
        multilang(
            f"{prefix}products_title",
            "عنوان المنتجات المقترحة",
            "منتجات مقترحة لك",
            "Picks for you",
            conditions=cond_eq(f"{prefix}show_products", True),
        ),
        boolean(
            f"{prefix}show_cta",
            "عرض زر رابط بعد النتيجة",
            False,
            "زر يوجّه العميل إلى رابط تختاره.",
        ),
        variable_list(
            f"{prefix}result_link",
            "رابط زر التسوق",
            conditions=cond_eq(f"{prefix}show_cta", True),
        ),
        multilang(
            f"{prefix}cta_label",
            "نص زر التسوق",
            "تسوق الآن",
            "Shop now",
            conditions=cond_eq(f"{prefix}show_cta", True),
        ),
    ]


def append_commerce_fields(components):
    for component_data in components:
        fields = component_data.get("fields", [])
        prefix = next(
            (
                field["id"].split("_", 1)[0] + "_"
                for field in fields
                if field.get("id", "").endswith("_title")
                and field.get("id", "") not in {"content_title", "theme_title"}
            ),
            "",
        )
        if not prefix:
            continue
        # Remove the legacy collection of fake product samples before adding
        # the Raed/Saji picker fields.
        fields[:] = [
            field
            for field in fields
            if field.get("id") != f"{prefix}products"
            or field.get("source") == "products"
            or field.get("format") != "collection"
        ]
        existing = {field.get("id") for field in fields}
        fields.extend(field for field in commerce_fields(prefix) if field["id"] not in existing)


def prepend_editor_controls(components):
    for c in components:
        existing = {f.get("id") for f in c.get("fields", [])}
        if "add_component_background_color" in existing:
            continue
        c["fields"] = editor_controls() + c["fields"]


def component(name, title, icon, fields, image_url=PLACEHOLDER):
    return {
        "key": u(),
        "name": name,
        "title": title,
        "icon": icon,
        "image": image_url,
        "preview_image": image_url,
        "fields": fields,
    }


def _dd(label, value):
    return {"selected": [{"key": value, "label": label, "value": value}]}


LAYER_OPTS = [("المقدمة", "top"), ("القلب", "heart"), ("الأساس", "base")]


# ---------------------------------------------------------------------------
# Component builders
# ---------------------------------------------------------------------------

def build_scent_personality_finder():
    p = "spf_"
    pers_fields = [
        multilang(f"{p}personalities.name", "اسم الشخصية", "الرومانسية", "The Romantic"),
        multilang(f"{p}personalities.desc", "وصف مختصر",
                  "تحبين الورود والياسمين والنوتات الناعمة.",
                  "You love roses, jasmine and soft floral notes.", "textarea", "280"),
        text(f"{p}personalities.icon", "أيقونة أو رمز (اختياري)", "🌹"),
        image(f"{p}personalities.image", "صورة (اختياري)"),
        color(f"{p}personalities.color", "لون الشخصية", "#c47a8a"),
        multilang(f"{p}personalities.result_family", "العائلة العطرية المقترحة",
                  "الزهري الشرقي", "Floral oriental"),
        multilang(f"{p}personalities.result_desc", "وصف النتيجة",
                  "عطور زهرية دافئة مع قاعدة عنبرية أو مسكية.",
                  "Warm florals with an amber or musk base.", "textarea", "320"),
        variable_list(f"{p}personalities.link", "رابط صفحة أو مقال (اختياري)"),
    ]
    sample = [
        {
            "id": "romantic",
            "name": {"ar": "الرومانسية", "en": "The Romantic"},
            "desc": {"ar": "تنجذبين للورود والياسمين والنوتات الناعمة.",
                     "en": "Drawn to roses, jasmine and soft florals."},
            "icon": "🌹", "color": "#c47a8a", "image": PERFUME_IMAGES[0],
            "result_family": {"ar": "الزهري الشرقي", "en": "Floral oriental"},
            "result_desc": {"ar": "عطور زهرية دافئة مع قاعدة عنبرية.",
                            "en": "Warm florals with an amber base."},
        },
        {
            "id": "bold",
            "name": {"ar": "الجريئة", "en": "The Bold"},
            "desc": {"ar": "تفضّلين العطور الغنية بالتوابل والعود.",
                     "en": "You prefer rich spices and oud."},
            "icon": "🔥", "color": "#9c5e37", "image": PERFUME_IMAGES[2],
            "result_family": {"ar": "الشرقي", "en": "Oriental"},
            "result_desc": {"ar": "تركيبات جريئة بالعود والعنبر والفانيليا.",
                            "en": "Bold blends of oud, amber and vanilla."},
        },
        {
            "id": "fresh",
            "name": {"ar": "المنعشة", "en": "The Fresh"},
            "desc": {"ar": "تحبين الحمضيات والنوتات المائية الخفيفة.",
                     "en": "You love citrus and airy aquatic notes."},
            "icon": "💧", "color": "#5aa6c9", "image": PERFUME_IMAGES[3],
            "result_family": {"ar": "المنعش", "en": "Fresh"},
            "result_desc": {"ar": "عطور نظيفة بالبرغموت والنعناع والمسك الأبيض.",
                            "en": "Clean scents with bergamot, mint and white musk."},
        },
        {
            "id": "elegant",
            "name": {"ar": "الأنيقة", "en": "The Elegant"},
            "desc": {"ar": "تفضّلين الخشب والمسك والتركيبات الراقية.",
                     "en": "You favour woods, musk and refined blends."},
            "icon": "✨", "color": "#9a7b4f", "image": PERFUME_IMAGES[1],
            "result_family": {"ar": "الخشبي", "en": "Woody"},
            "result_desc": {"ar": "عطور خشبية أنيقة بالصندل والأرز.",
                            "en": "Elegant woody scents with sandalwood and cedar."},
        },
    ]
    return component(
        "scent-personality-finder", "مستكشف الشخصية العطرية", "sicon-heart",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "اكتشفي شخصيتك العطرية",
                      "Discover your scent personality"),
            multilang(f"{p}desc", "الوصف",
                      "اختاري الشخصية التي تمثّلك لنعرّفك على العائلة العطرية الأنسب.",
                      "Pick the personality that feels like you and we'll suggest your fragrance family.",
                      "textarea", "300"),
            static_title(f"{p}personalities_title", "الشخصيات العطرية"),
            collection(f"{p}personalities", "شخصية", pers_fields, sample),
            *theme_fields(p),
        ],
    )


def build_interactive_notes_pyramid():
    p = "inp_"
    note_fields = [
        multilang(f"{p}notes.name", "اسم النوتة", "برغموت", "Bergamot"),
        multilang(f"{p}notes.desc", "وصف مختصر", "", "", "textarea", "260"),
        text(f"{p}notes.icon", "أيقونة أو رمز (اختياري)", "🍋"),
        image(f"{p}notes.image", "صورة (اختياري)"),
        dropdown_manual(f"{p}notes.layer", "طبقة الهرم", LAYER_OPTS, "top"),
    ]
    tier_note_fields = [
        multilang(f"{p}tiers.notes.name", "اسم النوتة", "برغموت", "Bergamot"),
        multilang(f"{p}tiers.notes.desc", "وصف مختصر", "", "", "textarea", "260"),
        text(f"{p}tiers.notes.icon", "أيقونة (اختياري)", ""),
        image(f"{p}tiers.notes.image", "صورة (اختياري)"),
    ]
    tier_fields = [
        text(f"{p}tiers.key", "مفتاح الطبقة", "top",
             desc="top أو heart أو base"),
        multilang(f"{p}tiers.label", "عنوان الطبقة", "المقدمة", "Top notes"),
        multilang(f"{p}tiers.desc", "وصف الطبقة", "", "", "textarea", "260"),
        color(f"{p}tiers.color", "لون الطبقة", "#c9a24b"),
        collection(f"{p}tiers.notes", "نوتة", tier_note_fields, []),
    ]
    notes_sample = [
        {"name": {"ar": "برغموت", "en": "Bergamot"},
         "desc": {"ar": "افتتاحية حمضية مشرقة.", "en": "Bright citrus opening."},
         "icon": "🍋", "layer": _dd("المقدمة", "top")},
        {"name": {"ar": "ليمون", "en": "Lemon"},
         "desc": {"ar": "انتعاش ليموني نظيف.", "en": "Clean lemon freshness."},
         "icon": "🍋", "layer": _dd("المقدمة", "top")},
        {"name": {"ar": "ورد", "en": "Rose"},
         "desc": {"ar": "قلب زهري أنثوي.", "en": "Feminine floral heart."},
         "icon": "🌹", "layer": _dd("القلب", "heart")},
        {"name": {"ar": "ياسمين", "en": "Jasmine"},
         "desc": {"ar": "زهر أبيض حسّاس.", "en": "Delicate white floral."},
         "icon": "🌸", "layer": _dd("القلب", "heart")},
        {"name": {"ar": "مسك", "en": "Musk"},
         "desc": {"ar": "قاعدة ناعمة دافئة.", "en": "Soft warm base."},
         "icon": "✨", "layer": _dd("الأساس", "base")},
        {"name": {"ar": "عنبر", "en": "Amber"},
         "desc": {"ar": "دفء راتنجي ثابت.", "en": "Resinous lasting warmth."},
         "icon": "🔥", "layer": _dd("الأساس", "base")},
    ]
    tiers_sample = [
        {
            "key": "top",
            "label": {"ar": "المقدمة", "en": "Top notes"},
            "desc": {"ar": "أول ما تشمّينه — حمضيات وبرغموت.", "en": "First impression — citrus and bergamot."},
            "color": "#e0a52e",
            "notes": [
                {"name": {"ar": "برغموت", "en": "Bergamot"}, "icon": "🍋"},
                {"name": {"ar": "ليمون", "en": "Lemon"}, "icon": "🍋"},
            ],
        },
        {
            "key": "heart",
            "label": {"ar": "القلب", "en": "Heart notes"},
            "desc": {"ar": "جوهر العطر — زهور وتوابل.", "en": "The soul — florals and spices."},
            "color": "#c47a8a",
            "notes": [
                {"name": {"ar": "ورد", "en": "Rose"}, "icon": "🌹"},
                {"name": {"ar": "ياسمين", "en": "Jasmine"}, "icon": "🌸"},
            ],
        },
        {
            "key": "base",
            "label": {"ar": "الأساس", "en": "Base notes"},
            "desc": {"ar": "ما يبقى على البشرة — مسك وعنبر.", "en": "What lingers — musk and amber."},
            "color": "#9a7b4f",
            "notes": [
                {"name": {"ar": "مسك", "en": "Musk"}, "icon": "✨"},
                {"name": {"ar": "عنبر", "en": "Amber"}, "icon": "🔥"},
            ],
        },
    ]
    return component(
        "interactive-notes-pyramid", "هرم النوتات التفاعلي", "sicon-layers",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "هرم النوتات التفاعلي",
                      "Interactive notes pyramid"),
            multilang(f"{p}desc", "الوصف",
                      "اضغطي على كل طبقة لاستكشاف نوتات المقدمة والقلب والأساس.",
                      "Tap each tier to explore top, heart and base notes.",
                      "textarea", "300"),
            static_title(f"{p}tiers_title", "طبقات الهرم (اختياري)"),
            collection(f"{p}tiers", "طبقة", tier_fields, tiers_sample),
            static_title(f"{p}notes_title", "نوتات (قائمة مسطّحة بديلة)"),
            collection(f"{p}notes", "نوتة", note_fields, notes_sample),
            static_title(f"{p}labels_title", "تسميات الطبقات (عند عدم استخدام المجموعة)"),
            multilang(f"{p}top_label", "عنوان المقدمة", "المقدمة", "Top notes"),
            multilang(f"{p}heart_label", "عنوان القلب", "القلب", "Heart notes"),
            multilang(f"{p}base_label", "عنوان الأساس", "الأساس", "Base notes"),
            multilang(f"{p}top_desc", "وصف المقدمة", "أول انطباع — حمضيات وبرغموت.",
                      "First impression — citrus and bergamot.", "textarea", "200"),
            multilang(f"{p}heart_desc", "وصف القلب", "جوهر العطر — زهور وتوابل.",
                      "The soul — florals and spices.", "textarea", "200"),
            multilang(f"{p}base_desc", "وصف الأساس", "ما يبقى — مسك وعنبر.",
                      "What lingers — musk and amber.", "textarea", "200"),
            color(f"{p}top_color", "لون المقدمة", "#e0a52e"),
            color(f"{p}heart_color", "لون القلب", "#c47a8a"),
            color(f"{p}base_color", "لون الأساس", "#9a7b4f"),
            *theme_fields(p),
        ],
    )


def build_fragrance_family_map():
    p = "ffm_"
    fam_fields = [
        multilang(f"{p}families.name", "اسم العائلة", "الزهري", "Floral"),
        multilang(f"{p}families.desc", "الوصف", "", "", "textarea", "400"),
        color(f"{p}families.color", "اللون", "#d98cae"),
        text(f"{p}families.icon", "أيقونة أو رمز (اختياري)", "🌸"),
        image(f"{p}families.image", "صورة توضيحية"),
        variable_list(f"{p}families.link", "رابط صفحة أو مقال (اختياري)"),
    ]
    sample = [
        {
            "family_id": "floral", "name": {"ar": "الزهري", "en": "Floral"},
            "desc": {"ar": "عائلة أنثوية ناعمة تعتمد على الورود والياسمين.",
                     "en": "Soft feminine family built on rose and jasmine."},
            "color": "#d98cae", "icon": "🌸", "image": PERFUME_IMAGES[0],
        },
        {
            "family_id": "woody", "name": {"ar": "الخشبي", "en": "Woody"},
            "desc": {"ar": "دافئة راقية تقوم على الصندل والأرز والعنبر.",
                     "en": "Warm refined scents of sandalwood, cedar and amber."},
            "color": "#9c7a4e", "icon": "🌳", "image": PERFUME_IMAGES[1],
        },
        {
            "family_id": "oriental", "name": {"ar": "الشرقي", "en": "Oriental"},
            "desc": {"ar": "غنية وجريئة — توابل وعود وفانيليا.",
                     "en": "Rich and bold — spices, oud and vanilla."},
            "color": "#b5562f", "icon": "🔥", "image": PERFUME_IMAGES[2],
        },
        {
            "family_id": "fresh", "name": {"ar": "المنعش", "en": "Fresh"},
            "desc": {"ar": "خفيفة نظيفة — حمضيات ونوتات مائية.",
                     "en": "Light and clean — citrus and aquatic notes."},
            "color": "#5aa6c9", "icon": "💧", "image": PERFUME_IMAGES[3],
        },
    ]
    return component(
        "fragrance-family-map", "خريطة العائلات العطرية", "sicon-map",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "خريطة العائلات العطرية",
                      "Fragrance family map"),
            multilang(f"{p}desc", "الوصف",
                      "استكشفي العائلات العطرية وتعرّفي على طابع كل عائلة.",
                      "Explore fragrance families and discover each one's character.",
                      "textarea", "300"),
            static_title(f"{p}families_title", "العائلات العطرية"),
            collection(f"{p}families", "عائلة", fam_fields, sample),
            static_title(f"{p}display_title", "خيارات العرض"),
            dropdown_manual(f"{p}layout", "طريقة العرض",
                            [("شبكة", "grid"), ("عجلة دائرية", "wheel")], "grid"),
            text(f"{p}default_family", "العائلة المفتوحة افتراضيًا ", "floral"),
            *theme_fields(p),
        ],
    )


def build_fragrance_layering_lab():
    p = "fll_"
    recipe_fields = [
        multilang(f"{p}recipes.title", "عنوان الوصفة", "مزيج مسائي", "Evening blend"),
        multilang(f"{p}recipes.note_a", "النوتة الأولى", "عود", "Oud"),
        multilang(f"{p}recipes.note_b", "النوتة الثانية", "ورد", "Rose"),
        multilang(f"{p}recipes.note_c", "نوتة ثالثة (اختياري)", "فانيليا", "Vanilla"),
        multilang(f"{p}recipes.result", "النتيجة", "شرقي زهري دافئ", "Warm floral oriental"),
        multilang(f"{p}recipes.occasion", "المناسبة", "سهرة", "Evening out"),
        multilang(f"{p}recipes.how_to", "طريقة الاستخدام",
                  "رشّي العود على المعصم ثم الورد على الرقبة وأخيرًا الفانيليا خلف الأذن.",
                  "Spray oud on wrists, rose on neck, then vanilla behind ears.",
                  "textarea", "400"),
        color(f"{p}recipes.color", "لون البطاقة", "#9a7b4f"),
    ]
    sample = [
        {
            "title": {"ar": "مزيج مسائي", "en": "Evening blend"},
            "note_a": {"ar": "عود", "en": "Oud"}, "note_b": {"ar": "ورد", "en": "Rose"},
            "note_c": {"ar": "فانيليا", "en": "Vanilla"},
            "result": {"ar": "شرقي زهري دافئ", "en": "Warm floral oriental"},
            "occasion": {"ar": "سهرة", "en": "Evening out"},
            "how_to": {"ar": "رشّي العود على المعصم ثم الورد على الرقبة.",
                       "en": "Spray oud on wrists, then rose on the neck."},
            "color": "#9c5e37",
        },
        {
            "title": {"ar": "انتعاش نهاري", "en": "Daytime freshness"},
            "note_a": {"ar": "برغموت", "en": "Bergamot"}, "note_b": {"ar": "نعناع", "en": "Mint"},
            "result": {"ar": "منعش حيوي", "en": "Vibrant fresh"},
            "occasion": {"ar": "عمل ونهار", "en": "Work & daytime"},
            "how_to": {"ar": "رشّة خفيفة على الرقبة والمعصم.", "en": "One light mist on neck and wrists."},
            "color": "#5aa6c9",
        },
        {
            "title": {"ar": "دفء شتوي", "en": "Winter warmth"},
            "note_a": {"ar": "عنبر", "en": "Amber"}, "note_b": {"ar": "صندل", "en": "Sandalwood"},
            "note_c": {"ar": "قرفة", "en": "Cinnamon"},
            "result": {"ar": "دافئ مخملي", "en": "Velvet warmth"},
            "occasion": {"ar": "شتاء ولقاءات", "en": "Winter gatherings"},
            "how_to": {"ar": "طبقة عنبر ثم صندل على الملابس.", "en": "Amber layer then sandalwood on clothes."},
            "color": "#b5562f",
        },
    ]
    return component(
        "fragrance-layering-lab", "مختبر دمج العطور", "sicon-beaker",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "مختبر دمج العطور",
                      "Fragrance layering lab"),
            multilang(f"{p}desc", "الوصف",
                      "اكتشفي كيف تتناغم النوتات عند دمج عطرين أو أكثر.",
                      "Discover how notes harmonize when layering two or more scents.",
                      "textarea", "300"),
            static_title(f"{p}recipes_title", "وصفات الدمج"),
            collection(f"{p}recipes", "وصفة", recipe_fields, sample),
            *theme_fields(p),
        ],
    )


def build_fragrance_performance_meter():
    p = "fpm_"
    metric_fields = [
        multilang(f"{p}metrics.label", "اسم المقياس", "الثبات", "Longevity"),
        number(f"{p}metrics.value", "القيمة (0–100)", 75, 0, 100, ""),
        color(f"{p}metrics.color", "لون المقياس", "#9a7b4f"),
    ]
    metrics_sample = [
        {"label": {"ar": "الثبات", "en": "Longevity"}, "value": 82, "color": "#9a7b4f"},
        {"label": {"ar": "الأريج المحيط", "en": "Sillage"}, "value": 68, "color": "#c9a24b"},
        {"label": {"ar": "الانتشار", "en": "Projection"}, "value": 74, "color": "#9c7a4e"},
        {"label": {"ar": "الحلاوة", "en": "Sweetness"}, "value": 55, "color": "#c47a8a"},
        {"label": {"ar": "الانتعاش", "en": "Freshness"}, "value": 48, "color": "#5aa6c9"},
        {"label": {"ar": "الدفء", "en": "Warmth"}, "value": 71, "color": "#b5562f"},
    ]
    return component(
        "fragrance-performance-meter", "مؤشر الأداء العطري", "sicon-chart",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "مؤشر الأداء العطري",
                      "Fragrance performance meter"),
            multilang(f"{p}desc", "الوصف",
                      "اعرضي مقاييس الثبات والانتشار والطابع العام للعطر.",
                      "Show longevity, projection and overall character metrics.",
                      "textarea", "300"),
            static_title(f"{p}metrics_title", "المقاييس"),
            collection(f"{p}metrics", "مقياس", metric_fields, metrics_sample),
            static_title(f"{p}fixed_title", "مقاييس ثابتة (بديل عند ترك المجموعة فارغة)"),
            number(f"{p}longevity", "الثبات", 82, 0, 100, ""),
            number(f"{p}sillage", "الأريج المحيط", 68, 0, 100, ""),
            number(f"{p}projection", "الانتشار", 74, 0, 100, ""),
            number(f"{p}sweetness", "الحلاوة", 55, 0, 100, ""),
            number(f"{p}freshness", "الانتعاش", 48, 0, 100, ""),
            number(f"{p}warmth", "الدفء", 71, 0, 100, ""),
            static_title(f"{p}display_title", "خيارات العرض"),
            dropdown_manual(f"{p}style", "شكل المؤشر",
                            [("أشرطة", "bars"), ("دوائر", "rings")], "bars"),
            *theme_fields(p),
        ],
    )


def build_scent_evolution_timeline():
    p = "set_"
    stage_fields = [
        multilang(f"{p}stages.label", "اسم المرحلة", "الافتتاح", "Opening"),
        multilang(f"{p}stages.time_label", "الوقت", "0–15 دقيقة", "0–15 min"),
        multilang(f"{p}stages.desc", "الوصف", "", "", "textarea", "400"),
        color(f"{p}stages.color", "لون المرحلة", "#e0a52e"),
        image(f"{p}stages.image", "صورة خلفية (اختياري)"),
    ]
    sample = [
        {
            "label": {"ar": "الافتتاح", "en": "Opening"},
            "time_label": {"ar": "0–15 دقيقة", "en": "0–15 min"},
            "desc": {"ar": "برغموت وليمون — انطباع أول مشرق.",
                     "en": "Bergamot and lemon — a bright first impression."},
            "color": "#e0a52e", "image": PERFUME_IMAGES[3],
        },
        {
            "label": {"ar": "القلب", "en": "Heart"},
            "time_label": {"ar": "15–120 دقيقة", "en": "15–120 min"},
            "desc": {"ar": "ورد وياسمين — جوهر العطر يظهر.",
                     "en": "Rose and jasmine — the scent's soul emerges."},
            "color": "#c47a8a", "image": PERFUME_IMAGES[0],
        },
        {
            "label": {"ar": "القاعدة", "en": "Dry-down"},
            "time_label": {"ar": "2–6 ساعات", "en": "2–6 hours"},
            "desc": {"ar": "مسك وعنبر — دفء يدوم على البشرة.",
                     "en": "Musk and amber — warmth that lingers on skin."},
            "color": "#9a7b4f", "image": PERFUME_IMAGES[1],
        },
        {
            "label": {"ar": "البقاء", "en": "Lingering"},
            "time_label": {"ar": "6+ ساعات", "en": "6+ hours"},
            "desc": {"ar": "أثر خفيف من الخشب والمسك.",
                     "en": "A soft trace of woods and musk."},
            "color": "#6e6558", "image": PERFUME_IMAGES[2],
        },
    ]
    return component(
        "scent-evolution-timeline", "رحلة العطر عبر الوقت", "sicon-clock",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "رحلة العطر عبر الوقت",
                      "Scent evolution timeline"),
            multilang(f"{p}desc", "الوصف",
                      "تابعي كيف يتطور العطر من أول رشة حتى الأثر الأخير.",
                      "Follow how a scent evolves from the first spray to the final trace.",
                      "textarea", "300"),
            static_title(f"{p}stages_title", "مراحل التطور"),
            collection(f"{p}stages", "مرحلة", stage_fields, sample),
            static_title(f"{p}display_title", "خيارات العرض"),
            dropdown_manual(f"{p}layout", "اتجاه الخط الزمني",
                            [("أفقي", "horizontal"), ("عمودي", "vertical")], "horizontal"),
            *theme_fields(p),
        ],
    )


def build_ingredient_stories():
    p = "igs_"
    ing_fields = [
        multilang(f"{p}ingredients.name", "اسم المكوّن", "عود", "Oud"),
        multilang(f"{p}ingredients.short_teaser", "مقتطف قصير",
                  "راتنج فاخر بعمق شرقي.", "Luxurious resin with oriental depth."),
        multilang(f"{p}ingredients.story", "القصة", "", "", "textarea", "500"),
        multilang(f"{p}ingredients.origin", "الأصل", "جنوب شرق آسيا", "Southeast Asia"),
        multilang(f"{p}ingredients.character", "الطابع", "دافئ، عميق، فاخر", "Warm, deep, luxurious"),
        multilang(f"{p}ingredients.mood", "المزاج", "سهرات ومناسبات", "Evenings & occasions"),
        image(f"{p}ingredients.image", "صورة"),
        color(f"{p}ingredients.color", "لون البطاقة", "#9a7b4f"),
        text(f"{p}ingredients.icon", "أيقونة (اختياري)", "🪵"),
    ]
    sample = [
        {
            "name": {"ar": "عود", "en": "Oud"},
            "short_teaser": {"ar": "راتنج فاخر بعمق شرقي.", "en": "Luxurious resin with oriental depth."},
            "story": {"ar": "يُستخرج من خشب العود المعتّق ويُعدّ من أثمن المكونات في perfumery.",
                      "en": "Extracted from aged agarwood — one of perfumery's most precious materials."},
            "origin": {"ar": "جنوب شرق آسيا", "en": "Southeast Asia"},
            "character": {"ar": "دافئ، عميق، فاخر", "en": "Warm, deep, luxurious"},
            "mood": {"ar": "سهرات", "en": "Evenings"},
            "color": "#5c3a21", "icon": "🪵", "image": PERFUME_IMAGES[2],
        },
        {
            "name": {"ar": "ورد", "en": "Rose"},
            "short_teaser": {"ar": "ملكة الزهور في perfumery.", "en": "The queen of florals in perfumery."},
            "story": {"ar": "ورد دمشقي أو بلغاري — رومانسية خالدة.",
                      "en": "Damask or Bulgarian rose — timeless romance."},
            "origin": {"ar": "بلغاريا / دمشق", "en": "Bulgaria / Damascus"},
            "character": {"ar": "أنثوي، رومانسي", "en": "Feminine, romantic"},
            "mood": {"ar": "لقاءات نهارية", "en": "Daytime outings"},
            "color": "#c47a8a", "icon": "🌹", "image": PERFUME_IMAGES[0],
        },
        {
            "name": {"ar": "برغموت", "en": "Bergamot"},
            "short_teaser": {"ar": "حمضيات مشرقة للافتتاح.", "en": "Bright citrus for the opening."},
            "story": {"ar": "ثمرة بين الليمون والبرتقال — أساس cologne الكلاسيكي.",
                      "en": "A fruit between lemon and orange — classic cologne staple."},
            "origin": {"ar": "كالابريا، إيطاليا", "en": "Calabria, Italy"},
            "character": {"ar": "منعش، مشرق", "en": "Fresh, bright"},
            "mood": {"ar": "صباح وانتعاش", "en": "Morning freshness"},
            "color": "#e0a52e", "icon": "🍋", "image": PERFUME_IMAGES[3],
        },
        {
            "name": {"ar": "مسك", "en": "Musk"},
            "short_teaser": {"ar": "قاعدة ناعمة تثبت العطر.", "en": "A soft base that anchors the scent."},
            "story": {"ar": "يمنح دفئًا جلديًا نظيفًا يدوم ساعات.",
                      "en": "Adds clean skin-like warmth that lasts for hours."},
            "origin": {"ar": "تركيبات حديثة", "en": "Modern blends"},
            "character": {"ar": "ناعم، ثابت", "en": "Soft, lasting"},
            "mood": {"ar": "يومي", "en": "Everyday"},
            "color": "#9a7b4f", "icon": "✨", "image": PERFUME_IMAGES[1],
        },
    ]
    return component(
        "ingredient-stories", "مكتبة المكونات العطرية", "sicon-leaf",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "مكتبة المكونات العطرية",
                      "Fragrance ingredient library"),
            multilang(f"{p}desc", "الوصف",
                      "تعرّفي على قصص المكونات وأصولها وطابعها العطري.",
                      "Learn the stories, origins and scent character of key ingredients.",
                      "textarea", "300"),
            static_title(f"{p}ingredients_title", "المكونات"),
            collection(f"{p}ingredients", "مكوّن", ing_fields, sample),
            static_title(f"{p}display_title", "خيارات العرض"),
            dropdown_manual(f"{p}layout", "طريقة العرض",
                            [("شبكة", "grid"), ("قائمة", "list")], "grid"),
            *theme_fields(p),
        ],
    )


def build_occasion_scent_guide():
    p = "osg_"
    occ_fields = [
        multilang(f"{p}occasions.name", "اسم المناسبة", "عمل", "Work"),
        multilang(f"{p}occasions.desc", "وصف مختصر", "", "", "textarea", "280"),
        multilang(f"{p}occasions.scent_profile", "الملف العطري المقترح",
                  "منعش خفيف — حمضيات ومسك أبيض",
                  "Light fresh — citrus and white musk", "textarea", "320"),
        image(f"{p}occasions.image", "صورة"),
        color(f"{p}occasions.color", "لون البطاقة", "#9a7b4f"),
        variable_list(f"{p}occasions.link", "رابط توصية (اختياري)"),
    ]
    sample = [
        {
            "name": {"ar": "عمل", "en": "Work"},
            "desc": {"ar": "عطر قريب من البشرة لا يشتت.", "en": "Close-to-skin scent that won't distract."},
            "scent_profile": {"ar": "منعش خفيف — برغموت ومسك أبيض",
                              "en": "Light fresh — bergamot and white musk"},
            "color": "#5aa6c9", "image": PERFUME_IMAGES[3],
        },
        {
            "name": {"ar": "موعد", "en": "Date night"},
            "desc": {"ar": "دفء رومانسي يترك انطباعًا.", "en": "Romantic warmth that leaves an impression."},
            "scent_profile": {"ar": "زهري شرقي — ورد وعنبر",
                              "en": "Floral oriental — rose and amber"},
            "color": "#c47a8a", "image": PERFUME_IMAGES[0],
        },
        {
            "name": {"ar": "مناسبة رسمية", "en": "Formal event"},
            "desc": {"ar": "أناقة ثابتة بانتشار معتدل.", "en": "Elegant with moderate projection."},
            "scent_profile": {"ar": "خشبي عنبري — صندل وعود خفيف",
                              "en": "Woody amber — sandalwood and soft oud"},
            "color": "#9a7b4f", "image": PERFUME_IMAGES[1],
        },
        {
            "name": {"ar": "رياضة ونشاط", "en": "Sport & activity"},
            "desc": {"ar": "انتعاش نظيف بعد التمرين.", "en": "Clean freshness after activity."},
            "scent_profile": {"ar": "مائي منعش — نعناع وطحالب",
                              "en": "Aquatic fresh — mint and marine notes"},
            "color": "#7fae9b", "image": PERFUME_IMAGES[3],
        },
    ]
    return component(
        "occasion-scent-guide", "دليل اختيار العطر حسب المناسبة", "sicon-calendar",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "دليل العطر حسب المناسبة",
                      "Occasion scent guide"),
            multilang(f"{p}desc", "الوصف",
                      "اختاري المناسبة لاكتشاف الملف العطري الأنسب.",
                      "Pick an occasion to discover the best matching scent profile.",
                      "textarea", "300"),
            static_title(f"{p}occasions_title", "المناسبات"),
            collection(f"{p}occasions", "مناسبة", occ_fields, sample),
            *theme_fields(p),
        ],
    )


def build_scent_mood_compass():
    p = "smc_"
    point_fields = [
        multilang(f"{p}points.name", "اسم النقطة", "زهري ناعم", "Soft floral"),
        multilang(f"{p}points.desc", "الوصف", "", "", "textarea", "320"),
        number(f"{p}points.x", "الموضع الأفقي", 50, 0, 100, "%"),
        number(f"{p}points.y", "الموضع الرأسي", 50, 0, 100, "%"),
        color(f"{p}points.color", "لون النقطة", "#c47a8a"),
    ]
    sample = [
        {
            "name": {"ar": "زهري ناعم", "en": "Soft floral"},
            "desc": {"ar": "ورد وياسمين — أنثوي ورومانسي.", "en": "Rose and jasmine — feminine and romantic."},
            "x": 25, "y": 75, "color": "#c47a8a",
        },
        {
            "name": {"ar": "منعش حيوي", "en": "Vibrant fresh"},
            "desc": {"ar": "حمضيات ونعناع — للنهار.", "en": "Citrus and mint — for daytime."},
            "x": 20, "y": 30, "color": "#5aa6c9",
        },
        {
            "name": {"ar": "شرقي جريء", "en": "Bold oriental"},
            "desc": {"ar": "عود وتوابل — للمساء.", "en": "Oud and spices — for evening."},
            "x": 80, "y": 70, "color": "#b5562f",
        },
        {
            "name": {"ar": "خشبي دافئ", "en": "Warm woody"},
            "desc": {"ar": "صندل وعنبر — دفء مريح.", "en": "Sandalwood and amber — cozy warmth."},
            "x": 75, "y": 35, "color": "#9a7b4f",
        },
    ]
    return component(
        "scent-mood-compass", "بوصلة الطابع العطري", "sicon-compass",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "بوصلة الطابع العطري",
                      "Scent mood compass"),
            multilang(f"{p}desc", "الوصف",
                      "موضع كل عطر بين الانتعاش والدفء، الناعم والقوي.",
                      "Place each scent between fresh and warm, soft and bold.",
                      "textarea", "300"),
            static_title(f"{p}axis_title", "تسميات المحاور"),
            multilang(f"{p}x_left", "محور X — يسار", "منعش", "Fresh"),
            multilang(f"{p}x_right", "محور X — يمين", "دافئ", "Warm"),
            multilang(f"{p}y_top", "محور Y — أعلى", "ناعم", "Soft"),
            multilang(f"{p}y_bottom", "محور Y — أسفل", "قوي", "Strong"),
            static_title(f"{p}points_title", "نقاط الطابع"),
            collection(f"{p}points", "نقطة", point_fields, sample),
            *theme_fields(p),
        ],
    )


def build_spray_ritual_guide():
    p = "srg_"
    ritual_fields = [
        multilang(f"{p}rituals.name", "اسم الطقس", "استخدام يومي", "Daily wear"),
        dropdown_manual(f"{p}rituals.intensity", "الشدة",
                        [("خفيف", "light"), ("يومي", "daily"), ("قوي", "strong"),
                         ("مناسبة", "event")], "daily"),
        number(f"{p}rituals.sprays_count", "عدد الرشات", 3, 1, 12, ""),
        multilang(f"{p}rituals.zones", "المناطق", "المعصم والرقبة", "Wrists and neck"),
        multilang(f"{p}rituals.distance", "المسافة", "15–20 سم", "15–20 cm"),
        multilang(f"{p}rituals.tips", "نصائح", "", "", "textarea", "400"),
        color(f"{p}rituals.color", "لون البطاقة", "#9a7b4f"),
    ]
    zone_fields = [
        multilang(f"{p}zones.label", "اسم المنطقة", "المعصم", "Wrist"),
        number(f"{p}zones.x", "الموضع الأفقي", 50, 0, 100, "%"),
        number(f"{p}zones.y", "الموضع الرأسي", 50, 0, 100, "%"),
        multilang(f"{p}zones.tip", "نصيحة المنطقة", "", "", "textarea", "280"),
    ]
    rituals_sample = [
        {
            "name": {"ar": "استخدام يومي", "en": "Daily wear"},
            "intensity": _dd("يومي", "daily"),
            "sprays_count": 2,
            "zones": {"ar": "المعصم والرقبة", "en": "Wrists and neck"},
            "distance": {"ar": "15–20 سم", "en": "15–20 cm"},
            "tips": {"ar": "رشّتان خفيفتان تكفيان للنهار.", "en": "Two light sprays are enough for daytime."},
            "color": "#9a7b4f",
        },
        {
            "name": {"ar": "مناسبة مسائية", "en": "Evening event"},
            "intensity": _dd("مناسبة", "event"),
            "sprays_count": 5,
            "zones": {"ar": "المعصم، الرقبة، خلف الأذن", "en": "Wrists, neck, behind ears"},
            "distance": {"ar": "20–25 سم", "en": "20–25 cm"},
            "tips": {"ar": "وزّعي على نقاط النبض ولا تفركي.", "en": "Apply to pulse points; do not rub."},
            "color": "#b5562f",
        },
        {
            "name": {"ar": "رش خفيف", "en": "Light mist"},
            "intensity": _dd("خفيف", "light"),
            "sprays_count": 1,
            "zones": {"ar": "الملابس", "en": "Clothes"},
            "distance": {"ar": "30 سم", "en": "30 cm"},
            "tips": {"ar": "رشّة واحدة في الهواء والمرور خلالها.", "en": "One spray in the air and walk through."},
            "color": "#5aa6c9",
        },
    ]
    zones_sample = [
        {"label": {"ar": "المعصم", "en": "Wrist"}, "x": 28, "y": 62,
         "tip": {"ar": "نقطة نبض — لا تفركي بعد الرش.", "en": "Pulse point — don't rub after spraying."}},
        {"label": {"ar": "الرقبة", "en": "Neck"}, "x": 50, "y": 22,
         "tip": {"ar": "خلف الأذن أو أسفل الرقبة.", "en": "Behind ears or base of neck."}},
        {"label": {"ar": "الصدر", "en": "Chest"}, "x": 50, "y": 38,
         "tip": {"ar": "مناسب للثبات على الملابس.", "en": "Good for longevity on fabric."}},
        {"label": {"ar": "المرفق", "en": "Inner elbow"}, "x": 72, "y": 48,
         "tip": {"ar": "انتشار لطيف طوال اليوم.", "en": "Gentle diffusion throughout the day."}},
    ]
    return component(
        "spray-ritual-guide", "دليل قوة الاستخدام", "sicon-droplet",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "دليل قوة الاستخدام",
                      "Spray ritual guide"),
            multilang(f"{p}desc", "الوصف",
                      "تعرّفي على عدد الرشات والمناطق المناسبة لكل مستوى استخدام.",
                      "Learn spray count and zones for each intensity level.",
                      "textarea", "300"),
            static_title(f"{p}rituals_title", "طقوس الرش"),
            collection(f"{p}rituals", "طقس", ritual_fields, rituals_sample),
            static_title(f"{p}zones_title", "مناطق الجسم"),
            collection(f"{p}zones", "منطقة", zone_fields, zones_sample),
            static_title(f"{p}display_title", "خيارات العرض"),
            boolean(f"{p}show_body", "إظهار مخطط الجسم التفاعلي", True),
            *theme_fields(p),
        ],
    )


def build_scent_passport():
    p = "spa_"
    note_fields = [
        multilang(f"{p}liked_notes.name", "اسم النوتة", "ورد", "Rose"),
        color(f"{p}liked_notes.color", "لون النوتة", "#c47a8a"),
        text(f"{p}liked_notes.icon", "أيقونة أو رمز (اختياري)", "🌹"),
        image(f"{p}liked_notes.image", "صورة (اختياري)"),
    ]
    disliked_note_fields = [
        multilang(f"{p}disliked_notes.name", "اسم النوتة", "باتشولي", "Patchouli"),
        color(f"{p}disliked_notes.color", "لون النوتة", "#5c3a21"),
        text(f"{p}disliked_notes.icon", "أيقونة أو رمز (اختياري)", "🍂"),
        image(f"{p}disliked_notes.image", "صورة (اختياري)"),
    ]
    strength_fields = [
        text(f"{p}strengths.value", "قيمة (اختياري)", "light"),
        multilang(f"{p}strengths.name", "اسم المستوى", "خفيف", "Light"),
        multilang(f"{p}strengths.desc", "وصف مختصر", "", "", "textarea", "280"),
    ]
    time_fields = [
        multilang(f"{p}times.name", "اسم الوقت", "صباح", "Morning"),
    ]
    character_fields = [
        multilang(f"{p}characters.name", "اسم الشخصية", "الرومانسية", "The Romantic"),
        multilang(f"{p}characters.desc", "وصف مختصر", "", "", "textarea", "280"),
        color(f"{p}characters.color", "لون الشخصية", "#c47a8a"),
        text(f"{p}characters.icon", "أيقونة أو رمز (اختياري)", "🌹"),
    ]
    result_fields = [
        multilang(f"{p}results.summary", "ملخص الجواز", "", "", "textarea", "400"),
        text(f"{p}results.tags", "وسوم (اختياري)", "romantic",
             desc="كلمات مفتاحية مفصولة بفاصلة"),
    ]
    liked_sample = [
        {"id": "rose", "name": {"ar": "ورد", "en": "Rose"}, "color": "#c47a8a", "icon": "🌹"},
        {"id": "jasmine", "name": {"ar": "ياسمين", "en": "Jasmine"}, "color": "#f0e6d8", "icon": "🌸"},
        {"id": "bergamot", "name": {"ar": "برغموت", "en": "Bergamot"}, "color": "#e0a52e", "icon": "🍋"},
        {"id": "vanilla", "name": {"ar": "فانيليا", "en": "Vanilla"}, "color": "#d4b896", "icon": "🍦"},
        {"id": "musk", "name": {"ar": "مسك", "en": "Musk"}, "color": "#9a7b4f", "icon": "✨"},
        {"id": "amber", "name": {"ar": "عنبر", "en": "Amber"}, "color": "#b5562f", "icon": "🔥"},
    ]
    disliked_sample = [
        {"id": "patchouli", "name": {"ar": "باتشولي", "en": "Patchouli"}, "color": "#5c3a21", "icon": "🍂"},
        {"id": "leather", "name": {"ar": "جلد", "en": "Leather"}, "color": "#4a3728", "icon": "🧥"},
        {"id": "smoke", "name": {"ar": "دخان", "en": "Smoke"}, "color": "#6e6558", "icon": "💨"},
        {"id": "oud-heavy", "name": {"ar": "عود ثقيل", "en": "Heavy oud"}, "color": "#3d2b1f", "icon": "🪵"},
    ]
    strengths_sample = [
        {
            "id": "light", "strength_id": "light", "value": "light",
            "name": {"ar": "خفيف", "en": "Light"},
            "desc": {"ar": "قريب من البشرة — للنهار والعمل.", "en": "Close to skin — for day and work."},
        },
        {
            "id": "balanced", "strength_id": "balanced", "value": "balanced",
            "name": {"ar": "متوازن", "en": "Balanced"},
            "desc": {"ar": "انتشار معتدل يناسب معظم المناسبات.", "en": "Moderate projection for most occasions."},
        },
        {
            "id": "bold", "strength_id": "bold", "value": "bold",
            "name": {"ar": "قوي", "en": "Bold"},
            "desc": {"ar": "توقيع واضح للمساء والمناسبات.", "en": "A clear signature for evenings and events."},
        },
    ]
    times_sample = [
        {"id": "morning", "time_id": "morning", "name": {"ar": "صباح", "en": "Morning"}},
        {"id": "day", "time_id": "day", "name": {"ar": "نهار", "en": "Daytime"}},
        {"id": "evening", "time_id": "evening", "name": {"ar": "مساء", "en": "Evening"}},
        {"id": "night", "time_id": "night", "name": {"ar": "ليل", "en": "Night"}},
    ]
    characters_sample = [
        {
            "id": "romantic", "character_id": "romantic",
            "name": {"ar": "الرومانسية", "en": "The Romantic"},
            "desc": {"ar": "تنجذبين للزهور والنوتات الناعمة.", "en": "Drawn to florals and soft notes."},
            "color": "#c47a8a", "icon": "🌹",
        },
        {
            "id": "fresh", "character_id": "fresh",
            "name": {"ar": "المنعشة", "en": "The Fresh"},
            "desc": {"ar": "تحبين الحمضيات والانتعاش النظيف.", "en": "You love citrus and clean freshness."},
            "color": "#5aa6c9", "icon": "💧",
        },
        {
            "id": "bold", "character_id": "bold",
            "name": {"ar": "الجريئة", "en": "The Bold"},
            "desc": {"ar": "تفضّلين العود والتوابل والعمق.", "en": "You prefer oud, spices and depth."},
            "color": "#9c5e37", "icon": "🔥",
        },
        {
            "id": "elegant", "character_id": "elegant",
            "name": {"ar": "الأنيقة", "en": "The Elegant"},
            "desc": {"ar": "خشب ومسك وتركيبات راقية.", "en": "Woods, musk and refined blends."},
            "color": "#9a7b4f", "icon": "✨",
        },
    ]
    results_sample = [
        {
            "id": "romantic-result", "result_id": "romantic-result",
            "character_id": "romantic",
            "summary": {
                "ar": "ملفك العطري: زهري ناعم مع قاعدة عنبرية — مثالي للمواعيد واللقاءات الرومانسية.",
                "en": "Your profile: soft floral with an amber base — ideal for dates and romantic outings.",
            },
            "tags": "romantic, floral",
        },
        {
            "id": "fresh-result", "result_id": "fresh-result",
            "character_id": "fresh",
            "summary": {
                "ar": "ملفك العطري: منعش حيوي بالحمضيات — مثالي للنهار والعمل.",
                "en": "Your profile: vibrant citrus freshness — ideal for daytime and work.",
            },
            "tags": "fresh, citrus",
        },
        {
            "id": "bold-result", "result_id": "bold-result",
            "character_id": "bold",
            "summary": {
                "ar": "ملفك العطري: شرقي جريء بالعود — للمساء والمناسبات الخاصة.",
                "en": "Your profile: bold oriental with oud — for evenings and special occasions.",
            },
            "tags": "bold, oriental",
        },
    ]
    return component(
        "scent-passport", "جوازك العطري", "sicon-id-card",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "جوازك العطري", "Your scent passport"),
            multilang(f"{p}desc", "الوصف",
                      "أجيبي عن خطوات قصيرة لنبني ملفك العطري الشخصي.",
                      "Answer a few quick steps to build your personal scent profile.",
                      "textarea", "300"),
            static_title(f"{p}liked_title", "النوتات المفضّلة"),
            collection(f"{p}liked_notes", "نوتة", note_fields, liked_sample),
            static_title(f"{p}disliked_title", "نوتات تتجنّبها"),
            collection(f"{p}disliked_notes", "نوتة", disliked_note_fields, disliked_sample),
            static_title(f"{p}strengths_title", "مستويات التركيز"),
            collection(f"{p}strengths", "مستوى", strength_fields, strengths_sample),
            static_title(f"{p}times_title", "أوقات الارتداء"),
            collection(f"{p}times", "وقت", time_fields, times_sample),
            static_title(f"{p}characters_title", "الشخصيات العطرية"),
            collection(f"{p}characters", "شخصية", character_fields, characters_sample),
            static_title(f"{p}results_title", "نتائج الجواز"),
            collection(f"{p}results", "نتيجة", result_fields, results_sample),
            static_title(f"{p}nav_title", "أزرار التنقل والجواز"),
            multilang(f"{p}next_btn", "زر التالي", "التالي", "Next"),
            multilang(f"{p}back_btn", "زر السابق", "السابق", "Back"),
            multilang(f"{p}see_btn", "زر عرض الجواز", "اعرض جوازك", "See your passport"),
            multilang(f"{p}reset_btn", "زر إعادة البدء", "ابدأ من جديد", "Start over"),
            multilang(f"{p}share_btn", "زر نسخ الملخص", "نسخ الملخص", "Copy summary"),
            multilang(f"{p}passport_title", "عنوان الجواز", "جوازك العطري", "Your scent passport"),
            multilang(f"{p}holder_label", "تسمية حامل الجواز", "حامل الجواز", "Passport holder"),
            multilang(f"{p}cta_label", "نص زر التوصية", "استكشف التوصية", "Explore recommendation"),
            variable_list(f"{p}result_link", "رابط التوصية (اختياري)"),
            *theme_fields(p),
        ],
    )


def build_smart_gift_builder():
    p = "sgb_"
    person_fields = [
        multilang(f"{p}persons.name", "الاسم", "لها", "For her"),
        text(f"{p}persons.icon", "أيقونة أو رمز (اختياري)", "👩"),
    ]
    occasion_fields = [
        multilang(f"{p}occasions.name", "اسم المناسبة", "عيد ميلاد", "Birthday"),
        multilang(f"{p}occasions.desc", "وصف مختصر", "", "", "textarea", "280"),
    ]
    budget_fields = [
        multilang(f"{p}budgets.label", "تسمية الميزانية", "متوسطة", "Mid-range"),
        multilang(f"{p}budgets.range_text", "نطاق السعر", "200–400 ر.س", "200–400 SAR"),
    ]
    style_fields = [
        multilang(f"{p}styles.name", "اسم الأسلوب", "كلاسيكي", "Classic"),
        multilang(f"{p}styles.desc", "وصف مختصر", "", "", "textarea", "280"),
        color(f"{p}styles.color", "لون الأسلوب", "#9a7b4f"),
    ]
    recipe_fields = [
        multilang(f"{p}recipes.wrap_suggestion", "اقتراح التغليف", "", "", "textarea", "320"),
        multilang(f"{p}recipes.message", "رسالة الهدية", "", "", "textarea", "320"),
        multilang(f"{p}recipes.scent_character", "الطابع العطري", "", "", "textarea", "280"),
        color(f"{p}recipes.box_color", "لون الصندوق", "#9a7b4f"),
    ]
    persons_sample = [
        {"id": "her", "person_id": "her", "name": {"ar": "لها", "en": "For her"}, "icon": "👩"},
        {"id": "him", "person_id": "him", "name": {"ar": "له", "en": "For him"}, "icon": "👨"},
        {"id": "couple", "person_id": "couple", "name": {"ar": "للزوجين", "en": "For a couple"}, "icon": "💑"},
        {"id": "friend", "person_id": "friend", "name": {"ar": "لصديق/ة", "en": "For a friend"}, "icon": "🎁"},
    ]
    occasions_sample = [
        {
            "id": "birthday", "occasion_id": "birthday",
            "name": {"ar": "عيد ميلاد", "en": "Birthday"},
            "desc": {"ar": "هدية شخصية تترك انطباعًا.", "en": "A personal gift that makes an impression."},
        },
        {
            "id": "wedding", "occasion_id": "wedding",
            "name": {"ar": "زفاف", "en": "Wedding"},
            "desc": {"ar": "توقيع عطري لليلة خاصة.", "en": "A scent signature for a special night."},
        },
        {
            "id": "graduation", "occasion_id": "graduation",
            "name": {"ar": "تخرّج", "en": "Graduation"},
            "desc": {"ar": "احتفال بإنجاز جديد.", "en": "Celebrate a new milestone."},
        },
        {
            "id": "eid", "occasion_id": "eid",
            "name": {"ar": "عيد", "en": "Eid"},
            "desc": {"ar": "هدية أنيقة للعائلة والأصدقاء.", "en": "An elegant gift for family and friends."},
        },
    ]
    budgets_sample = [
        {
            "id": "budget", "budget_id": "budget",
            "label": {"ar": "اقتصادية", "en": "Budget"},
            "range_text": {"ar": "حتى 150 ر.س", "en": "Up to 150 SAR"},
        },
        {
            "id": "mid", "budget_id": "mid",
            "label": {"ar": "متوسطة", "en": "Mid-range"},
            "range_text": {"ar": "200–400 ر.س", "en": "200–400 SAR"},
        },
        {
            "id": "premium", "budget_id": "premium",
            "label": {"ar": "فاخرة", "en": "Premium"},
            "range_text": {"ar": "500+ ر.س", "en": "500+ SAR"},
        },
    ]
    styles_sample = [
        {
            "id": "classic", "style_id": "classic",
            "name": {"ar": "كلاسيكي", "en": "Classic"},
            "desc": {"ar": "صندوق أنيق بشريط ذهبي.", "en": "Elegant box with a gold ribbon."},
            "color": "#9a7b4f",
        },
        {
            "id": "modern", "style_id": "modern",
            "name": {"ar": "عصري", "en": "Modern"},
            "desc": {"ar": "تغليف minimal بخطوط نظيفة.", "en": "Minimal wrap with clean lines."},
            "color": "#7a8b9a",
        },
        {
            "id": "luxury", "style_id": "luxury",
            "name": {"ar": "فاخر", "en": "Luxury"},
            "desc": {"ar": "صندوق مخملي مع بطاقة شخصية.", "en": "Velvet box with a personal card."},
            "color": "#5c4a72",
        },
    ]
    recipes_sample = [
        {
            "id": "her-birthday", "recipe_id": "her-birthday",
            "person_id": "her", "occasion_id": "birthday", "budget_id": "mid", "style_id": "classic",
            "wrap_suggestion": {
                "ar": "صندوق وردي فاتح بشريط ذهبي وبطاقة تهنئة.",
                "en": "Soft pink box with a gold ribbon and greeting card.",
            },
            "message": {
                "ar": "عيد ميلاد سعيد — عطر يعكس أناقتك.",
                "en": "Happy birthday — a scent that reflects your elegance.",
            },
            "scent_character": {
                "ar": "زهري شرقي ناعم بالورد والفانيليا.",
                "en": "Soft floral oriental with rose and vanilla.",
            },
            "box_color": "#c47a8a",
        },
        {
            "id": "him-graduation", "recipe_id": "him-graduation",
            "person_id": "him", "occasion_id": "graduation", "budget_id": "premium", "style_id": "modern",
            "wrap_suggestion": {
                "ar": "صندوق رمادي داكن بخط minimal.",
                "en": "Dark grey box with minimal typography.",
            },
            "message": {
                "ar": "مبروك التخرّج — بداية جديدة بتوقيع عطري.",
                "en": "Congratulations — a new chapter with a signature scent.",
            },
            "scent_character": {
                "ar": "خشبي منعش بالبرغموت والأرز.",
                "en": "Fresh woody with bergamot and cedar.",
            },
            "box_color": "#7a8b9a",
        },
        {
            "id": "couple-wedding", "recipe_id": "couple-wedding",
            "person_id": "couple", "occasion_id": "wedding", "budget_id": "premium", "style_id": "luxury",
            "wrap_suggestion": {
                "ar": "صندوق مزدوج مخملي مع شريط أبيض.",
                "en": "Dual velvet box with a white ribbon.",
            },
            "message": {
                "ar": "أطيب التمنيات — عطران يرمزان لبدايتكم.",
                "en": "Best wishes — two scents symbolizing your beginning.",
            },
            "scent_character": {
                "ar": "زوج عطري: زهري ناعم وشرقي دافئ.",
                "en": "Fragrance pair: soft floral and warm oriental.",
            },
            "box_color": "#9a7b4f",
        },
        {
            "id": "friend-eid", "recipe_id": "friend-eid",
            "person_id": "friend", "occasion_id": "eid", "budget_id": "budget", "style_id": "classic",
            "wrap_suggestion": {
                "ar": "كيس هدية بسيط مع بطاقة عيد.",
                "en": "Simple gift bag with an Eid card.",
            },
            "message": {
                "ar": "عيد مبارك — هدية عطرية من القلب.",
                "en": "Eid Mubarak — a fragrance gift from the heart.",
            },
            "scent_character": {
                "ar": "منعش خفيف بالمسك الأبيض.",
                "en": "Light fresh with white musk.",
            },
            "box_color": "#5aa6c9",
        },
    ]
    return component(
        "smart-gift-builder", "صندوق الهدية الذكي", "sicon-gift",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "صندوق الهدية الذكي", "Smart gift builder"),
            multilang(f"{p}desc", "الوصف",
                      "اختاري المُهدى إليه والمناسبة لنقترح تغليفًا ورسالة وطابعًا عطريًا.",
                      "Pick recipient and occasion — we'll suggest wrap, message and scent character.",
                      "textarea", "300"),
            static_title(f"{p}persons_title", "لمن الهدية؟"),
            collection(f"{p}persons", "شخص", person_fields, persons_sample),
            static_title(f"{p}occasions_title", "المناسبات"),
            collection(f"{p}occasions", "مناسبة", occasion_fields, occasions_sample),
            static_title(f"{p}budgets_title", "الميزانية"),
            collection(f"{p}budgets", "ميزانية", budget_fields, budgets_sample),
            static_title(f"{p}styles_title", "أسلوب التغليف"),
            collection(f"{p}styles", "أسلوب", style_fields, styles_sample),
            static_title(f"{p}recipes_title", "وصفات الهدايا"),
            collection(f"{p}recipes", "وصفة", recipe_fields, recipes_sample),
            static_title(f"{p}nav_title", "أزرار التنقل"),
            multilang(f"{p}next_btn", "زر التالي", "التالي", "Next"),
            multilang(f"{p}back_btn", "زر السابق", "السابق", "Back"),
            multilang(f"{p}see_btn", "زر عرض الهدية", "اعرض الهدية", "See your gift"),
            multilang(f"{p}reset_btn", "زر إعادة البدء", "ابدأ من جديد", "Start over"),
            multilang(f"{p}cta_label", "نص زر التوصية", "استكشف التوصية", "Explore recommendation"),
            variable_list(f"{p}result_link", "رابط التوصية (اختياري)"),
            *theme_fields(p),
        ],
    )


def build_scent_scene():
    p = "ssc_"
    scene_fields = [
        multilang(f"{p}scenes.name", "اسم المشهد", "حديقة الصباح", "Morning garden"),
        multilang(f"{p}scenes.desc", "الوصف", "", "", "textarea", "400"),
        multilang(f"{p}scenes.scent_character", "الطابع العطري", "", "", "textarea", "280"),
        text(f"{p}scenes.mood_tags", "وسوم المزاج", "زهري, منعش",
             desc="كلمات مفتاحية مفصولة بفاصلة"),
        image(f"{p}scenes.image", "صورة المشهد"),
        color(f"{p}scenes.color", "لون الخلفية", "#1f1a14"),
        color(f"{p}scenes.accent", "لون التمييز", "#9a7b4f"),
        variable_list(f"{p}scenes.link", "رابط (اختياري)"),
    ]
    sample = [
        {
            "id": "morning-garden", "scene_id": "morning-garden",
            "name": {"ar": "حديقة الصباح", "en": "Morning garden"},
            "desc": {
                "ar": "ندى الصباح على بتلات الورد — هدوء وانتعاش.",
                "en": "Morning dew on rose petals — calm and freshness.",
            },
            "scent_character": {
                "ar": "زهري منعش بالورد والبرغموت.",
                "en": "Fresh floral with rose and bergamot.",
            },
            "mood_tags": "زهري, منعش, صباح",
            "color": "#2a3d2e", "accent": "#c47a8a",
            "image": PERFUME_IMAGES[0],
        },
        {
            "id": "desert-dusk", "scene_id": "desert-dusk",
            "name": {"ar": "غروب الصحراء", "en": "Desert dusk"},
            "desc": {
                "ar": "رمال دافئة وسماء برتقالية — عمق شرقي.",
                "en": "Warm sand and orange skies — oriental depth.",
            },
            "scent_character": {
                "ar": "شرقي دافئ بالعود والعنبر.",
                "en": "Warm oriental with oud and amber.",
            },
            "mood_tags": "شرقي, دافئ, مساء",
            "color": "#3d2817", "accent": "#b5562f",
            "image": PERFUME_IMAGES[2],
        },
        {
            "id": "coastal-breeze", "scene_id": "coastal-breeze",
            "name": {"ar": "نسيم الساحل", "en": "Coastal breeze"},
            "desc": {
                "ar": "موج وملح وبرّ — انتعاش مائي خفيف.",
                "en": "Waves, salt and breeze — light aquatic freshness.",
            },
            "scent_character": {
                "ar": "مائي منعش بالطحالب والمسك.",
                "en": "Aquatic fresh with marine notes and musk.",
            },
            "mood_tags": "مائي, منعش, صيف",
            "color": "#1a3a4a", "accent": "#5aa6c9",
            "image": PERFUME_IMAGES[3],
        },
        {
            "id": "velvet-lounge", "scene_id": "velvet-lounge",
            "name": {"ar": "صالة مخملية", "en": "Velvet lounge"},
            "desc": {
                "ar": "إضاءة خافتة وقماش ناعم — أناقة مسائية.",
                "en": "Soft lighting and velvet — evening elegance.",
            },
            "scent_character": {
                "ar": "زهري شرقي بالياسمين والفانيليا.",
                "en": "Floral oriental with jasmine and vanilla.",
            },
            "mood_tags": "أنيق, مساء, رومانسي",
            "color": "#2a1f2e", "accent": "#9a7b4f",
            "image": PERFUME_IMAGES[1],
        },
        {
            "id": "winter-fire", "scene_id": "winter-fire",
            "name": {"ar": "موقد الشتاء", "en": "Winter hearth"},
            "desc": {
                "ar": "دفء النار والخشب — راحة شتوية.",
                "en": "Fire and wood warmth — cozy winter comfort.",
            },
            "scent_character": {
                "ar": "خشبي دافئ بالصندل والقرفة.",
                "en": "Warm woody with sandalwood and cinnamon.",
            },
            "mood_tags": "دافئ, شتاء, مريح",
            "color": "#2e1f14", "accent": "#9c5e37",
            "image": PERFUME_IMAGES[4],
        },
        {
            "id": "city-night", "scene_id": "city-night",
            "name": {"ar": "ليل المدينة", "en": "City night"},
            "desc": {
                "ar": "أضواء نيون وأسفلت مبلل — طاقة حضرية.",
                "en": "Neon lights and wet pavement — urban energy.",
            },
            "scent_character": {
                "ar": "عنبري جريء بالجلد والفلفل.",
                "en": "Bold amber with leather and pepper.",
            },
            "mood_tags": "حضري, جريء, ليل",
            "color": "#141820", "accent": "#6e6558",
            "image": PERFUME_IMAGES[5],
        },
    ]
    return component(
        "scent-scene", "مشهد الرائحة", "sicon-picture",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "مشهد الرائحة", "Scent scene"),
            multilang(f"{p}desc", "الوصف",
                      "اختر مشهدًا سينمائيًا واستكشف أجواءه العطرية.",
                      "Pick a cinematic scene and explore its scent mood.",
                      "textarea", "300"),
            static_title(f"{p}scenes_title", "المشاهد العطرية"),
            collection(f"{p}scenes", "مشهد", scene_fields, sample),
            *theme_fields(p),
        ],
    )


def build_fragrance_wardrobe():
    p = "fwd_"
    slot_fields = [
        multilang(f"{p}slots.name", "اسم الخانة", "يومي", "Daily"),
        multilang(f"{p}slots.desc", "الوصف", "", "", "textarea", "400"),
        text(f"{p}slots.icon", "أيقونة أو رمز (اختياري)", "☀️"),
        image(f"{p}slots.image", "صورة (اختياري)"),
        color(f"{p}slots.color", "لون الخانة", "#9a7b4f"),
        variable_list(f"{p}slots.link", "رابط (اختياري)"),
        number(f"{p}slots.order", "الترتيب", 1, 0, 99, "px"),
    ]
    sample = [
        {
            "id": "daily",
            "name": {"ar": "يومي", "en": "Daily"},
            "desc": {
                "ar": "عطر خفيف للاستخدام اليومي واللقاءات غير الرسمية.",
                "en": "A light scent for everyday wear and casual outings.",
            },
            "icon": "☀️", "color": "#c4a574", "image": PERFUME_IMAGES[0], "order": 1,
        },
        {
            "id": "work",
            "name": {"ar": "عمل", "en": "Work"},
            "desc": {
                "ar": "تركيبة أنيقة ومحايدة تناسب بيئة العمل.",
                "en": "An elegant, understated blend for the workplace.",
            },
            "icon": "💼", "color": "#7a8b9a", "image": PERFUME_IMAGES[1], "order": 2,
        },
        {
            "id": "evening",
            "name": {"ar": "مساء", "en": "Evening"},
            "desc": {
                "ar": "عطر أعمق للسهرات واللقاءات المسائية.",
                "en": "A deeper scent for evenings and night outings.",
            },
            "icon": "🌙", "color": "#5c4a72", "image": PERFUME_IMAGES[2], "order": 3,
        },
        {
            "id": "events",
            "name": {"ar": "مناسبات", "en": "Events"},
            "desc": {
                "ar": "توقيع عطري مميز للمناسبات الخاصة.",
                "en": "A signature scent for special occasions.",
            },
            "icon": "✨", "color": "#9a7b4f", "image": PERFUME_IMAGES[3], "order": 4,
        },
        {
            "id": "travel",
            "name": {"ar": "سفر", "en": "Travel"},
            "desc": {
                "ar": "عطر عملي سهل الحمل للرحلات.",
                "en": "A practical, travel-friendly fragrance.",
            },
            "icon": "✈️", "color": "#6a8f7b", "image": PERFUME_IMAGES[4], "order": 5,
        },
        {
            "id": "seasons",
            "name": {"ar": "مواسم", "en": "Seasons"},
            "desc": {
                "ar": "اختيارات موسمية تتغير مع الدفء والبرودة.",
                "en": "Seasonal picks that shift with warm and cool weather.",
            },
            "icon": "🍂", "color": "#b56a3a", "image": PERFUME_IMAGES[5], "order": 6,
        },
    ]
    return component(
        "fragrance-wardrobe", "خزانة العطور", "sicon-cabinet",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "خزانة العطور", "Fragrance wardrobe"),
            multilang(f"{p}desc", "الوصف",
                      "نظّمي عطورك حسب المناسبة — افتحي كل خانة لاكتشاف التركيبة المناسبة.",
                      "Organize your scents by occasion — open each drawer to discover the right fit.",
                      "textarea", "300"),
            multilang(f"{p}open_label", "نص فتح الخانة", "افتح الخزانة", "Open drawer"),
            multilang(f"{p}close_label", "نص إغلاق الخانة", "أغلق", "Close"),
            static_title(f"{p}slots_title", "خانات الخزانة"),
            collection(f"{p}slots", "خانة", slot_fields, sample),
            *theme_fields(p),
        ],
    )


def build_perfume_quality_lab():
    p = "pql_"
    station_fields = [
        multilang(f"{p}stations.name", "اسم المحطة", "مكونات", "Ingredients"),
        multilang(f"{p}stations.short_desc", "وصف مختصر", "", "", "textarea", "200"),
        multilang(f"{p}stations.detail", "التفاصيل", "", "", "textarea", "500"),
        multilang(f"{p}stations.fact", "حقيقة", "", "", "textarea", "280"),
        multilang(f"{p}stations.certificate", "نص الشهادة", "", "", "textarea", "280"),
        image(f"{p}stations.image", "صورة"),
        text(f"{p}stations.video_url", "رابط فيديو (YouTube/Vimeo)", ""),
        color(f"{p}stations.color", "لون المحطة", "#9a7b4f"),
        text(f"{p}stations.icon", "أيقونة أو رمز (اختياري)", "🧪"),
        number(f"{p}stations.order", "الترتيب", 1, 0, 99, "px"),
    ]
    sample = [
        {
            "id": "ingredients",
            "name": {"ar": "مكونات", "en": "Ingredients"},
            "short_desc": {"ar": "مصادر خام عالية الجودة.", "en": "Premium raw material sourcing."},
            "detail": {
                "ar": "نختار المكونات من موردين معتمدين ونفحص كل دفعة قبل الاستخدام.",
                "en": "We source from certified suppliers and inspect every batch before use.",
            },
            "fact": {
                "ar": "أكثر من 80% من المكونات تخضع لاختبار نقاوة مزدوج.",
                "en": "Over 80% of ingredients pass a dual purity test.",
            },
            "certificate": {"ar": "شهادة مطابقة للمواصفات — ISO 22716", "en": "Specification compliance — ISO 22716"},
            "icon": "🌿", "color": "#6a8f7b", "image": PERFUME_IMAGES[0], "order": 1,
        },
        {
            "id": "concentration",
            "name": {"ar": "تركيز", "en": "Concentration"},
            "short_desc": {"ar": "نسب زيت العطر الدقيقة.", "en": "Precise fragrance oil ratios."},
            "detail": {
                "ar": "نضبط التركيز بدقة لضمان ثبات واضح دون إثقال.",
                "en": "Concentration is calibrated for clear longevity without heaviness.",
            },
            "fact": {"ar": "Eau de Parfum: 15–20% زيت عطري.", "en": "Eau de Parfum: 15–20% fragrance oil."},
            "certificate": {"ar": "تحليل تركيز معتمد", "en": "Certified concentration analysis"},
            "icon": "💧", "color": "#5aa6c9", "image": PERFUME_IMAGES[1], "order": 2,
        },
        {
            "id": "blending",
            "name": {"ar": "مزج", "en": "Blending"},
            "short_desc": {"ar": "توازن النوتات.", "en": "Note balance."},
            "detail": {
                "ar": "يُمزج كل عطر على دفعات صغيرة لضمان تناسق كل طبقة.",
                "en": "Each fragrance is blended in small batches for layer consistency.",
            },
            "fact": {
                "ar": "مدة المزج قد تمتد 72 ساعة للتركيبات المعقدة.",
                "en": "Blending can take up to 72 hours for complex formulas.",
            },
            "certificate": {"ar": "سجل دفعات موثّق", "en": "Documented batch log"},
            "icon": "⚗️", "color": "#9a7b4f", "image": PERFUME_IMAGES[2], "order": 3,
        },
        {
            "id": "aging",
            "name": {"ar": "تعتيق", "en": "Aging"},
            "short_desc": {"ar": "نضج التركيبة.", "en": "Formula maturation."},
            "detail": {
                "ar": "تُترك التركيبة لتعتّق في ظروف مُتحكَّم بها لإبراز عمق النوتات.",
                "en": "Formulas rest in controlled conditions to deepen the notes.",
            },
            "fact": {
                "ar": "التعتيق يمكن أن يحسّن الثبات بنسبة تصل إلى 15%.",
                "en": "Aging can improve longevity by up to 15%.",
            },
            "certificate": {"ar": "بروتوكول تعتيق موثّق", "en": "Documented aging protocol"},
            "icon": "⏳", "color": "#8b7355", "image": PERFUME_IMAGES[3], "order": 4,
        },
        {
            "id": "packaging",
            "name": {"ar": "عبوة", "en": "Packaging"},
            "short_desc": {"ar": "حماية وتقديم.", "en": "Protection and presentation."},
            "detail": {
                "ar": "زجاج مقاوم للضوء وغطاء محكم يحافظ على جودة العطر.",
                "en": "Light-resistant glass and tight seals preserve fragrance quality.",
            },
            "fact": {"ar": "كل عبوة تُفحص بصريًا قبل الشحن.", "en": "Every bottle passes a visual inspection before shipping."},
            "certificate": {"ar": "فحص تسرب معتمد", "en": "Certified leak test"},
            "icon": "🧴", "color": "#7a8b9a", "image": PERFUME_IMAGES[4], "order": 5,
        },
        {
            "id": "longevity",
            "name": {"ar": "ثبات", "en": "Longevity"},
            "short_desc": {"ar": "اختبار البقاء على البشرة.", "en": "Skin longevity testing."},
            "detail": {
                "ar": "نقيّم الثبات على البشرة في ظروف مختلفة قبل الإطلاق.",
                "en": "We evaluate skin longevity under varied conditions before launch.",
            },
            "fact": {"ar": "متوسط ثبات EDP: 6–8 ساعات.", "en": "Average EDP wear: 6–8 hours."},
            "certificate": {"ar": "تقرير ثبات مختبري", "en": "Lab longevity report"},
            "icon": "⏱️", "color": "#5c4a72", "image": PERFUME_IMAGES[5], "order": 6,
        },
    ]
    return component(
        "perfume-quality-lab", "مختبر الجودة العطرية", "sicon-flask",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "مختبر الجودة العطرية", "Perfume quality lab"),
            multilang(f"{p}desc", "الوصف",
                      "تعرّفي على رحلة الجودة — من المكونات إلى الثبات.",
                      "Discover the quality journey — from ingredients to longevity.",
                      "textarea", "300"),
            multilang(f"{p}fact_label", "عنوان الحقيقة", "حقيقة", "Fact"),
            multilang(f"{p}cert_label", "عنوان الشهادة", "شهادة الجودة", "Quality certificate"),
            static_title(f"{p}stations_title", "محطات المختبر"),
            collection(f"{p}stations", "محطة", station_fields, sample),
            *theme_fields(p),
        ],
    )


# ---------------------------------------------------------------------------
# Assembly
# ---------------------------------------------------------------------------


def build_scent_categories():
    p = "scat_"
    cat_fields = [
        multilang(f"{p}categories.name", "اسم التصنيف", "زهري", "Floral"),
        multilang(f"{p}categories.description", "وصف مختصر",
                  "عطور ورديّة ناعمة وأنثوية.", "Soft, feminine rose-based scents.",
                  "textarea", "280"),
        image(f"{p}categories.image", "صورة التصنيف"),
        color(f"{p}categories.color", "لون مميز", "#9a7b4f"),
        text(f"{p}categories.icon", "أيقونة (اختياري)", "🌸"),
        variable_list(f"{p}categories.link", "رابط التصنيف (اختياري)"),
    ]
    sample = [
        {
            "name": {"ar": "زهري", "en": "Floral"},
            "description": {"ar": "عطور ورديّة ناعمة وأنثوية.", "en": "Soft, feminine rose-based scents."},
            "color": "#c47a8a", "icon": "🌹", "image": PERFUME_IMAGES[0],
        },
        {
            "name": {"ar": "خشبي", "en": "Woody"},
            "description": {"ar": "دفء الصندل والأرز.", "en": "Warmth of sandalwood and cedar."},
            "color": "#7a5c3a", "icon": "🪵", "image": PERFUME_IMAGES[2],
        },
        {
            "name": {"ar": "شرقي", "en": "Oriental"},
            "description": {"ar": "عنبر ومسك وتوابل غنيّة.", "en": "Amber, musk, and rich spices."},
            "color": "#9a7b4f", "icon": "✨", "image": PERFUME_IMAGES[1],
        },
        {
            "name": {"ar": "منعش", "en": "Fresh"},
            "description": {"ar": "حمضيات مشرقة ونوتات مائية.", "en": "Bright citrus and aquatic notes."},
            "color": "#5aa6c9", "icon": "🍋", "image": PERFUME_IMAGES[3],
        },
    ]
    return component(
        "scent-categories", "تصنيفات العطور", "sicon-th-large",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "تصنيفات العطور", "Scent categories"),
            multilang(f"{p}desc", "الوصف",
                      "اكتشف عائلات العطور واختر ما يناسب ذوقك.",
                      "Explore fragrance families and find your match.",
                      "textarea", "300"),
            static_title(f"{p}categories_title", "التصنيفات"),
            collection(f"{p}categories", "تصنيف", cat_fields, sample),
            static_title(f"{p}display_title", "خيارات العرض"),
            dropdown_manual(f"{p}layout", "طريقة العرض",
                            [("منزلق", "slider"), ("شبكة", "grid")], "slider"),
            *theme_fields(p),
        ],
    )


def build_scent_before_after():
    p = "sba_"
    slide_fields = [
        image(f"{p}slides.before_image", "صورة قبل"),
        image(f"{p}slides.after_image", "صورة بعد"),
        multilang(f"{p}slides.before_label", "عنوان قبل", "قبل", "BEFORE"),
        multilang(f"{p}slides.after_label", "عنوان بعد", "بعد", "AFTER"),
        multilang(f"{p}slides.caption", "تعليق (اختياري)", "", "", "textarea", "200"),
    ]
    sample = [
        {
            "before_image": PERFUME_IMAGES[0],
            "after_image": PERFUME_IMAGES[1],
            "before_label": {"ar": "قبل", "en": "BEFORE"},
            "after_label": {"ar": "بعد", "en": "AFTER"},
            "caption": {"ar": "الفرق بعد التطبيق.", "en": "The difference after application."},
        },
        {
            "before_image": PERFUME_IMAGES[2],
            "after_image": PERFUME_IMAGES[3],
            "before_label": {"ar": "قبل", "en": "BEFORE"},
            "after_label": {"ar": "بعد", "en": "AFTER"},
            "caption": {"ar": "التحوّل العطري.", "en": "The fragrance transformation."},
        },
    ]
    return component(
        "scent-before-after", "مقارنة قبل وبعد", "sicon-columns",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "مقارنة قبل وبعد",
                      "Before & after comparison"),
            multilang(f"{p}desc", "الوصف",
                      "اسحب المقبض لمقارنة الفرق.",
                      "Drag the handle to compare the difference.",
                      "textarea", "300"),
            static_title(f"{p}slides_title", "الشرائح"),
            collection(f"{p}slides", "شريحة", slide_fields, sample),
            static_title(f"{p}display_title", "خيارات العرض"),
            dropdown_manual(f"{p}direction", "اتجاه الانقسام",
                            [("عمودي", "vertical"), ("أفقي", "horizontal")], "vertical"),
            *theme_fields(p),
        ],
    )


def build_scent_promo_banners():
    p = "spb_"
    banner_fields = [
        multilang(f"{p}banners.heading", "العنوان الرئيسي",
                  "عطر الموسم", "Scent of the Season"),
        multilang(f"{p}banners.subheading", "العنوان الفرعي",
                  "اكتشف التشكيلة الجديدة.", "Discover the new collection.",
                  "textarea", "200"),
        image(f"{p}banners.image", "صورة الخلفية"),
        multilang(f"{p}banners.cta_label", "نص الزر", "تسوق الآن", "Shop now"),
        variable_list(f"{p}banners.cta_link", "رابط الزر"),
        number(f"{p}banners.overlay_opacity", "شفافية الطبقة المعتمة", 45, 0, 100, "%"),
    ]
    sample = [
        {
            "heading": {"ar": "عطر الموسم", "en": "Scent of the Season"},
            "subheading": {"ar": "اكتشف التشكيلة الجديدة.", "en": "Discover the new collection."},
            "image": PERFUME_IMAGES[0],
            "cta_label": {"ar": "تسوق الآن", "en": "Shop now"},
            "overlay_opacity": 45,
        },
        {
            "heading": {"ar": "عروض حصرية", "en": "Exclusive Offers"},
            "subheading": {"ar": "خصومات لغاية ٣٠٪ على مجموعة مختارة.", "en": "Up to 30% off on a curated selection."},
            "image": PERFUME_IMAGES[2],
            "cta_label": {"ar": "اكتشف العروض", "en": "See offers"},
            "overlay_opacity": 50,
        },
    ]
    return component(
        "scent-promo-banners", "بانرات ترويجية", "sicon-image",
        [
            static_title(f"{p}content_title", "محتوى العنصر"),
            multilang(f"{p}title", "العنوان", "بانرات ترويجية",
                      "Promotional banners"),
            multilang(f"{p}desc", "الوصف",
                      "عروض وتشكيلات مميزة.",
                      "Featured offers and curated collections.",
                      "textarea", "300"),
            static_title(f"{p}banners_title", "البانرات"),
            collection(f"{p}banners", "بانر", banner_fields, sample),
            static_title(f"{p}display_title", "خيارات العرض"),
            number(f"{p}interval", "مدة التبديل (مللي ثانية)", 5000, 2000, 12000, "ms"),
            *theme_fields(p),
        ],
    )


def build_components():
    return [
        build_scent_personality_finder(),
        build_interactive_notes_pyramid(),
        build_fragrance_family_map(),
        build_fragrance_layering_lab(),
        build_fragrance_performance_meter(),
        build_scent_evolution_timeline(),
        build_ingredient_stories(),
        build_occasion_scent_guide(),
        build_scent_mood_compass(),
        build_spray_ritual_guide(),
        build_scent_passport(),
        build_smart_gift_builder(),
        build_scent_scene(),
        build_fragrance_wardrobe(),
        build_perfume_quality_lab(),
        build_scent_categories(),
        build_scent_before_after(),
        build_scent_promo_banners(),
    ]


def count_fields(fields):
    total = 0
    for field in fields:
        total += 1
        if field.get("type") == "collection" and field.get("fields"):
            for nested in field["fields"]:
                total += 1
                if nested.get("type") == "collection" and nested.get("fields"):
                    total += len(nested["fields"])
    return total


def validate(bundle):
    components = bundle["components"]
    names = [c["name"] for c in components]
    assert len(names) == len(set(names)), "duplicate component names"
    assert len(components) == 18, f"expected 18 components, got {len(components)}"
    for comp in components:
        assert comp.get("key"), f"missing component key: {comp['name']}"
        ids = [f["id"] for f in comp["fields"]]
        assert len(ids) == len(set(ids)), f"duplicate field ids in {comp['name']}"
    json.dumps(bundle)
    return True


def polish_bundle_content(components):
    media_pool = list(PERFUME_IMAGES)

    def normalize_locale_obj(value):
        if not isinstance(value, dict):
            return value
        keys = set(value.keys())
        if keys and keys <= {"ar", "en", "fr"}:
            return {
                "en": str(value.get("en") or ""),
                "ar": str(value.get("ar") or ""),
            }
        return {k: walk(v) for k, v in value.items()}

    def walk(node):
        if isinstance(node, list):
            return [walk(x) for x in node]
        if isinstance(node, dict):
            return normalize_locale_obj(node)
        return node

    def polish_field(field, component_image="", component_index=0):
        if not isinstance(field, dict):
            return
        if field.get("format") == "image" and not field.get("value"):
            field["value"] = component_image or media_pool[component_index % len(media_pool)]
        if field.get("multilanguage") and isinstance(field.get("value"), dict):
            field["value"] = {
                "en": str(field["value"].get("en") or ""),
                "ar": str(field["value"].get("ar") or ""),
            }
        elif field.get("type") == "collection":
            field["value"] = walk(field.get("value") or [])
            rows = field["value"]
            nested_fields = field.get("fields") or []
            for row_index, row in enumerate(rows):
                if not isinstance(row, dict):
                    continue
                for nested in nested_fields:
                    if nested.get("format") != "image":
                        continue
                    leaf = str(nested.get("id") or "").rsplit(".", 1)[-1]
                    if row.get(leaf):
                        continue
                    if leaf.endswith("image_mobile") and row.get("image"):
                        row[leaf] = row["image"]
                    else:
                        row[leaf] = media_pool[
                            (component_index + row_index) % len(media_pool)
                        ]
            for nested in nested_fields:
                polish_field(nested, component_image, component_index)

    for component_index, comp in enumerate(components):
        title = comp.get("title")
        if isinstance(title, dict):
            comp["title"] = str(title.get("ar") or title.get("en") or "").strip()
        elif title is not None:
            comp["title"] = str(title).strip()
        component_image = str(comp.get("image") or comp.get("preview_image") or "")
        for field in comp.get("fields") or []:
            polish_field(field, component_image, component_index)


def main():
    if BUNDLE_PATH.exists():
        with BUNDLE_PATH.open(encoding="utf-8") as fh:
            bundle = json.load(fh)
    else:
        bundle = {}

    bundle["name"] = {
        "ar": "عناصر تجربة العطور",
        "en": "Fragrance Experience Elements",
    }
    bundle["description"] = {
        "ar": "عناصر تفاعلية لتجربة اختيار وفهم العطور",
        "en": "Interactive elements for fragrance discovery and education",
    }
    bundle["author_email"] = "sajispprt@gmail.com"
    bundle["repository"] = "https://github.com/Ashaheen892/tw-fragrance-experience-elements"
    bundle["components"] = build_components()
    append_commerce_fields(bundle["components"])
    prepend_editor_controls(bundle["components"])
    apply_preview_images(bundle["components"])
    polish_bundle_content(bundle["components"])
    bundle.pop("templates", None)

    validate(bundle)

    with BUNDLE_PATH.open("w", encoding="utf-8") as fh:
        json.dump(bundle, fh, ensure_ascii=False, indent=4)
        fh.write("\n")

    total_fields = sum(count_fields(c["fields"]) for c in bundle["components"])
    print(f"Validation OK: {len(bundle['components'])} components, {total_fields} fields")
    print(f"Written: {BUNDLE_PATH}")


if __name__ == "__main__":
    main()
