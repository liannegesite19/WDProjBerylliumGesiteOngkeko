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

// Click on background to reset
body.addEventListener('click', () => {
  leftRect.classList.remove('active', 'inactive');
  rightRect.classList.remove('active', 'inactive');
});




