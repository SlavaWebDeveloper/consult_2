document.addEventListener("DOMContentLoaded", function () {
  const videoModal = document.getElementById("videoModal");
  const videoIframe = document.getElementById("modalVideoIframe");
  const videoContainer = document.querySelector(".video-container");

  function openModal(videoUrl) {
    if (videoUrl) {
      videoIframe.src = `${videoUrl}?autoplay=1`;
      videoModal.removeAttribute("aria-hidden");

      const modalInstance = new bootstrap.Modal(videoModal);
      modalInstance.show();
    }
  }

  document.querySelectorAll(".video-trigger").forEach(element => {
    element.addEventListener("click", function () {
      const videoUrl = this.getAttribute("data-video-url");
      openModal(videoUrl);
    });
  });

  videoModal.addEventListener("click", function (event) {
    if (!videoContainer.contains(event.target)) {
      const modalInstance = bootstrap.Modal.getInstance(videoModal);
      modalInstance.hide();
    }
  });

  videoModal.addEventListener("hidden.bs.modal", function () {
    videoIframe.src = ""; // Очищаем src
    videoModal.setAttribute("aria-hidden", "true");

    // Удаляем backdrop вручную
    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) {
      backdrop.remove();
    }
    const bodyDocument = document.body;

    if (bodyDocument) {
      bodyDocument.removeAttribute('style');
    }
    document.body.classList.remove("modal-open"); // Убираем класс, если он остался

  });
});
