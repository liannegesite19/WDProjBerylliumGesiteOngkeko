document.getElementById('reflectionForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const reflectionText = document.getElementById('userInput').value;
    const answers = document.querySelectorAll('input[type="radio"]:checked');
    
    let hamiltonPoints = 0;
    let elizaPoints = 0;

    // Point keywords
    const hamKeywords = ['ambition', 'war', 'fight', 'write', 'legacy', 'future', 'change'];
    const elizaKeywords = ['kindness', 'help', 'family', 'resilience', 'forgive', 'stay', 'story'];

    const words = reflectionText.toLowerCase();
    
    hamKeywords.forEach(word => { if(words.includes(word)) hamiltonPoints++; });
    elizaKeywords.forEach(word => { if(words.includes(word)) elizaPoints++; });

    answers.forEach(answer => {
        if (answer.value === "H") hamiltonPoints++;
        else if (answer.value === "E") elizaPoints++;
    });

    const finalMatch = (hamiltonPoints >= elizaPoints) ? "Alexander Hamilton" : "Elizabeth Schuyler";

    const newEntry = {
        id: Date.now(),
        text: reflectionText, 
        match: finalMatch,
        timestamp: new Date().toLocaleString()
    };

    // Save history
    let history = JSON.parse(localStorage.getItem('userReflections')) || [];
    history.push(newEntry);
    localStorage.setItem('userReflections', JSON.stringify(history));
    
    // Save recent
    localStorage.setItem('recentReflection', reflectionText);
    localStorage.setItem('recentMatch', finalMatch);

    // Redirect
    window.location.href = 'reflection-result.html';
});


const footer = document.querySelector('.footer-bar');
const scrollThreshold = 300; 

function checkScroll() {
    if (footer && window.scrollY > scrollThreshold) {
        footer.classList.add('show');
    } else if (footer) {
        footer.classList.remove('show');
    }
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);