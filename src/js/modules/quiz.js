import gsap from 'gsap';

export default function quiz() {
  document.addEventListener('DOMContentLoaded', function() {
    const openModalButton = document.getElementById('openModal');
    const modal = document.querySelector('.quis-modal');

    openModalButton.addEventListener('click', function(event) {
      event.preventDefault();
      gsap.to(modal, { duration: 0.5, autoAlpha: 1 });
    });

    document.getElementById('yandexForm').addEventListener('submit', function(event) {
      event.preventDefault();
      // Обработка отправки формы

      setTimeout(function() {
        gsap.to(modal, { duration: 0.5, autoAlpha: 0 });
      }, 2000);
    });
  });
}
