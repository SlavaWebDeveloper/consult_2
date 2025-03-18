import { debounce } from "./debounce.js";

document.addEventListener("DOMContentLoaded", function () {
  const carousels = [
    {
      element: document.getElementById("pricesCarousel"),
      items: document.querySelectorAll("#pricesCarousel .carousel-item"),
    },
    {
      element: document.getElementById("aboutCarousel"),
      items: document.querySelectorAll("#aboutCarousel .carousel-item"),
    },
  ];

  function adaptCarousel(carousel) {
    if (!carousel.element) return; // Проверяем, что элемент существует

    const { element, items } = carousel;

    if (window.innerWidth >= 992) {
      // Десктоп: показываем все без карусели
      element.classList.remove("carousel", "slide");
      element.querySelector(".carousel-inner").style.display = "flex";
      items.forEach((item) => item.classList.remove("carousel-item"));
    } else {
      // Мобильные устройства: включаем карусель
      element.classList.add("carousel", "slide");
      element.querySelector(".carousel-inner").style.display = "block";
      items.forEach((item) => item.classList.add("carousel-item"));
    }
  }

  function adaptAllCarousels() {
    carousels.forEach(adaptCarousel);
  }

  // Адаптируем карусели при загрузке страницы
  adaptAllCarousels();

  const debouncedAdaptAllCarousels = debounce(adaptAllCarousels, 250);

  // Добавляем слушатель для изменения размера окна
  window.addEventListener("resize", debouncedAdaptAllCarousels);
});

document.addEventListener('DOMContentLoaded', function () {
  const teamMembers = [
    {
      name: 'ИМЯ1',
      surname: 'ФАМИЛИЯ1',
      descriptionOne: 'Тут будет небольшой текст о деятельности сотрудника.',
      descriptionTwo: 'Тут будет небольшой текст о деятельности сотрудника.',
      image: 'img/person-team-1.jpg'
    },
    {
      name: 'ИМЯ2',
      surname: 'ФАМИЛИЯ2',
      descriptionOne: 'Тут будет небольшой текст о деятельности сотрудника.',
      descriptionTwo: 'Тут будет небольшой текст о деятельности сотрудника.',
      image: 'img/person-team-2.jpg'
    },
    {
      name: 'ИМЯ3',
      surname: 'ФАМИЛИЯ3',
      descriptionOne: 'Тут будет небольшой текст о деятельности сотрудника.',
      descriptionTwo: 'Тут будет небольшой текст о деятельности сотрудника.',
      image: 'img/person-team-3.jpg'
    },
    {
      name: 'ИМЯ4',
      surname: 'ФАМИЛИЯ4',
      descriptionOne: 'Тут будет небольшой текст о деятельности сотрудника.',
      descriptionTwo: 'Тут будет небольшой текст о деятельности сотрудника.',
      image: 'img/person-team-4.jpg'
    },
    {
      name: 'ИМЯ5',
      surname: 'ФАМИЛИЯ5',
      descriptionOne: 'Тут будет небольшой текст о деятельности сотрудника.',
      descriptionTwo: 'Тут будет небольшой текст о деятельности сотрудника.',
      image: 'img/person-team-2.jpg'
    },
    {
      name: 'ИМЯ6',
      surname: 'ФАМИЛИЯ6',
      descriptionOne: 'Тут будет небольшой текст о деятельности сотрудника.',
      descriptionTwo: 'Тут будет небольшой текст о деятельности сотрудника.',
      image: 'img/person-team-3.jpg'
    }
  ];

  const carousel = document.querySelector('#teamSlider');
  const carouselInner = carousel.querySelector('.carousel-inner');

  function createMemberCard(member, index, isTablet) {
    const isReversed = (isTablet && index % 2 !== 0) || (!isTablet && (Math.floor(index / 2) % 2 !== 0));
    const contentHtml = `
          <div class="col-12 col-md-6 p-0 ${isReversed ? 'order-md-2' : ''}">
            <div class="card-body d-flex flex-column h-100 mb-3 mb-md-0 ${isReversed ? '' : 'me-0 me-md-3'}">
              <h5 class="card-title h3 text-uppercase lh-1">
                ${member.surname}
                <span class="color-accent d-block">${member.name}</span>
              </h5>
              <div >
                <p class="card-text">${member.descriptionOne}</p>
                <p class="card-text">${member.descriptionTwo}</p>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 ps-0 ${isReversed ? 'order-md-1 pe-3' : ''}">
            <img src="${member.image}" alt="${member.name} ${member.surname}" class="img-fluid h-100 w-100 object-fit-cover"/>
          </div>
        `;

    return `
          <div class="col-lg-6 col-12 card-wrapper">
            <div class="card d-flex flex-column flex-md-row align-items-stretch justify-content-between h-100">
              ${contentHtml}
            </div>
          </div>
        `;
  }

  function updateCarousel() {
    const windowWidth = window.innerWidth;
    carouselInner.innerHTML = '';

    if (windowWidth >= 992) {
      // ПК версия (максимум 4 карточки на слайд)
      for (let i = 0; i < teamMembers.length; i += 4) {
        const slide = document.createElement('div');
        slide.className = `carousel-item${i === 0 ? ' active' : ''}`;
        const slideMembers = teamMembers.slice(i, i + 4);
        slide.innerHTML = `<div class="row g-4">${slideMembers.map((member, index) => createMemberCard(member, i + index, false)).join('')}</div>`;
        carouselInner.appendChild(slide);
      }
    } else if (windowWidth >= 768) {
      // Планшет версия (2 карточки на слайд)
      for (let i = 0; i < teamMembers.length; i += 2) {
        const slide = document.createElement('div');
        slide.className = `carousel-item${i === 0 ? ' active' : ''}`;
        const slideMembers = teamMembers.slice(i, i + 2);
        slide.innerHTML = `<div class="row g-4">${slideMembers.map((member, index) => createMemberCard(member, i + index, true)).join('')}</div>`;
        carouselInner.appendChild(slide);
      }
    } else {
      // Мобильная версия (1 карточка на слайд)
      teamMembers.forEach((member, index) => {
        const slide = document.createElement('div');
        slide.className = `carousel-item${index === 0 ? ' active' : ''}`;
        slide.innerHTML = createMemberCard(member, index, false);
        carouselInner.appendChild(slide);
      });
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
});

