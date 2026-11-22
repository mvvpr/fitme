/* FitMe measurement: Meta Pixel (browser) + Conversions API relay (server) + Google Tag Manager, gated on cookie consent.
   Nothing from Meta or Google loads, and no _fbp/_fbc/_ga cookies are set, until the visitor accepts.
   Tracked events are also pushed to the GTM dataLayer (event = the same name: PageView, ViewContent, Step1_About, ..., Lead),
   so tags in GTM can use them. Don't add a Meta Pixel tag in GTM: it is already here, with server-side deduplication.
   Every browser event carries an event_id; the server sends the same id so Meta counts it once. */
(function () {
  'use strict';
  var PIXEL_ID = '1320302420180623';
  var GTM_ID = 'GTM-MR4N337L';
  // Google Ads: tag + Sign-up conversion, fired in code on a new sign-up (same moment as Meta's Lead).
  var ADS_ID = 'AW-18588647321';
  var ADS_SIGNUP = ADS_ID + '/xGGECKyq-LwdEJn_4J9F';
  // v2 since Google Tag Manager was added (22 Nov 2026): earlier choices only covered Meta, so everyone is asked again.
  var KEY = 'fitme-consent-v2';
  var TXT = {
    en: {
      text: 'FitMe is free. Meta and Google cookies show us which ads bring people here, which helps keep it that way. They load only if you accept, and you can change your mind anytime.',
      accept: 'Accept', decline: 'Decline', settings: 'Cookie settings', label: 'Cookie consent', privacy: 'Privacy policy'
    },
    pt: {
      text: 'O FitMe é grátis. Os cookies da Meta e da Google mostram-nos que anúncios trazem pessoas até aqui, o que nos ajuda a mantê-lo assim. Só são carregados se aceitares, e podes mudar de ideias a qualquer momento.',
      accept: 'Aceitar', decline: 'Recusar', settings: 'Definições de cookies', label: 'Consentimento de cookies', privacy: 'Política de privacidade'
    },
    br: {
      text: 'O FitMe é grátis. Os cookies da Meta e do Google mostram quais anúncios trazem pessoas até aqui, o que ajuda a manter o site assim. Eles só são carregados se você aceitar, e você pode mudar de ideia quando quiser.',
      accept: 'Aceitar', decline: 'Recusar', settings: 'Configurações de cookies', label: 'Consentimento de cookies', privacy: 'Política de privacidade'
    }
  };

  function privacyHref() { var l = lang(); return l === 'en' ? '/privacy.html' : '/' + l + '/privacy.html'; }
  function lang() { var h = (document.documentElement.lang || 'en').toLowerCase(); return h === 'pt-br' ? 'br' : h.slice(0, 2) === 'pt' ? 'pt' : 'en'; }
  function getConsent() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setConsent(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function granted() { return getConsent() === 'granted'; }
  function undecided() { var c = getConsent(); return c !== 'granted' && c !== 'denied'; }

  // Anonymous count of consent choices per country (no id, no cookie): shown / granted / denied, and where it was given.
  function ping(c, via) {
    try { fetch('/api/cc', { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ c: c, via: via || 'banner' }) }).catch(function () {}); } catch (e) {}
  }

  function newId() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'e' + Date.now().toString(36) + Math.random().toString(36).slice(2, 12);
  }
  function readCookie(name) {
    var m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : '';
  }
  function writeCookie(name, value, days) {
    var exp = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + exp + '; path=/; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : '');
  }
  function clearCookie(name) { document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'; }

  // First-party _fbp/_fbc in Meta's own format, so browser and server events share the same browser id.
  // fbevents.js reuses these cookies instead of making new ones.
  function ensureIds() {
    var fbp = readCookie('_fbp');
    if (!fbp) { fbp = 'fb.1.' + Date.now() + '.' + Math.floor(Math.random() * 2147483647); writeCookie('_fbp', fbp, 90); }
    var fbclid = new URLSearchParams(location.search).get('fbclid');
    var fbc = readCookie('_fbc');
    if (fbclid && (!fbc || fbc.split('.').slice(3).join('.') !== fbclid)) { fbc = 'fb.1.' + Date.now() + '.' + fbclid; writeCookie('_fbc', fbc, 90); }
    return { fbp: fbp, fbc: fbc };
  }

  // Google Tag Manager (only after consent). Consent Mode is set to granted because nothing loads before the visitor accepts.
  var gtmLoaded = false;
  function gtag() { window.dataLayer.push(arguments); }
  function loadGTM() {
    if (gtmLoaded) return; gtmLoaded = true;
    window.dataLayer = window.dataLayer || [];
    gtag('consent', 'default', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' });
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js', fitme_lang: lang() });
    var t = document.createElement('script'); t.async = true; t.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    document.head.appendChild(t);
    // Google Ads tag (links ad clicks to sign-ups via the _gcl_au cookie).
    var a = document.createElement('script'); a.async = true; a.src = 'https://www.googletagmanager.com/gtag/js?id=' + ADS_ID;
    document.head.appendChild(a);
    gtag('js', new Date());
    gtag('config', ADS_ID);
  }
  function dl(obj) { if (gtmLoaded) window.dataLayer.push(obj); }
  // Google's cookies are set on the whole domain (.fitmeplan.com), so clear them there too.
  function clearGoogleCookies() {
    document.cookie.split(';').forEach(function (c) {
      var n = c.split('=')[0].trim();
      if (/^(_ga|_ga_.*|_gid|_gcl_.*)$/.test(n)) {
        clearCookie(n);
        document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.' + location.hostname.replace(/^www\./, '');
      }
    });
  }

  var loaded = false;
  function loadPixel() {
    loadGTM();
    if (loaded) return; loaded = true;
    /* Meta Pixel base code */
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    // Steps change the URL hash; without this the Pixel sends its own PageView on every step (no event_id, no server copy).
    window.fbq.disablePushState = true;
    window.fbq('consent', 'grant');
    window.fbq('init', PIXEL_ID);
  }

  var STANDARD = { PageView: 1, ViewContent: 1, Lead: 1, CompleteRegistration: 1 };
  // Browser event + matching server event with the same id.
  function track(name, custom) {
    if (!granted()) return null;
    loadPixel();
    var ids = ensureIds();
    var id = newId();
    window.fbq(STANDARD[name] ? 'track' : 'trackCustom', name, custom || {}, { eventID: id });
    var d = { event: name, event_id: id }; for (var k in (custom || {})) d['fitme_' + k] = custom[k]; dl(d);
    try {
      fetch('/api/track', {
        method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_name: name, event_id: id, event_source_url: location.href, fbp: ids.fbp, fbc: ids.fbc || '', custom_data: custom || {} })
      }).catch(function () {});
    } catch (e) {}
    return id;
  }

  // For the sign-up form: the server sends the Lead with the hashed email; the browser fires the same id on success.
  function leadContext() {
    if (!granted()) return null;
    loadPixel();
    var ids = ensureIds();
    return { event_id: newId(), fbp: ids.fbp, fbc: ids.fbc || '', url: location.href };
  }
  function leadDone(ctx) {
    if (ctx && granted() && window.fbq) window.fbq('track', 'Lead', ctx.placement ? { content_category: ctx.placement } : {}, { eventID: ctx.event_id });
    if (ctx && granted()) {
      dl({ event: 'Lead', event_id: ctx.event_id, fitme_content_category: ctx.placement || '' });
      // Google Ads Sign-up conversion; transaction_id stops it counting twice.
      if (gtmLoaded) gtag('event', 'conversion', { send_to: ADS_SIGNUP, value: 1.0, currency: 'USD', transaction_id: ctx.event_id });
    }
  }

  // Once per browser session (survives reloads and going back and forth between steps).
  function trackOnce(name, custom) {
    var k = 'fitme-ev-' + name;
    try { if (sessionStorage.getItem(k)) return; } catch (e) {}
    if (track(name, custom)) { try { sessionStorage.setItem(k, '1'); } catch (e) {} }
  }

  // ---------- Banner ----------
  var css = '' +
    '.cc-bar{position:fixed;left:12px;right:12px;bottom:12px;z-index:50;max-width:640px;margin:0 auto;background:var(--surface,#fbfaf7);color:var(--ink,#1e1c1a);border:1px solid var(--line,#ddd8cf);border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,.14);padding:14px 16px;display:flex;gap:14px;align-items:center;flex-wrap:wrap;font-size:13.5px;line-height:1.45}' +
    '.cc-bar p{margin:0;flex:1 1 300px}.cc-bar a{color:var(--accent,#2e6b4f)}' +
    '.cc-btns{display:flex;gap:8px;flex:0 0 auto}' +
    '.cc-btns button{font:inherit;font-weight:600;border-radius:999px;padding:8px 16px;cursor:pointer;border:1px solid var(--accent,#2e6b4f)}' +
    '.cc-yes{background:var(--accent,#2e6b4f);color:var(--accent-ink,#fff)}' +
    '.cc-no{background:transparent;color:var(--accent,#2e6b4f)}' +
    '.cc-btns button:focus-visible{outline:2px solid var(--accent,#2e6b4f);outline-offset:2px}' +
    '.cc-link{background:none;border:0;padding:0;font:inherit;font-size:12.5px;color:var(--muted,#6b655e);text-decoration:underline;cursor:pointer}';
  var bar = null, links = [], plinks = [];

  function relabel() {
    var t = TXT[lang()];
    if (bar) {
      bar.setAttribute('aria-label', t.label);
      var p = bar.querySelector('p'); p.textContent = t.text + ' ';
      var a = document.createElement('a'); a.href = privacyHref(); a.textContent = t.privacy; p.appendChild(a);
      bar.querySelector('.cc-yes').textContent = t.accept;
      bar.querySelector('.cc-no').textContent = t.decline;
    }
    links.forEach(function (l) { l.textContent = t.settings; });
    plinks.forEach(function (l) { l.textContent = t.privacy; l.href = privacyHref(); });
    document.querySelectorAll('a.privacy-link').forEach(function (l) { l.href = privacyHref(); });
  }
  function showBar() {
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'cc-bar'; bar.setAttribute('role', 'region');
      bar.innerHTML = '<p></p><div class="cc-btns"><button type="button" class="cc-no"></button><button type="button" class="cc-yes"></button></div>';
      bar.querySelector('.cc-yes').addEventListener('click', function () { choose('granted'); });
      bar.querySelector('.cc-no').addEventListener('click', function () { choose('denied'); });
      document.body.appendChild(bar);
    }
    relabel(); bar.hidden = false; padForBar();
  }
  // Leave room at the bottom of the page so the bar never covers the last button (e.g. "Next").
  function padForBar() { document.body.style.paddingBottom = bar && !bar.hidden ? (bar.offsetHeight + 24) + 'px' : ''; }
  window.addEventListener('resize', function () { if (bar && !bar.hidden) padForBar(); });
  function hideBar() { if (bar) bar.hidden = true; padForBar(); }

  function choose(v, via) {
    var was = getConsent();
    setConsent(v); hideBar();
    if (v !== was) ping(v, via);
    try { window.dispatchEvent(new CustomEvent('fitme-consent', { detail: v })); } catch (e) {}
    if (v === 'granted' && was !== 'granted') { track('PageView'); if (startHook) startHook(); }
    if (v === 'denied' && was === 'granted') {
      if (window.fbq) window.fbq('consent', 'revoke');
      if (gtmLoaded) gtag('consent', 'update', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });
      clearCookie('_fbp'); clearCookie('_fbc'); clearGoogleCookies();
    }
  }

  var startHook = null;
  function init(opts) {
    startHook = opts && opts.onGranted;
    var s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
    // "Cookie settings" link at the end of every footer note, to reopen the choice.
    document.querySelectorAll('.foot').forEach(function (p) {
      var l = document.createElement('button'); l.type = 'button'; l.className = 'cc-link';
      l.addEventListener('click', showBar);
      var pl = document.createElement('a'); pl.className = 'cc-link';
      p.appendChild(document.createTextNode(' ')); p.appendChild(pl); plinks.push(pl);
      p.appendChild(document.createTextNode(' · ')); p.appendChild(l); links.push(l);
    });
    relabel();
    var c = getConsent();
    if (c === 'granted') track('PageView');
    else if (c !== 'denied') { showBar(); ping('shown'); }
    // Follow in-place language switches.
    new MutationObserver(relabel).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  // Optional box on the sign-up form, shown only to visitors who haven't answered the banner. Ticking it is the same
  // choice as "Accept" on the banner (never asked again of someone who declined).
  function grantFromForm() { if (undecided()) choose('granted', 'form'); }

  window.FITME_TRACK = { init: init, track: track, trackOnce: trackOnce, leadContext: leadContext, leadDone: leadDone, granted: granted, undecided: undecided, grantFromForm: grantFromForm, showSettings: showBar };
})();
