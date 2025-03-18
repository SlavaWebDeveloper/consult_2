import { debounce } from "./debounce.js";

document.addEventListener('DOMContentLoaded', function () {
  const cardMembers = [
    { image: 'img/preview-1.jpg', name: 'Превью', text: 'Здесь будет текст с кратким анонсом статьи. Здесь будет текст с кратким анонсом статьи. Здесь будет текст с кратким анонсом статьи.' },
    { image: 'img/preview-1.jpg', name: 'Превью', text: 'Здесь будет текст с кратким анонсом статьи. Здесь будет текст с кратким анонсом статьи. Здесь будет текст с кратким анонсом статьи.' },
    { image: 'img/preview-1.jpg', name: 'Превью', text: 'Здесь будет текст с кратким анонсом статьи. Здесь будет текст с кратким анонсом статьи. Здесь будет текст с кратким анонсом статьи.' },
    { image: 'img/preview-1.jpg', name: 'Превью', text: 'Здесь будет текст с кратким анонсом статьи. Здесь будет текст с кратким анонсом статьи. Здесь будет текст с кратким анонсом статьи.' },
    { image: 'img/preview-1.jpg', name: 'Превью', text: 'Здесь будет текст с кратким анонсом статьи. Здесь будет текст с кратким анонсом статьи. Здесь будет текст с кратким анонсом статьи.' },
    { image: 'img/preview-1.jpg', name: 'Превью', text: 'Здесь будет текст с кратким анонсом статьи. Здесь будет текст с кратким анонсом статьи. Здесь будет текст с кратким анонсом статьи.' }
  ];

  const carousel = document.querySelector('#cardCarousel');
  const carouselInner = carousel.querySelector('#carouselInner');

  // Шаблон карточки
  function createMemberCard(member) {
    return `
      <div class="col-lg-4 col-12">
        <div class="card">
          <div class="card-img-container position-relative">
            <img src="${member.image}" class="card-img-top" alt="Превью">
            <h3 class="d-flex flex-column align-items-center card-title-overlay position-absolute top-50 start-50 translate-middle text-white text-uppercase">${member.name}</h3>
          </div>
          <div class="card-body">
            <p class="card-text">${member.text}</p>
            <a href="#" class="btn btn-accent">Читать далее</a>
          </div>
        </div>
      </div>
    `;
  }

  // Функция для обновления слайдов
  function updateCarousel() {
    const windowWidth = window.innerWidth;
    carouselInner.innerHTML = '';

    // При ПК-версии (>=992px) – 2 карточки на слайд, иначе 1 карточка
    const itemsPerSlide = windowWidth >= 992 ? 2 : 1;

    for (let i = 0; i < cardMembers.length; i += itemsPerSlide) {
      const slide = document.createElement('div');
      slide.className = `carousel-item mb-4${i === 0 ? ' active' : ''}`;

      // Группируем карточки для текущего слайда
      const slideMembers = cardMembers.slice(i, i + itemsPerSlide);
      slide.innerHTML = `<div class="row justify-content-center">${slideMembers.map(createMemberCard).join('')}</div>`;
      carouselInner.appendChild(slide);
    }

    // Пересоздаем карусель Bootstrap (если уже инициализирована)
    const carouselInstance = bootstrap.Carousel.getInstance(carousel);
    if (carouselInstance) {
      carouselInstance.dispose();
    }
    new bootstrap.Carousel(carousel, {
      interval: 500000
    });
  }

  // Первичная инициализация
  updateCarousel();

  // Обновление слайдера с debounce при изменении размера окна
  const debouncedUpdateCarousel = debounce(updateCarousel, 250);
  window.addEventListener('resize', debouncedUpdateCarousel);
});
