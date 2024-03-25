import gsap from 'gsap';

export default function burgerMenu() {
  const burger = document.querySelector('.header__burger');
  const close = document.querySelector('.header__close');
  const nav = document.querySelector('.header__nav');
  const menuLinks = document.querySelectorAll('.header__nav a'); // Ссылки внутри меню
  const dimBackground = document.createElement('div');
  dimBackground.classList.add('dim-background');
  document.body.appendChild(dimBackground);

  // Функция для закрытия меню
  const closeMenu = () => {
    gsap.to(nav, { right: "-100%", duration: 0.4, ease: "expo.in" });
    gsap.to(dimBackground, {
      opacity: 0, duration: 0.4, onComplete: () => {
        dimBackground.style.display = "none";
        close.style.display = "none"; // Скрыть кнопку закрытия после анимации
      }
    });
  };

  burger.addEventListener('click', () => {
    gsap.to(nav, { right: "0%", duration: 0.4, ease: "expo.out" });
    gsap.to(dimBackground, { display: "block", opacity: 1, duration: 0.5 });
    close.style.display = "block"; // Показать кнопку закрытия
  });

  close.addEventListener('click', closeMenu);
  dimBackground.addEventListener('click', closeMenu);

  // Обработчик для ссылок меню
  menuLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      // Получаем атрибут href и проверяем, что он не null
      const href = link.getAttribute('href');
      if (href && (href.startsWith('#') || (href.includes('index.html#') && location.pathname === '/index.html'))) {
        event.preventDefault();
        closeMenu();

        // Плавная прокрутка к соответствующему блоку, убедитесь, что селектор правильный
        const targetElement = document.querySelector(href.includes('#') ? href.substring(href.indexOf('#')) : 'body');
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // Если href не определен или не содержит якорь, просто закрываем меню
        if (!href || !href.includes('#')) {
          closeMenu();
        }
      }
    });
  });
}
