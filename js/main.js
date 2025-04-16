/**
 * Main JavaScript file for portfolio website
 */

import { initHero3DBackground } from '@effects';
import { initAIAssistant } from '@assistant';
import { initAnimations } from '@animations';
import { createIntersectionObserver } from '@utils';

/**
 * Initialize the website when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  // Get current page
  const currentPage = getCurrentPage();
  
  // Initialize components based on current page
  switch (currentPage) {
    case 'index':
      // Initialize 3D background for hero section on home page
      initHero3DBackground();
      break;
    case 'projects':
      // Setup intersection observers for project cards
      setupProjectAnimations();
      break;
    case 'about':
      // Setup animations for about page
      setupAboutAnimations();
      break;
    case 'contact':
      // Setup form submission
      setupContactForm();
      break;
  }
  
  // Initialize AI assistant on all pages
  initAIAssistant();
  
  // Initialize animations
  initAnimations();
  
  // Setup intersection observers for scroll animations on all pages
  setupScrollAnimations();
  
  // Setup header scroll effect
  setupScrollHeader();
});

/**
 * Get current page name from URL
 * @returns {string} - Current page name
 */
function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split('/').pop();
  
  if (!page || page === '' || page === 'index.html') {
    return 'index';
  }
  
  return page.replace('.html', '');
}

/**
 * Setup animations for project cards
 */
function setupProjectAnimations() {
  // Animate project cards when they enter the viewport
  createIntersectionObserver('.project-card', (card) => {
    setTimeout(() => {
      card.classList.add('visible');
    }, 300);
  });
}

/**
 * Setup animations for about page
 */
function setupAboutAnimations() {
  // Animate skills when they enter the viewport
  createIntersectionObserver('.skill', (skill) => {
    setTimeout(() => {
      skill.classList.add('visible');
    }, 100);
  });
}

/**
 * Setup contact form submission
 */
function setupContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send the form data to a server
      // For demo purposes, we'll just log it to the console
      console.log('Form submitted:', { name, email, message });
      
      // Show success message
      alert('Thank you for your message! I will get back to you soon.');
      
      // Reset form
      contactForm.reset();
    });
  }
}

/**
 * Setup intersection observers for scroll animations
 */
function setupScrollAnimations() {
  // Animate sections when they enter the viewport
  createIntersectionObserver('section', (section) => {
    section.classList.add('visible');
  });
}

/**
 * Set up header color change on scroll
 */
function setupScrollHeader() {
  const header = document.querySelector('header');
  const scrollThreshold = 50; // Change this value to adjust when the header changes color
  
  // Check scroll position on page load
  checkScroll();
  
  // Add scroll event listener
  window.addEventListener('scroll', checkScroll);
  
  function checkScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
} 