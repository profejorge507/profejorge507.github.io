document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game');
    const questions = [
        { question: "¿Cuál es el sonido inicial de 'manzana'?", options: ["M", "N", "A"], answer: "M" },
        { question: "¿Cuál es el sonido final de 'sol'?", options: ["L", "S", "O"], answer: "L" },
        { question: "¿Qué sonido escuchas en el medio de 'pato'?", options: ["P", "T", "A"], answer: "A" },
        { question: "¿Cuál es el sonido inicial de 'gato'?", options: ["G", "A", "T"], answer: "G" },
        { question: "¿Qué sonido escuchas al final de 'flor'?", options: ["F", "L", "R"], answer: "R" },
        { question: "¿Cuál es el sonido inicial de 'perro'?", options: ["P", "R", "O"], answer: "P" },
        { question: "¿Qué sonido está en el medio de 'casa'?", options: ["A", "C", "S"], answer: "A" },
        { question: "¿Cuál es el sonido final de 'luna'?", options: ["L", "N", "A"], answer: "A" },
        { question: "¿Qué sonido escuchas al inicio de 'carro'?", options: ["C", "R", "O"], answer: "C" },
        { question: "¿Cuál es el sonido final de 'nube'?", options: ["E", "N", "B"], answer: "E" }
    ];

    let score = 0;
    let questionIndex = 0;
    let shuffledQuestions = [];

    // Fisher-Yates Shuffle Algorithm to shuffle array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function startGame() {
        score = 0;
        questionIndex = 0;
        shuffledQuestions = [...questions];
        shuffleArray(shuffledQuestions);
        showQuestion();
    }

    function showQuestion() {
        gameContainer.innerHTML = "";
        if (questionIndex < shuffledQuestions.length) {
            const currentQuestion = shuffledQuestions[questionIndex];
            const questionElem = document.createElement('div');
            questionElem.classList.add('question');
            questionElem.textContent = currentQuestion.question;

            const optionsElem = document.createElement('div');
            optionsElem.classList.add('options');

            const shuffledOptions = [...currentQuestion.options];
            shuffleArray(shuffledOptions);

            shuffledOptions.forEach(option => {
                const optionElem = document.createElement('div');
                optionElem.classList.add('option');
                optionElem.textContent = option;
                optionElem.addEventListener('click', () => handleAnswer(option, currentQuestion.answer, optionElem));
                optionsElem.appendChild(optionElem);
            });

            gameContainer.appendChild(questionElem);
            gameContainer.appendChild(optionsElem);
        } else {
            endGame();
        }
    }

    function handleAnswer(selectedOption, correctAnswer, optionElem) {
        if (selectedOption === correctAnswer) {
            score++;
            optionElem.style.backgroundColor = "green";
        } else {
            optionElem.style.backgroundColor = "red";
        }

        // Delay to show the colors before moving to the next question
        setTimeout(() => {
            questionIndex++;
            showQuestion();
        }, 1000);
    }

    function endGame() {
        gameContainer.innerHTML = "";
        const percentage = (score / shuffledQuestions.length) * 100;

        if (percentage >= 70) {
            // Confetti Celebration
            const confettiCanvas = document.createElement('canvas');
            confettiCanvas.id = 'confetti-canvas';
            confettiCanvas.style.position = 'fixed';
            confettiCanvas.style.top = '0';
            confettiCanvas.style.left = '0';
            confettiCanvas.style.width = '100%';
            confettiCanvas.style.height = '100%';
            document.body.appendChild(confettiCanvas);

            const confetti = new ConfettiGenerator({ target: 'confetti-canvas' });
            confetti.render();

            gameContainer.innerHTML = `
                <h2>¡Felicidades!</h2>
                <p>Tu puntuación es: ${score}/${shuffledQuestions.length}</p>
            `;
        } else {
            // Sad Face
            gameContainer.innerHTML = `
                <h2>¡Inténtalo de nuevo!</h2>
                <p>Tu puntuación es: ${score}/${shuffledQuestions.length}</p>
                <div style="font-size: 5rem;">😢</div>
            `;
        }

        const retryButton = document.createElement('button');
        retryButton.textContent = "Reintentar";
        retryButton.classList.add('btn', 'btn-primary', 'mt-3');
        retryButton.addEventListener('click', () => {
            document.getElementById('confetti-canvas')?.remove();
            startGame();
        });
        gameContainer.appendChild(retryButton);
    }

    startGame();
});
