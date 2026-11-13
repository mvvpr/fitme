/* FitMe measurement: Meta Pixel (browser) + Conversions API relay (server), gated on cookie consent.
   Nothing from Meta loads, and no _fbp/_fbc cookies are set, until the visitor accepts.
   Every browser event carries an event_id; the server sends the same id so Meta counts it once. */
(function () {
  'use strict';
  var PIXEL_ID = '1320302420180623';
  var KEY = 'fitme-consent';
  var TXT = {
    en: {
      text: 'We use Meta cookies to measure how our ads perform. They load only if you accept, and you can change your mind anytime.',
      accept: 'Accept', decline: 'Decline', settings: 'Cookie settings', label: 'Cookie consent'
    },
    pt: {
      text: 'Usamos cookies da Meta para medir o desempenho dos nossos anúncios. Só são carregados se aceitares, e podes mudar de ideias a qualquer momento.',
      accept: 'Aceitar', decline: 'Recusar', settings: 'Definições de cookies', label: 'Consentimento de cookies'
    }
  };

  function lang() { return (document.documentElement.lang || 'en').slice(0, 2) === 'pt' ? 'pt' : 'en'; }
  function getConsent() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setConsent(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function granted() { return getConsent() === 'granted'; }

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

  var loaded = false;
  function loadPixel() {
    if (loaded) return; loaded = true;
    /* Meta Pixel base code */
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('consent', 'grant');
    window.fbq('init', PIXEL_ID);
  }

  // Browser event + matching server event with the same id.
  function track(name, custom) {
    if (!granted()) return null;
    loadPixel();
    var ids = ensureIds();
    var id = newId();
    window.fbq('track', name, custom || {}, { eventID: id });
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
  function leadDone(ctx) { if (ctx && granted() && window.fbq) window.fbq('track', 'Lead', {}, { eventID: ctx.event_id }); }

  var onceSent = {};
  function trackOnce(name, custom) { if (onceSent[name]) return; if (track(name, custom)) onceSent[name] = true; }

  // ---------- Banner ----------
  var css = '' +
    '.cc-bar{position:fixed;left:12px;right:12px;bottom:12px;z-index:50;max-width:640px;margin:0 auto;background:var(--surface,#fbfaf7);color:var(--ink,#1e1c1a);border:1px solid var(--line,#ddd8cf);border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,.14);padding:14px 16px;display:flex;gap:14px;align-items:center;flex-wrap:wrap;font-size:13.5px;line-height:1.45}' +
    '.cc-bar p{margin:0;flex:1 1 300px}' +
    '.cc-btns{display:flex;gap:8px;flex:0 0 auto}' +
    '.cc-btns button{font:inherit;font-weight:600;border-radius:999px;padding:8px 16px;cursor:pointer;border:1px solid var(--accent,#2e6b4f)}' +
    '.cc-yes{background:var(--accent,#2e6b4f);color:var(--accent-ink,#fff)}' +
    '.cc-no{background:transparent;color:var(--accent,#2e6b4f)}' +
    '.cc-btns button:focus-visible{outline:2px solid var(--accent,#2e6b4f);outline-offset:2px}' +
    '.cc-link{background:none;border:0;padding:0;font:inherit;font-size:12.5px;color:var(--muted,#6b655e);text-decoration:underline;cursor:pointer}';
  var bar = null, links = [];

  function relabel() {
    var t = TXT[lang()];
    if (bar) {
      bar.setAttribute('aria-label', t.label);
      bar.querySelector('p').textContent = t.text;
      bar.querySelector('.cc-yes').textContent = t.accept;
      bar.querySelector('.cc-no').textContent = t.decline;
    }
    links.forEach(function (l) { l.textContent = t.settings; });
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
    relabel(); bar.hidden = false;
  }
  function hideBar() { if (bar) bar.hidden = true; }

  function choose(v) {
    var was = getConsent();
    setConsent(v); hideBar();
    if (v === 'granted' && was !== 'granted') { track('PageView'); if (startHook) startHook(); }
    if (v === 'denied' && was === 'granted') {
      if (window.fbq) window.fbq('consent', 'revoke');
      clearCookie('_fbp'); clearCookie('_fbc');
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
      p.appendChild(document.createTextNode(' ')); p.appendChild(l); links.push(l);
    });
    relabel();
    var c = getConsent();
    if (c === 'granted') track('PageView');
    else if (c !== 'denied') showBar();
    // Follow in-place language switches.
    new MutationObserver(relabel).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  window.FITME_TRACK = { init: init, track: track, trackOnce: trackOnce, leadContext: leadContext, leadDone: leadDone, granted: granted, showSettings: showBar };
})();
