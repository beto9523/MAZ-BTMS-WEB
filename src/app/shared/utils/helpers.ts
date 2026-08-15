export function correctHeight() {
  var pageWrapper = document.getElementById('page-wrapper');
  var navbar = document.querySelector('nav.navbar-default');
  var navbarHeight = navbar ? navbar.clientHeight : 0;
  var wrapperHeight = pageWrapper ? pageWrapper.clientHeight : 0;
  var body = document.body;

  if (navbarHeight > wrapperHeight && pageWrapper != null) {
    pageWrapper.style.minHeight = navbarHeight + 'px';
  }

  if (navbarHeight < wrapperHeight && pageWrapper != null ) {
    var newMinHeight = Math.max(navbarHeight, window.innerHeight) + 'px';
    pageWrapper.style.minHeight = newMinHeight;
  }

  if (body.classList.contains('fixed-nav') && pageWrapper != null) {
    var minHeight = Math.max(navbarHeight, window.innerHeight - 60) + 'px';
    pageWrapper.style.minHeight = minHeight;
  }
}

export function detectBody() {
  var body = document.body;
  body.classList.toggle('body-small', window.innerWidth < 769);
}

export function smoothlyMenu() {
  var body = document.body;
  var sideMenu = document.getElementById('side-menu');
  if(sideMenu == null) return;

  if ((!body.classList.contains('mini-navbar') || body.classList.contains('body-small'))) {
    // Hide menu in order to smoothly turn on when maximize menu
    sideMenu.style.display = 'none';
    // For smoothly turn on menu
    setTimeout(function () {
      if(sideMenu == null) return;
      sideMenu.style.display = 'block';
    }, 200);
  } else if (body.classList.contains('fixed-sidebar')) {
    sideMenu.style.display = 'none';
    setTimeout(function () {
      if(sideMenu == null) return;
      sideMenu.style.display = 'block';
    }, 100);
  } else {
    // Remove all inline style to reset menu state
    sideMenu.removeAttribute('style');
  }
}

// Llamada a las funciones después de que el DOM esté completamente cargado
