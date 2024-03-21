export default function scroll() {
  // Создаем кнопку для прокрутки вверх
  const scrollButton = document.createElement('button');
  scrollButton.classList.add('scroll-to-top');
  document.body.appendChild(scrollButton);

  // Стилизация кнопки
  scrollButton.style.position = 'fixed';
  scrollButton.style.bottom = '60px';
  scrollButton.style.right = '20px';
  scrollButton.style.display = 'none'; // Сначала кнопка скрыта
  scrollButton.style.zIndex = '1000';
  scrollButton.style.cursor = 'pointer';
  // Добавьте другие стили, если это необходимо

  // Показываем кнопку при прокрутке вниз
  window.addEventListener('scroll', () => {
    const advantagesSection = document.querySelector('.scrolling');
    if (advantagesSection) {
      const sectionTop = advantagesSection.getBoundingClientRect().top;
      scrollButton.style.display = (sectionTop < window.innerHeight) ? 'block' : 'none';
    }
  });

  // Плавная прокрутка вверх при клике на кнопку
  scrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Обработка якорных ссылок
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        // Плавная прокрутка к элементу
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Прокрутка к элементу после перехода на страницу, если это необходимо
  window.onload = () => {
    const scrollToId = localStorage.getItem('scrollToId');
    if (scrollToId) {
      const targetElement = document.getElementById(scrollToId);
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100); // Небольшая задержка в случае, если элементы ещё не полностью загружены
      }
      localStorage.removeItem('scrollToId'); // Удаляем ID после прокрутки
    }
  };

  // Обработка внешних якорных ссылок (с другой страницы)
  document.querySelectorAll('a[href^="/#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(2);
      localStorage.setItem('scrollToId', targetId); // Сохраняем ID в localStorage
      window.location.href = '/'; // Переходим на главную страницу
      e.preventDefault();
    });
  });
}
