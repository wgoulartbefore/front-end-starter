const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
}

function mobileScreen() {
  let mobileSize = 1280;
  let mobileState = true;
  let windowSize = parseInt($(window).width());

  if (windowSize >= mobileSize) {
    mobileState = false;
  } else {
    mobileState = true
  }

  return mobileState;
}

function mainMenuController() {
  const pageBody = $('body');
  const globalBarrier = $('.global-barrier');
  const mainMenu = $('#main-menu');

  const mainMenuGlobalList = $('.menu-list');
  const mainMenuSubmenus = mainMenuGlobalList.find('.submenu');
  const mainMenuSubmenusLinks = mainMenuSubmenus.find('a');
  const mainMenuSubmenusLists = mainMenuSubmenus.find('.submenu-list');

  const btMobileMenu = $('#bt-mobile-menu');
  const openedMenuClass = 'mobile-menu-active';
  const submenuOverCLass = 'submenu-active';
  const submenuActiveCLass = 'active';
  const btSubmenuCode = '<li class="bt-submenu-back"><a href="#back" target="">Voltar</a></li>';

  let submenuLevel = 0;

  function bindMenuClose() {
    $(document).on('keydown.mainmenu', function (e) {
      if (e.which == 27) {
        closeMenu();
        e.preventDefault();
      }
    });

    globalBarrier.on('click.mainmenu', function (e) {
      closeMenu();
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

  $(window).on('resize.mainmenu', function () {
    if (!mobileScreen()) {
      mainMenuGlobalList.find('.submenu-list.' + submenuActiveCLass).removeClass(submenuActiveCLass);
      mainMenu.removeClass(submenuOverCLass);
      submenuLevel = 0;
    }
  });

  btMobileMenu.on('click.mainmenu', function (e) {
    if (pageBody.hasClass(openedMenuClass)) {
      closeMenu();
    } else {
      openMenu();
    }
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

  mainMenuSubmenusLinks.on('click.mainmenu', function (e) {
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
  const fieldsetsItems = document.querySelectorAll('.form-register > fieldset');

  function isVisible(element) {
    element.classList.add('is-visible');
  }

  function hiddenElements() {
    $('.form-register > fieldset').each(function () {
      this.classList.remove("is-visible");
    });
  }

  // tipoPessoaFisica.addEventListener('click', function () {
  //   hiddenElements();
  //   isVisible(pessoaFisica);
  // });

  // tipoPessoaJuridica.addEventListener('click', function () {
  //   hiddenElements();
  //   isVisible(pessoaJuridica);
  //   // pessoaJuridica.classList.add('is-visible');
  // });

  // tipoPessoaEstrangeira.addEventListener('click', function () {
  //   hiddenElements();
  //   isVisible(pessoaEstrangeira);
  //   // pessoaEstrangeira.classList.add('is-visible');
  // });

  $(document).on('click', '.tipoPessoaFisica', function () {
    hiddenElements();
    isVisible(document.querySelector('.pessoaFisica'));
  });

  $(document).on('click', '.tipoPessoaJuridica', function () {
    hiddenElements();
    isVisible(document.querySelector('.pessoaJuridica'));
  });

  $(document).on('click', '.tipoPessoaEstrangeira', function () {
    hiddenElements();
    isVisible(document.querySelector('.pessoaEstrangeira'));
  });
}

// function headerOptsController() {
//   const container = document.querySelector('.header-opts-list');
//   const menuItens = document.querySelectorAll('.header-opts-item');
//   const menuInformation = document.querySelector('.header-opts-item--info');
//   const menuNotification = document.querySelector('.header-opts-item--notifications');
//   const globalBarrier = document.querySelector(':not(.header-opts-list)');

//   let openSubMenuHeaderOpts = (item) => {
//     item.addEventListener('click', function () {
//       closeSubMenuHeaderOpts();
//       addClassSubmenu(item);
//     });
//   }

//   let removeClassSubmenu = (item) => {
//     $(item).removeClass('open-submenu');
//   }

//   let addClassSubmenu = (item) => {
//     item.classList.add('open-submenu');
//   }

//   let closeSubMenuHeaderOpts = () => {
//     $(menuItens).each(function () {
//       removeClassSubmenu(this);
//     });
//   }

//   function closeSubmenuOpts() {
//     if ($('.header-opts-item').hasClass('open-submenu')) {
//       $(this).removeClass('open-submenu');
//     } else {
//       closeSubMenuHeaderOpts();
//       $(this).addClass('open-submenu');
//     }
//   }

//   globalBarrier.addEventListener('click', function (e) {
//     closeSubmenuOpts();
//   });

//   openSubMenuHeaderOpts(menuInformation);
//   openSubMenuHeaderOpts(menuNotification);
// }

// function openUserOptions() {
//   const container = document.querySelector('.header-user-options');
//   const global = document.querySelector(':not(.header-user-options)');

//   container.addEventListener('click', function (e) {
//     e.preventDefault();

//     if ($(this).hasClass('options-open')) {
//       closeOptions();
//     } else {
//       openOptions();
//     }
//   });

//   function openOptions() {
//     container.classList.add('options-open');
//   }

//   function closeOptions() {
//     container.classList.remove('options-open');
//   }
// }

function headerSearchController() {
  const pageBody = $('body');
  const btMobileSearch = $('#bt-mobile-search');
  const btMobileSearchBack = $('#bt-mobile-search-back');
  const openedSearchClass = 'mobile-search-active';
  const globalBarrier = $('.global-barrier');

  function unbindClose() {
    $(document).off('keydown.mainmenu');
  }

  function bindSearchClose() {
    $(document).on('keydown.mainmenu', function (e) {
      if (e.which == 27) {
        closeSearch();
        e.preventDefault();
      }
    });

    globalBarrier.on('click.mainmenu', function (e) {
      closeSearch();
    });
  }

  function openSearch() {
    bindSearchClose();
    pageBody.addClass(openedSearchClass);
  }

  function closeSearch() {
    pageBody.removeClass(openedSearchClass);
    unbindClose();
  }

  btMobileSearch.on('click.mainmenu', function (e) {
    if (pageBody.hasClass(openedSearchClass)) {
      closeSearch();
    } else {
      openSearch();
    }
    e.stopPropagation();
  });

  btMobileSearchBack.on('click.mainmenu', function (e) {
    closeSearch();
  });
}

function headerOptsController() {
  /*
    Quando clicar no elemento `header-opts-item`
    Adicionar classe "open-submenu"
    Se clicar novamente remover a classe "open-submenu"

    Cases:
    1- clicar no elemento ao lado, remover a classe do anterior e adicionar no
    elemento clicado.
    2- clicar no elemento com submenu aberto, remover a classe "open-submenu"
    3- ao clicar fora do elemento, remover a classe "open-submenu"
  */

  const headerOptsContainer = $('.header-opts-bar');
  const headerOptsItem = $('.header-opts-item');
  const optsOpenClass = 'open-submenu';

  $(document).on('click', '.header-opts-item', function(event) {
    const element = $(this);
    $('.header-opts-item').removeClass(optsOpenClass);
    element.toggleClass(optsOpenClass);
    event.preventDefault();
  });

  $(document).on('mouseover', '.header-opts-item', function() {
    setTimeout(() => {
      $(this).removeClass(optsOpenClass);
    }, 300);
  });

  // $(document).on('click.headerOpts', function(e) {
  //   console.log(e.target);

  //   if (e.target !== this) {
  //     return;
  //   }
  // });

  // $('.header-opts-item').removeClass(optsOpenClass);
  // $(document).on('click', '.header-opts-item', function(event) {
  //   const element = $(this);
  //   console.log(this);
  //   event.preventDefault();
  //   element.toggleClass(optsOpenClass);
  // });
  // $('body').on('click.headerOpts', function(e) {
  //   console.log(e.target);
  //   if (e.target !== this) {
  //     return;
  //   }
  //   $('.header-opts-item').removeClass(optsOpenClass);
  //   // $('.header-opts-list').each(function() {
  //   //   console.log(this);
  //   //   $(this).hasClass(optsOpenClass) ? $(this).removeClass(optsOpenClass) : $(this).addClass(optsOpenClass);
  //   // });
  // })

  // headerOptsItem.on('click', function(e){
  //   e.preventDefault();
  //   console.log(this);
  // });

  // let removeClassSubmenu = (item) => {
  //   $(item).removeClass('open-submenu');
  // }

  // let addClassSubmenu = (item) => {
  //   item.classList.add('open-submenu');
  // }
}

headerOptsController();
// openUserOptions();
headerSearchController();
mainMenuController();
switchTypeClientRegisterSell();
