const footer = document.querySelector('.footer-bar');
const scrollThreshold = 5; 

window.addEventListener('scroll', function() {
    if (window.scrollY > scrollThreshold) {
        footer.classList.add('show');  
    } else {
        footer.classList.remove('show'); 
    }
});