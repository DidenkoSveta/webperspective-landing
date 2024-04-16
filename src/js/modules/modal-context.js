import gsap from 'gsap';

export default function context() {

    const contextModal = document.querySelector('.context-modal');
    const btnContext = document.querySelectorAll('.btn-context');
    const closeContextButton = document.querySelector('.context-container__close');
    const modalOverlay = document.getElementById('modalOverlay');
    const consultationButton = document.querySelector('.context-ad__consultation-btn'); // Кнопка консультации
    
    function toggleContextModal(show) {
      gsap.to(contextModal, {
        opacity: show ? 1 : 0,
        duration: 0.2,
        display: show ? 'block' : 'none',
        onStart: () => {
          document.body.style.overflow = show ? 'hidden' : 'auto';
          modalOverlay.style.display = show ? 'block' : 'none'; // Управление оверлеем
          gsap.to(modalOverlay, { opacity: show ? 0.6 : 0, duration: 0.2 });
        }
      });
    }
  
    btnContext.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        toggleContextModal(true);
      });
    });
  
    closeContextButton.addEventListener('click', () => toggleContextModal(false));
    modalOverlay.addEventListener('click', () => toggleContextModal(false));
  
    // Закрыть контекстное окно перед открытием основного модального окна
    if (consultationButton) {
      consultationButton.addEventListener('click', (e) => {
        e.preventDefault();
        toggleContextModal(false); // Закрываем контекстное модальное окно
        // Здесь вызов функции открытия modal, если нужно
      });
    }
}