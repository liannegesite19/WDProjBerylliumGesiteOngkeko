document.getElementById('reflectionForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // --- 1. GET INPUTS ---
    // This captures the full essay text from the parchment textarea
    const reflectionText = document.getElementById('userInput').value;
    const answers = document.querySelectorAll('input[type="radio"]:checked');
    
    // --- 2. INITIALIZE SCORES ---
    let hamiltonPoints = 0;
    let elizaPoints = 0;

    // --- 3. ESSAY ANALYSIS (Keywords) ---
    const hamKeywords = ['ambition', 'war', 'fight', 'write', 'legacy', 'future', 'change'];
    const elizaKeywords = ['kindness', 'help', 'family', 'resilience', 'forgive', 'stay', 'story'];

    const words = reflectionText.toLowerCase();
    
    // Analyzes the essay text to add points to the scores
    hamKeywords.forEach(word => { if(words.includes(word)) hamiltonPoints++; });
    elizaKeywords.forEach(word => { if(words.includes(word)) elizaPoints++; });

    // --- 4. MULTIPLE CHOICE ANALYSIS ---
    // Adds points from the rounded bar quiz options
    answers.forEach(answer => {
        if (answer.value === "H") hamiltonPoints++;
        else if (answer.value === "E") elizaPoints++;
    });

    // --- 5. DETERMINE FINAL MATCH ---
    const finalMatch = (hamiltonPoints >= elizaPoints) ? "Alexander Hamilton" : "Elizabeth Schuyler";

    // --- 6. SAVE DATA TO LOCALSTORAGE ---
    // We create an object that includes the 'text' property to save the essay
    const newEntry = {
        id: Date.now(),
        text: reflectionText, // The essay itself is saved here
        match: finalMatch,
        timestamp: new Date().toLocaleString()
    };

    // Retrieve existing history, add the new entry, and save it back
    let history = JSON.parse(localStorage.getItem('userReflections')) || [];
    history.push(newEntry);
    localStorage.setItem('userReflections', JSON.stringify(history));
    
    // Also save the individual essay text separately for quick display on the next page
    localStorage.setItem('recentReflection', reflectionText);
    localStorage.setItem('recentMatch', finalMatch);

    // --- 7. REDIRECT ---
    // Once saved, move to the next page to show the output
    window.location.href = 'reflection-result.html';
});

// --- FOOTER SCROLL LOGIC ---
const footer = document.querySelector('.footer-bar');
const scrollThreshold = 300; 

function checkScroll() {
    if (window.scrollY > scrollThreshold) {
        footer.classList.add('show');
    } else {
        footer.classList.remove('show');
    }
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);