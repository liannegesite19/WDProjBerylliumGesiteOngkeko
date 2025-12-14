document.addEventListener('DOMContentLoaded', () => {
    // 1. Get DOM elements
    const container = document.querySelector('.timeline-container');
    const events = document.querySelectorAll('.timeline-event');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!container || events.length === 0 || !prevBtn || !nextBtn) {
        console.error("Timeline elements not found.");
        return; // Stop if elements are missing
    }

    // Initialize current event index
    let currentIndex = 0;

    // 2. Function to update button state
    function updateButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === events.length - 1;
    }

    // 3. Function to scroll to the target event
    function scrollToEvent(index) {
        if (index < 0 || index >= events.length) return;
        
        const targetEvent = events[index];
        const containerRect = container.getBoundingClientRect();
        const eventRect = targetEvent.getBoundingClientRect();
        
        // Calculate the scroll position needed to center the event
        const scrollPosition = (eventRect.left + container.scrollLeft) - 
                                (containerRect.width / 2) + 
                                (eventRect.width / 2);
        
        // Scroll the container smoothly
        container.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });

        // Update the index and buttons after scrolling
        currentIndex = index;
        updateButtons();
    }

    // 4. Navigation Handlers
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

    // 5. Initial setup: Scroll to the first event and set button state
    scrollToEvent(0); // Start centered on the first event
    updateButtons(); 
    
    
    // --- Bonus: Implement Click-to-Center on Year Circle ---
    events.forEach((event, index) => {
        const yearCircle = event.querySelector('.year-circle');
        if (yearCircle) {
            yearCircle.addEventListener('click', () => {
                scrollToEvent(index);
                // Optional: Add a class to highlight the active event
                events.forEach(e => e.classList.remove('active-event'));
                event.classList.add('active-event');
            });
        }
    });
});