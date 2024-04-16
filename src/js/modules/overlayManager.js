// overlayManager.js
import gsap from 'gsap';

let activeModals = 0;
const modalOverlay = document.getElementById('modalOverlay');

export function showOverlay() {
  if (activeModals === 0) {
    modalOverlay.style.display = 'block';
    gsap.to(modalOverlay, { opacity: 0.6, duration: 0.2 });
  }
  activeModals++;
}

export function hideOverlay() {
  activeModals--;
  if (activeModals === 0) {
    gsap.to(modalOverlay, { opacity: 0, duration: 0.2, onComplete: () => {
      modalOverlay.style.display = 'none';
    }});
  }
}
