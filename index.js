function submitQuiz() {
    const answers = {
        q1: "B",
        q2: ["A","C"] ,
        q3: "C",
        q4: ["A","C"],
        q5: "B",
        q6: "A",
        q7: "C",
        q8: ["B","D"],
        q9: "B",
        q10: "A",
        q11: "B",
        q12: "B",
        q13: "A",
        q14: "B",
        q15: "B",
        q16: "B",
        q17: "B"
        // Weitere Fragen...
    };

    let score = 0;
    let totalQuestions = Object.keys(answers).length;

    for (let q in answers) {
        let userAnswers = document.querySelectorAll(`input[name="${q}"]:checked`);
        let selectedValues = Array.from(userAnswers).map(input => input.value);

        if (Array.isArray(answers[q])) {
            // Überprüfung für Mehrfachantwort-Fragen
            if (selectedValues.length === answers[q].length && selectedValues.every(val => answers[q].includes(val))) {
                score++;
            }
        } else {
            // Überprüfung für Single-Antwort-Fragen
            if (selectedValues.length === 1 && selectedValues[0] === answers[q]) {
                score++;
            }
        }
    }

    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `Du hast ${score} von ${totalQuestions} richtig!`;
}

