function schedule() {
      const accordionItems = document.querySelectorAll('.accordion__item');
    
      accordionItems.forEach((item, index) => {
        const header = item.querySelector('.accordion__title');
        const content = item.querySelector('.accordion__content');
    
        // Устанавливаем начальное состояние: первый аккордеон открыт, остальные закрыты
        if (index === 0) {
          content.style.display = 'block';
          header.classList.add('active');
        } else {
          content.style.display = 'none';
        }
    
        header.addEventListener('click', () => {
          const isOpen = content.style.display === 'block';
    
          // Закрываем все аккордеоны
          document.querySelectorAll('.accordion__content').forEach((otherContent) => {
            otherContent.style.display = 'none';
          });
    
          // Убираем класс active у всех заголовков
          document.querySelectorAll('.accordion__title').forEach((otherHeader) => {
            otherHeader.classList.remove('active');
          });
    
          // Если аккордеон был закрыт, открываем его
          if (!isOpen) {
            content.style.display = 'block';
            header.classList.add('active');
          }
        });
      });
 }
 
 export default schedule;


