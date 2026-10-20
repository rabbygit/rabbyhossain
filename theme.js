// Theme: loaded in <head> without defer, so it runs before the page paints
// and there is no flash of the wrong theme.
(function () {
  var root = document.documentElement;
  var system = matchMedia('(prefers-color-scheme: light)');
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) { }

  // Tells the CSS that JavaScript is running (used by the scroll fade-in)
  root.classList.add('js');

  function apply(theme) {
    root.dataset.theme = theme;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'light' ? '#f7f7f8' : '#0b0d12';
  }

  // Use the saved choice, otherwise follow the system setting
  apply(saved || (system.matches ? 'light' : 'dark'));
  system.addEventListener('change', function (e) {
    if (!saved) apply(e.matches ? 'light' : 'dark');
  });

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', function () {
      saved = root.dataset.theme === 'light' ? 'dark' : 'light';
      apply(saved);
      try { localStorage.setItem('theme', saved); } catch (e) { }
    });
  });
})();
