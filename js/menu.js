import { debounce } from "./debounce.js";

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("#header");

  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 150) {
      header.classList.remove("header-transparent");
    } else {
      header.classList.add("header-transparent");
    }
  };

  // Оборачиваем в debounce и вешаем обработчик на скролл
  const debouncedScroll = debounce(handleScroll, 200);
  window.addEventListener("scroll", debouncedScroll);

  // Вызываем функцию сразу, чтобы проверить текущее состояние
  handleScroll();
});