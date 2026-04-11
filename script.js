// DOM Elements
const navbar = document.getElementById('mainNav');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const dropdownItems = document.querySelectorAll('.navbar__item.dropdown');
const menuOverlay = document.getElementById('menuOverlay');

      // Navbar Scroll ______________________________________________________
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
          if (!mobileMenu.hidden) {
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
          const isClickInside = (hamburger && hamburger.contains(event.target)) || (mobileMenu && mobileMenu.contains(event.target));
          if (!isClickInside) {
            closeMobileMenu();
          }
        }
      }

      // Dropdown Hover Desktop________________________________________________________________
      dropdownItems.forEach(item => {
        const dropdownMenu = item.querySelector('.dropdown__menu');
        if (!dropdownMenu) return;
        let closeTimer = null;
        function openMenu() {
          clearTimeout(closeTimer);
          dropdownMenu.classList.add('open');
        }

        function closeMenu() {
          closeTimer = setTimeout(() => {
            dropdownMenu.classList.remove('open');
          }, 100);
        }

        item.addEventListener('mouseenter', openMenu);
        item.addEventListener('mouseleave', closeMenu);
        dropdownMenu.addEventListener('mouseenter', openMenu);
        dropdownMenu.addEventListener('mouseleave', closeMenu);
      });


    //MOBILE DROPDOWN FUNCTIONALITY_____________________________________________________________
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
    function closeAllMobileDropdowns() {
      mobileDropdowns.forEach(dropdown => {
        dropdown.classList.remove('open');
      });
    }

      // Initialize mobile dropdown toggles___________________________________________________________
      function initMobileDropdowns() {
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
window.addEventListener('scroll', handleNavScroll);
hamburger?.addEventListener('click', toggleMobileMenu);
menuOverlay?.addEventListener('click',closeMobileMenu);
    // Mobile menu links close menu when clicked
    if (mobileMenu) {
      mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
      });
      mobileMenu.querySelectorAll('.mobile-dropdown__link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
      });
    }

    // Click outside to close
    document.removeEventListener('click', handleClickOutside);
    
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