function mobileScreen() {
  const mobileSize = 1280;
  let mobileState = true;

  let windowSize = parseInt($(window).width());

  if (windowSize >= mobileSize) {
    mobileState = false;
  } else {
    mobileState = true;
  }

  return mobileState;
}

function mainMenuController() {

  const pageBody = $('body');

  const btMobileMenu = $('#bt-mobile-menu');
  const btMobileSearch = $('#bt-mobile-search');
  const btMobileSearchBack = $('#bt-mobile-search-back');
  const btMobileCheckout = $('#bt-mobile-checkout');
  const btMobileCheckoutClose = $('#bt-mobile-checkout-close');

  const mainMenu = $('#main-menu');
  const mainMenuGlobalList = $('.menu-list');
  const mainMenuSubmenus = mainMenuGlobalList.find('.submenu');
  const mainMenuSubmenusLinks = mainMenuSubmenus.find('a');
  const mainMenuSubmenusLists = mainMenuSubmenus.find('.submenu-list');

  const globalBarrier = $('.global-barrier');

  const openedMenuClass = 'mobile-menu-active';
  const openedSearchClass = 'mobile-search-active';
  const openedCheckoutClass = 'mobile-sneak-checkout-active';
  const submenuOverCLass = 'submenu-active';
  const submenuActiveCLass = 'active';

  const btSubmenuCode = '<li class="bt-submenu-back"><a href="#back" target="">Voltar</a></li>';

  let submenuLevel = 0;

  function bindMenuClose() {
    $(document).on('keydown.mainmenu', function(e) {
      if (e.which == 27) {
        closeMenu();
        e.preventDefault();
      }
    });

    globalBarrier.on('click.mainmenu', function(e) {
      closeMenu();
    });
  }

  function bindSearchClose() {
    $(document).on('keydown.mainmenu', function(e) {
      if (e.which == 27) {
        closeSearch();
        e.preventDefault();
      }
    });

    globalBarrier.on('click.mainmenu', function(e) {
      closeSearch();
    });
  }

  function bindCheckoutClose() {
    $(document).on('keydown.mainmenu', function(e) {
      if (e.which == 27) {
        closeCheckout();
        e.preventDefault();
      }
    });

    globalBarrier.on('click.mainmenu', function(e) {
      closeCheckout();
    });
  }

  function unbindClose() {
    $(document).off('keydown.mainmenu');
    globalBarrier.off('click.mainmenu');
  }

  function openMenu() {
    bindMenuClose();
    pageBody.addClass(openedMenuClass);
  }

  function closeMenu() {
    pageBody.removeClass(openedMenuClass);
    unbindClose();
  }

  function openSearch() {
    bindSearchClose();
    pageBody.addClass(openedSearchClass);
  }

  function closeSearch() {
    pageBody.removeClass(openedSearchClass);
    unbindClose();
  }

  function openCheckout() {
    bindCheckoutClose();
    pageBody.addClass(openedCheckoutClass);
  }

  function closeCheckout() {
    pageBody.removeClass(openedCheckoutClass);
    unbindClose();
  }

  $(window).on('resize.mainmenu', function () {
    if (!mobileScreen()) {
      if (pageBody.hasClass(openedMenuClass)) {
        closeMenu();
      }
      if (pageBody.hasClass(openedSearchClass)) {
        closeSearch();
      }
      if (pageBody.hasClass(btMobileCheckout)) {
        closeCheckout();
      }
      mainMenuGlobalList.find('.submenu-list.' + submenuActiveCLass).removeClass(submenuActiveCLass);
      mainMenu.removeClass(submenuOverCLass);
      submenuLevel = 0;
    }
  });

  btMobileMenu.on('click.mainmenu', function(e) {
    if (pageBody.hasClass(openedSearchClass)) {
      closeSearch();
    }
    if (pageBody.hasClass(btMobileCheckout)) {
      closeCheckout();
    }
    if (pageBody.hasClass(openedMenuClass)) {
      closeMenu();
    } else {
      openMenu();
    }
    e.stopPropagation();
  });

  btMobileSearch.on('click.mainmenu', function(e) {
    if (pageBody.hasClass(openedMenuClass)) {
      closeMenu();
    }
    if (pageBody.hasClass(btMobileCheckout)) {
      closeCheckout();
    }
    if (pageBody.hasClass(openedSearchClass)) {
      closeSearch();
    } else {
      openSearch();
    }
    e.stopPropagation();
  });

  btMobileSearchBack.on('click.mainmenu', function(e) {
    closeSearch();
  });

  btMobileCheckout.on('click.mainmenu', function(e) {
    if (pageBody.hasClass(openedMenuClass)) {
      closeMenu();
    }
    if (pageBody.hasClass(openedSearchClass)) {
      closeSearch();
    }
    if (pageBody.hasClass(btMobileCheckout)) {
      closeCheckout();
    } else {
      openCheckout();
    }
    e.stopPropagation();
  });

  btMobileCheckoutClose.on('click.mainmenu', function(e) {
    closeCheckout();
    e.stopPropagation();
  });

  function calcRight() {
    const itens = mainMenuGlobalList.find('>li');
    let nItens = itens.length;
    let halfItens = nItens / 2;

    itens.each(function () {
      let element = $(this);
      if (element.index() > halfItens && element.hasClass('submenu')) {
        element.addClass('right');
      }
    });
  }

  calcRight();

  mainMenuSubmenusLists.each(function () {
    let element = $(this);
    element.prepend(btSubmenuCode);
  });

  mainMenuSubmenusLinks.on('click.mainmenu', function(e) {

    console.log('clicked');

    let parent = $(this).parent();
    let list = parent.find('>.submenu-list');

    if (mobileScreen()) {
      list.addClass(submenuActiveCLass);
      mainMenu.scrollTop(0).addClass(submenuOverCLass);
      submenuLevel++;
      if (parent.hasClass('submenu')) {
        e.preventDefault();
      }
    }
  });

  mainMenuGlobalList.on('click.mainmenu', '.bt-submenu-back', function () {
    $(this).parent().removeClass(submenuActiveCLass);
    submenuLevel--;
    if (submenuLevel < 1) {
      mainMenu.removeClass(submenuOverCLass);
    }
  });
}

function switchTypeClientRegisterSell() {
  const tipoPessoaFisica = document.querySelector('.tipoPessoaFisica');
  const tipoPessoaJuridica = document.querySelector('.tipoPessoaJuridica');
  const tipoPessoaEstrangeira = document.querySelector('.tipoPessoaEstrangeira');
  const pessoaFisica = document.querySelector('.pessoaFisica');
  const pessoaJuridica = document.querySelector('.pessoaJuridica');
  const pessoaEstrangeira = document.querySelector('.pessoaEstrangeira');

  tipoPessoaFisica.addEventListener('click', function() {
    pessoaFisica.classList.toggle('is-visible');
  });

  tipoPessoaJuridica.addEventListener('click', function() {
    pessoaJuridica.classList.toggle('is-visible');
  });

  tipoPessoaEstrangeira.addEventListener('click', function() {
    pessoaEstrangeira.classList.toggle('is-visible');
  });
}

switchTypeClientRegisterSell();
