import '../scss/style.scss'; // Путь к файлу стилей

// Импорт функций из модулей
import burgerMenu from './modules/burger-menu';
import modal from './modules/modal';
import quiz from './modules/quiz';
import scroll from './modules/scroll-to-top';
// import context from './modules/modal-context';
// import contactForm from './modules/contact-form';
// import animations from './modules/animations';

// Использование функций после полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  burgerMenu();
  modal();
  quiz();
  scroll();
  // context();
  //   contactForm();
  //   animations();
});