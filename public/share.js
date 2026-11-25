// Share bar on recipe pages (built by scripts/build-recipes.mjs). No third-party scripts: plain share links,
// the phone's share sheet where available (covers Instagram), and copy-to-clipboard.
(function () {
  var box = document.querySelector('.share');
  if (!box) return;
  var base = box.dataset.url, text = box.dataset.text, img = box.dataset.img;
  var toast = box.querySelector('.sh-toast'), timer;
  function link(ch) { return base + (base.indexOf('?') < 0 ? '?' : '&') + 'utm_source=' + ch + '&utm_medium=share&utm_campaign=recipe'; }
  function say(msg) { toast.textContent = msg; toast.hidden = false; clearTimeout(timer); timer = setTimeout(function () { toast.hidden = true; }, 4000); }
  function copy(ch, msg) {
    var u = link(ch);
    var done = function () { say(msg); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(u).then(done, function () { window.prompt('', u); });
    else window.prompt('', u);
  }
  function open(u) { window.open(u, '_blank', 'noopener,noreferrer,width=640,height=640'); }
  var canNative = !!navigator.share;
  if (canNative) box.querySelector('.sh-native').hidden = false;
  box.addEventListener('click', function (e) {
    var b = e.target.closest('.sh'); if (!b) return;
    var ch = b.dataset.ch, enc = encodeURIComponent;
    if (window.FITME_TRACK) FITME_TRACK.track('Share', { method: ch, content_name: box.dataset.recipe });
    if (ch === 'native' || (ch === 'instagram' && canNative)) {
      navigator.share({ title: document.title, text: text, url: link(ch) }).catch(function () {});
    } else if (ch === 'instagram') copy('instagram', box.dataset.ig);
    else if (ch === 'copy') copy('copy', box.dataset.copied);
    else if (ch === 'whatsapp') open('https://wa.me/?text=' + enc(text + ' ' + link(ch)));
    else if (ch === 'facebook') open('https://www.facebook.com/sharer/sharer.php?u=' + enc(link(ch)));
    else if (ch === 'pinterest') open('https://pinterest.com/pin/create/button/?url=' + enc(link(ch)) + '&media=' + enc(img) + '&description=' + enc(text));
    else if (ch === 'x') open('https://twitter.com/intent/tweet?text=' + enc(text) + '&url=' + enc(link(ch)));
    else if (ch === 'telegram') open('https://t.me/share/url?url=' + enc(link(ch)) + '&text=' + enc(text));
    else if (ch === 'email') location.href = 'mailto:?subject=' + enc(document.title) + '&body=' + enc(text + '\n\n' + link(ch));
  });
})();
