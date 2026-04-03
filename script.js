'use strict';

// DOM Elements
const navbar = document.getElementById('mainNav');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const dropdownItems = document.querySelectorAll('.navbar__item.dropdown');

// ── Navbar Scroll Shadow ──────────────
function handleNavScroll() {
  const isScrolled = window.scrollY > 20;
  navbar?.classList.toggle('scrolled', isScrolled);
}

// ── Mobile Menu Toggle ─────────────────
function toggleMobileMenu() {
  const isOpen = mobileMenu?.hidden === false;
  mobileMenu.hidden = isOpen;
  hamburger?.setAttribute('aria-expanded', String(!isOpen));
}

// Close mobile menu when clicking a link
function closeMobileMenu() {
  mobileMenu.hidden = true;
  hamburger?.setAttribute('aria-expanded', 'false');
}


// Close mobile menu if clicking outside
function handleClickOutside(event) {
  const isClickInside =
    hamburger?.contains(event.target) ||
    mobileMenu?.contains(event.target);
  
  if (!isClickInside && !mobileMenu?.hidden) {
    closeMobileMenu();
  }
}

//  Dropdown Hover 
dropdownItems.forEach(item => {
  const dropdownMenu = item.querySelector('.dropdown__menu');
  let closeTimer = null;

  function openMenu() {
    clearTimeout(closeTimer);
    dropdownMenu.style.opacity = '1';
    dropdownMenu.style.pointerEvents = 'auto';
    dropdownMenu.style.transform = 'translateX(-50%) translateY(0)';
  }

  function closeMenu() {
    // Small delay so the pointer can travel into the dropdown
    closeTimer = setTimeout(() => {
      dropdownMenu.style.opacity = '0';
      dropdownMenu.style.pointerEvents = 'none';
      dropdownMenu.style.transform = 'translateX(-50%) translateY(6px)';
    }, 100);
  }

  item.addEventListener('mouseenter', openMenu);
  item.addEventListener('mouseleave', closeMenu);

  dropdownMenu.addEventListener('mouseenter', openMenu);
  dropdownMenu.addEventListener('mouseleave', closeMenu);
});


//Event Listeners 
function initEventListeners() {
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  hamburger?.addEventListener('click', toggleMobileMenu);
  mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMobileMenu));
  document.addEventListener('click', handleClickOutside);
}

// Initialization navbar shadow
function init() {
  handleNavScroll(); 
  initEventListeners();
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
