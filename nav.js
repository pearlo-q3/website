document.addEventListener('DOMContentLoaded', function () {
  var dropdownToggle = document.querySelector('.nav-dropdown-toggle');
  var navDropdown = document.querySelector('.nav-dropdown');

  if (dropdownToggle && navDropdown) {
    dropdownToggle.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        e.stopPropagation();
        navDropdown.classList.toggle('open');
      }
    });

    document.addEventListener('click', function (e) {
      if (!navDropdown.contains(e.target)) {
        navDropdown.classList.remove('open');
      }
    });
  }
});
