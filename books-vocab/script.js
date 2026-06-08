const input = document.getElementById("wordInput");
const resultArea = document.getElementById('resultArea');
const savedList = document.getElementById('savedList');

window.onload = () => {
    const saved = JSON.parse(localStorage.getItem('myWords') || '[]');
    saved.forEach(w => addToList(w.word, w.def));
};

function addToList(word, def) {
    const li = document.createElement('li');
    li.innerHTML = `<span><strong>${word}</strong>: ${def}</span> <button onclick="this.parentElement.remove(); saveState()">X</button>`;
    savedList.appendChild(li);
}

function saveState() {
    const words = Array.from(savedList.children).map(li => ({
        word: li.querySelector('strong').textContent,
        def: li.querySelector('span').textContent.split(': ')[1]
    }));
    localStorage.setItem('myWords', JSON.stringify(words));
}


input.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        const word = input.value.trim();
        if (!word) return;

        try {
            const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const data = await res.json();

            const def = data[0].meanings[0].definitions[0].definition;
            const wordData = data[0];
            renderResult(word, def, wordData);
        } catch (err) {
            console.error(err);
            alert(`Definition not found.`);
        }
    }
});

function renderResult(word, def, wordData) {
    const template = document.getElementById('result-template');
    const clone = template.content.cloneNode(true);

    const phonetic = wordData.phonetics.find(p => p.audio && p.audio !== "");
    if (phonetic && phonetic.audio) {
        clone.querySelector('.speak-btn').onclick = () => new Audio(phonetic.audio).play();
    } else {
        clone.querySelector('.speak-btn').style.display = 'none'; 
    }

    clone.querySelector('.def-text').textContent = `${word}: ${def}`;
    
    clone.querySelector('.save-btn').onclick = () => {
        addToList(word, def); // Add to the UL
        saveState();          // Save to localStorage
        resultArea.innerHTML = ''; // Clear card
        input.value = '';
    };

    clone.querySelector('.discard-btn').onclick = () => {
        resultArea.innerHTML = '';
    }

    resultArea.innerHTML = ''; // Clear previous
    resultArea.appendChild(clone);
}
