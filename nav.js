document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('nav');
  var navOverlay = document.querySelector('.nav-overlay');

  if (navToggle && nav && navOverlay) {
    function toggleNav() {
      navToggle.classList.toggle('active');
      nav.classList.toggle('active');
      navOverlay.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    }
    navToggle.addEventListener('click', toggleNav);
    navOverlay.addEventListener('click', toggleNav);
  }

  var dropdownToggle = document.querySelector('.nav-dropdown-toggle');
  var navDropdown = document.querySelector('.nav-dropdown');

  if (dropdownToggle && navDropdown) {
    dropdownToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      navDropdown.classList.toggle('open');
    });

    document.addEventListener('click', function (e) {
      if (!navDropdown.contains(e.target)) {
        navDropdown.classList.remove('open');
      }
    });
  }
});
