const input = document.getElementById("wordInput");
const resultDiv = document.getElementById('result');
const savedList = document.getElementById('savedList');

input.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        const word = input.value;
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await res.json();
        const def = data[0].meanings[0].definitions[0].definition;
                
        resultDiv.innerHTML = `
            <p>${def}</p>
            <button onclick="saveWord('${word}', '${def}')">Keep</button>
            <button onclick="clearResult()">Discard</button>
        `;
    }
});

function saveWord(word, def) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${word}</strong>: ${def} <button onclick="this.parentElement.remove()">X</button>`;
    savedList.appendChild(li);
    clearResult();
}

function clearResult() {
    resultDiv.innerHTML = '';
    input.value = '';
}