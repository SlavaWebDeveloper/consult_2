const errorMessagesText = {
  required: "Это поле обязательно для заполнения",
  email: "Введите, пожалуйста, корректный email",
  tel: "Введите, пожалуйста, корректный номер телефона"
};

const contactForm = document.getElementById("contactForm")
const contactModal = document.getElementById("contactModal")

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Останавливаем стандартное поведение формы

    const form = event.target;
    const inputs = form.querySelectorAll("input");
    const textArea = form.querySelectorAll("textarea");
    const success = document.getElementById("successMessage");

    let formIsValid = true;
    let formData = {};

    // Очищаем старые ошибки
    inputs.forEach(input => {
      const errorMessage = input.nextElementSibling?.nextElementSibling;
      if (errorMessage) {
        errorMessage.textContent = ""; // Очищаем текст ошибки
      }
      input.classList.remove("error");
    });

    // Проверяем все поля формы
    inputs.forEach(input => {
      if (!validateField(input)) {
        formIsValid = false;
      }

      // Заполняем formData только если у input есть name
      if (input.name) {
        formData[input.name] = input.value.trim();
      }
    });

    // Обрабатываем textarea
    textArea.forEach(text => {
      if (text.name) {
        formData[text.name] = text.value.trim();
      }
    });

    // Если форма валидна, отправляем (например, через AJAX)
    if (formIsValid) {
      success.classList.add("show");

      setTimeout(() => {
        success.classList.remove('show');
        inputs.forEach(input => {
          input.value = ""
        })
        textArea.forEach(input => {
          input.value = ""
        })
      }, 2000)

      console.log(formData);

      /*
      fetch('/path/to/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch((error) => console.error('Error:', error));
      */
    }
  });
}

if (contactModal) {
  contactModal.addEventListener("submit", function (event) {
    event.preventDefault(); // Останавливаем стандартное поведение формы

    const form = event.target;
    const inputs = form.querySelectorAll("input");
    const textArea = form.querySelectorAll("textarea");
    const success = document.getElementById("successMessage");

    let formIsValid = true;
    let formData = {};

    // Очищаем старые ошибки
    inputs.forEach(input => {
      const errorMessage = input.nextElementSibling?.nextElementSibling;
      if (errorMessage) {
        errorMessage.textContent = ""; // Очищаем текст ошибки
      }
      input.classList.remove("error");
    });

    // Проверяем все поля формы
    inputs.forEach(input => {
      if (!validateField(input)) {
        formIsValid = false;
      }

      // Заполняем formData только если у input есть name
      if (input.name) {
        formData[input.name] = input.value.trim();
      }
    });

    // Обрабатываем textarea
    textArea.forEach(text => {
      if (text.name) {
        formData[text.name] = text.value.trim();
      }
    });

    // Если форма валидна, отправляем (например, через AJAX)
    if (formIsValid) {
      success.classList.add("show");

      setTimeout(() => {
        success.classList.remove('show');
        inputs.forEach(input => {
          input.value = ""
        })
        textArea.forEach(input => {
          input.value = ""
        })
      }, 2000)

      console.log(formData);

      /*
      fetch('/path/to/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch((error) => console.error('Error:', error));
      */
    }
  });
}


// Универсальная функция валидации
function validateField(input) {
  const errorMessage = input.nextElementSibling?.nextElementSibling;
  let isValid = true;
  let message = "";

  if (!input.value.trim()) {
    message = errorMessagesText.required;
    isValid = false;
  } else if (input.type === "email" && !/\S+@\S+\.\S+/.test(input.value)) {
    message = errorMessagesText.email;
    isValid = false;
  } else if (input.type === "tel" && !/^\+?\d{1,4}?\s?\(?\d{1,4}?\)?\s?\d{1,4}?\s?\d{1,4}$/.test(input.value)) {
    message = errorMessagesText.tel;
    isValid = false;
  }

  if (!isValid) {
    showError(input, errorMessage, message);
  }

  return isValid;
}

// Функция для показа ошибки с анимацией
function showError(input, errorMessage, message) {
  errorMessage.textContent = message;
  input.classList.add("error");
}

// Функция для адаптивного увеличения высоты textArea 
document.addEventListener("DOMContentLoaded", () => {
  const textareas = document.querySelectorAll("textarea");

  textareas.forEach(textarea => {
    textarea.style.overflow = "hidden"; // Скрываем скролл
    textarea.style.resize = "none"; // Отключаем возможность изменения размера пользователем

    const adjustHeight = (el) => {
      el.style.height = "auto"; // Сбрасываем высоту
      el.style.height = `${el.scrollHeight}px`; // Устанавливаем высоту, равную содержимому
    };

    // Применяем начальную высоту
    adjustHeight(textarea);

    // Добавляем обработчик события для ввода текста
    textarea.addEventListener("input", () => adjustHeight(textarea));
  });
});