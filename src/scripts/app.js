let menu = document.querySelector('#bt-mobile-menu');
let body = document.querySelector('body');
let globalHolder = document.querySelector('.global-holder');

menu.addEventListener('click', (el) => {

  body.classList.toggle('mobile-menu-active');

  if(body.classList.contains('mobile-menu-active')) {
    menu.querySelector('.fa-bars').classList.replace('fa-bars', 'fa-close');
  } else {
    menu.querySelector('.fa-bars').classList.replace('fa-close', 'fa-bars');
  }

});

globalHolder.click('click', (el) => {
  console.log(this);
  body.classList.remove('mobile-menu-active');
})
