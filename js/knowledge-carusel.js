import { debounce } from "./debounce.js";

document.addEventListener('DOMContentLoaded', function () {
  const teamMembers = [
    { image: 'img/preview.jpg', text: 'Здесь будет текст с кратким анонсом статьи. Здесь будет текст с кратким анонсом статьи. Здесь будет текст с кратким анонсом статьи.' },
    { image: 'img/preview.jpg', text: 'Здесь будет текст с кратким анонсом статьи. Здесь будет текст с кратким анонсом статьи. Здесь будет текст с кратким анонсом статьи.' },
    { image: 'img/preview.jpg', text: 'Здесь будет текст с кратким анонсом статьи. Здесь будет текст с кратким анонсом статьи. Здесь будет текст с кратким анонсом статьи.' },
    { image: 'img/preview.jpg', text: 'Здесь будет текст с кратким анонсом статьи. Здесь будет текст с кратким анонсом статьи. Здесь будет текст с кратким анонсом статьи.' },
    { image: 'img/preview.jpg', text: 'Здесь будет текст с кратким анонсом статьи. Здесь будет текст с кратким анонсом статьи. Здесь будет текст с кратким анонсом статьи.' },
    { image: 'img/preview.jpg', text: 'Здесь будет текст с кратким анонсом статьи. Здесь будет текст с кратким анонсом статьи. Здесь будет текст с кратким анонсом статьи.' },

  ];

  const carousel = document.querySelector('#cardsSlider');
  const carouselInner = carousel.querySelector('.carousel-inner');

  function createMemberCard(member) {
    return `
      <div class="col-md-6 col-lg-4 col-12">
        <div class="card">
          <img src="${member.image}" class="card-img-top" alt="Картинка">
          <div class="card-body">
            <p class="card-text">${member.text}</p>
            <a href="/post.html" class="btn btn-accent">читать далее</a>
          </div>
        </div>
      </div>
    `;
  }

  function updateCarousel() {
    const windowWidth = window.innerWidth;
    carouselInner.innerHTML = '';

    let itemsPerSlide;
    if (windowWidth >= 992) {
      itemsPerSlide = 3; // ПК - 3 карточки
    } else if (windowWidth >= 768) {
      itemsPerSlide = 2; // Планшет - 2 карточки
    } else {
      itemsPerSlide = 1; // Мобильный - 1 карточка
    }

    for (let i = 0; i < teamMembers.length; i += itemsPerSlide) {
      const slide = document.createElement('div');
      slide.className = `carousel-item mb-4${i === 0 ? ' active' : ''}`;
      const slideMembers = teamMembers.slice(i, i + itemsPerSlide);
      slide.innerHTML = `<div class="row g-4">${slideMembers.map(createMemberCard).join('')}</div>`;
      carouselInner.appendChild(slide);
    }

    // Пересоздаем карусель Bootstrap
    if (bootstrap.Carousel.getInstance(carousel)) {
      bootstrap.Carousel.getInstance(carousel).dispose();
    }
    new bootstrap.Carousel(carousel, {
      interval: 500000
    });
  }

  // Вызываем функцию при загрузке страницы и при изменении размера окна
  updateCarousel();

  const debouncedUpdateCarousel = debounce(updateCarousel, 250);


  window.addEventListener('resize', debouncedUpdateCarousel);

  // Вызываем функцию при загрузке страницы и при изменении размера окна
  updateCarousel();
});



document.addEventListener("DOMContentLoaded", function () {
  // Массив с данными карточек (добавьте videoUrl, если нужно)
  const videoCards = [
    { image: "img/preview.jpg", text: "Здесь будет текст с кратким описанием ролика. Здесь будет текст с кратким описанием ролика. Здесь будет текст с кратким описанием ролика.", videoUrl: "/video.html" },
    { image: "img/preview.jpg", text: "Здесь будет текст с кратким описанием ролика. Здесь будет текст с кратким описанием ролика. Здесь будет текст с кратким описанием ролика.", videoUrl: "/video.html" },
    { image: "img/preview.jpg", text: "Здесь будет текст с кратким описанием ролика. Здесь будет текст с кратким описанием ролика. Здесь будет текст с кратким описанием ролика.", videoUrl: "/video.html" }
  ];

  const container = document.getElementById("videoCardsContent");

  // Функция для определения десктопа (ширина ≥992px)
  function isDesktop() {
    return window.innerWidth >= 992;
  }

  // Верстка карточки для десктопа: используем разметку row > col
  function createDesktopCard(card) {
    return `
      <div class="row g-0 mt-4 pt-3">
        <div class="col-12 col-lg-7">
          <img src="${card.image}" class="img-fluid" alt="Видео превью" >
        </div>
        <div class="col-12 col-lg-3 d-flex flex-column justify-content-end align-items-start">
          <p>${card.text}</p>
          <a href="${card.videoUrl}" class="btn btn-accent" ">Смотреть</a>
        </div>
      </div>
    `;
  }

  // Верстка карточки для мобильных: вертикально – изображение сверху, затем текст и кнопка
  function createMobileCard(card) {
    return `
      <img src="${card.image}" class="img-fluid "  alt="Видео превью" >
      <div class="mt-4 pt-2">
        <p>${card.text}</p>
        <a href="${card.videoUrl}" class="btn btn-accent " >Смотреть</a>
      </div>
    `;
  }

  // Генерация десктопной разметки: выводим первые 2 карточки, остальные в collapse
  function generateDesktopLayout() {
    let html = `<div class="row g-4">`;
    // Первые 2 карточки
    videoCards.slice(0, 2).forEach(card => {
      html += createDesktopCard(card);
    });
    html += `</div>`;

    // Если есть дополнительные карточки, помещаем их в collapse
    if (videoCards.length > 2) {
      html += `
        <div class="collapse" id="moreInfo">`;
      videoCards.slice(2).forEach(card => {
        html += createDesktopCard(card);
      });
      html += `</div>`;
    }
    container.innerHTML = html;
  }

  // Генерация мобильной разметки: слайдер, по одной карточке на слайд
  function generateMobileLayout() {
    let html = `
      <div id="videoCardsCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">`;
    videoCards.forEach((card, i) => {
      html += `<div class="carousel-item ${i === 0 ? "active" : ""}">
                 ${createMobileCard(card)}
               </div>`;
    });
    container.innerHTML = html;
  }

  // Обновление разметки в зависимости от размера экрана
  function updateLayout() {
    if (isDesktop()) {
      generateDesktopLayout();
    } else {
      generateMobileLayout();
    }
  }

  updateLayout();
  window.addEventListener("resize", debounce(updateLayout, 250));
});



