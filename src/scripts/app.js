// function mobileScreen() {
//   var mobileSize = 1280;
//   var mobileState = true;

//   var windowSize = parseInt($(window).width());

//   if (windowSize >= mobileSize) {
//     mobileState = false;
//   } else {
//     mobileState = true
//   }

//   return mobileState;
// }

// function mainMenuController() {

//   var pageBody = $('body');

//   var btMobileMenu = $('#bt-mobile-menu');
//   var btMobileSearch = $('#bt-mobile-search');
//   var btMobileSearchBack = $('#bt-mobile-search-back');
//   var btMobileCheckout = $('#bt-mobile-checkout');
//   var btMobileCheckoutClose = $('#bt-mobile-checkout-close');

//   var mainMenu = $('#main-menu');
//   var mainMenuGlobalList = $('.menu-list');
//   var mainMenuSubmenus = mainMenuGlobalList.find('.submenu');
//   var mainMenuSubmenusLinks = mainMenuSubmenus.find('a');
//   var mainMenuSubmenusLists = mainMenuSubmenus.find('.submenu-list');

//   var globalBarrier = $('.global-barrier');

//   var openedMenuClass = 'mobile-menu-active';
//   var openedSearchClass = 'mobile-search-active';
//   var openedCheckoutClass = 'mobile-sneak-checkout-active';
//   var submenuOverCLass = 'submenu-active';
//   var submenuActiveCLass = 'active';

//   var btSubmenuCode = '<li class="bt-submenu-back"><a href="#back" target="">Voltar</a></li>';

//   var submenuLevel = 0;

//   function bindMenuClose() {
//     $(document).on('keydown.mainmenu', function(e) {
//       if (e.which == 27) {
//         closeMenu();
//         e.preventDefault();
//       }
//     });

//     globalBarrier.on('click.mainmenu', function(e) {
//       closeMenu();
//     });
//   }

//   function bindSearchClose() {
//     $(document).on('keydown.mainmenu', function(e) {
//       if (e.which == 27) {
//         closeSearch();
//         e.preventDefault();
//       }
//     });

//     globalBarrier.on('click.mainmenu', function(e) {
//       closeSearch();
//     });
//   }

//   function bindCheckoutClose() {
//     $(document).on('keydown.mainmenu', function(e) {
//       if (e.which == 27) {
//         closeCheckout();
//         e.preventDefault();
//       }
//     });

//     globalBarrier.on('click.mainmenu', function(e) {
//       closeCheckout();
//     });
//   }

//   function unbindClose() {
//     $(document).off('keydown.mainmenu');
//     globalBarrier.off('click.mainmenu');
//   }

//   function openMenu() {
//     bindMenuClose();
//     pageBody.addClass(openedMenuClass);
//   }

//   function closeMenu() {
//     pageBody.removeClass(openedMenuClass);
//     unbindClose();
//   }

//   function openSearch() {
//     bindSearchClose();
//     pageBody.addClass(openedSearchClass);
//   }

//   function closeSearch() {
//     pageBody.removeClass(openedSearchClass);
//     unbindClose();
//   }

//   function openCheckout() {
//     bindCheckoutClose();
//     pageBody.addClass(openedCheckoutClass);
//   }

//   function closeCheckout() {
//     pageBody.removeClass(openedCheckoutClass);
//     unbindClose();
//   }

//   $(window).on('resize.mainmenu', function() {
//     if (!mobileScreen()) {
//       if (pageBody.hasClass(openedMenuClass)) {
//         closeMenu();
//       }
//       if (pageBody.hasClass(openedSearchClass)) {
//         closeSearch();
//       }
//       if (pageBody.hasClass(btMobileCheckout)) {
//         closeCheckout();
//       }
//       mainMenuGlobalList.find('.submenu-list.' + submenuActiveCLass).removeClass(submenuActiveCLass);
//       mainMenu.removeClass(submenuOverCLass);
//       submenuLevel = 0;
//     }
//   });

//   btMobileMenu.on('click.mainmenu', function(e) {
//     if (pageBody.hasClass(openedSearchClass)) {
//       closeSearch();
//     }
//     if (pageBody.hasClass(btMobileCheckout)) {
//       closeCheckout();
//     }
//     if (pageBody.hasClass(openedMenuClass)) {
//       closeMenu();
//     } else {
//       openMenu();
//     }
//     e.stopPropagation()
//   });

//   btMobileSearch.on('click.mainmenu', function(e) {
//     if (pageBody.hasClass(openedMenuClass)) {
//       closeMenu();
//     }
//     if (pageBody.hasClass(btMobileCheckout)) {
//       closeCheckout();
//     }
//     if (pageBody.hasClass(openedSearchClass)) {
//       closeSearch();
//     } else {
//       openSearch();
//     }
//     e.stopPropagation();
//   });

//   btMobileSearchBack.on('click.mainmenu', function(e) {
//     closeSearch();
//   });

//   btMobileCheckout.on('click.mainmenu', function(e) {
//     if (pageBody.hasClass(openedMenuClass)) {
//       closeMenu();
//     }
//     if (pageBody.hasClass(openedSearchClass)) {
//       closeSearch();
//     }
//     if (pageBody.hasClass(btMobileCheckout)) {
//       closeCheckout();
//     } else {
//       openCheckout();
//     }
//     e.stopPropagation()
//   });

//   btMobileCheckoutClose.on('click.mainmenu', function(e) {
//     closeCheckout();
//     e.stopPropagation();
//   });

//   function calcRight() {
//     var itens = mainMenuGlobalList.find('>li');
//     var nItens = itens.length;
//     var halfItens = nItens / 2;

//     itens.each(function() {
//       var element = $(this);
//       if (element.index() > halfItens && element.hasClass('submenu')) {
//         element.addClass('right');
//       }
//     });

//   }

//   calcRight();

//   mainMenuSubmenusLists.each(function() {
//     var element = $(this);
//     element.prepend(btSubmenuCode);
//   });

//   mainMenuSubmenusLinks.on('click.mainmenu', function(e) {

//     console.log('clicked');

//     var parent = $(this).parent();
//     var list = parent.find('>.submenu-list');

//     if (mobileScreen()) {
//       list.addClass(submenuActiveCLass);
//       mainMenu.scrollTop(0).addClass(submenuOverCLass);
//       submenuLevel++;
//       if (parent.hasClass('submenu')) {
//         e.preventDefault();
//       }
//     }
//   });

//   mainMenuGlobalList.on('click.mainmenu', '.bt-submenu-back', function() {
//     $(this).parent().removeClass(submenuActiveCLass);
//     submenuLevel--;
//     if (submenuLevel < 1) {
//       mainMenu.removeClass(submenuOverCLass);
//     }
//   });


// }
// mainMenuController();
