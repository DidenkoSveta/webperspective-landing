import gsap from 'gsap';

export default function modal() {
  const modal = document.getElementById('modal');
  const closeModalButton = document.querySelector('.close-button');
  const modalButtons = document.querySelectorAll('.modal-btn');
  const modalOverlay = document.getElementById('modalOverlay');
  const enrollmentForm = document.getElementById('enrollmentForm');
  const sourceInput = document.querySelector('#source'); // Убедитесь, что скрытое поле добавлено в форму
  const allModals = document.querySelectorAll('.marketing-modal');

  function toggleModal(modalElement, show) {
    gsap.to(modalElement, {
      opacity: show ? 1 : 0,
      duration: 0.2,
      display: show ? 'block' : 'none',
      onStart: () => {
        document.body.style.overflow = show ? 'hidden' : 'auto';
        modalOverlay.style.display = show ? 'block' : 'none'; 
        gsap.to(modalOverlay, { opacity: show ? 0.6 : 0, duration: 0.2 });
      }
    });
  }

  function closeAllModals() {
    allModals.forEach(modalElement => {
      if (gsap.getProperty(modalElement, "display") === "block") {
        toggleModal(modalElement, false);
      }
    });
  }

  modalButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      if (sourceInput && button.closest('.card')) { // Добавляем проверки на существование элементов
        const cardTitle = button.closest('.card').querySelector('.card__title');
        if (cardTitle) { // Убедимся, что cardTitle существует
          sourceInput.value = cardTitle.textContent.trim();
        }
      }
      closeAllModals();
      toggleModal(modal, true);
    });
  });

  [closeModalButton, modalOverlay].forEach(element => {
    element.addEventListener('click', () => toggleModal(modal, false));
  });

  enrollmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(enrollmentForm);
    fetch('sendmail.php', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.text())
    .then(text => {
      alert('Заявка отправлена!');
      toggleModal(modal, false);
      enrollmentForm.reset();
    })
    .catch(error => {
      alert('Произошла ошибка: ' + error.message);
    });
  });
}
