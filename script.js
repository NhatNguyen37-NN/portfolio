document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const links = document.querySelectorAll("a.page-link");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sectionLinks = document.querySelectorAll("main section[id]");

  const refreshNavActive = () => {
    const scrollPosition = window.scrollY + window.innerHeight * 0.35;
    let currentSection = sectionLinks.length ? sectionLinks[0].id : null;

    sectionLinks.forEach((section) => {
      if (section.offsetTop <= scrollPosition) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#") && currentSection) {
        link.classList.toggle("active", href === `#${currentSection}`);
      } else {
        link.classList.toggle("active", link.href === window.location.href || window.location.pathname.endsWith(href || ""));
      }
    });
  };

  refreshNavActive();
  window.addEventListener("scroll", refreshNavActive, { passive: true });

  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      if (link.target === "_blank" || link.href.startsWith("mailto:")) return;
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        event.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.pushState(null, "", href);
        }
        return;
      }

      event.preventDefault();
      body.classList.add("fade-exit");
      const nextUrl = href;
      setTimeout(() => {
        window.location.href = nextUrl;
      }, 260);
    });
  });

  // Mouse follow lighting effect for cards
  document.querySelectorAll('.feature-card, .project-card').forEach(card => {
    const lightSpot = document.createElement('div');
    lightSpot.className = 'light-spot';
    card.appendChild(lightSpot);

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      lightSpot.style.left = `${x - 100}px`;
      lightSpot.style.top = `${y - 100}px`;
    });

    card.addEventListener('mouseleave', () => {
      lightSpot.style.opacity = '0';
    });

    card.addEventListener('mouseenter', () => {
      lightSpot.style.opacity = '1';
    });
  });

  // Enhanced scroll animations with stagger
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".hero-anim, .fade-up").forEach((section) => {
    observer.observe(section);
  });

  // Smooth parallax effect for the hero visual
  let lastScrollY = window.scrollY;
  const heroVisual = document.querySelector('.featured-visual');

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Parallax effect removed as per user request

    lastScrollY = currentScrollY;
  });

  // Enhanced modal functionality
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
        img.loading = "lazy";
        modalImages.appendChild(img);
      });
      modal.classList.add("open");
      document.body.style.overflow = "hidden";

      // Animate modal entrance
      setTimeout(() => {
        modal.style.transform = 'scale(1)';
      }, 10);
    });
  });

  modalClose?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  function closeModal() {
    modal.style.transform = 'scale(0.95)';
    setTimeout(() => {
      modal.classList.remove("open");
      document.body.style.overflow = "";
      modal.style.transform = '';
    }, 200);
  }

  // Keyboard navigation for accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('open')) {
      closeModal();
    }
  });

  // Performance optimization: throttle scroll events
  let scrollTimeout;
  const throttledScroll = () => {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        // Handle scroll-based animations here if needed
        scrollTimeout = null;
      }, 16); // ~60fps
    }
  };

  window.addEventListener('scroll', throttledScroll, { passive: true });
});
