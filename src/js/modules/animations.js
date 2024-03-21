import gsap from 'gsap';

export default function animations() {
  const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

  // Проверка наличия элементов перед их анимацией
  if (document.querySelector('.promo__title')) {
    tl.from('.promo__title', { x: -100, opacity: 0, duration: 0.8 });
  }
  if (document.querySelector('.promo-button')) {
    tl.from('.promo-button', { x: -100, opacity: 0, duration: 0.8 }, '-=0.6');
  }

  // Создание observer для остальных элементов
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gsap.fromTo(entry.target,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power1.out' }
        );
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Наблюдение за элементами для запуска анимации
  const elementsToAnimate = document.querySelectorAll('.services, .services__description, .about__container, .about__title, .advantages__container, .advantages__item, .schedule__container, .schedule__title, .pricing__container, .pricing__card, .pricing__title, .contact-form__container, .contact-form__title, .faq__container, .faq__title, .contact__container-info, .contact__title');
  elementsToAnimate.forEach(item => {
    gsap.set(item, { opacity: 0, y: 30 });
    observer.observe(item);
  });

  // Проверка наличия элементов .promo__features перед анимацией
  const promoFeatures = gsap.utils.toArray('.promo__feature');
  if (promoFeatures.length > 0) {
    promoFeatures.forEach((feature, index) => {
      tl.from(feature, {
        opacity: 0,
        y: -20 * (index + 1),
        duration: 0.6,
        stagger: 0.1,
        ease: 'power1.out'
      }, '-=0.5');
    });
  }
}
