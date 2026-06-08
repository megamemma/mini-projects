const input = document.getElementById("wordInput");
const resultArea = document.getElementById('resultArea');
const savedList = document.getElementById('savedList');

input.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        const word = input.value;
        if (!word) return;

        try {
            const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const data = await res.json();
            const def = data[0].meanings[0].definitions[0].definition;
            renderResult(word, def);
        } catch (err) {
            alert(`Definition not found.`);
        }
    }
});

function renderResult(word, def) {
    const template = document.getElementById('result-template');
    const clone = template.content.cloneNode(true);

    clone.querySelector('.def-text').textContent = `${word}: ${def}`;
    clone.querySelector('.speak-btn').onclick = () => speak(word);
    clone.querySelector('.save-btn').onclick = () => {
        const li = document.createElement('li');
        li.textContent = `${word}: ${def} `;
        const del = document.createElement('button');
        del.textContent = 'X';
        del.onclick = () => li.remove();
        li.appendChild(del);
        savedList.appendChild(li);
        resultArea.innerHTML = '';
    };
    clone.querySelector('.discard-btn').onclick = () => resultArea.innerHTML = '';

    resultArea.innerHTML = ''; // Clear previous
    resultArea.appendChild(clone);
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
  // Pick an English voice (you can filter for "Google" or "Microsoft" names)
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find(v => v.lang === 'en-US') || voices[0];
    window.speechSynthesis.speak(utterance);
}