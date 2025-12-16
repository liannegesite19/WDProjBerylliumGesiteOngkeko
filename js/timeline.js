document.addEventListener('DOMContentLoaded', () => {

    const container = document.querySelector('.timeline-container');
    const events = document.querySelectorAll('.timeline-event');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!container || events.length === 0 || !prevBtn || !nextBtn) {
        console.error("Timeline elements not found.");
        return; 
    }

    let currentIndex = 0;

    function updateButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === events.length - 1;
    }


    function scrollToEvent(index) {
        if (index < 0 || index >= events.length) return;
        
        const targetEvent = events[index];
        const containerRect = container.getBoundingClientRect();
        const eventRect = targetEvent.getBoundingClientRect();
        
  
        const scrollPosition = (eventRect.left + container.scrollLeft) - 
                                (containerRect.width / 2) + 
                                (eventRect.width / 2);
        
 
        container.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });


        currentIndex = index;
        updateButtons();
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < events.length - 1) {
            scrollToEvent(currentIndex + 1);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            scrollToEvent(currentIndex - 1);
        }
    });


    scrollToEvent(0); 
    updateButtons(); 
    

    events.forEach((event, index) => {
        const yearCircle = event.querySelector('.year-circle');
        if (yearCircle) {
            yearCircle.addEventListener('click', () => {
                scrollToEvent(index);
                events.forEach(e => e.classList.remove('active-event'));
                event.classList.add('active-event');
            });
        }
    });
});