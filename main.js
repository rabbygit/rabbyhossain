// Fade elements in as they scroll into view
(function () {
  var items = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  // Stagger project cards so each row ripples in left to right
  document.querySelectorAll('.projects-grid .reveal').forEach(function (el, i) {
    el.style.transitionDelay = (i % 3) * 80 + 'ms';
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -10% 0px' });

  items.forEach(function (el) { observer.observe(el); });
})();

// Highlight the nav link for the section in the middle of the screen
(function () {
  var links = document.querySelectorAll('.nav-list a');
  if (!('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (link) {
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  links.forEach(function (link) {
    var section = document.querySelector(link.getAttribute('href'));
    if (section) observer.observe(section);
  });
})();
