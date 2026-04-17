document.addEventListener('DOMContentLoaded', () => {
    const latestBox = document.getElementById('latestReflection');
    const gridBox = document.getElementById('anonymousGrid');
    const othersSection = document.querySelector('.others-reflection-section');
    const prevBtn = document.querySelector('.prev-reflections-btn');
    const editBtn = document.getElementById('editBtn');
    const burnBtn = document.getElementById('burnBtn');

    const recentText = localStorage.getItem('recentReflection');
    const recentMatch = localStorage.getItem('recentMatch');
    const history = JSON.parse(localStorage.getItem('userReflections')) || [];

    // Display the specific character result
    if (recentText && latestBox) {
        latestBox.innerHTML = `
            <p>"${recentText}"</p>
            <p style="text-align: right; font-family: 'Italianno', cursive; font-size: 2rem; margin-top: 15px;">
                — A reflection of ${recentMatch}
            </p>
        `;
    }

    // Grid population
    if (history.length > 0 && gridBox) {
        gridBox.innerHTML = '';
        [...history].reverse().forEach((entry) => {
            const card = document.createElement('div');
            card.className = 'small-reflection-box';
            card.innerHTML = `<p>"${entry.text}"</p>`;
            gridBox.appendChild(card);
        });
    }

    // Buttons Logic
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            othersSection.classList.toggle('show');
            if (othersSection.classList.contains('show')) othersSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (editBtn) {
        editBtn.addEventListener('click', () => {
            const newText = prompt("Rewrite your history:", recentText);
            if (newText && newText.trim() !== "") {
                localStorage.setItem('recentReflection', newText);
                let updatedHistory = JSON.parse(localStorage.getItem('userReflections')) || [];
                if (updatedHistory.length > 0) {
                    updatedHistory[updatedHistory.length - 1].text = newText;
                    localStorage.setItem('userReflections', JSON.stringify(updatedHistory));
                }
                location.reload();
            }
        });
    }

    if (burnBtn) {
        burnBtn.addEventListener('click', () => {
            if (confirm("Burn this letter? It will be removed from history.")) {
                localStorage.removeItem('recentReflection');
                let updatedHistory = JSON.parse(localStorage.getItem('userReflections')) || [];
                updatedHistory.pop();
                localStorage.setItem('userReflections', JSON.stringify(updatedHistory));
                location.reload();
            }
        });
    }
});