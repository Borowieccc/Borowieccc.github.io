// Play looping clips only while they are on screen.
(function () {
  var clips = document.querySelectorAll('video[data-loop]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { var p = e.target.play(); if (p && p.catch) p.catch(function () {}); }
        else e.target.pause();
      });
    }, { rootMargin: '100px' });
    clips.forEach(function (v) { io.observe(v); });
  } else {
    clips.forEach(function (v) { v.autoplay = true; v.play(); });
  }

  // Simple lightbox for screenshots.
  var box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-label', 'Screenshot');
  var img = document.createElement('img');
  box.appendChild(img);
  document.body.appendChild(box);
  function close() { box.classList.remove('open'); img.removeAttribute('src'); }
  box.addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  document.querySelectorAll('.shots a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      img.src = a.getAttribute('href');
      img.alt = (a.querySelector('img') || {}).alt || '';
      box.classList.add('open');
    });
  });
})();
