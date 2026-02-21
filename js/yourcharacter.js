const characterData = {
    "Alexander Hamilton": {
        image: "images/1.png", // Use your existing Alexander image
        description: "You are driven by a restless ambition and the desire to leave a legacy. Like Hamilton, you use your words as a weapon and a tool for change. You are a risk-taker who believes that time is always running out, pushing you to work harder and climb higher."
    },
    "Elizabeth Schuyler": {
        image: "images/2.png", // Use your existing Eliza image
        description: "You possess a quiet strength and an unbreakable resilience. Like Eliza, you value family, compassion, and forgiveness. While others fight for the spotlight, you focus on the lives you touch and the goodness you can put back into the world."
    }
};

function displayMatch() {
    // 1. Get the match from LocalStorage
    const match = localStorage.getItem('recentMatch') || "Elizabeth Schuyler";
    
    // 2. Update the page content
    document.getElementById('characterName').innerText = match;
    document.getElementById('characterImage').src = characterData[match].image;
    document.getElementById('characterDescription').innerText = characterData[match].description;

    // 3. Calculate Statistics from History
    const history = JSON.parse(localStorage.getItem('userReflections')) || [];
    let hamTotal = 0;
    let elizaTotal = 0;

    history.forEach(entry => {
        if (entry.match === "Alexander Hamilton") hamTotal++;
        else elizaTotal++;
    });

    document.getElementById('hamStats').innerText = hamTotal;
    document.getElementById('elizaStats').innerText = elizaTotal;
}

window.onload = displayMatch;

const footer = document.querySelector('.footer-bar');
const scrollThreshold = 150; 

function checkScroll() {
    // Get the current scroll position
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // FORCE HIDE if at the very top (0) or less than threshold
    if (currentScroll <= scrollThreshold) {
        footer.classList.remove('show');
    } else {
        footer.classList.add('show');
    }
}

// Listen for scroll
window.addEventListener('scroll', checkScroll);

window.addEventListener('DOMContentLoaded', () => {
    footer.classList.add('no-transition'); // Stop the "fade" from happening on load
    checkScroll();
    // Re-enable transition after a tiny delay
    setTimeout(() => {
        footer.classList.remove('no-transition');
    }, 100);
});