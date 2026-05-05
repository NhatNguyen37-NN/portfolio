document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const links = document.querySelectorAll("a.page-link");
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    if (link.href === window.location.href || window.location.pathname.endsWith(link.getAttribute("href"))) {
      link.classList.add("active");
    }
  });

  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      if (link.target === "_blank" || link.href.startsWith("mailto:")) return;
      event.preventDefault();
      body.classList.add("fade-exit");
      const nextUrl = link.getAttribute("href");
      setTimeout(() => {
        window.location.href = nextUrl;
      }, 260);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".hero-anim, .fade-up").forEach((section) => {
    observer.observe(section);
  });

  const modal = document.querySelector(".project-modal");
  const modalTitle = document.querySelector(".project-modal__title");
  const modalDesc = document.querySelector(".project-modal__desc");
  const modalProcess = document.querySelector(".project-modal__process");
  const modalImages = document.querySelector(".project-modal__images");
  const modalClose = document.querySelector(".project-modal__close");

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", function () {
      const title = card.dataset.title;
      const category = card.dataset.category;
      const description = card.dataset.description;
      const process = card.dataset.process;
      const images = card.dataset.images.split(",");
      modalTitle.textContent = title;
      modalDesc.textContent = description;
      modalProcess.textContent = process;
      modalImages.innerHTML = "";
      images.forEach((src) => {
        const img = document.createElement("img");
        img.src = src.trim();
        img.alt = title;
        modalImages.appendChild(img);
      });
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  modalClose?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
});
