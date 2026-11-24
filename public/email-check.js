// Email typo check, shared by the sign-up form (browser) and /api/subscribe (server).
// suggest(email) returns a corrected address when the one typed looks like a typo, or null when it looks fine.
// It only suggests: the visitor can always keep what they typed.
(function () {
  // Providers most FitMe visitors use (UK, Portugal, Brazil). Exact matches are never flagged.
  var DOMAINS = [
    'gmail.com', 'googlemail.com', 'hotmail.com', 'hotmail.com.br', 'hotmail.co.uk', 'hotmail.pt', 'outlook.com', 'outlook.pt', 'outlook.com.br',
    'live.com', 'live.com.br', 'live.co.uk', 'live.com.pt', 'msn.com', 'yahoo.com', 'yahoo.com.br', 'yahoo.co.uk', 'ymail.com', 'icloud.com', 'me.com', 'mac.com',
    'aol.com', 'gmx.com', 'proton.me', 'protonmail.com', 'sapo.pt', 'mail.pt', 'clix.pt', 'netcabo.pt', 'iol.pt',
    'uol.com.br', 'bol.com.br', 'terra.com.br', 'ig.com.br', 'globo.com', 'globomail.com', 'r7.com',
    'btinternet.com', 'sky.com', 'virginmedia.com', 'talktalk.net', 'outlook.co.uk', 'icloud.com.br'
  ];
  var KNOWN = {}; DOMAINS.forEach(function (d) { KNOWN[d] = true; });
  // Popular providers a missing-@ address is matched against (longest first so hotmail.com.br wins over hotmail.com).
  var POPULAR = ['hotmail.com.br', 'yahoo.com.br', 'outlook.com.br', 'live.com.br', 'gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'icloud.com', 'live.com', 'sapo.pt', 'uol.com.br', 'bol.com.br'];

  // Edit distance with swapped neighbours counted as one edit (gmial -> gmail).
  function osa(a, b) {
    var d = [], i, j;
    for (i = 0; i <= a.length; i++) { d[i] = [i]; }
    for (j = 0; j <= b.length; j++) d[0][j] = j;
    for (i = 1; i <= a.length; i++) for (j = 1; j <= b.length; j++) {
      var c = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + c);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
    return d[a.length][b.length];
  }

  // Common slips at the end of the address: .comi .coml .comm .con .cmo .ocm .vom .xom .co,m and the same before .br/.pt/.uk
  function fixTld(domain) {
    return domain
      .replace(/\.(?:c[o0]m[a-z]{1,2}|con|cmo|ocm|cpm|vom|xom|cim|clm|comn|c0m)(?=$|\.(?:br|pt|uk)$)/, '.com')
      .replace(/\.com\.(?:b|brr|bt|be?r|vr|nr)$/, function (m) { return m === '.com.be' ? m : '.com.br'; })
      .replace(/\.(?:ppt|ptt|ot)$/, '.pt');
  }

  function closest(domain) {
    if (KNOWN[domain]) return null;
    var best = null, bestD = 99;
    for (var i = 0; i < DOMAINS.length; i++) {
      var d = osa(domain, DOMAINS[i]);
      // Two edits only for longer domains of about the same length, so real company domains (acme.com) aren't "corrected" to me.com.
      var ok = d <= 1 || (d === 2 && domain.length >= 8 && Math.abs(domain.length - DOMAINS[i].length) <= 1);
      if (ok && d < bestD) { bestD = d; best = DOMAINS[i]; }
    }
    return best;
  }

  function suggest(raw) {
    if (typeof raw !== 'string') return null;
    var email = raw.trim().toLowerCase();
    if (!email) return null;
    var fixed = email.replace(/\s+/g, '').replace(/,/g, '.').replace(/\.+$/, '').replace(/\.{2,}/g, '.').replace(/@{2,}/g, '@');

    // Missing @: "maria.gmail.com" or "mariagmail.com" -> "maria@gmail.com".
    if (fixed.indexOf('@') < 0) {
      for (var i = 0; i < POPULAR.length; i++) {
        var p = POPULAR[i];
        if (fixed.length > p.length && fixed.slice(-p.length) === p) {
          var local = fixed.slice(0, -p.length).replace(/\.$/, '');
          if (local) { fixed = local + '@' + p; break; }
        }
      }
      if (fixed.indexOf('@') < 0) return null; // nothing to suggest; the normal "enter a valid email" message covers it
    }

    var at = fixed.lastIndexOf('@');
    var localPart = fixed.slice(0, at), domain = fixed.slice(at + 1);
    if (!localPart || !domain) return null;
    domain = fixTld(domain);
    var near = closest(domain);
    if (near) domain = near;
    var out = localPart + '@' + domain;
    return out !== email ? out : null;
  }

  var api = { suggest: suggest, DOMAINS: DOMAINS };
  if (typeof globalThis !== 'undefined') globalThis.FITME_EMAIL_CHECK = api;
})();
