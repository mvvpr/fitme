// Share bar on recipe pages (built by scripts/build-recipes.mjs). No third-party scripts: plain share links,
// the phone's share sheet, and copy-to-clipboard.
// Instagram has no web share link. On phones it opens the share sheet with the recipe photo (so Instagram offers
// Stories, Feed and Direct); on computers it copies the link and offers to open Instagram.
(function () {
  var box = document.querySelector('.share');
  if (!box) return;
  var base = box.dataset.url, text = box.dataset.text, img = box.dataset.img;
  var toast = box.querySelector('.sh-toast'), timer;
  var mobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.userAgent));
  var canNative = !!navigator.share && mobile; // desktop share menus (macOS, Windows) don't include Instagram or WhatsApp
  function link(ch) { return base + (base.indexOf('?') < 0 ? '?' : '&') + 'utm_source=' + ch + '&utm_medium=share&utm_campaign=recipe'; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function show(html, keep) {
    toast.innerHTML = html; toast.hidden = false; clearTimeout(timer);
    if (!keep) timer = setTimeout(function () { toast.hidden = true; }, 6000);
  }

  // Copy with the Clipboard API, then the older execCommand way; if both are blocked (some in-app browsers),
  // show the link in a box that's already selected so people can copy it themselves.
  function legacyCopy(u) {
    var ta = document.createElement('textarea');
    ta.value = u; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
    document.body.appendChild(ta); ta.select();
    var ok = false; try { ok = document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta); return ok;
  }
  function copy(ch, msgHtml) {
    var u = link(ch);
    var fallback = function () {
      if (legacyCopy(u)) return show(msgHtml);
      show('<span>' + esc(box.dataset.manual) + '</span><input class="sh-url" type="text" readonly value="' + esc(u) + '">', true);
      var inp = toast.querySelector('.sh-url'); inp.focus(); inp.select();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(u).then(function () { show(msgHtml); }, fallback);
    else fallback();
  }
  function open(u) { var w = window.open(u, '_blank', 'noopener,noreferrer,width=640,height=640'); if (!w) location.href = u; }

  // On phones, get the photo ready as a JPEG up front (the share must start right on the tap).
  var photo = null;
  if (canNative && navigator.canShare && window.fetch) {
    fetch(img).then(function (r) { return r.blob(); }).then(function (b) { return createImageBitmap(b); }).then(function (bmp) {
      var c = document.createElement('canvas'); c.width = bmp.width; c.height = bmp.height;
      c.getContext('2d').drawImage(bmp, 0, 0);
      c.toBlob(function (jpg) {
        if (!jpg) return;
        var f = new File([jpg], 'fitme-recipe.jpg', { type: 'image/jpeg' });
        if (navigator.canShare({ files: [f] })) photo = f;
      }, 'image/jpeg', 0.9);
    }).catch(function () {});
  }

  if (canNative) box.querySelector('.sh-native').hidden = false;
  box.addEventListener('click', function (e) {
    var b = e.target.closest('.sh'); if (!b) return;
    var ch = b.dataset.ch, enc = encodeURIComponent;
    try { if (window.FITME_TRACK) FITME_TRACK.track('Share', { method: ch, content_name: box.dataset.recipe }); } catch (err) {}
    if (ch === 'native') {
      navigator.share({ title: document.title, text: text, url: link(ch) }).catch(function () {});
    } else if (ch === 'instagram') {
      if (canNative) {
        var data = photo ? { files: [photo], text: text + ' ' + link(ch) } : { title: document.title, text: text, url: link(ch) };
        navigator.share(data).catch(function (err) { if (err && err.name !== 'AbortError') copy('instagram', esc(box.dataset.ig)); });
      } else {
        copy('instagram', esc(box.dataset.ig) + ' <a href="https://www.instagram.com/" target="_blank" rel="noopener">' + esc(box.dataset.igOpen) + '</a>');
      }
    }
    else if (ch === 'copy') copy('copy', esc(box.dataset.copied));
    else if (ch === 'whatsapp') open('https://wa.me/?text=' + enc(text + ' ' + link(ch)));
    else if (ch === 'facebook') open('https://www.facebook.com/sharer/sharer.php?u=' + enc(link(ch)));
    else if (ch === 'pinterest') open('https://pinterest.com/pin/create/button/?url=' + enc(link(ch)) + '&media=' + enc(img) + '&description=' + enc(text));
    else if (ch === 'x') open('https://twitter.com/intent/tweet?text=' + enc(text) + '&url=' + enc(link(ch)));
    else if (ch === 'telegram') open('https://t.me/share/url?url=' + enc(link(ch)) + '&text=' + enc(text));
    else if (ch === 'email') location.href = 'mailto:?subject=' + enc(document.title) + '&body=' + enc(text + '\n\n' + link(ch));
  });
})();
