// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get navbar elements
    const navbar = document.querySelector('.navbar');
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarLinks = document.querySelector('.navbar-links');
    const dropdowns = document.querySelectorAll('.dropdown');
    const dropdownSubmenu = document.querySelectorAll('.dropdown-submenu');
    
    // Function to toggle mobile menu
    function toggleMobileMenu() {
        // Toggle active class on links container
        navbarLinks.classList.toggle('active');
        
        // Animate hamburger to X
        this.classList.toggle('active');
        
        // If active, transform bars to X
        if(this.classList.contains('active')) {
            document.querySelectorAll('.bar')[0].style.transform = 'translateY(9px) rotate(45deg)';
            document.querySelectorAll('.bar')[1].style.opacity = '0';
            document.querySelectorAll('.bar')[2].style.transform = 'translateY(-9px) rotate(-45deg)';
        } else {
            // Reset to hamburger
            document.querySelectorAll('.bar')[0].style.transform = 'none';
            document.querySelectorAll('.bar')[1].style.opacity = '1';
            document.querySelectorAll('.bar')[2].style.transform = 'none';
        }
    }
    
    // Mobile menu toggle click event
    navbarToggle.addEventListener('click', toggleMobileMenu);
    
    // Handle mobile dropdown menus
    function setupMobileDropdowns() {
        // For main dropdowns
        dropdowns.forEach(dropdown => {
            const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
            
            // Only setup on mobile view
            if (window.innerWidth <= 900) {
                dropdownToggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    // Rotate the chevron icon
                    const icon = this.querySelector('.fa-chevron-down');
                    icon.style.transform = dropdown.classList.contains('active') ? 'rotate(180deg)' : 'none';
                });
            } else {
                // Remove click events on desktop
                dropdownToggle.removeEventListener('click', function(){});
            }
        });
        
        // For submenu dropdowns
        dropdownSubmenu.forEach(submenu => {
            const submenuToggle = submenu.querySelector('a');
            
            // Only setup on mobile view
            if (window.innerWidth <= 900) {
                submenuToggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    submenu.classList.toggle('active');
                    
                    // Rotate the chevron icon
                    const icon = this.querySelector('.fa-chevron-right');
                    icon.style.transform = submenu.classList.contains('active') ? 'rotate(90deg)' : 'none';
                });
            } else {
                // Remove click events on desktop
                submenuToggle.removeEventListener('click', function(){});
            }
        });
    }
    
    // Initial setup for dropdowns
    setupMobileDropdowns();
    
    // Update on window resize
    window.addEventListener('resize', setupMobileDropdowns);
    
    // Sticky Navbar with scroll effect
    function handleScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Search bar functionality
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.addEventListener('click', function() {
        // Focus the search input when button is clicked
        searchInput.focus();
        
        // If there's content, we could submit the search
        if (searchInput.value.trim().length > 0) {
            // Demo: alert the search query
            alert('Searching for: ' + searchInput.value);
            
            // In a real application, you would:
            // - Submit a form
            // - Make an AJAX request
            // - Redirect to search results page
        }
    });
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim().length > 0) {
            // Demo: alert the search query
            alert('Searching for: ' + this.value);
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        // If mobile menu is open and click is outside the navbar
        if (navbarLinks.classList.contains('active') && 
            !e.target.closest('.navbar-links') && 
            !e.target.closest('.navbar-toggle')) {
            // Close the menu
            navbarLinks.classList.remove('active');
            
            // Reset hamburger icon
            navbarToggle.classList.remove('active');
            document.querySelectorAll('.bar')[0].style.transform = 'none';
            document.querySelectorAll('.bar')[1].style.opacity = '1';
            document.querySelectorAll('.bar')[2].style.transform = 'none';
        }
    });
    
    // Make active link based on current page (demo)
    const currentLocation = window.location.href;
    const menuItems = document.querySelectorAll('.navbar-links a');
    
    menuItems.forEach(item => {
        if (item.href === currentLocation) {
            item.classList.add('active');
        }
    });
}); 
