import gsap from 'gsap';

export default function contactForm() {
  const contactForm = document.querySelector('.contact-form__form');

  // Проверяем, существует ли форма на странице
  if (!contactForm) {
    return; // Если формы нет, прекращаем выполнение функции
  }

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = this.querySelector('input[name="name"]').value;
    const phone = this.querySelector('input[name="phone"]').value;
    const agreement = this.querySelector('input[name="agreement"]').checked;

    if (!name || !phone || !agreement) {
      alert('Пожалуйста, заполните все поля и подтвердите согласие на обработку данных.');
      return;
    }

    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Заявка отправлена!';
    document.body.appendChild(successMessage);
    gsap.to(successMessage, { opacity: 1, duration: 0.5 });

    // Скрыть сообщение после 1 секунды
    setTimeout(() => {
      gsap.to(successMessage, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => document.body.removeChild(successMessage)
      });
    }, 1000);

    // Очистить форму
    this.reset();
  });
}
