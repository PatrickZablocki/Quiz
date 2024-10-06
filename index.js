function submitQuiz() {
    const answers = {
        q1: "B",  // Richtige Antwort auf die erste Frage
        // Weitere Fragen...
    };

    let score = 0;
    let totalQuestions = Object.keys(answers).length;

    for (let q in answers) {
        let userAnswer = document.querySelector(`input[name="${q}"]:checked`);
        if (userAnswer && userAnswer.value === answers[q]) {
            score++;
        }
    }

    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `Du hast ${score} von ${totalQuestions} richtig!`;
}
