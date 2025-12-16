const footer = document.querySelector('.footer-bar');
const scrollThreshold = 300; // pixels scrolled before showing footer

window.addEventListener('scroll', function() {
    if (window.scrollY > scrollThreshold) {
        footer.classList.add('show');  // fade in
    } else {
        footer.classList.remove('show'); // fade out
    }
});

