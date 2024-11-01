// Benutzername und Avatar speichern
let userName = "";
let userAvatar = "";

// Zeitmessung: Startzeit speichern
let startTime = new Date();

// Timer anzeigen und jede Sekunde aktualisieren
let timerInterval = setInterval(updateTimer, 1000);

function updateTimer() {
    const timerDiv = document.getElementById('timer');
    if (timerDiv) {
        const timeElapsed = Math.floor((new Date() - startTime) / 1000);
        timerDiv.textContent = `Verstrichene Zeit: ${timeElapsed} Sekunden`;
    }
}

// Dark Mode Toggle
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    toggleButton.textContent = 'Light Mode';
}

toggleButton.addEventListener('click', function() {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        toggleButton.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-mode');
        toggleButton.textContent = 'Light Mode';
        localStorage.setItem('theme', 'dark');
    }
});

// Quiz starten
document.getElementById('start-quiz').addEventListener('click', function() {
    const nameInput = document.getElementById('username').value;
    const avatarInput = document.querySelector('input[name="avatar"]:checked').value;

    if (nameInput.trim() === "") {
        alert("Bitte gib deinen Namen ein!");
    } else {
        userName = nameInput;
        userAvatar = avatarInput;

        document.getElementById('user-info').style.display = 'none';
        document.getElementById('quiz-box').style.display = 'block';
    }
});

// Quiz-Abgabe-Funktion
function submitQuiz() {
    const answers = {
        q1: "B",
        q2: ["A", "C"],
        q3: "C",
        q4: ["A", "C"],
        q5: "B",
        q6: "A",
        q7: "C",
        q8: ["B", "D"],
        q9: "B",
        q10: "A",
        q11: "B",
        q12: "B",
        q13: "A",
        q14: "B",
        q15: "B",
        q16: "B",
        q17: "B"
    };

    let score = 0;
    let totalQuestions = Object.keys(answers).length;

    for (let q in answers) {
        let userAnswers = document.querySelectorAll(`input[name="${q}"]:checked`);
        let selectedValues = Array.from(userAnswers).map(input => input.value);

        if (Array.isArray(answers[q])) {
            if (selectedValues.length === answers[q].length && selectedValues.every(val => answers[q].includes(val))) {
                score++;
                provideFeedback(q, true, answers[q]);
            } else {
                provideFeedback(q, false, answers[q]);
            }
        } else {
            if (selectedValues.length === 1 && selectedValues[0] === answers[q]) {
                score++;
                provideFeedback(q, true, answers[q]);
            } else {
                provideFeedback(q, false, answers[q]);
            }
        }
    }

    clearInterval(timerInterval);
    const timeSpent = Math.floor((new Date() - startTime) / 1000);
    displayResult(score, totalQuestions, timeSpent);
    saveHistory(score, totalQuestions, timeSpent);
    updateScoreboard();
}

function provideFeedback(questionName, isCorrect, correctAnswer) {
    const elements = document.getElementsByName(questionName);
    elements.forEach(element => {
        const parentLabel = element.parentElement;
        parentLabel.style.transition = 'background-color 0.5s ease';

        if (isCorrect) {
            parentLabel.innerHTML += " ✔️";
            parentLabel.style.backgroundColor = 'lightgreen';
        } else {
            if (element.checked) {
                parentLabel.innerHTML += " ❌";
                parentLabel.style.backgroundColor = 'salmon';
            }
        }
    });

    if (!isCorrect) {
        elements.forEach(element => {
            if (correctAnswer.includes(element.value)) {
                const parentLabel = element.parentElement;
                parentLabel.innerHTML += " ✔️ (Richtige Antwort)";
                parentLabel.style.backgroundColor = 'lightgreen';
            }
        });
    }
}

function displayResult(score, totalQuestions, timeSpent) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `${userAvatar} ${userName}, du hast ${score} von ${totalQuestions} richtig in ${timeSpent} Sekunden!`;
    resultDiv.style.fontSize = '1.5em';
    resultDiv.style.transition = 'opacity 1s ease';
    resultDiv.style.opacity = '1';

    setTimeout(() => {
        resultDiv.style.opacity = '0.5';
    }, 3000);
}

function saveHistory(score, totalQuestions, timeSpent) {
    let history = JSON.parse(localStorage.getItem("quizHistory")) || [];
    history.push({ userName, userAvatar, score, totalQuestions, timeSpent, date: new Date().toLocaleString() });
    localStorage.setItem("quizHistory", JSON.stringify(history));
}

function displayHistory() {
    const historyDiv = document.getElementById("history");
    let history = JSON.parse(localStorage.getItem("quizHistory")) || [];
    historyDiv.innerHTML = "<h2>Frühere Ergebnisse:</h2>";
    history.forEach(entry => {
        const entryDiv = document.createElement("div");
        entryDiv.textContent = `${entry.userAvatar} ${entry.userName} - Ergebnis: ${entry.score}/${entry.totalQuestions} - Zeit: ${entry.timeSpent} Sekunden - Datum: ${entry.date}`;
        entryDiv.style.marginBottom = '5px';
        historyDiv.appendChild(entryDiv);
    });
}

// Scoreboard anzeigen und aktualisieren
function updateScoreboard() {
    const scoreboardDiv = document.getElementById("scoreboard");
    let history = JSON.parse(localStorage.getItem("quizHistory")) || [];
    scoreboardDiv.innerHTML = "<h2>Scoreboard:</h2>";
    history.slice(-10).forEach(entry => {  // Zeigt die letzten 10 Ergebnisse
        const entryDiv = document.createElement("div");
        entryDiv.textContent = `${entry.userAvatar} ${entry.userName} - ${entry.score}/${entry.totalQuestions} Punkte in ${entry.timeSpent} Sekunden`;
        scoreboardDiv.appendChild(entryDiv);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const timerDiv = document.createElement('div');
    timerDiv.id = 'timer';
    timerDiv.style.fontWeight = 'bold';
    document.querySelector('.quiz-container').prepend(timerDiv);

    const scoreboardDiv = document.createElement('div');
    scoreboardDiv.id = 'scoreboard';
    document.querySelector('.quiz-container').appendChild(scoreboardDiv);

    updateTimer();
    displayHistory();
    updateScoreboard();
});
