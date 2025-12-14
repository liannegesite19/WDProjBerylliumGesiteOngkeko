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




