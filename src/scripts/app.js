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

function openUserOptions() {
  const container = document.querySelector('.header-user-options');
  const global = document.querySelector(':not(.header-user-options)');

  container.addEventListener('click', function (e) {
    e.preventDefault();

    if ($(this).hasClass('options-open')) {
      closeOptions();
    } else {
      openOptions();
    }
  });

  function openOptions() {
    container.classList.add('options-open');
  }

  function closeOptions() {
    container.classList.remove('options-open');
  }
}

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
    }, 1500);
  });
}

function boxCardController() {
  const activeClass = 'box-card--open';

  function showContent(element) {
      element.closest('.box-card').find('.box-card__content').slideDown();
      element.closest('.box-card').addClass(activeClass);
  }

  function hideContent(element) {
      element.closest('.box-card').removeClass(activeClass);
      element.closest('.box-card').find('.box-card__content').slideUp();
  }

  $(document).on('click', '.box-card__title', function (e) {
      e.preventDefault();
      let element = $(this);
      element.closest('.box-card').toggleClass

      if (element.closest('.box-card').hasClass(activeClass)) {
          hideContent(element);
      } else {
          showContent(element);
      }
  });
}

function ModalClass(){

	var stdReturn = this;
	var domClasses = {};
	var components = {};
	var modal = null;
	var pageHTML = $('html');
	var modalTarget = $('body');
	var modalStatus = false;
	var closeCallback = null;
	var barrier = null;

	domClasses.modalActive = 'modal-active';
	domClasses.container = 'modal';
	domClasses.content = domClasses.container + '-content';
	domClasses.header = domClasses.container + '-header';
	domClasses.body = domClasses.container + '-body';
	domClasses.footer = domClasses.container + '-footer';
	domClasses.title = 'title';
	domClasses.btclose = 'bt-close';
	domClasses.globalBarrier = 'global-barrier';


	modal = $('<div ></div>').addClass(domClasses.container);
	barrier = $('.' + domClasses.globalBarrier);

	components.content = $('<div></div>').addClass(domClasses.content);
	components.header = $('<div></div>').addClass(domClasses.header);
	components.body = $('<div></div>').addClass(domClasses.body);
	components.footer = $('<div></div>').addClass(domClasses.footer);
	components.title = $('<h4></h4>').addClass(domClasses.title);
	components.btclose = $('<a><i class="fa fa-times"></i></a>').addClass(domClasses.btclose);

	function constructor(){

		components.globalBarrier = $('.' + domClasses.globalBarrier);

		modal
			.append(components.content
				.append(components.header
					.append(components.title)
					.append(components.btclose)
				)
				.append(components.body)
				.append(components.footer)
			)

		modalTarget.append(modal);
		modal.on('click.modal', '.' + domClasses.btclose, hideModal);

	}

	function clearElements(){
		components.title.html('');
		components.body.html('');
		components.footer.html('');
		modalStatus = false;
	}

	function solveCallback(){
		if(closeCallback != null){
			closeCallback();
			closeCallback = null;
		}
	}

	function setLabel(title){
		components.title.html(title);
		return stdReturn;
	}

	function bindClose(){
		$(document).on('keydown.mainmenu', function(e){
			if(e.which == 27){
				hideModal();
				e.preventDefault();
			}
		});
	}

	function unbindClose(){
		$(document).off('keydown.modal');
	}


	function showModal(){
		if(modalStatus){
			printc('Modal alredy visible. Please use ".close()" method first.');
		}else{
			pageHTML.addClass(domClasses.modalActive);
			modalTarget.addClass(domClasses.modalActive);
			modal.focus();
			bindClose();
			modalStatus = true;
		}
		return stdReturn;
	}

	function hideModal(){

		if(modalStatus){

			pageHTML.removeClass(domClasses.modalActive);
			modalTarget.removeClass(domClasses.modalActive);
			clearElements();
			unbindClose();
			solveCallback();

		}else{
			printc('Modal alredy hidden. Please use ".open()" method first.');
		}

		return stdReturn;
	}

	function setHTML(htmlCode){
		components.body.html(htmlCode);
		return stdReturn;
	}

	function appendCode(htmlCode){
		components.body.append(htmlCode);
		return stdReturn;
	}

	function setFooter(htmlCode){
		components.footer.html(htmlCode);
		return stdReturn;
	}

	function returnStatus(){
		return modalStatus;
	}

	function returnBody(){
		return components.body;
	}

	function openLoader(message){

		var message = message || 'Carregando... Por favor aguarde.';
		var html = '<div class="modal-loader"><style>.modal-loader{display: block;position: absolute;top: 0;left: 0;width: 100%;height: 100%;background: rgba(255, 255, 255, 0.8);color: #333;text-align: center;z-index: 9;}.modal-loader-content{display: block;position: absolute;width: 100%;top: 50%;left: 0;height: 100px;margin-top: -50px;text-align: center;}.modal-loader-icon{font-size: 36px;margin-bottom: 20px;}.modal-loader-message{font-size: 16px;line-height: 22px;height: 44px;overflow: hidden;padding: 0 15px;}.modal-body{position: relative;}</style><div class="modal-loader-content"><i class="fa fa-spin fa-spinner modal-loader-icon"></i><p class="modal-loader-message">' + message + '</p></div></div>';

		if(modalStatus){
			closeLoader();
			components.body.append(html);
		}else{
			printc('Modal must be open to call loader');
		}

		return stdReturn;
	}

	function closeLoader(){
		if(modalStatus){
			components.body.find('.modal-loader').remove();
		}else{
			printc('Modal must be open to close loader.');
		}
	}

	function setCloseCallback(fx){
		if(typeof(fx) == 'function'){
			closeCallback = fx;
			printc('Binded function callback');
		}else{
			printc('Param received for callback is not a function');
		}
		return stdReturn;
	}

	/* Métodos Públicos */
	this.open = showModal;
	this.close = hideModal;
	this.status = returnStatus;
	this.getBody = returnBody;
	this.label = setLabel;
	this.html = setHTML;
	this.append = appendCode;
	this.footer = setFooter;
	this.closeCallback = setCloseCallback;
	this.openLoader = openLoader;
	this.closeLoader = closeLoader;

  constructor();

}

function showFilter() {
  let advancedFilter = document.querySelector('.filter-search__advanced');
  let buttonSearch = '<div class="form-line form-line--area-button"><button type="submit" form="buscaTransferencias" class="bt-confirm"><i class="fa fa-search"></i> Buscar</button></div>';

  document.querySelector('.filter-advanced')
    .addEventListener('click', (e) => {
      e.preventDefault();
      advancedFilter.classList.toggle('filter-search__advanced--open');
      $('.filter-search__advanced').append(buttonSearch);
    })
}


headerOptsController();
openUserOptions();
headerSearchController();
mainMenuController();
switchTypeClientRegisterSell();
boxCardController();
showFilter();
