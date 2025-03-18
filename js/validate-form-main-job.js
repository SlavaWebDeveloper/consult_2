const errorMessagesText = {
  required: "Это поле обязательно для заполнения",
  email: "Введите, пожалуйста, корректный email",
  tel: "Введите, пожалуйста, корректный номер телефона"
};

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const form = event.target;
      const inputs = form.querySelectorAll("input");
      let formIsValid = true;
      let formData = {};

      // Очищаем старые ошибки
      inputs.forEach(input => {
        const errorMessage = input.nextElementSibling?.nextElementSibling;
        if (errorMessage) {
          errorMessage.textContent = "";
        }
        input.classList.remove("error");
      });

      // Проверяем все поля формы
      inputs.forEach(input => {
        if (!validateField(input)) {
          formIsValid = false;
        }
        if (input.name) {
          formData[input.name] = input.value.trim();
        }
      });

      // Если форма валидна, показываем сообщение и очищаем поля
      if (formIsValid) {
        successMessage.classList.add("show");

        setTimeout(() => {
          successMessage.classList.remove("show");
          inputs.forEach(input => (input.value = ""));
        }, 2000);

        console.log("Отправленные данные:", formData);

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

  // Функция для показа ошибки
  function showError(input, errorMessage, message) {
    if (errorMessage) {
      errorMessage.textContent = message;
    }
    input.classList.add("error");
  }
});
