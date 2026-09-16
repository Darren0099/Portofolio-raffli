const roles = [
  "Frontend Developer.",
  "Human Resource.",
  "Graphic Designer.",
  "Data Analyst."
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById("typewriter");

function typeEffect() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentRole.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 400;
  }

  setTimeout(typeEffect, typeSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();

  const langToggle = document.getElementById("langToggle");
  if (langToggle) {
    langToggle.addEventListener("click", () => {
      langToggle.classList.toggle("en");
    });
  }

  const navLinks = document.querySelectorAll(".nav-item");
  
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    let currentScroll = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
        navLinks.forEach(item => {
          item.classList.remove("active");
          if (item.getAttribute("href") === "#" + sectionId) {
            item.classList.add("active");
          }
        });
      }
    });
  });

  const roadmapItems = document.querySelectorAll(".roadmap-item");
  const observerOptions = {
    threshold: 0.15
  };

  const roadmapObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  roadmapItems.forEach(item => {
    roadmapObserver.observe(item);
  });
});
