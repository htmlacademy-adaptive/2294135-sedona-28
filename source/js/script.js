let navigation = document.querySelector('.navigation');
let navigationToggle = document.querySelector('.navigation__toggle');
let logo = document.querySelector('.main-header__logo');

logo.classList.remove('main-header__logo--nojs');
navigation.classList.remove('navigation--nojs');

navigationToggle.addEventListener('click', function () {
  if (navigation.classList.contains('navigation--closed')) {
    navigation.classList.remove('navigation--closed');
    navigation.classList.add('navigation--opened');
  } else {
    navigation.classList.add('navigation--closed');
    navigation.classList.remove('navigation--opened');
  }
});
