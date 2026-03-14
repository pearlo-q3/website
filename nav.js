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
    navOverlay.addEventListener('click', function () {
      document.querySelectorAll('.nav-dropdown').forEach(function (d) {
        d.classList.remove('open');
      });
      toggleNav();
    });
  }

  var dropdowns = document.querySelectorAll('.nav-dropdown');

  dropdowns.forEach(function (navDropdown) {
    var dropdownToggle = navDropdown.querySelector('.nav-dropdown-toggle');
    if (dropdownToggle) {
      dropdownToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = navDropdown.classList.contains('open');
        dropdowns.forEach(function (d) { d.classList.remove('open'); });
        if (!isOpen) {
          navDropdown.classList.add('open');
        }
      });
    }
  });

  document.addEventListener('click', function () {
    dropdowns.forEach(function (d) { d.classList.remove('open'); });
  });
});
