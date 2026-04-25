document.addEventListener("DOMContentLoaded", function () {
  const roles = [
    "Full-stack Developer",
    "JavaScript Engineer",
    "Python Developer",
    "video editor",
    "screenwriter",
    "video operator",
    "designer",
    "photographer",
    "3D master",
  ];
  let currentIndex = 0;
  const roleElement = document.getElementById("developer-role");
  const typeSpeed = 100;

  function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
      roleElement.innerHTML =
        text.substring(0, i + 1) + '<span class="blinking-cursor">|</span>';
      setTimeout(() => typeWriter(text, i + 1, fnCallback), typeSpeed);
    } else if (typeof fnCallback === "function") {
      setTimeout(fnCallback, 2000);
    }
  }

  function startTextAnimation(i) {
    if (i >= roles.length) i = 0;
    typeWriter(roles[i], 0, () => startTextAnimation(i + 1));
  }

  startTextAnimation(currentIndex);

  // Icon frame interaction
  const icons = document.querySelectorAll(".icon");
  const networkIcons = document.querySelectorAll(".network-icon .icon");
  const activeFrame = document.createElement("div");
  activeFrame.classList.add("frame");
  document.querySelector(".icon-container").appendChild(activeFrame);

  icons.forEach((icon) => {
    icon.addEventListener("click", function () {
      if (![...networkIcons].includes(icon)) {
        icons.forEach((i) => {
          i.classList.remove("active");
          i.style.transform = "scale(1)";
        });
        icon.classList.add("active");
        icon.style.transform = "scale(1.2)";
        const iconPos = icon.getBoundingClientRect();
        const containerPos = document
          .querySelector(".icon-container")
          .getBoundingClientRect();
        activeFrame.style.left = iconPos.left - containerPos.left + 4 + "px";
        activeFrame.style.display = "block";
      }
    });

    icon.addEventListener("mouseover", () => {
      if (
        ![...networkIcons].includes(icon) &&
        !icon.classList.contains("active")
      ) {
        icon.style.transform = "translateY(-5px)";
      }
    });

    icon.addEventListener("mouseout", () => {
      if (
        ![...networkIcons].includes(icon) &&
        !icon.classList.contains("active")
      ) {
        icon.style.transform = "translateY(0)";
      }
    });
  });

  networkIcons.forEach((icon) => {
    icon.addEventListener("mouseover", () => {
      icon.style.fill = "#eeb6b6";
      icon.style.transform = "scale(0.9)";
    });

    icon.addEventListener("mouseout", () => {
      icon.style.fill = "rgb(196, 0, 0)";
      icon.style.transform = "scale(1)";
    });
  });

  // Navigation windows
  const navIcons = document.querySelectorAll(".icons-list-skils li");
  const windows = document.querySelectorAll(".window");

  navIcons.forEach((icon, index) => {
    icon.addEventListener("click", () => {
      windows.forEach((window) => window.classList.remove("active"));
      const targetId = ["home", "projects", "information", "rating", "order"][
        index
      ];
      document.getElementById(targetId).classList.add("active");
    });
  });

  // Video playback rate
  const portfolioVideo = document.querySelector(".video-portfolio video");
  if (portfolioVideo) portfolioVideo.playbackRate = 0.2;

  const backgroundVideo = document.querySelector(".background-video");
  if (backgroundVideo) backgroundVideo.playbackRate = 0.5;
});

document.addEventListener("DOMContentLoaded", function () {
  const rellax = new Rellax(".some-element");
});

document.querySelectorAll(".icon-clas-skils").forEach((icon) => {
  icon.addEventListener("click", () => {
    const svg = icon.querySelector(".neon-icon");
    svg.classList.add("crazy");
    setTimeout(() => {
      svg.classList.remove("crazy");
    }, 600);
  });
});

document.querySelectorAll(".icon-clas-skils").forEach((icon) => {
  icon.addEventListener("click", () => {
    const isActive = icon.classList.contains("active");

    document.querySelectorAll(".icon-clas-skils").forEach((i) => {
      i.classList.remove("active", "inactive");
    });

    if (!isActive) {
      icon.classList.add("active");
      document.querySelectorAll(".icon-clas-skils").forEach((i) => {
        if (!i.classList.contains("active")) {
          i.classList.add("inactive");
        }
      });
    }
  });
});

// Паралакс для іконок навичок
(function setupSkillsParallax() {
  const skillsIcons = document.querySelectorAll(".icon-clas-skils");
  const skillsSection = document.querySelector(".artem-skils");
  const stickyWrapper = skillsSection
    ? skillsSection.closest(".sticky-wrapper")
    : null;
  if (!skillsIcons.length || !skillsSection) return;
  let skillsAnimated = false;
  // У файлі script.js змініть частину функції updateIconPositions:

  function updateIconPositions() {
    const viewportHeight = window.innerHeight;

    // 1. Уповільнення початкової появи (змініть 0.6s на 1.2s)
    if (!skillsAnimated) {
      const sectionRect = skillsSection.getBoundingClientRect();
      if (sectionRect.top < viewportHeight * 0.85 && sectionRect.bottom > 0) {
        skillsAnimated = true;
        skillsIcons.forEach((icon, index) => {
          setTimeout(() => {
            icon.style.opacity = "1";
            icon.style.transform = "translateX(0px) translateY(0px) scale(1)";
            // Збільшено час з 0.6s до 1.2s для плавності
            icon.style.transition = "transform 1.2s ease, opacity 1.0s ease";
          }, index * 250); // Збільшено інтервал між іконками з 150 до 250
        });
      }
    }

    // 2. Уповільнення руху при скролі
    if (skillsAnimated && stickyWrapper) {
      const wrapperRect = stickyWrapper.getBoundingClientRect();
      // Збільште знаменник або додайте коефіцієнт, щоб "розтягнути" анімацію
      // Наприклад, множник 1.5 або 2 зробить рух іконок менш різким щодо руху миші
      let progress =
        (viewportHeight - wrapperRect.top) / (wrapperRect.offsetHeight * 1.5);
      progress = Math.max(0, Math.min(1, progress));

      skillsIcons.forEach((icon) => {
        const isActive = icon.classList.contains("active");
        icon.style.transition = "none";

        // Тут можна зменшити амплітуду translateX/Y, щоб вони менше "тікали"
        const moveX = isActive ? -20 : 0;
        const moveY = isActive ? -10 : progress * 20; // Додано м'який рух від скролу

        icon.style.transform = `translateX(${moveX}px) translateY(${moveY}px) scale(${isActive ? 1.4 : 1})`;
      });
    }
  }
  window.addEventListener("scroll", () =>
    requestAnimationFrame(updateIconPositions),
  );
  window.addEventListener("resize", updateIconPositions);
  updateIconPositions();
})();

// Інші елементи з IntersectionObserver
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
      } else {
        entry.target.classList.remove("reveal-visible");
      }
    });
  },
  {
    threshold: 0.1,
  },
);

document
  .querySelectorAll(".scroll-left, .scroll-right, .scroll-fade")
  .forEach((el) => {
    observer.observe(el);
  });

window.addEventListener("scroll", () => {
  const section = document.querySelector(".artem-skils");
  const overlay = document.querySelector(".gradient-overlay-info");

  const sectionBottom = section.offsetTop + section.offsetHeight;
  const scrollPosition = window.scrollY + window.innerHeight;

  if (scrollPosition >= sectionBottom) {
    overlay.classList.add("active");
  } else {
    overlay.classList.remove("active");
  }
});

const btn = document.getElementById("flipBtn");
btn.addEventListener("click", (e) => {
  const orig = document.querySelector(".flip-box");
  const parent = orig.parentElement;

  // Видаляємо попередній оверлей, якщо він є
  const existing = parent.querySelector(".flip-overlay");
  if (existing) {
    existing.remove();
    orig.style.visibility = "";
    return;
  }

  // Ховаємо оригінал
  orig.style.visibility = "hidden";

  // Отримуємо координати кнопки
  const rect = e.currentTarget.getBoundingClientRect();
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

  // Створюємо оверлей
  const overlay = document.createElement("div");
  overlay.className = "flip-overlay";
  overlay.style.top = rect.top + scrollTop - 150 + "px"; // трохи вище кнопки
  overlay.style.left = rect.left + scrollLeft - 200 + "px"; // центруємо
  overlay.style.width = "400px";
  overlay.style.height = "350px";

  overlay.innerHTML = `
    <button class="flip-back-btn" aria-label="Close">×</button>
    <div class="overlay-flipper">
      <div class="overlay-front">
        ${orig.innerHTML}
      </div>
      <div class="overlay-back">
        <button class="back-btn" data-file="https://servers-resume-artem.netlify.app/files/Artem_Pivtorak_Fullstack developer.jpg">Download jpg</button>
        <button class="back-btn" data-file="https://servers-resume-artem.netlify.app/files/Artem_Pivtorak_Fullstack developer.png">Download png</button>
        <button class="back-btn" data-file="https://servers-resume-artem.netlify.app/files/Artem_Pivtorak_Fullstack developer.rar">Download rar</button>
        <button class="back-btn" data-file="https://servers-resume-artem.netlify.app/files/Artem_Pivtorak_Fullstack developer.pdf">Download pdf</button>
      </div>
    </div>
  `;

  parent.appendChild(overlay);

  // Обробники кнопок завантаження
  overlay.querySelectorAll(".back-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const a = document.createElement("a");
      a.href = btn.dataset.file;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  });

  // Закриття оверлею
  const backBtn = overlay.querySelector(".flip-back-btn");
  backBtn.addEventListener("click", () => {
    const flipper = overlay.querySelector(".overlay-flipper");
    flipper.classList.remove("flipped");
    flipper.addEventListener(
      "transitionend",
      () => {
        overlay.remove();
        orig.style.visibility = "";
      },
      { once: true },
    );
  });

  // Запускаємо анімацію перевороту
  requestAnimationFrame(() => {
    overlay.querySelector(".overlay-flipper").classList.add("flipped");
  });
});

// Іконки скілів пливуть справа наліво по скролу
(function setupScrollImagesAnimation() {
  const scrollImages = document.querySelector(".scroll-images");
  if (!scrollImages) return;
  gsap.set(scrollImages, { x: window.innerWidth });
  gsap.to(scrollImages, {
    x: -scrollImages.scrollWidth,
    ease: "none",
    scrollTrigger: {
      trigger: ".gradient-overlay-info",
      start: "top bottom", // починаємо, коли верх секції торкається низу екрану
      end: "bottom top+=50%", // закінчуємо пізніше – додаємо 100% висоти viewport
      scrub: 3, // більше значення = плавніше, з більшою інерцією
    },
  });
  window.addEventListener("resize", () => {
    gsap.set(scrollImages, { x: window.innerWidth });
    ScrollTrigger.refresh();
  });
})();

gsap.to(".scroll-bg", {
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  background: "rgba(0,0,0,0.25)",
  ease: "none",
  scrollTrigger: {
    trigger: ".gradient-overlay-info",
    start: "center center",
    end: "bottom top",
    scrub: 1.5,
  },
});

gsap.to(".skills-label", {
  opacity: 1,
  y: 0, // або інша анімація
  scrollTrigger: {
    trigger: ".gradient-overlay-info",
    start: "top bottom+=-120%", // коли верх секції доходить до низу viewport
    end: "bottom top", // кінець скролу
    scrub: true,
  },
});

function openOverlay(type) {
  const overlay = document.getElementById("overlay");
  const content = document.getElementById("overlay-content");

  fetch('https://servers-resume-artem.netlify.app/projects')
    .then(res => res.json())
    .then(data => {
      const projects = data[type] || [];
      let html = "";

      if (type === "programming" || type === "photo") {
        html = '<div class="projects-list">';
        projects.forEach(project => {
          let imagesHtml = '';
          if (project.images) {
            project.images.forEach((img, i) => {
              imagesHtml += `<img src="https://servers-resume-artem.netlify.app/${img}" alt="${i + 1}">\n`;
            });
          }

          html += `
<div class="project-block">
  <h3 class="project-title">${project.title}</h3>
  <div class="project-inner">
    <div class="image-slider-wrapper">
      <button class="slider-arrow left-arrow">←</button>
      <div class="image-slider-container">
        <div class="image-slider">
          ${imagesHtml}
        </div>
      </div>
      <button class="slider-arrow right-arrow">→</button>
    </div>
    ${project.github ? `
    <a href="${project.github}" target="_blank" class="github-button">
      View on GitHub
    </a>` : ''}
    <div class="project-details">
      <p class="project-description">${project.description}</p>
    </div>
  </div>
</div>`;
        });
        html += '</div>';

      } else if (type === "video") {
        html = '<div class="video-list">';
        projects.forEach(project => {
          html += `
    <div class="video-item">
      ${project.youtube_url ? `
        <div class="youtube-container" style="text-align: center; margin-bottom: 15px;">
          <a href="${project.youtube_url}" target="_blank" style="display: inline-block; padding: 12px 24px; background: #ff0000; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold; font-family: sans-serif; transition: 0.3s; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
             ▶ Open in Youtube
          </a>
        </div>
      ` : ''}
      <h2 class="video-title">${project.title}</h2>
      <p class="video-description">${project.description}</p>
    </div>`;
        });
        html += '</div>';
      }

      content.innerHTML = html;
      overlay.classList.add("show");

      const allSliderImages = document.querySelectorAll(".image-slider img");
      let modalImages = [];
      let currentModalIndex = 0;

      allSliderImages.forEach((img, i) => {
        img.addEventListener("click", () => {
          modalImages = Array.from(img.parentElement.querySelectorAll("img"));
          currentModalIndex = modalImages.indexOf(img);

          const modal = document.getElementById("image-modal");
          const modalImg = modal.querySelector(".modal-image");
          modalImg.src = modalImages[currentModalIndex].src;
          modal.classList.add("show");
        });
      });

      const modal = document.getElementById("image-modal");
      const modalImg = modal.querySelector(".modal-image");
      const closeBtn = modal.querySelector(".modal-close");
      const leftBtn = modal.querySelector(".modal-left");
      const rightBtn = modal.querySelector(".modal-right");

      const newCloseBtn = closeBtn.cloneNode(true);
      closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
      const newLeftBtn = leftBtn.cloneNode(true);
      leftBtn.parentNode.replaceChild(newLeftBtn, leftBtn);
      const newRightBtn = rightBtn.cloneNode(true);
      rightBtn.parentNode.replaceChild(newRightBtn, rightBtn);

      newCloseBtn.addEventListener("click", () => modal.classList.remove("show"));

      newLeftBtn.addEventListener("click", () => {
        if(modalImages.length > 0) {
          currentModalIndex = (currentModalIndex - 1 + modalImages.length) % modalImages.length;
          modalImg.src = modalImages[currentModalIndex].src;
        }
      });

      newRightBtn.addEventListener("click", () => {
        if(modalImages.length > 0) {
          currentModalIndex = (currentModalIndex + 1) % modalImages.length;
          modalImg.src = modalImages[currentModalIndex].src;
        }
      });

      const sliders = document.querySelectorAll(".image-slider-wrapper");

      sliders.forEach((wrapper) => {
        const slider = wrapper.querySelector(".image-slider");
        const images = slider.querySelectorAll("img");
        let index = 0;

        const updateSlider = () => {
          if (images.length > 0) {
            const slideWidth = images[0].offsetWidth;
            slider.style.transform = `translateX(-${index * slideWidth}px)`;
          }
        };

        const leftBtnNav = wrapper.querySelector(".left-arrow");
        const rightBtnNav = wrapper.querySelector(".right-arrow");

        if (leftBtnNav && rightBtnNav) {
          leftBtnNav.addEventListener("click", () => {
            index = Math.max(0, index - 1);
            updateSlider();
          });

          rightBtnNav.addEventListener("click", () => {
            index = Math.min(images.length - 1, index + 1);
            updateSlider();
          });
        }

        window.addEventListener("resize", updateSlider);
        setTimeout(updateSlider, 50);
      });
    })
    .catch(err => console.error('Failed to load projects', err));
}


function closeOverlay() {
  const overlay = document.getElementById("overlay");
  overlay.classList.remove("show");
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Message sent successfully!");
          form.reset();
        } else {
          alert("Error sending. Please check the data.");
        }
      })
      .catch((error) => {
        alert("Network error.");
        console.error(error);
      });
  });
});

const btn2 = document.getElementById("flipBtn2");
btn2.addEventListener("click", (e) => {
  const orig = btn2.closest(".flip-box");
  const parent = orig.parentElement;

  const existing = parent.querySelector(".flip-overlay");
  if (existing) {
    existing.remove();
    orig.style.visibility = "";
    return;
  }

  orig.style.visibility = "hidden";

  const rect = e.currentTarget.getBoundingClientRect();
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

  const overlay = document.createElement("div");
  overlay.className = "flip-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = rect.top + rect.height / 2 - 175 + "px";
  overlay.style.left = rect.left + rect.width / 2 - 200 + "px";
  overlay.style.width = "400px";
  overlay.style.height = "350px";

  overlay.innerHTML = `
    <button class="flip-back-btn" aria-label="Close">×</button>
    <div class="overlay-flipper">
      <div class="overlay-front">
        ${orig.innerHTML}
      </div>
      <div class="overlay-back">
        <button class="back-btn" data-file="https://servers-resume-artem.netlify.app/files/Another_Resume.jpg">Download jpg</button>
        <button class="back-btn" data-file="https://servers-resume-artem.netlify.app/files/Another_Resume.pdf">Download pdf</button>
      </div>
    </div>
  `;

  parent.appendChild(overlay);

  overlay.querySelectorAll(".back-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const a = document.createElement("a");
      a.href = btn.dataset.file;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  });

  const backBtn = overlay.querySelector(".flip-back-btn");
  backBtn.addEventListener("click", () => {
    const flipper = overlay.querySelector(".overlay-flipper");
    flipper.classList.remove("flipped");
    flipper.addEventListener(
      "transitionend",
      () => {
        overlay.remove();
        orig.style.visibility = "";
      },
      { once: true },
    );
  });

  requestAnimationFrame(() => {
    overlay.querySelector(".overlay-flipper").classList.add("flipped");
  });
});

(function adaptiveScaleFix() {
  const site = document.querySelector(".site");
  const wrapper = document.querySelector(".site-viewport") || document.body;
  if (!site || !wrapper) return;

  function update() {
    const vw = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0,
    );
    const dpr = window.devicePixelRatio || 1;

    // container width logic (підкоригуй, якщо у тебе інші значення)
    let containerWidth;
    if (vw >= 601) containerWidth = 1024;
    else containerWidth = 600;

    // scale (завжди <= 1)
    const rawScale = Math.min(1, vw / containerWidth);

    // Щоб уникнути субпіксельних артефактів при DPR > 1,
    // округлюємо масштаб до кроку 1/(dpr*100) або близько того.
    // Це зменшує дробові width після множення.
    const precision = Math.max(100, Math.round(dpr * 100)); // чим більший DPR, тим більша точність
    const scale = Math.floor(rawScale * precision) / precision;

    // scaledWidth в цілих пікселях (округлення важливе)
    const scaledWidth = Math.round(containerWidth * scale);

    // padding в цілих пікселях, щоб центр візуального блоку не обрізався
    const pad = Math.max(0, Math.round((vw - scaledWidth) / 2));

    // застосування: zoom (для Chrome/Edge/Safari) + transform як fallback
    site.style.zoom = scale; // non-standard, але корисний в Blink/WebKit
    site.style.transformOrigin = "top left";
    site.style.transform = `scale(${scale})`;

    // wrapper paddings - центруємо візуальний блок і компенсуємо обріз
    wrapper.style.paddingLeft = pad + "px";
    wrapper.style.paddingRight = pad + "px";
    wrapper.style.overflowX = "hidden";

    // debug лог (прибери в продакшн або коментуй)
    //console.log({ vw, dpr, containerWidth, rawScale, scale, scaledWidth, pad });
  }

  window.addEventListener("resize", update, { passive: true });
  window.addEventListener("orientationchange", update);
  update();
})();
