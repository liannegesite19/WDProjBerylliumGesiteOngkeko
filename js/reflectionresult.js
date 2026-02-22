document.addEventListener('DOMContentLoaded', () => {
    // 1. Get the data from localStorage
    const savedReflections = JSON.parse(localStorage.getItem('userReflections')) || [];

    const latestBox = document.getElementById('latestReflection');
    const gridBox = document.getElementById('anonymousGrid');

    if (savedReflections.length > 0) {
        // Display the most recent one
        const latest = savedReflections[savedReflections.length - 1];
        latestBox.innerHTML = `<p>${latest.text}</p>`;
    } else {
        latestBox.innerHTML = `<p>No reflections found yet. Go to the form to write one!</p>`;
    }


    const samples = [
        "Hamilton's ambition really spoke to me. Sometimes we move too fast.",
        "Eliza's patience is a virtue I wish I had more of.",
        "The legacy we leave behind is more than just our work; it's the people we love.",
        "History has its eyes on all of us."
    ];

    samples.forEach(text => {
        const div = document.createElement('div');
        div.className = 'small-reflection-box';
        div.innerHTML = `<p>${text}</p>`;
        gridBox.appendChild(div);
    });
});