/**
 * Animation functions using GSAP
 */

/**
 * Animate elements when they enter the viewport
 * @param {HTMLElement} element - Element to animate
 */
export const fadeInUp = (element) => {
  gsap.from(element, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  });
};

/**
 * Staggered animation for multiple elements
 * @param {string} selector - CSS selector for elements to animate
 * @param {number} staggerTime - Time between each element animation
 */
export const staggerFadeIn = (selector, staggerTime = 0.1) => {
  const elements = document.querySelectorAll(selector);
  gsap.from(elements, {
    opacity: 0,
    y: 20,
    stagger: staggerTime,
    duration: 0.6,
    ease: "power1.out"
  });
};

/**
 * Animate project cards on hover
 * @param {HTMLElement} card - Project card element
 */
export const initProjectCardAnimation = (card) => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      scale: 1.03,
      boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
      duration: 0.3
    });
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      scale: 1,
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      duration: 0.3
    });
  });
};

/**
 * Initialize all animations
 */
export const initAnimations = () => {
  // Animate hero section
  gsap.from('.hero-content h1', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.2,
    ease: "power2.out"
  });
  
  gsap.from('.hero-content p', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.5,
    ease: "power2.out"
  });
  
  gsap.from('.cta-buttons', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.8,
    ease: "power2.out"
  });
  
  // Initialize project card animations
  document.querySelectorAll('.project-card').forEach(card => {
    initProjectCardAnimation(card);
  });
}; 