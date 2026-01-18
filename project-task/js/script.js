// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.style.overflow = navMenu.classList.contains("active")
      ? "hidden"
      : "";
  });

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
}

// Product Gallery
const galleryImages = [
  "./assets/bottle1.png",
  "./assets/bottle2.png",
  "./assets/bella.png",
  "./assets/bottle5.png",
  "./assets/bottle1.png",
  "./assets/bottle2.png",
  "./assets/bella.png",
  "./assets/bottle5.png"
];

let currentImageIndex = 0;
const mainImage = document.querySelector(".gallery-main-image");
const prevBtn = document.querySelector(".gallery-prev");
const nextBtn = document.querySelector(".gallery-next");
const dots = document.querySelectorAll(".gallery-dots .dot");
const thumbnails = document.querySelectorAll(".thumbnail");

function updateGallery(index) {
  currentImageIndex = index;
  if (mainImage) mainImage.src = galleryImages[index];

  // Update dots
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  // Update thumbnails
  thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle("active", i === index);
  });
}

// Arrow navigation
if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    currentImageIndex =
      (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGallery(currentImageIndex);
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateGallery(currentImageIndex);
  });
}

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    updateGallery(index);
  });
});

// Thumbnail navigation
thumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    updateGallery(index);
  });
});

// Add to Cart Dynamic URL
const productForm = document.getElementById("productForm");
const addToCartBtn = document.getElementById("addToCartBtn");

// URL mapping for all 9 variations (3 purchase types x 3 fragrances)
const cartUrls = {
  "single-original": "https://example.com/cart/single-original",
  "single-lily": "https://example.com/cart/single-lily",
  "single-rose": "https://example.com/cart/single-rose",
  "double-original": "https://example.com/cart/double-original",
  "double-lily": "https://example.com/cart/double-lily",
  "double-rose": "https://example.com/cart/double-rose",
  "onetime-original": "https://example.com/cart/onetime-original",
  "onetime-lily": "https://example.com/cart/onetime-lily",
  "onetime-rose": "https://example.com/cart/onetime-rose",
};

function updateCartUrl() {
  const subscription = document.querySelector('input[name="subscription"]:checked')?.value || "single";

  let fragrance = "original";
  if (subscription === "single") {
    fragrance = document.querySelector('input[name="fragrance-single"]:checked')?.value || "original";
  } else if (subscription === "double") {
    fragrance = document.querySelector('input[name="fragrance-double-1"]:checked')?.value || "original";
  } else if (subscription === "onetime") {
    fragrance = document.querySelector('input[name="fragrance-onetime"]:checked')?.value || "original";
  }

  const key = `${subscription}-${fragrance}`;

  if (addToCartBtn && cartUrls[key]) {
    addToCartBtn.href = cartUrls[key];

  }
}

// Update URL when selections change
if (productForm) {
  productForm.addEventListener("change", (e) => {
    if (e.target.name === "subscription" || e.target.name.startsWith("fragrance")) {
      updateCartUrl();
    }
  });

  updateCartUrl();
}

// Stats Counter Animation
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Intersection Observer for stats
const statsSection = document.getElementById("stats");
let statsAnimated = false;

if (statsSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          const statNumbers = document.querySelectorAll(".stat-number");

          statNumbers.forEach((stat) => {
            const target = parseInt(stat.getAttribute("data-target"));
            animateCounter(stat, target);
          });
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  statsObserver.observe(statsSection);
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (
      href !== "#" &&
      href !== "#facebook" &&
      href !== "#instagram" &&
      href !== "#x" &&
      href !== "#privacy"
    ) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// Add to Cart Click Handler
if (addToCartBtn) {
  addToCartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const subscription =
      document.querySelector('input[name="subscription"]:checked')?.value ||
      "single";

    let fragrance = "original";
    if (subscription === "single") {
      fragrance =
        document.querySelector('input[name="fragrance-single"]:checked')
          ?.value || "original";
    } else if (subscription === "double") {
      const frag1 =
        document.querySelector('input[name="fragrance-double-1"]:checked')
          ?.value || "original";
      const frag2 =
        document.querySelector('input[name="fragrance-double-2"]:checked')
          ?.value || "original";
      fragrance = `${frag1} & ${frag2}`;
    } else if (subscription === "onetime") {
      fragrance =
        document.querySelector('input[name="fragrance-onetime"]:checked')
          ?.value || "original";
    }

    alert(
      `Added to cart:\nSubscription: ${subscription}\nFragrance: ${fragrance}\n\nRedirecting to: ${addToCartBtn.href}`
    );
  });
}

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
});

document.querySelectorAll("section, .product-card, .collection-content, .footer").forEach((el) => {
  el.classList.add("fade-in-section");
  fadeObserver.observe(el);
});



