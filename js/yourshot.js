document.getElementById('reflectionForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const reflectionText = document.getElementById('userInput').value;
    const answers = document.querySelectorAll('input[type="radio"]:checked');
    
    let hamiltonPoints = 0;
    let elizaPoints = 0;
    
    const hamKeywords = ['ambition', 'war', 'fight', 'write', 'legacy', 'future', 'change', 'shot'];
    const elizaKeywords = ['kindness', 'help', 'family', 'resilience', 'forgive', 'stay', 'story', 'burn'];

    const words = reflectionText.toLowerCase();
    
    // Keywords weighted at 2 points
    hamKeywords.forEach(word => { if(words.includes(word)) hamiltonPoints += 2; });
    elizaKeywords.forEach(word => { if(words.includes(word)) elizaPoints += 2; });

    // Handles both value="H/E" and value="Hamilton/Eliza"
    answers.forEach(answer => {
        if (answer.value === "H" || answer.value === "Hamilton") hamiltonPoints++;
        else if (answer.value === "E" || answer.value === "Eliza") elizaPoints++;
    });

    // Tie-breaker
    const finalMatch = (hamiltonPoints > elizaPoints) ? "Alexander Hamilton" : "Elizabeth Schuyler";

    // Save Data
    let history = JSON.parse(localStorage.getItem('userReflections')) || [];
    history.push({
        id: Date.now(),
        text: reflectionText, 
        match: finalMatch,
        timestamp: new Date().toLocaleString()
    });
    
    localStorage.setItem('userReflections', JSON.stringify(history));
    localStorage.setItem('recentReflection', reflectionText);
    localStorage.setItem('recentMatch', finalMatch);

    // Redirect to the character-specific result page
    if (finalMatch === "Alexander Hamilton") {
        window.location.href = 'h.reflection-result.html';
    } else {
        window.location.href = 'e.reflection-result.html';
    }
});