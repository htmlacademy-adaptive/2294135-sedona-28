let navigation = document.querySelector('.navigation');
let navigationToggle = document.querySelector('.navigation__toggle');
let mainHeader = document.querySelector('.main-header');

navigation.classList.remove('navigation--nojs');
mainHeader.classList.remove('main-header--nojs');

navigationToggle.addEventListener('click', function () {
  if (navigation.classList.contains('navigation--closed')) {
    navigation.classList.remove('navigation--closed');
    navigation.classList.add('navigation--opened');
  } else {
    navigation.classList.add('navigation--closed');
    navigation.classList.remove('navigation--opened');
  }
});

