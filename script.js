// DOM Elements
const navbar = document.getElementById('mainNav');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const dropdownItems = document.querySelectorAll('.navbar__item.dropdown');

// Navbar Scroll Shadow
function handleNavScroll() {
  if (navbar) {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  if (mobileMenu && hamburger) {
    if (mobileMenu.hidden === false) {
      mobileMenu.hidden = true;
      hamburger.classList.remove('show');  
    } else {
      mobileMenu.hidden = false;
      hamburger.classList.add('show');     
    }
  }
}

// Close mobile menu
function closeMobileMenu() {
  if (mobileMenu && hamburger) {
    mobileMenu.hidden = true;
    hamburger.classList.remove('show');    
  }
}

// Close mobile menu when clicking outside
function handleClickOutside(event) {
  if (mobileMenu && !mobileMenu.hidden) {
    const isClickInside = (hamburger && hamburger.contains(event.target)) || 
                         (mobileMenu && mobileMenu.contains(event.target));
    
    if (!isClickInside) {
      closeMobileMenu();
    }
  }
}

// Dropdown Hover
dropdownItems.forEach(item => {
  const dropdownMenu = item.querySelector('.dropdown__menu');
  if (!dropdownMenu) return;
  
  let closeTimer = null;

  function openMenu() {
    clearTimeout(closeTimer);
    dropdownMenu.style.opacity = '1';
    dropdownMenu.style.pointerEvents = 'auto';
    dropdownMenu.style.transform = 'translateX(-50%) translateY(0)';
  }

  function closeMenu() {
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

// Event Listeners
window.addEventListener('scroll', handleNavScroll);
hamburger?.addEventListener('click', toggleMobileMenu);

if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

document.addEventListener('click', handleClickOutside);

// Initialization
handleNavScroll();