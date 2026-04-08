// DOM Elements
const navbar = document.getElementById('mainNav');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const dropdownItems = document.querySelectorAll('.navbar__item.dropdown');
const menuOverlay = document.getElementById('menuOverlay');

// Navbar Scroll Shadow______________________________________________________
function handleNavScroll() {
  if (navbar) {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
}

// Mobile Menu Toggle________________________________________________________
function toggleMobileMenu() {
  if (mobileMenu && hamburger) {
    if (mobileMenu.hidden === false) {
      mobileMenu.hidden = true;
      hamburger.classList.remove('show');
      menuOverlay.classList.remove('show');
      closeAllMobileDropdowns(); // Close dropdowns when closing menu
    } else {
      mobileMenu.hidden = false;
      hamburger.classList.add('show');
      menuOverlay.classList.add('show');
    }
  }
}

// Close mobile menu________________________________________________________________
function closeMobileMenu() {
  if (mobileMenu && hamburger) {
    mobileMenu.hidden = true;
    hamburger.classList.remove('show');
    menuOverlay.classList.remove('show');
    closeAllMobileDropdowns(); // Close all dropdowns when menu closes
  }
}

// Close mobile menu when clicking outside__________________________________________
function handleClickOutside(event) {
  if (mobileMenu && !mobileMenu.hidden) {
    const isClickInside = (hamburger && hamburger.contains(event.target)) || 
                         (mobileMenu && mobileMenu.contains(event.target));
    
    if (!isClickInside) {
      closeMobileMenu();
    }
  }
}

//OVERLAY FUNCTION THAT STOPS SCROLLING_____________________________________________
function openOverLay(){
  //Show mobile overlay
  menuOverlay.style.display='block';
  document.body.classList.add('no-scroll');
}


function closeOverlay(){
  //Remove overlay
  menuOverlay.style.display='none';
  document.body.classList.remove('no-scroll');
}


// Dropdown Hover Desktop________________________________________________________________
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



//MOBILE DROPDOWN FUNCTIONALITY_____________________________________________________________
// Close all mobile dropdowns
function closeAllMobileDropdowns() {
  const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
  mobileDropdowns.forEach(dropdown => {
    dropdown.classList.remove('open');
  });
}

// Initialize mobile dropdown toggles___________________________________________________________
function initMobileDropdowns() {
  const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
  
  mobileDropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.mobile-dropdown__trigger');
    
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Close other open dropdowns
        mobileDropdowns.forEach(otherDropdown => {
          if (otherDropdown !== dropdown && otherDropdown.classList.contains('open')) {
            otherDropdown.classList.remove('open');
          }
        });
        
        // Toggle current dropdown
        dropdown.classList.toggle('open');
      });
    }
  });
}





// EVENT LISTENERS___________________________________________________________
// Scroll event
window.addEventListener('scroll', handleNavScroll);


// Hamburger click
hamburger?.addEventListener('click', toggleMobileMenu);


//OverLay click
menuOverlay?.addEventListener('click',closeMobileMenu);



// Mobile menu links - close menu when clicked
if (mobileMenu) {

  // Close menu when clicking regular links 
  mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  

  // For dropdown links, close menu after navigation
  mobileMenu.querySelectorAll('.mobile-dropdown__link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

// Click outside to close
document.addEventListener('click', handleClickOutside);

// Initialize mobile dropdowns when DOM is ready
function init() {
  handleNavScroll();
  initMobileDropdowns();
}























// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}