// Turkish for Turkish browsers, English for everyone else; the toggle remembers the choice.
(function () {
  var saved = null;
  try { saved = localStorage.getItem('ondue-lang'); } catch (e) {}
  var param = new URLSearchParams(location.search).get('lang');
  var lang = param || saved || ((navigator.language || 'en').toLowerCase().indexOf('tr') === 0 ? 'tr' : 'en');
  if (lang !== 'tr' && lang !== 'en') lang = 'en';

  function apply(l) {
    document.documentElement.setAttribute('data-lang', l);
    document.documentElement.setAttribute('lang', l);
    var title = document.querySelector('meta[name="title-' + l + '"]');
    if (title) document.title = title.content;
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === l));
    });
  }
  apply(lang);
  document.addEventListener('DOMContentLoaded', function () {
    apply(lang);
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.addEventListener('click', function () {
        lang = b.dataset.lang;
        try { localStorage.setItem('ondue-lang', lang); } catch (e) {}
        apply(lang);
      });
    });
  });
})();
