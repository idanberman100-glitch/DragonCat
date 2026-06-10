// --- Offline translation engine ---------------------------------------------
// English text lives inline in the HTML (so Idan can keep editing in Canvas).
// Hebrew & Spanish live in locales/he.json and locales/es.json, keyed by the
// data-i18n="..." attribute on each element. Anything without a translation
// falls back to the inline English automatically.

const I18N = {
  locales: [
    { id: 'en', name: 'English',  label: 'EN' },
    { id: 'es', name: 'Español',  label: 'ES' },
    { id: 'he', name: 'עברית',    label: 'עב' },
  ],
  defaultLocale: 'en',
  rtl: ['he'],
};

const _i18nCache = {};                 // locale id -> loaded JSON
const _originalHTML = new WeakMap();   // element -> its inline English HTML

function _getByPath(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

async function _loadLocale(lang) {
  if (lang === 'en') return {};
  if (_i18nCache[lang]) return _i18nCache[lang];
  try {
    const res = await fetch('locales/' + lang + '.json');
    _i18nCache[lang] = res.ok ? await res.json() : {};
  } catch (e) {
    _i18nCache[lang] = {};
  }
  return _i18nCache[lang];
}

async function setLanguage(lang) {
  if (!I18N.locales.some(l => l.id === lang)) lang = I18N.defaultLocale;
  localStorage.setItem('dc_lang', lang);

  document.documentElement.lang = lang;
  document.documentElement.dir = I18N.rtl.includes(lang) ? 'rtl' : 'ltr';

  const dict = await _loadLocale(lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    if (!_originalHTML.has(el)) _originalHTML.set(el, el.innerHTML);  // cache English once
    const english = _originalHTML.get(el);
    const translated = lang === 'en' ? null : _getByPath(dict, el.getAttribute('data-i18n'));
    el.innerHTML = (translated != null && translated !== '') ? translated : english;
  });

  _updateSwitcher(lang);
}

function _updateSwitcher(lang) {
  document.querySelectorAll('#lang-switcher button').forEach(b => {
    const active = b.dataset.lang === lang;
    b.classList.toggle('ring-2', active);
    b.classList.toggle('ring-orange-500', active);
    b.classList.toggle('bg-orange-100', active);
    b.classList.toggle('bg-white', !active);
  });
}

function _buildSwitcher() {
  if (document.getElementById('lang-switcher')) return;
  const box = document.createElement('div');
  box.id = 'lang-switcher';
  box.style.cssText = 'position:fixed;top:10px;right:10px;z-index:50;display:flex;gap:4px;' +
    'background:rgba(255,255,255,0.85);padding:5px;border-radius:14px;box-shadow:0 4px 10px rgba(0,0,0,0.12);';
  I18N.locales.forEach(l => {
    const btn = document.createElement('button');
    btn.dataset.lang = l.id;
    btn.title = l.name;
    btn.textContent = l.label;
    btn.style.cssText = 'font-size:15px;font-weight:bold;line-height:1;padding:6px 9px;border-radius:10px;cursor:pointer;border:2px solid #fdba74;background:#fff;color:#9a3412;';
    btn.onclick = () => setLanguage(l.id);
    box.appendChild(btn);
  });
  document.body.appendChild(box);
}

document.addEventListener('DOMContentLoaded', () => {
  _buildSwitcher();
  const urlLang = new URLSearchParams(location.search).get('lang');
  setLanguage(urlLang || localStorage.getItem('dc_lang') || I18N.defaultLocale);
});
