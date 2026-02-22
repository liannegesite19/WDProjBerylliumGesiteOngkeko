document.addEventListener('DOMContentLoaded', () => {
    const latestBox = document.getElementById('latestReflection');
    const gridBox = document.getElementById('anonymousGrid');

    // 1. Pull the data using the keys from your 'yourshot.js'
    const recentText = localStorage.getItem('recentReflection');
    const recentMatch = localStorage.getItem('recentMatch');
    const history = JSON.parse(localStorage.getItem('userReflections')) || [];

    // 2. Handle the "Your Reflection" hero box
    if (recentText) {
        latestBox.innerHTML = `
            <p>"${recentText}"</p>
            <p style="text-align: right; font-family: 'Italianno', cursive; font-size: 1.8rem; margin-top: 15px;">
                — A reflection of ${recentMatch}
            </p>
        `;
    } else {
        latestBox.innerHTML = "<p>No recent reflection found. Go to 'Your Shot' to write one!</p>";
    }

    // 3. Handle the "Reflections from other users" grid
    if (history.length > 0) {
        gridBox.innerHTML = ''; // Clear the empty div
        
        // Reverse so the newest ones show first
        const displayHistory = [...history].reverse();

        displayHistory.forEach(entry => {
            // Create the card for the grid
            const card = document.createElement('div');
            card.className = 'small-reflection-box';
            
            // Inject the text from the 'text' property in your entry object
            card.innerHTML = `<p>${entry.text}</p>`;
            gridBox.appendChild(card);
        });
    } else {
        gridBox.innerHTML = "<p style='color: #fff8e1;'>The archives are currently empty.</p>";
    }
});