// marva-editor front end — vanilla JS, no build step, no frameworks.
//
// Loads content.he.json / content.en.json / sections.json via the server's API,
// renders editable forms from a MANIFEST, tracks dirty state per file, and writes
// back only what changed. A preview iframe points at the Astro dev server.

// ---------------------------------------------------------------------------
// Manifest: tree node -> ordered groups of root keys (labels + optional hints)
// ---------------------------------------------------------------------------

const MANIFEST = {
  'home/content': [
    {
      heading: 'META / SEO',
      keys: ['homeMeta'],
      hints: { homeMeta: 'SEO text for Google and link previews — not visible on the page itself' },
    },
    { heading: 'HERO', keys: ['homeHero'] },
    { heading: 'CONVEYOR — partner chips', keys: ['conveyorLabel', 'conveyorChips'] },
    { heading: 'WHO WE ARE', keys: ['whoStatement'] },
    { heading: 'HOW IT WORKS', keys: ['howHeading', 'howSteps'] },
    {
      heading: 'WHERE WE WORK',
      keys: ['whereHeading', 'whereCards'],
      hints: { whereCards: 'hidden cards apply to both languages — [x] shows, [ ] hides' },
    },
    { heading: 'UPCOMING SPOTS', keys: ['findSpotsHeading', 'findSpots'] },
    {
      heading: 'TESTIMONIALS',
      keys: ['testimonialsHeading', 'testimonials'],
      hints: { testimonials: 'section currently hidden — see sections' },
    },
    { heading: 'THREE BIG BUTTONS', keys: ['bigButtons'] },
    { heading: 'INQUIRY FORM', keys: ['inquiryTopics', 'inquiryForm'] },
  ],
  'advertisers/content': [
    {
      heading: 'META / SEO',
      keys: ['advertisersMeta'],
      hints: { advertisersMeta: 'SEO text for Google and link previews — not visible on the page itself' },
    },
    { heading: 'HERO', keys: ['advertisersHero'] },
    { heading: 'LABEL PROMO', keys: ['labelPromo'] },
    { heading: 'OPTIONS', keys: ['advertiserOptions'] },
    { heading: 'WHY ADVERTISE', keys: ['whyAdvertiseHeading', 'whyAdvertise'] },
    { heading: 'ADVERTISER FORM', keys: ['adForm'] },
  ],
  'distributors/content': [
    {
      heading: 'META / SEO',
      keys: ['distributorsMeta'],
      hints: { distributorsMeta: 'SEO text for Google and link previews — not visible on the page itself' },
    },
    { heading: 'HERO', keys: ['distributorsHero'] },
    { heading: 'WHY DISTRIBUTE', keys: ['whyDistributeHeading', 'whyDistribute'] },
    {
      heading: 'WHO CAN DISTRIBUTE',
      keys: ['distributorTypesHeading', 'distributorTypes', 'distributorTypesClosing'],
    },
    { heading: 'DISTRIBUTOR FORM', keys: ['distForm'] },
  ],
  'shared/chrome': [
    {
      heading: 'NAV LINKS',
      keys: ['navLinks'],
      hints: { navLinks: 'hiding a section does not remove its nav link — edit here' },
    },
    { heading: 'HEADER', keys: ['headerContent'] },
    { heading: 'FOOTER', keys: ['footerContent'] },
    { heading: 'MISC STRINGS', keys: ['heroBottleAlt', 'formStartHeading', 'ui'] },
  ],
};

// Root keys that are arrays-of-objects vs arrays-of-strings (fixed by the shape
// contract — determined statically so an emptied array still renders correctly).
const OBJECT_ARRAY_KEYS = new Set([
  'conveyorChips', 'howSteps', 'whereCards', 'findSpots', 'testimonials',
  'bigButtons', 'navLinks', 'advertiserOptions', 'whyAdvertise', 'whyDistribute',
]);
const STRING_ARRAY_KEYS = new Set(['inquiryTopics', 'distributorTypes']);

// Enum <select> fields, keyed "arrayRootKey.fieldName".
const ENUMS = {
  'howSteps.icon': ['document', 'bottle', 'rocket'],
  'whyAdvertise.icon': ['target', 'label', 'crowd', 'megaphone'],
  'whereCards.illustration': ['beach', 'storefront', 'event', 'supermarket'],
  'bigButtons.tint': ['sage', 'sky', 'sand'],
  'whyDistribute.accent': ['sage', 'sky', 'sand'],
};

// DOM anchors for the sections toggles (informational hint only), verified
// against the page components — only sections that actually carry an id are
// listed. Hero is omitted everywhere: it is the first thing on the page.
const ANCHOR_MAP = {
  home: {
    who: 'who', how: 'how', where: 'where',
    upcoming: 'upcoming', testimonials: 'testimonials', inquiry: 'inquiry',
  },
  advertisers: {
    adForm: 'ad-form',
  },
  distributors: {
    distForm: 'dist-form',
  },
};

const TREE = [
  { type: 'text', text: '┌─ PAGES' },
  { type: 'text', text: '│' },
  { type: 'text', text: '├─ home' },
  { type: 'leaf', prefix: '│   ├─', node: 'home/content', label: 'content' },
  { type: 'leaf', prefix: '│   └─', node: 'home/sections', label: 'sections' },
  { type: 'text', text: '├─ advertisers' },
  { type: 'leaf', prefix: '│   ├─', node: 'advertisers/content', label: 'content' },
  { type: 'leaf', prefix: '│   └─', node: 'advertisers/sections', label: 'sections' },
  { type: 'text', text: '├─ distributors' },
  { type: 'leaf', prefix: '│   ├─', node: 'distributors/content', label: 'content' },
  { type: 'leaf', prefix: '│   └─', node: 'distributors/sections', label: 'sections' },
  { type: 'text', text: '└─ shared' },
  { type: 'leaf', prefix: '    └─', node: 'shared/chrome', label: 'chrome' },
];

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

let state = { he: {}, en: {}, sections: {} };
let snapshot = { he: {}, en: {}, sections: {} };
let initialTemplates = { he: {}, en: {} };
let currentLocale = 'he';
let currentNode = 'home/content';
let serverReachable = true;
let astroUp = false;
let writeResultTimer = null;
let viewportWidth = 'full';

function currentLocaleObj() {
  return state[currentLocale];
}

function deepClone(v) {
  return v === undefined ? v : JSON.parse(JSON.stringify(v));
}

function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return a === b;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => deepEqual(v, b[i]));
  }
  if (typeof a === 'object') {
    const ak = Object.keys(a);
    const bk = Object.keys(b);
    if (ak.length !== bk.length) return false;
    return ak.every((k) => Object.prototype.hasOwnProperty.call(b, k) && deepEqual(a[k], b[k]));
  }
  return a === b;
}

function getPath(root, path) {
  let cur = root;
  for (const k of path) cur = cur[k];
  return cur;
}

function setPath(root, path, value) {
  let cur = root;
  for (let i = 0; i < path.length - 1; i++) cur = cur[path[i]];
  cur[path[path.length - 1]] = value;
}

function humanize(key) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .toUpperCase();
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function dirtyFlags() {
  return {
    he: !deepEqual(state.he, snapshot.he),
    en: !deepEqual(state.en, snapshot.en),
    sections: !deepEqual(state.sections, snapshot.sections),
  };
}

function anyDirty() {
  const f = dirtyFlags();
  return f.he || f.en || f.sections;
}

function captureInitialTemplates() {
  for (const loc of ['he', 'en']) {
    initialTemplates[loc] = {};
    for (const key of OBJECT_ARRAY_KEYS) {
      const arr = state[loc][key];
      if (Array.isArray(arr) && arr.length > 0) {
        initialTemplates[loc][key] = deepClone(arr[arr.length - 1]);
      }
    }
  }
}

function getInitialTemplate(arrayKey, locale = currentLocale) {
  return (initialTemplates[locale] && initialTemplates[locale][arrayKey]) || null;
}

// ---------------------------------------------------------------------------
// Structural edits (add/delete/reorder/hide) mirror across he/en
// ---------------------------------------------------------------------------
//
// he/en content arrays are parallel translations, so structural shape changes
// must keep them aligned — but only when they're already the same length (if
// they've drifted apart, we can't safely guess which locale is "right", so we
// edit only the locale on screen and warn instead of silently diverging them
// further).

function tryGetPath(root, path) {
  let cur = root;
  for (const k of path) {
    if (cur == null) return undefined;
    cur = cur[k];
  }
  return cur;
}

function resolveArrayAtPath(root, path) {
  const v = tryGetPath(root, path);
  return Array.isArray(v) ? v : null;
}

function mirrorStructural(path, fn) {
  const heArr = resolveArrayAtPath(state.he, path);
  const enArr = resolveArrayAtPath(state.en, path);
  if (heArr && enArr && heArr.length === enArr.length) {
    fn(heArr, 'he');
    fn(enArr, 'en');
    return;
  }

  const arr = resolveArrayAtPath(currentLocaleObj(), path);
  if (!arr) return;
  fn(arr, currentLocale);
  const rootKey = path[0];
  setWriteResult(
    `⚠ he/en out of sync at ${rootKey} — change applied to ${currentLocale.toUpperCase()} only`,
    'warn',
  );
}

function classify(v) {
  if (typeof v === 'boolean') return 'boolean';
  if (Array.isArray(v)) {
    if (v.length === 0) return 'array-unknown';
    return (v[0] !== null && typeof v[0] === 'object' && !Array.isArray(v[0])) ? 'object-array' : 'string-array';
  }
  if (v !== null && typeof v === 'object') return 'object';
  return 'string';
}

function classifyAtPath(root, path, value) {
  if (path.length === 1) {
    if (OBJECT_ARRAY_KEYS.has(path[0])) return 'object-array';
    if (STRING_ARRAY_KEYS.has(path[0])) return 'string-array';
  }
  return classify(value);
}

// Title-ish keys win the item-card header; otherwise first non-empty string
// (avoids headers like "#01 01" from howSteps' leading `n` field).
const TITLE_KEYS = ['title', 'name', 'label', 'keyword', 'text', 'heading', 'date'];

function firstStringValue(item) {
  const candidates = [...TITLE_KEYS, ...Object.keys(item)];
  for (const k of candidates) {
    if (typeof item[k] === 'string' && item[k].length > 0) {
      return item[k].length > 40 ? `${item[k].slice(0, 40)}…` : item[k];
    }
  }
  return '';
}

function emptyStringLeaves(obj, arrayKey) {
  for (const k of Object.keys(obj)) {
    if (typeof obj[k] === 'string') {
      const isEnum = !!ENUMS[`${arrayKey}.${k}`];
      const isHref = k === 'href' || k === 'ctaHref';
      if (!isEnum && !isHref) obj[k] = '';
    }
  }
}

function hintTextFor(fieldName) {
  switch (fieldName) {
    case 'href':
    case 'ctaHref':
      return 'internal path (e.g. /advertisers) or full URL';
    case 'fromPage':
      return 'internal tag identifying which form submitted this — not shown to visitors';
    case 'subject':
      return "email subject line for this form's notification";
    case 'key':
      return 'internal identifier — not shown to visitors';
    default:
      return '';
  }
}

function onStateMutated() {
  updateStatusBar();
}

function rerenderCurrentForm() {
  renderCurrentNode();
}

// ---------------------------------------------------------------------------
// Field renderers
// ---------------------------------------------------------------------------

function makeRowBtn(text, onClick, disabled) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn';
  btn.textContent = text;
  if (disabled) btn.disabled = true;
  btn.addEventListener('click', onClick);
  return btn;
}

// Per-card visibility switch — reuses the sections-toggle grammar (accent
// mark when "on") but is itself the whole clickable control, sized to sit
// alongside the [- DEL]/[↑]/[↓] item-card-controls buttons.
function makeVisibilityToggleBtn(item, onClick) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'item-vis-toggle';
  btn.setAttribute('role', 'switch');
  btn.setAttribute('aria-label', 'visible');
  const isVisible = !item.hidden;
  btn.setAttribute('aria-checked', String(isVisible));
  btn.textContent = isVisible ? '[x]' : '[ ]';
  btn.addEventListener('click', onClick);
  return btn;
}

function makeFieldLabel(labelText) {
  const l = document.createElement('label');
  l.className = 'field-label';
  l.innerHTML = `<span class="prefix-caret">&gt;</span>${escapeHtml(labelText)}`;
  return l;
}

function attachFocusHighlight(fieldDiv, el) {
  el.addEventListener('focus', () => fieldDiv.classList.add('focused'));
  el.addEventListener('blur', () => fieldDiv.classList.remove('focused'));
}

function autoGrow(el) {
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight}px`;
}

function renderStringField(container, root, path, label) {
  const raw = getPath(root, path);
  const value = typeof raw === 'string' ? raw : String(raw ?? '');
  const fieldKey = path[path.length - 1];
  const isHrefLike = fieldKey === 'href' || fieldKey === 'ctaHref';
  const isHintKey = ['href', 'ctaHref', 'fromPage', 'subject', 'key'].includes(fieldKey);

  const fieldDiv = document.createElement('div');
  fieldDiv.className = 'field';
  fieldDiv.appendChild(makeFieldLabel(label));

  let el;
  const singleLine = value.length < 80 && !value.includes('\n');
  if (singleLine) {
    el = document.createElement('input');
    el.type = 'text';
    el.value = value;
  } else {
    el = document.createElement('textarea');
    el.rows = 2;
    el.value = value;
  }
  el.dir = isHrefLike ? 'ltr' : 'auto';
  attachFocusHighlight(fieldDiv, el);
  el.addEventListener('input', () => {
    setPath(root, path, el.value);
    if (el.tagName === 'TEXTAREA') autoGrow(el);
    onStateMutated();
  });
  fieldDiv.appendChild(el);

  if (isHintKey) {
    const hint = document.createElement('div');
    hint.className = 'field-hint';
    hint.textContent = hintTextFor(fieldKey);
    fieldDiv.appendChild(hint);
  }

  container.appendChild(fieldDiv);
  if (el.tagName === 'TEXTAREA') requestAnimationFrame(() => autoGrow(el));
}

function renderSelectField(container, root, path, label, options) {
  const value = getPath(root, path);
  const fieldDiv = document.createElement('div');
  fieldDiv.className = 'field';
  fieldDiv.appendChild(makeFieldLabel(label));

  const sel = document.createElement('select');
  for (const opt of options) {
    const o = document.createElement('option');
    o.value = opt;
    o.textContent = opt;
    if (opt === value) o.selected = true;
    sel.appendChild(o);
  }
  attachFocusHighlight(fieldDiv, sel);
  sel.addEventListener('change', () => {
    setPath(root, path, sel.value);
    onStateMutated();
  });
  fieldDiv.appendChild(sel);
  container.appendChild(fieldDiv);
}

function renderBooleanToggle(container, root, path, label, anchorId) {
  const value = getPath(root, path);
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'toggle-row';
  btn.setAttribute('role', 'switch');
  btn.setAttribute('aria-checked', String(value));

  const mark = document.createElement('span');
  mark.className = 'toggle-mark';
  mark.textContent = value ? '[x]' : '[ ]';

  const name = document.createElement('span');
  name.className = 'toggle-name';
  name.textContent = label;

  btn.append(mark, name);

  if (anchorId) {
    const a = document.createElement('span');
    a.className = 'toggle-anchor';
    a.textContent = `#${anchorId}`;
    btn.appendChild(a);
  }

  btn.addEventListener('click', () => {
    const cur = getPath(root, path);
    setPath(root, path, !cur);
    btn.setAttribute('aria-checked', String(!cur));
    mark.textContent = !cur ? '[x]' : '[ ]';
    onStateMutated();
  });

  container.appendChild(btn);
}

function renderStringArray(container, root, path, label) {
  const arr = getPath(root, path);
  const wrap = document.createElement('div');
  wrap.className = 'field-group';
  const labelEl = document.createElement('div');
  labelEl.className = 'field-label';
  labelEl.textContent = label;
  wrap.appendChild(labelEl);

  arr.forEach((val, i) => {
    const row = document.createElement('div');
    row.className = 'str-array-row';
    const input = document.createElement('input');
    input.type = 'text';
    input.value = val;
    input.dir = 'auto';
    input.addEventListener('input', () => {
      arr[i] = input.value;
      onStateMutated();
    });
    row.appendChild(input);

    const controls = document.createElement('div');
    controls.className = 'row-controls';
    controls.appendChild(makeRowBtn('[- DEL]', () => {
      mirrorStructural(path, (a) => { a.splice(i, 1); });
      onStateMutated();
      rerenderCurrentForm();
    }));
    controls.appendChild(makeRowBtn('[↑]', () => {
      if (i > 0) {
        mirrorStructural(path, (a) => { [a[i - 1], a[i]] = [a[i], a[i - 1]]; });
        onStateMutated();
        rerenderCurrentForm();
      }
    }, i === 0));
    controls.appendChild(makeRowBtn('[↓]', () => {
      if (i < arr.length - 1) {
        mirrorStructural(path, (a) => { [a[i + 1], a[i]] = [a[i], a[i + 1]]; });
        onStateMutated();
        rerenderCurrentForm();
      }
    }, i === arr.length - 1));
    row.appendChild(controls);
    wrap.appendChild(row);
  });

  const addRow = document.createElement('div');
  addRow.className = 'array-add-row';
  addRow.appendChild(makeRowBtn('[+ ADD]', () => {
    mirrorStructural(path, (a) => { a.push(''); });
    onStateMutated();
    rerenderCurrentForm();
  }));
  wrap.appendChild(addRow);
  container.appendChild(wrap);
}

function renderObjectArray(container, root, path, label) {
  const arr = getPath(root, path);
  const arrayKey = path[0];
  const wrap = document.createElement('div');
  wrap.className = 'field-group';
  const labelEl = document.createElement('div');
  labelEl.className = 'field-label';
  labelEl.textContent = label;
  wrap.appendChild(labelEl);

  arr.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'item-card';
    if (item.hidden) card.classList.add('is-hidden');

    const header = document.createElement('div');
    header.className = 'item-card-header';
    const title = document.createElement('span');
    title.className = 'item-card-title';
    title.textContent = `#${String(i + 1).padStart(2, '0')} ${firstStringValue(item)}`;
    if (item.hidden) {
      const suffix = document.createElement('span');
      suffix.className = 'item-hidden-suffix';
      suffix.textContent = ' · hidden';
      title.appendChild(suffix);
    }

    const controls = document.createElement('div');
    controls.className = 'item-card-controls';

    controls.appendChild(makeVisibilityToggleBtn(item, () => {
      const willHide = !item.hidden;
      mirrorStructural(path, (a) => {
        const it = a[i];
        if (!it) return;
        if (willHide) it.hidden = true;
        else delete it.hidden;
      });
      onStateMutated();
      rerenderCurrentForm();
    }));

    controls.appendChild(makeRowBtn('[- DEL]', () => {
      mirrorStructural(path, (a) => { a.splice(i, 1); });
      onStateMutated();
      rerenderCurrentForm();
    }));
    controls.appendChild(makeRowBtn('[↑]', () => {
      if (i > 0) {
        mirrorStructural(path, (a) => {
          const t = a[i - 1];
          a[i - 1] = a[i];
          a[i] = t;
        });
        onStateMutated();
        rerenderCurrentForm();
      }
    }, i === 0));
    controls.appendChild(makeRowBtn('[↓]', () => {
      if (i < arr.length - 1) {
        mirrorStructural(path, (a) => {
          const t = a[i + 1];
          a[i + 1] = a[i];
          a[i] = t;
        });
        onStateMutated();
        rerenderCurrentForm();
      }
    }, i === arr.length - 1));

    header.append(title, controls);
    card.appendChild(header);

    for (const fieldKey of Object.keys(item)) {
      // `hidden` is an internal visibility marker, not a real content field —
      // it must never render as its own (confusing, duplicate) boolean toggle.
      if (fieldKey === 'hidden') continue;
      renderField(card, root, [...path, i, fieldKey], humanize(fieldKey));
    }

    wrap.appendChild(card);
  });

  const addRow = document.createElement('div');
  addRow.className = 'array-add-row';
  addRow.appendChild(makeRowBtn('[+ ADD]', () => {
    mirrorStructural(path, (a, locale) => {
      const template = a.length > 0
        ? deepClone(a[a.length - 1])
        : deepClone(getInitialTemplate(arrayKey, locale));
      if (!template) return;
      delete template.hidden; // new items always start visible
      emptyStringLeaves(template, arrayKey);
      a.push(template);
    });
    onStateMutated();
    rerenderCurrentForm();
  }));
  wrap.appendChild(addRow);
  container.appendChild(wrap);
}

function renderNestedObject(container, root, path, label) {
  const value = getPath(root, path);
  const fieldset = document.createElement('div');
  fieldset.className = 'nested-fieldset';
  const groupLabel = document.createElement('span');
  groupLabel.className = 'group-label';
  groupLabel.textContent = label;
  fieldset.appendChild(groupLabel);
  for (const childKey of Object.keys(value)) {
    renderField(fieldset, root, [...path, childKey], humanize(childKey));
  }
  container.appendChild(fieldset);
}

function renderBottleLabelLines(container, root, path, label) {
  const arr = getPath(root, path);
  const wrap = document.createElement('div');
  wrap.className = 'field-group';
  const groupLabel = document.createElement('div');
  groupLabel.className = 'field-label';
  groupLabel.textContent = label;
  wrap.appendChild(groupLabel);

  for (let i = 0; i < 3; i++) {
    const fieldDiv = document.createElement('div');
    fieldDiv.className = 'field';
    fieldDiv.appendChild(makeFieldLabel(`LINE ${i + 1}`));
    const input = document.createElement('input');
    input.type = 'text';
    input.value = arr[i] ?? '';
    input.dir = 'auto';
    attachFocusHighlight(fieldDiv, input);
    input.addEventListener('input', () => {
      arr[i] = input.value;
      onStateMutated();
    });
    fieldDiv.appendChild(input);
    wrap.appendChild(fieldDiv);
  }
  container.appendChild(wrap);
}

function renderHeroH1(container, root, path, label) {
  const value = getPath(root, path);
  const fieldDiv = document.createElement('div');
  fieldDiv.className = 'field';
  fieldDiv.appendChild(makeFieldLabel(label));

  const ta = document.createElement('textarea');
  ta.rows = 2;
  ta.value = Array.isArray(value) ? value.join('\n') : value;
  ta.dir = 'auto';
  attachFocusHighlight(fieldDiv, ta);
  ta.addEventListener('input', () => {
    const raw = ta.value;
    const idx = raw.indexOf('\n');
    if (idx === -1) {
      setPath(root, path, raw);
    } else {
      setPath(root, path, [raw.slice(0, idx), raw.slice(idx + 1)]);
    }
    autoGrow(ta);
    onStateMutated();
  });
  fieldDiv.appendChild(ta);

  const hint = document.createElement('div');
  hint.className = 'field-hint';
  hint.textContent = 'one line = one-line hero · two lines = two-line hero';
  fieldDiv.appendChild(hint);

  container.appendChild(fieldDiv);
  requestAnimationFrame(() => autoGrow(ta));
}

function renderField(container, root, path, label) {
  const pathStr = path.filter((p) => typeof p === 'string').join('.');

  if (pathStr === 'homeHero.bottleLabelLines') {
    renderBottleLabelLines(container, root, path, label);
    return;
  }
  if (pathStr === 'advertisersHero.h1' || pathStr === 'distributorsHero.h1') {
    renderHeroH1(container, root, path, label);
    return;
  }
  if (path.length === 3 && typeof path[1] === 'number') {
    const enumKey = `${path[0]}.${path[2]}`;
    if (ENUMS[enumKey]) {
      renderSelectField(container, root, path, label, ENUMS[enumKey]);
      return;
    }
  }

  const value = getPath(root, path);
  const kind = classifyAtPath(root, path, value);
  switch (kind) {
    case 'boolean':
      renderBooleanToggle(container, root, path, label);
      return;
    case 'string-array':
    case 'array-unknown':
      renderStringArray(container, root, path, label);
      return;
    case 'object-array':
      renderObjectArray(container, root, path, label);
      return;
    case 'object':
      renderNestedObject(container, root, path, label);
      return;
    default:
      renderStringField(container, root, path, label);
  }
}

function renderGroupTop(container, root, rootKey) {
  const value = root[rootKey];
  if (classifyAtPath(root, [rootKey], value) === 'object') {
    for (const childKey of Object.keys(value)) {
      renderField(container, root, [rootKey, childKey], humanize(childKey));
    }
  } else {
    renderField(container, root, [rootKey], humanize(rootKey));
  }
}

// ---------------------------------------------------------------------------
// Page-level rendering
// ---------------------------------------------------------------------------

function pageHeadingText(nodeKey) {
  return nodeKey.split('/').map((s) => s.toUpperCase()).join(' / ');
}

function renderContentPage(container, nodeKey) {
  const root = currentLocaleObj();
  const groups = MANIFEST[nodeKey] || [];

  const heading = document.createElement('div');
  heading.className = 'page-heading';
  heading.textContent = `┌─ ${pageHeadingText(nodeKey)} `;
  container.appendChild(heading);

  for (const group of groups) {
    const groupHeading = document.createElement('div');
    groupHeading.className = 'panel-heading';
    groupHeading.textContent = group.heading;
    container.appendChild(groupHeading);

    for (const key of group.keys) {
      if (!(key in root)) continue;
      renderGroupTop(container, root, key);
      if (group.hints && group.hints[key]) {
        const hint = document.createElement('div');
        hint.className = 'field-hint';
        hint.style.marginTop = '-10px';
        hint.style.marginBottom = '16px';
        hint.textContent = group.hints[key];
        container.appendChild(hint);
      }
    }
  }

  if (nodeKey === 'shared/chrome') {
    const allMappedKeys = new Set(Object.values(MANIFEST).flat().flatMap((g) => g.keys));
    const unmapped = Object.keys(root).filter((k) => !allMappedKeys.has(k));
    if (unmapped.length) {
      const uh = document.createElement('div');
      uh.className = 'panel-heading unmapped-heading';
      uh.textContent = 'UNMAPPED';
      container.appendChild(uh);
      for (const key of unmapped) {
        renderGroupTop(container, root, key);
      }
    }
  }
}

function renderSectionsPage(container, pageKey) {
  const root = state.sections;
  const heading = document.createElement('div');
  heading.className = 'page-heading';
  heading.textContent = `┌─ ${pageKey.toUpperCase()} / SECTIONS `;
  container.appendChild(heading);

  const hint = document.createElement('div');
  hint.className = 'field-hint';
  hint.style.marginBottom = '16px';
  hint.textContent = 'applies to both languages';
  container.appendChild(hint);

  const sub = root[pageKey] || {};
  const anchors = ANCHOR_MAP[pageKey] || {};
  for (const key of Object.keys(sub)) {
    renderBooleanToggle(container, root, [pageKey, key], key, anchors[key]);
  }
}

function renderCurrentNode() {
  const formRoot = document.getElementById('form-root');
  formRoot.innerHTML = '';
  const [pageKey, sub] = currentNode.split('/');
  if (sub === 'sections') {
    renderSectionsPage(formRoot, pageKey);
  } else {
    renderContentPage(formRoot, currentNode);
  }
  updateStatusBar();
  renderPreview();
}

// ---------------------------------------------------------------------------
// Tree nav
// ---------------------------------------------------------------------------

function renderTree() {
  const treeEl = document.getElementById('rail-tree');
  treeEl.innerHTML = '';
  for (const row of TREE) {
    if (row.type === 'text') {
      const div = document.createElement('div');
      div.className = 'tree-line tree-heading';
      div.textContent = row.text;
      treeEl.appendChild(div);
    } else {
      const active = row.node === currentNode;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `tree-btn${active ? ' active' : ''}`;
      btn.textContent = `${row.prefix}${active ? '>' : ' '}${row.label}`;
      btn.addEventListener('click', () => selectNode(row.node));
      treeEl.appendChild(btn);
    }
  }
}

function selectNode(node) {
  if (node === currentNode) return;
  currentNode = node;
  renderTree();
  renderCurrentNode();
}

// ---------------------------------------------------------------------------
// Status bar
// ---------------------------------------------------------------------------

function updateStatusBar() {
  const dirty = anyDirty();
  const modeChunk = document.getElementById('mode-chunk');
  modeChunk.textContent = dirty ? '-- MODIFIED --' : '-- CLEAN --';
  modeChunk.classList.toggle('modified', dirty);

  document.getElementById('status-node-path').textContent = currentNode;
  document.getElementById('status-locale').textContent = currentLocale.toUpperCase();

  const astroEl = document.getElementById('astro-status');
  astroEl.classList.toggle('up', serverReachable && astroUp);

  const editorPortEl = document.getElementById('editor-port');
  if (editorPortEl) editorPortEl.classList.toggle('err', !serverReachable);

  document.getElementById('btn-write').disabled = !dirty;
  document.getElementById('btn-revert').disabled = !dirty;

  document.getElementById('locale-he').classList.toggle('active', currentLocale === 'he');
  document.getElementById('locale-en').classList.toggle('active', currentLocale === 'en');
}

// ---------------------------------------------------------------------------
// Preview pane
// ---------------------------------------------------------------------------

function currentRoute() {
  const pageKey = currentNode.split('/')[0];
  const baseMap = { home: '/', advertisers: '/advertisers', distributors: '/distributors', shared: '/' };
  const base = baseMap[pageKey] || '/';
  if (currentLocale === 'en') return base === '/' ? '/en' : `/en${base}`;
  return base;
}

function applyViewportWidth() {
  const iframe = document.getElementById('preview-iframe');
  if (viewportWidth === 'full') {
    iframe.classList.remove('sized');
    iframe.style.width = '100%';
  } else {
    iframe.classList.add('sized');
    iframe.style.width = `${viewportWidth}px`;
  }
}

function renderPreview() {
  const iframe = document.getElementById('preview-iframe');
  const target = `http://localhost:4321${currentRoute()}`;
  // Only touch src when the route actually changed — form re-renders (array
  // add/del/reorder) also land here and must not force an iframe reload.
  if (iframe.src !== target) {
    iframe.src = target;
  }
  applyViewportWidth();
}

function reloadPreview() {
  const iframe = document.getElementById('preview-iframe');
  iframe.src = iframe.src;
}

// Small monospace box-drawing helper for the offline overlay — computes its
// own width so the two lines of text stay centered and evenly padded.
function asciiBox(lines) {
  const width = Math.max(...lines.map((l) => l.length));
  const border = '─'.repeat(width + 2);
  const pad = (l) => {
    const total = width - l.length;
    const left = Math.floor(total / 2);
    const right = total - left;
    return `│ ${' '.repeat(left)}${l}${' '.repeat(right)} │`;
  };
  return [`┌${border}┐`, ...lines.map(pad), `└${border}┘`].join('\n');
}

function updatePreviewAvailability() {
  const offlineEl = document.getElementById('preview-offline');
  const offlineTextEl = document.getElementById('preview-offline-text');
  const iframe = document.getElementById('preview-iframe');
  const up = serverReachable && astroUp;
  offlineEl.hidden = up;
  iframe.style.visibility = up ? 'visible' : 'hidden';
  if (!up && offlineTextEl) {
    offlineTextEl.textContent = serverReachable
      ? asciiBox(['astro dev offline', 'waiting for :4321'])
      : asciiBox(['editor server offline', 'restart with npm start']);
  }
}

// ---------------------------------------------------------------------------
// Write / revert
// ---------------------------------------------------------------------------

async function putJson(url, body) {
  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) return { ok: false, error: data.error || `HTTP ${res.status}` };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

// Shared status-bar message helper — used by write results, the he/en
// out-of-sync warning, and publish results, all sharing the same fade-to-dim
// timing (kind: undefined/'ok' fades normally, 'warn' fades too, 'error'
// stays lit until the next message).
function setWriteResult(text, kind) {
  const el = document.getElementById('write-result');
  clearTimeout(writeResultTimer);
  el.classList.remove('faded', 'error', 'warn');
  if (kind === 'error') el.classList.add('error');
  if (kind === 'warn') el.classList.add('warn');
  el.textContent = text;
  if (kind !== 'error') {
    writeResultTimer = setTimeout(() => el.classList.add('faded'), 4000);
  }
}

async function doWrite() {
  const flags = dirtyFlags();
  const written = [];
  let firstError = null;

  if (flags.he) {
    const r = await putJson('/api/content/he', state.he);
    if (r.ok) { snapshot.he = deepClone(state.he); written.push('content.he.json'); } else if (!firstError) firstError = r.error;
  }
  if (flags.en) {
    const r = await putJson('/api/content/en', state.en);
    if (r.ok) { snapshot.en = deepClone(state.en); written.push('content.en.json'); } else if (!firstError) firstError = r.error;
  }
  if (flags.sections) {
    const r = await putJson('/api/sections', state.sections);
    if (r.ok) { snapshot.sections = deepClone(state.sections); written.push('sections.json'); } else if (!firstError) firstError = r.error;
  }

  if (firstError) {
    setWriteResult(firstError, 'error');
  } else {
    const ts = new Date().toLocaleTimeString('en-GB');
    setWriteResult(`wrote ${written.join(', ')} ${ts}`, 'ok');
    setTimeout(reloadPreview, 800);
  }

  updateStatusBar();
}

function doRevert() {
  if (!anyDirty()) return;
  const confirmed = confirm('Discard unsaved edits and restore last-loaded state?');
  if (!confirmed) return;
  state = deepClone(snapshot);
  renderCurrentNode();
}

// ---------------------------------------------------------------------------
// Publish (commit + push the three content files, deploy follows on its own)
// ---------------------------------------------------------------------------

function hidePublishStrip() {
  const strip = document.getElementById('publish-strip');
  strip.hidden = true;
  strip.innerHTML = '';
}

function setPublishStripContent(message, buttons, kind) {
  const strip = document.getElementById('publish-strip');
  strip.innerHTML = '';
  strip.hidden = false;

  const msgSpan = document.createElement('span');
  msgSpan.className = 'publish-strip-msg';
  if (kind === 'error') msgSpan.classList.add('publish-strip-err');
  msgSpan.textContent = message;
  strip.appendChild(msgSpan);

  for (const b of buttons) strip.appendChild(b);
}

function cancelBtn() {
  return makeRowBtn('[ CANCEL ]', hidePublishStrip);
}

async function openPublishStrip() {
  if (anyDirty()) {
    setPublishStripContent('unsaved edits — [ WRITE ] first', [cancelBtn()]);
    return;
  }

  setPublishStripContent('checking publish status…', []);

  let statusRes;
  try {
    statusRes = await fetch('/api/publish/status').then((r) => r.json());
  } catch (e) {
    setPublishStripContent(e.message, [cancelBtn()], 'error');
    return;
  }

  if (!statusRes || statusRes.ok === false) {
    setPublishStripContent((statusRes && statusRes.error) || 'could not read publish status', [cancelBtn()], 'error');
    return;
  }

  const dirtyFiles = statusRes.dirtyFiles || [];
  const ahead = statusRes.ahead || 0;

  if (dirtyFiles.length === 0 && ahead === 0) {
    setPublishStripContent('nothing to publish — live site is up to date', [cancelBtn()]);
    return;
  }

  const parts = [];
  if (dirtyFiles.length) parts.push(dirtyFiles.join(', '));
  parts.push(`${ahead} unpushed commit(s)`);
  const msg = `publish → marva-water.com: ${parts.join(' · ')}`;

  const confirmBtn = makeRowBtn('[ CONFIRM PUBLISH ]', doPublish);
  confirmBtn.classList.add('accent');
  setPublishStripContent(msg, [confirmBtn, cancelBtn()]);
}

async function doPublish() {
  const strip = document.getElementById('publish-strip');
  strip.querySelectorAll('button').forEach((b) => { b.disabled = true; });
  const msgEl = strip.querySelector('.publish-strip-msg');
  if (msgEl) msgEl.textContent = 'publishing…';

  try {
    const res = await fetch('/api/publish', { method: 'POST' }).then((r) => r.json());
    if (res && res.ok) {
      hidePublishStrip();
      setWriteResult(`pushed ${res.hash} · live in ~1 min`, 'ok');
    } else {
      setPublishStripContent((res && res.error) || 'publish failed', [cancelBtn()], 'error');
    }
  } catch (e) {
    setPublishStripContent(e.message, [cancelBtn()], 'error');
  }
}

// ---------------------------------------------------------------------------
// Header typewriter (the one signature animation)
// ---------------------------------------------------------------------------

function runHeaderTypewriter() {
  const cmdEl = document.getElementById('prompt-cmd');
  const cursorEl = document.getElementById('header-cursor');
  const text = 'edit --live';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced) {
    cmdEl.textContent = text;
    return;
  }

  let i = 0;
  const timer = setInterval(() => {
    i += 1;
    cmdEl.textContent = text.slice(0, i);
    if (i >= text.length) {
      clearInterval(timer);
      cursorEl.classList.add('blink');
    }
  }, 35);
}

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------

function showFatalError(message) {
  const formRoot = document.getElementById('form-root');
  formRoot.innerHTML = '';
  const div = document.createElement('div');
  div.className = 'field-hint';
  div.style.color = 'var(--err)';
  div.textContent = `Could not load editor state: ${message}`;
  formRoot.appendChild(div);
}

async function refreshStatus() {
  try {
    const res = await fetch('/api/status').then((r) => r.json());
    serverReachable = true;
    astroUp = !!(res && res.astroDev);
  } catch {
    serverReachable = false;
    astroUp = false;
  }
  updateStatusBar();
  updatePreviewAvailability();
}

function wireStaticEvents() {
  document.getElementById('btn-write').addEventListener('click', doWrite);
  document.getElementById('btn-revert').addEventListener('click', doRevert);
  document.getElementById('btn-publish').addEventListener('click', openPublishStrip);
  document.getElementById('locale-he').addEventListener('click', () => { currentLocale = 'he'; renderCurrentNode(); });
  document.getElementById('locale-en').addEventListener('click', () => { currentLocale = 'en'; renderCurrentNode(); });
  document.getElementById('btn-reload').addEventListener('click', reloadPreview);
  document.getElementById('btn-collapse').addEventListener('click', () => {
    document.getElementById('preview-pane').classList.toggle('collapsed');
  });
  document.querySelectorAll('.vp-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.vp-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      viewportWidth = btn.dataset.w === 'full' ? 'full' : Number(btn.dataset.w);
      applyViewportWidth();
    });
  });
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
      e.preventDefault();
      if (!document.getElementById('btn-write').disabled) doWrite();
    }
  });
  window.addEventListener('beforeunload', (e) => {
    if (anyDirty()) {
      e.preventDefault();
      e.returnValue = '';
    }
  });
}

async function boot() {
  wireStaticEvents();
  runHeaderTypewriter();
  renderTree();

  try {
    const stateRes = await fetch('/api/state').then((r) => r.json());
    if (!stateRes.ok) throw new Error(stateRes.error || 'failed to load state');
    state.he = stateRes.content.he;
    state.en = stateRes.content.en;
    state.sections = stateRes.sections;
    snapshot = deepClone(state);
    captureInitialTemplates();
  } catch (e) {
    showFatalError(e.message);
    return;
  }

  await refreshStatus();
  setInterval(refreshStatus, 5000);

  renderCurrentNode();
}

boot();
