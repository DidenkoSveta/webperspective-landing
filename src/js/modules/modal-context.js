import gsap from 'gsap';

export default function context() {

  const modalOverlay = document.getElementById('modalOverlay');
  const consultationButton = document.querySelector('.context-ad__consultation-btn');

  function toggleModal(modal, show) {
    console.log(show ? 'Opening modal' : 'Closing modal', modal);
    gsap.to(modal, {
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

  function initModal(btnSelector, modalSelector) {
    const buttons = document.querySelectorAll(btnSelector);
    const modal = document.querySelector(modalSelector);
    const closeButton = modal.querySelector('.context-container__close');

    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Button clicked to open:', modal);
        toggleModal(modal, true);
      });
    });

    closeButton.addEventListener('click', () => {
      console.log('Close button clicked:', modal);
      toggleModal(modal, false);
    });
    modalOverlay.addEventListener('click', () => {
      console.log('Overlay clicked:', modal);
      toggleModal(modal, false);
    });
  }

  initModal('.btn-seo', '.seo-modal.marketing-modal');
  initModal('.btn-target', '.target-modal.marketing-modal');
  initModal('.btn-context', '.context-modal.marketing-modal');

  if (consultationButton) {
    consultationButton.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Consultation button clicked');
      document.querySelectorAll('.marketing-modal').forEach(modal => {
        if (gsap.getProperty(modal, "display") === "block") {
          console.log('Closing modal due to consultation button:', modal);
          toggleModal(modal, false);
        }
      });
      // Здесь можно добавить вызов функции открытия модального окна для консультации
    });
  }
}
