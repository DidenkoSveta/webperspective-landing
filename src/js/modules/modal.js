import gsap from 'gsap';


export default function modal() {
  const modal = document.getElementById('modal');
  const closeModalButton = document.querySelector('.close-button');
  const modalButtons = document.querySelectorAll('.modal-btn');
  const modalOverlay = document.getElementById('modalOverlay');
  const enrollmentForm = document.getElementById('enrollmentForm');

  function toggleModal(show) {
    gsap.to(modal, {
      opacity: show ? 1 : 0,
      duration: 0.2,
      display: show ? 'block' : 'none',
      onStart: () => {
        document.body.style.overflow = show ? 'hidden' : 'auto';
        modalOverlay.style.display = show ? 'block' : 'none'; // Управление оверлеем без его удаления
        gsap.to(modalOverlay, { opacity: show ? 0.6 : 0, duration: 0.2 });
      }
    });
  }

  modalButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      toggleModal(true);
    });
  });

  [closeModalButton, modalOverlay].forEach(element => {
    element.addEventListener('click', () => toggleModal(false));
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
      toggleModal(false);
      enrollmentForm.reset();
    })
    .catch(error => {
      alert('Произошла ошибка: ' + error.message);
    });
  });
}
