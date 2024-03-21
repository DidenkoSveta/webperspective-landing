import gsap from 'gsap';

export default function modal() {
  const modal = document.getElementById('modal');
  const modalOverlay = document.getElementById('modalOverlay');
  const closeModalButton = document.querySelector('.close-button');
  const modalButtons = document.querySelectorAll('.modal-btn');
  const enrollmentForm = document.getElementById('enrollmentForm');
  const consentCheckbox = document.getElementById('consent');

  if (!modal || !modalOverlay) return; // Выход из функции, если элементы модального окна отсутствуют

  const toggleModal = (show) => {
    gsap.to([modal, modalOverlay], { opacity: show ? 1 : 0, duration: 0.5, display: show ? 'block' : 'none' });
  };

  // Функция для отображения сообщения об успехе
  const showSuccessMessage = () => {
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
  };

  if (modalButtons) {
    modalButtons.forEach(button => button.addEventListener('click', () => toggleModal(true)));
  }
  if (closeModalButton) {
    closeModalButton.addEventListener('click', () => toggleModal(false));
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', () => toggleModal(false));
  }

  if (enrollmentForm && consentCheckbox) {
    enrollmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!consentCheckbox.checked) {
        alert('Пожалуйста, подтвердите согласие на обработку данных.');
        return;
      }
      showSuccessMessage();
      toggleModal(false); // Закрытие модального окна
      enrollmentForm.reset(); // Очистка формы
    });
  }
}
