const leftRect = document.querySelector('.left-rect');
const rightRect = document.querySelector('.right-rect');
const body = document.body;

// Store original transforms
leftRect.style.setProperty('--orig-transform', 'calc(-100% - 50px)');
rightRect.style.setProperty('--orig-transform', '50px');

function activateRect(clicked, other) {
  clicked.classList.add('active');
  clicked.classList.remove('inactive');

  other.classList.add('inactive');
  other.classList.remove('active');
}

// Click events on rectangles
leftRect.addEventListener('click', (e) => {
  e.stopPropagation(); // prevent triggering background click
  activateRect(leftRect, rightRect);
});

rightRect.addEventListener('click', (e) => {
  e.stopPropagation();
  activateRect(rightRect, leftRect);
});

const footer = document.querySelector('.footer-bar');
const scrollThreshold = 300; // pixels scrolled before showing footer

window.addEventListener('scroll', function() {
    if (window.scrollY > scrollThreshold) {
        footer.classList.add('show');  // fade in
    } else {
        footer.classList.remove('show'); // fade out
    }
});


document.addEventListener('DOMContentLoaded', () => {
    // 1. Get references to the button and the content area
    const aboutButton = document.querySelector('.about-us-button');
    const aboutContent = document.getElementById('about-content');
    
    // --- Troubleshooting Step: Check if elements were found ---
    // If you add this, and you see "Button not found!" or "Content not found!" 
    // in your browser's console, the problem is in your HTML (Step 1).
    if (!aboutButton) {
        console.error("Button not found! Check class: .about-us-button");
        return;
    }
    if (!aboutContent) {
        console.error("Content not found! Check ID: #about-content");
        return;
    }
    // --------------------------------------------------------

    // 2. Add the click event listener to the button
    aboutButton.addEventListener('click', () => {
        // Toggle the 'open' class on the content element
        aboutContent.classList.toggle('open');
    });

    // OPTIONAL: Close the dropdown if the user clicks anywhere else on the page
    document.addEventListener('click', (event) => {
        // Check if the click occurred outside the entire dropdown container
        const container = document.querySelector('.about-dropdown-container');
        
        if (container && !container.contains(event.target) && aboutContent.classList.contains('open')) {
            aboutContent.classList.remove('open');
        }
    });
});


