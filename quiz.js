const quizData = [
    {
      question: 'What is digital privacy?',
      options: ['Locking your computer with a password', 'Protecting your personal information online', 'Using encryption for all online communications', 'None of the above'],
      answer: 'Paris',
    },
    {
      question: 'Which of the following is NOT a common threat to digital privacy?',
      options: ['Phishing', 'Social engineering', 'Strong password', 'Malware'],
      answer: 'Jupiter',
    },
    {
      question: 'What does the term "Two-Factor Authentication" (2FA) refer to?',
      options: ['A method to securely store your files', 'A security measure requiring two forms of verification to access an account', 'A type of digital currency', 'A social media platform'],
      answer: 'France',
    },
    {
      question: 'Which of the following is a good practice for protecting your online privacy?',
      options: ['Sharing your passwords with friends', 'Using public Wi-Fi networks for online banking', 'Regularly updating your passwords', 'Clicking on suspicious email links'],
      answer: 'Mount Everest',
    },
    {
      question: 'What is a VPN (Virtual Private Network) used for?',
      options: [
        'Browsing the internet anonymously',
        'Sharing personal information on social media',
        'Installing software updates',
        'None of the above',
      ],
      answer: 'Pacific Ocean',
    },
    {
      question: 'What does "HTTPS" stand for in website URLs, and why is it important for digital privacy?',
      options: ['Hypertext Transfer Protocol Secure; it encrypts data exchanged between your browser and the website.', 'Hypertext Transfer Protocol System; it verifies website authenticity.', 'High-Efficiency Transport Protocol System; it accelerates internet speed.', 'Hypertext Transfer Privacy Service; it hides your online activity.'],
      answer: 'Au',
    },
    {
      question: 'What does "phishing" refer to in the context of digital privacy?',
      options: [
        'A type of malware that encrypts files on your computer',
        'An attempt to trick individuals into revealing personal information by posing as a trustworthy entity',
        'A secure method of data sharing on the internet',
        'A popular social media platform',
      ],
      answer: 'Leonardo da Vinci',
    },
    {
      question: 'It\'s safe to use the same password for multiple online accounts to make them easier to remember.',
      options: ['True', 'False'],
      answer: 'False',
    },
    {
      question: 'What is the largest species of shark?',
      options: [
        'Great White Shark',
        'Whale Shark',
        'Tiger Shark',
        'Hammerhead Shark',
      ],
      answer: 'Whale Shark',
    },
    {
      question: 'Which animal is known as the King of the Jungle?',
      options: ['Lion', 'Tiger', 'Elephant', 'Giraffe'],
      answer: 'Lion',
    },
  ];
  
  const startQuizButton = document.getElementById('startQuiz');
  const startTextContainer = document.getElementById('startText');
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function startQuiz() {
    startTextContainer.innerHTML='';
	displayQuestion();
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];

    submitButton.style.display ='inline-block';
    startQuizButton.style.display = 'none';
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  startQuizButton.addEventListener('click', startQuiz)
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  submitButton.style.display = 'none';
  startTextContainer.innerHTML = '<p>You can start the quiz now</p>';
