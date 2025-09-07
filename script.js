// script.js
// Three.js 3D Background
function init3DBackground() {
  if (window.innerWidth <= 768) return; // Skip on mobile

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ alpha: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  document.querySelector(".hero-bg").appendChild(renderer.domElement);

  // Create floating particles
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const particles = [];

  for (let i = 0; i < 30; i++) {
    const material = new THREE.MeshBasicMaterial({
      color: Math.random() > 0.5 ? 0x667eea : 0x764ba2,
      transparent: true,
      opacity: 0.6,
    });

    const particle = new THREE.Mesh(geometry, material);
    particle.position.x = (Math.random() - 0.5) * 40;
    particle.position.y = (Math.random() - 0.5) * 40;
    particle.position.z = (Math.random() - 0.5) * 40;

    particle.rotation.x = Math.random() * Math.PI;
    particle.rotation.y = Math.random() * Math.PI;

    particle.userData = {
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      ),
    };

    scene.add(particle);
    particles.push(particle);
  }

  camera.position.z = 25;

  function animate() {
    requestAnimationFrame(animate);

    particles.forEach((particle) => {
      particle.rotation.x += 0.005;
      particle.rotation.y += 0.005;
      particle.position.add(particle.userData.velocity);

      if (Math.abs(particle.position.x) > 20)
        particle.userData.velocity.x *= -1;
      if (Math.abs(particle.position.y) > 20)
        particle.userData.velocity.y *= -1;
      if (Math.abs(particle.position.z) > 20)
        particle.userData.velocity.z *= -1;
    });

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// Mobile Navigation
function initMobileNav() {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
    }
  });
}

// Navbar scroll effect
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// Smooth scrolling
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Intersection Observer for animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    ".fade-in, .slide-in-left, .slide-in-right"
  );
  animatedElements.forEach((el) => observer.observe(el));
}

// Contact form handling
function initContactForm() {
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name");
    const submitBtn = form.querySelector(".submit-btn");
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    setTimeout(() => {
      alert(
        `Thank you, ${name}! Your message has been received. I'll get back to you soon.`
      );
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

// Parallax effect
function initParallaxEffect() {
  if (window.innerWidth > 768) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const heroContent = document.querySelector(".hero-content");
      if (heroContent) {
        const rate = scrolled * -0.3;
        heroContent.style.transform = `translateY(${rate}px)`;
      }
    });
  }
}

// Initialize all functionality
document.addEventListener("DOMContentLoaded", () => {
  init3DBackground();
  initMobileNav();
  initNavbarScroll();
  initSmoothScroll();
  initScrollAnimations();
  initContactForm();
  initParallaxEffect();
});

// Loading screen
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    if (mobileMenu.classList.contains("active")) {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
    }
  }
});

// Lightbox logic
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox .close");

// Add click event to all swiper images
document
  .querySelectorAll(".certificates-swiper .swiper-slide img")
  .forEach((img) => {
    img.addEventListener("click", () => {
      lightbox.style.display = "block";
      lightboxImg.src = img.src; // set clicked image
    });
  });

// Close lightbox when clicking the X
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Optional: close lightbox when clicking outside the image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});
