// Show a message for unavailable social media links
function showMessage() {
    alert("Social media link is not available for now. Please check back later!");
}

// Show or hide the section navigation bar based on scroll position
document.addEventListener('scroll', () => {
    const sectionNav = document.getElementById('section-nav');
    const homeSection = document.getElementById('home');
    if (!sectionNav || !homeSection) return; // Added null check for sectionNav

    const homeBottom = homeSection.getBoundingClientRect().bottom;

    if (homeBottom <= 0) {
        sectionNav.classList.remove('hidden');
    } else {
        sectionNav.classList.add('hidden');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('#section-nav a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Scroll to the next or previous section based on wheel event
document.addEventListener('wheel', (event) => {
    const sections = document.querySelectorAll('section');
    let currentSection = null;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = section;
        }
    });

    if (currentSection) {
        if (event.deltaY > 0) {
            const nextSection = currentSection.nextElementSibling;
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            const prevSection = currentSection.previousElementSibling;
            if (prevSection) {
                prevSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});

// Variables to track touch start and end positions
let touchStartY = 0;
let touchEndY = 0;

// Detect touch start
document.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0].clientY;
});

// Detect touch end and determine scroll direction
document.addEventListener('touchend', (event) => {
    touchEndY = event.changedTouches[0].clientY;
    handleSwipe();
});

// Handle swipe gesture to scroll to the next or previous section
function handleSwipe() {
    const sections = document.querySelectorAll('section');
    let currentSection = null;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = section;
        }
    });

    if (currentSection) {
        if (touchStartY > touchEndY + 50) { // Swipe up
            const nextSection = currentSection.nextElementSibling;
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (touchStartY < touchEndY - 50) { // Swipe down
            const prevSection = currentSection.previousElementSibling;
            if (prevSection) {
                prevSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
};

// Toggle navigation menu on burger-menu click
const burgerMenu = document.querySelector('.burger-menu');
const sectionNav = document.getElementById('section-nav');

if (burgerMenu && sectionNav) {
    burgerMenu.addEventListener('click', () => {
        sectionNav.classList.toggle('hidden');
        sectionNav.classList.toggle('mobile-nav'); // Add a class for mobile-specific styling
        // Toggle burger menu icon
        if (burgerMenu.src.includes('burgerMenu.svg')) {
            burgerMenu.src = './images/exitIcon.svg'; // Replace with exit icon
        } else {
            burgerMenu.src = './images/burgerMenu.svg'; // Revert to burger menu icon
        }
    });

    // Close the menu when a navigation item is clicked
    sectionNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            sectionNav.classList.add('hidden');
            sectionNav.classList.remove('mobile-nav');
            burgerMenu.src = './images/burgerMenu.svg'; // Revert to burger menu icon
        });
    });
}

// Ensure burger menu is available across all sections
document.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        header.style.position = 'fixed';
        header.style.top = '0';
        header.style.width = '100%';
        header.style.zIndex = '2000';
    }
});