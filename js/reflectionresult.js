document.addEventListener('DOMContentLoaded', () => {
    const latestBox = document.getElementById('latestReflection');
    const gridBox = document.getElementById('anonymousGrid');

    const recentText = localStorage.getItem('recentReflection');
    const recentMatch = localStorage.getItem('recentMatch');
    const history = JSON.parse(localStorage.getItem('userReflections')) || [];

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

    if (history.length > 0) {
        gridBox.innerHTML = ''; 
        
        const displayHistory = [...history].reverse();

displayHistory.forEach((entry, index) => {
    const card = document.createElement('div');
    card.className = 'small-reflection-box';
    
    card.innerHTML = `
        <p>"${entry.text}"</p>
        <div class="crud-controls" style="margin-top: 10px; display: flex; gap: 10px; justify-content: flex-end;">
            <button onclick="editEntry(${entry.id})" style="cursor:pointer; background:none; border:1px solid #d4af37; color:#d4af37; padding: 2px 8px;">Edit</button>
            <button onclick="deleteEntry(${entry.id})" style="cursor:pointer; background:none; border:1px solid #8b0000; color:#8b0000; padding: 2px 8px;">Delete</button>
        </div>
    `;
    gridBox.appendChild(card);
});
    } else {
gridBox.innerHTML = `
    <p style="
        grid-column: 1 / -1; 
        text-align: center; 
        width: 100%; 
        color: white; 
        text-shadow: 1px 1px 2px rgba(0,0,0,0.4); 
        font-size: 1.1rem;
        margin-top: 30px;
    ">
        No reflections in history. Start writing to see them here!
    </p>`;
    }
});

window.deleteEntry = function(id) {
    if(confirm("Are you sure you want to delete this reflection from history?")) {
        let history = JSON.parse(localStorage.getItem('userReflections')) || [];
        history = history.filter(item => item.id !== id);
        localStorage.setItem('userReflections', JSON.stringify(history));
        location.reload(); 
    }
}

let currentEditingId = null;
window.editEntry = function(id) {
    const history = JSON.parse(localStorage.getItem('userReflections')) || [];
    const entry = history.find(item => item.id === id);
    
    if(entry) {
        currentEditingId = id;
        document.getElementById('editTextarea').value = entry.text;
        document.getElementById('editModal').style.display = 'block';
    }
}

document.getElementById('saveEditBtn').addEventListener('click', () => {
    let history = JSON.parse(localStorage.getItem('userReflections')) || [];
    const index = history.findIndex(item => item.id === currentEditingId);
    
if(index !== -1) {
    const newText = document.getElementById('editTextarea').value;
    history[index].text = newText;
    
    
    localStorage.setItem('recentReflection', newText); 
    
    localStorage.setItem('userReflections', JSON.stringify(history));
    location.reload();
}
});