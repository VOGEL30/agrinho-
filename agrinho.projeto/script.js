document.addEventListener('DOMContentLoaded', function() {
    let currentQuestionIndex = 0;
    let money = 0;

    const questions = [
        {
            question: "Qual é a tecnologia usada para monitorar a saúde das plantas?",
            answers: [
                { text: "Sistema de Irrigação", correct: false, money: 0 },
                { text: "Sensores de Umidade", correct: true, money: 100 },
                { text: "Drones de Pulverização", correct: false, money: 0 },
                { text: "Máquinas de Colheita", correct: false, money: 0 }
            ]
        },
        {
            question: "Qual tecnologia é utilizada para otimizar o uso de fertilizantes?",
            answers: [
                { text: "Sistemas de GPS", correct: false, money: 0 },
                { text: "Sensores de Solo", correct: true, money: 150 },
                { text: "Drones", correct: false, money: 0 },
                { text: "Máquinas de Colheita", correct: false, money: 0 }
            ]
        },
        {
            question: "Qual é uma vantagem do uso de drones na agricultura?",
            answers: [
                { text: "Aumento da área de plantio manual", correct: false, money: 0 },
                { text: "Monitoramento aéreo de culturas", correct: true, money: 200 },
                { text: "Redução de custos com irrigação", correct: false, money: 0 },
                { text: "Aumento da produção de sementes", correct: false, money: 0 }
            ]
        },
        {
            question: "Qual tecnologia é usada para controle de pragas em grande escala?",
            answers: [
                { text: "Sensores de Umidade", correct: false, money: 0 },
                { text: "Drones de Pulverização", correct: true, money: 250 },
                { text: "Máquinas de Colheita", correct: false, money: 0 },
                { text: "Sistemas de GPS", correct: false, money: 0 }
            ]
        },
        {
            question: "Qual é a principal função dos sensores de solo?",
            answers: [
                { text: "Monitorar a saúde das plantas", correct: false, money: 0 },
                { text: "Analisar a composição do solo", correct: true, money: 300 },
                { text: "Controlar a irrigação automaticamente", correct: false, money: 0 },
                { text: "Programar a colheita", correct: false, money: 0 }
            ]
        },
        {
            question: "Qual inovação permite a análise de imagens de culturas?",
            answers: [
                { text: "Sensores de Umidade", correct: false, money: 0 },
                { text: "Imagens de Satélite", correct: true, money: 350 },
                { text: "Drones de Pulverização", correct: false, money: 0 },
                { text: "Sistemas de GPS", correct: false, money: 0 }
            ]
        },
        {
            question: "Qual tecnologia ajuda a reduzir o desperdício de água na agricultura?",
            answers: [
                { text: "Sistemas de Irrigação por Gotejamento", correct: true, money: 400 },
                { text: "Sensores de Solo", correct: false, money: 0 },
                { text: "Drones", correct: false, money: 0 },
                { text: "Máquinas de Colheita", correct: false, money: 0 }
            ]
        },
        {
            question: "Qual é uma aplicação comum dos drones na agricultura?",
            answers: [
                { text: "Plantio automático", correct: false, money: 0 },
                { text: "Análise de solo", correct: false, money: 0 },
                { text: "Monitoramento aéreo", correct: true, money: 250 },
                { text: "Irrigação", correct: false, money: 0 }
            ]
        }
    ];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function loadQuestion(index) {
        const questionData = questions[index];
        document.getElementById('question').innerText = questionData.question;

        const answersDiv = document.getElementById('answers');
        answersDiv.innerHTML = '';
        const shuffledAnswers = [...questionData.answers];
        shuffleArray(shuffledAnswers); // Embaralhar as respostas
        shuffledAnswers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.className = 'answer';
            button.dataset.correct = answer.correct;
            button.dataset.money = answer.money;
            button.addEventListener('click', handleAnswerClick);
            answersDiv.appendChild(button);
        });
    }

    function handleAnswerClick(event) {
        const button = event.target;
        const isCorrect = button.dataset.correct === 'true';
        const moneyEarned = parseInt(button.dataset.money, 10);

        // Reset button colors
        document.querySelectorAll('.answer').forEach(btn => {
            btn.classList.remove('correct', 'incorrect');
            if (btn.dataset.correct === 'true') {
                btn.classList.add('correct');
            } else {
                btn.classList.add('incorrect');
            }
        });

        // Apply color to the clicked button
        if (isCorrect) {
            money += moneyEarned;
            document.getElementById('result').innerText = 'Resposta Correta!';
        } else {
            document.getElementById('result').innerText = 'Resposta Errada!';
        }

        document.getElementById('money').innerText = `Dinheiro: R$${money}`;

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            setTimeout(() => {
                loadQuestion(currentQuestionIndex);
                document.getElementById('result').innerText = '';
            }, 1000); // Tempo para mostrar a resposta antes de mudar a pergunta
        } else {
            document.getElementById('result').innerText += ' Quiz Finalizado!';
            document.getElementById('prize').innerText = `Parabéns! Você ganhou um Robô de Monitoramento!`;
            document.getElementById('gift-box').classList.remove('hidden'); // Mostrar o GIF de caixa de presente
            document.getElementById('robot').classList.remove('hidden'); // Mostrar o robô
            document.getElementById('answers').innerHTML = '';
            document.getElementById('retry-button').classList.remove('hidden'); // Mostrar o botão de tentar novamente
        }
    }

    function resetQuiz() {
        currentQuestionIndex = 0;
        money = 0;
        document.getElementById('money').innerText = 'Dinheiro: R$0';
        document.getElementById('result').innerText = '';
        document.getElementById('prize').innerText = '';
        document.getElementById('gift-box').classList.add('hidden'); // Ocultar o GIF de caixa de presente
        document.getElementById('robot').classList.add('hidden'); // Ocultar o robô
        document.getElementById('retry-button').classList.add('hidden'); // Ocultar o botão de tentar novamente
        loadQuestion(currentQuestionIndex);
    }

    document.getElementById('retry-button').addEventListener('click', resetQuiz);

    loadQuestion(currentQuestionIndex);
});
