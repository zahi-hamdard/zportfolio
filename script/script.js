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
            burgerMenu.src = '../images/exitIcon.svg'; // Replace with exit icon
        } else {
            burgerMenu.src = '../images/burgerMenu.svg'; // Revert to burger menu icon
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




// Replace the existing cat animation code with this:

const cat = document.getElementById('cat-cursor');
const catSvg = document.getElementById('cat-svg');
const catMsg = document.getElementById('cat-message');
const tail = document.getElementById('tail');
const leftEar = document.getElementById('ear-left');
const rightEar = document.getElementById('ear-right');
const leftEye = document.getElementById('eye-left');
const rightEye = document.getElementById('eye-right');
const tongue = document.getElementById('tongue');
const mouth = document.getElementById('mouth');
const smile = document.getElementById('smile');
const purrSound = document.getElementById('purr-sound');
const meowSound = document.getElementById('meow-sound');

// State variables
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let currentX = mouseX;
let currentY = mouseY;
let catState = 'normal'; // normal, sleeping, playing, licking, happy, angry
let clickCount = 0;
let lastInteractionTime = Date.now();
let isDragging = false;
let dragStartX, dragStartY;

// Cat messages
const messages = [
  "Zahid codes magic! ✨",
  "Meow! Need a UI fix? 😸",
  "Stay curious, hooman! 🚀",
  "Pixel wizardry inside 🎨",
  "Pawsitive vibes only 🐾",
  "Coffee makes everything better ☕",
  "Scroll down for more fun! 🎢",
  "Purr-fect designs ahead! 🖌️",
  "Let's make something amazing! 💡",
  "Front-end? More like purr-end! 😹"
];

// Initialize cat
function initCat() {
  // Start animation loop
  animateCat();
  
  // Set up random behaviors
  randomMessage();
  randomBehavior();
  
  // Set up event listeners
  setupEventListeners();
}

// Main animation loop
function animateCat() {
  // Smooth follow with slight delay for more natural movement
  const followSpeed = catState === 'sleeping' ? 0.02 : 0.1;
  currentX += (mouseX - currentX) * followSpeed;
  currentY += (mouseY - currentY) * followSpeed;
  
  // Apply movement
  cat.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
  
  // Tail follows mouse direction
  if (catState !== 'sleeping') {
    const angle = Math.atan2(mouseY - currentY, mouseX - currentX) * (180 / Math.PI);
    tail.style.transform = `rotate(${angle - 90}deg)`;
  }
  
  // Eyes follow mouse (more subtly)
  updateEyeDirection();
  
  requestAnimationFrame(animateCat);
}

// Update eye direction to look at mouse
function updateEyeDirection() {
  if (catState === 'sleeping') return;
  
  const eyeCenterX = 150; // SVG center
  const eyeCenterY = 130;
  const svgRect = catSvg.getBoundingClientRect();
  const svgCenterX = svgRect.left + svgRect.width / 2;
  const svgCenterY = svgRect.top + svgRect.height / 2;
  
  // Calculate angle to mouse from cat's head
  const angle = Math.atan2(mouseY - svgCenterY, mouseX - svgCenterX) * (180 / Math.PI);
  
  // Limit eye movement range
  const maxOffset = 3;
  const leftOffsetX = Math.cos(angle * Math.PI / 180) * maxOffset;
  const leftOffsetY = Math.sin(angle * Math.PI / 180) * maxOffset * 0.5;
  const rightOffsetX = Math.cos(angle * Math.PI / 180) * maxOffset;
  const rightOffsetY = Math.sin(angle * Math.PI / 180) * maxOffset * 0.5;
  
  // Apply to pupils
  document.querySelector('.pupil').setAttribute('cx', 130 + leftOffsetX);
  document.querySelector('.pupil').setAttribute('cy', 130 + leftOffsetY);
  document.querySelectorAll('.pupil')[1].setAttribute('cx', 170 + rightOffsetX);
  document.querySelectorAll('.pupil')[1].setAttribute('cy', 130 + rightOffsetY);
}

// Set up event listeners
function setupEventListeners() {
  // Mouse movement
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    resetIdleTimer();
  });
  
  // Click interactions
  document.addEventListener('mousedown', () => {
    if (catState !== 'sleeping') {
      setCatState('playing');
      catSvg.style.transform = "scale(0.9)";
      clickCount++;
      
      if (clickCount >= 5) {
        showMessage("Okay, that's enough clicking! 😾");
        setCatState('angry');
        setTimeout(() => setCatState('normal'), 2000);
        clickCount = 0;
      } else if (clickCount >= 3) {
        showMessage("Playtime! 🎾");
        setCatState('happy');
      }
      
      // Play sound if available
      if (meowSound) {
        meowSound.currentTime = 0;
        meowSound.play();
      }
    }
  });
  
  document.addEventListener('mouseup', () => {
    if (catState === 'playing') {
      catSvg.style.transform = "scale(1)";
      setTimeout(() => {
        if (catState === 'playing') setCatState('normal');
      }, 500);
    }
  });
  
  // Double click for special interaction
  document.addEventListener('dblclick', () => {
    showMessage("Whoa! Easy there! 😲");
    setCatState('surprised');
    setTimeout(() => setCatState('normal'), 1000);
  });
  
  // Keyboard interactions
  document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
      showMessage("Spacebar? Let's jump! 🚀");
      setCatState('happy');
      catSvg.style.transform = "translateY(-20px)";
      setTimeout(() => {
        catSvg.style.transform = "translateY(0)";
        setTimeout(() => setCatState('normal'), 500);
      }, 300);
    }
  });
}

// Set cat state
function setCatState(state) {
  catSvg.classList.remove('cat-normal', 'cat-sleeping', 'cat-playing', 'cat-licking', 'cat-happy', 'cat-angry', 'cat-surprised');
  catSvg.classList.add(`cat-${state}`);
  catState = state;
  lastInteractionTime = Date.now();
  
  // Special behaviors for states
  if (state === 'happy') {
    smile.style.visibility = 'visible';
    mouth.style.visibility = 'hidden';
    if (purrSound) {
      purrSound.currentTime = 0;
      purrSound.play();
    }
    setTimeout(() => {
      smile.style.visibility = 'hidden';
    }, 2000);
  } else if (state === 'licking') {
    tongue.style.visibility = 'visible';
    setTimeout(() => {
      tongue.style.visibility = 'hidden';
      if (catState === 'licking') setCatState('normal');
    }, 2000);
  }
}

// Show message bubble
function showMessage(text) {
  catMsg.textContent = text;
  catMsg.classList.add('show');
  
  setTimeout(() => {
    catMsg.classList.remove('show');
  }, 2000);
}

// Random messages
function randomMessage() {
  if (Math.random() < 0.3 && catState === 'normal') {
    showMessage(messages[Math.floor(Math.random() * messages.length)]);
  }
  setTimeout(randomMessage, Math.random() * 15000 + 5000);
}

// Random behaviors
function randomBehavior() {
  if (Date.now() - lastInteractionTime > 30000 && catState === 'normal') {
    const rand = Math.random();
    if (rand < 0.3) {
      setCatState('licking');
    } else if (rand < 0.6) {
      showMessage("...zzz... 😴");
      setCatState('sleeping');
    }
  }
  setTimeout(randomBehavior, 10000);
}

// Reset idle timer
function resetIdleTimer() {
  if (catState === 'sleeping') {
    setCatState('normal');
    showMessage("Oh! You're back! 😺");
  }
  lastInteractionTime = Date.now();
}

// Initialize the cat
initCat();