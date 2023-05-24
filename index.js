// Define the quiz questions and answers
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
  }
  
  Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
  };
  
  Quiz.prototype.guess = function(answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.questionIndex++;
  };
  
  Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
  };
  
  function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
  
  Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
  };
  
  // Define the quiz questions
  var questions = [
    new Question("JavaScript supports which of the following?", ["Functions", "XHTML", "CSS", "HTML"], "Functions"),
    new Question("Which language is used for styling web pages?", ["HTML", "Jquery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript framework?", ["Python Script", "Jquery", "Django", "Node.js"], "Django"),
    new Question("Which is used for connecting to a database?", ["PHP", "HTML", "JS", "ALL"], "PHP"),
    new Question("JavaScript is a:", ["Language", "Programming Language", "Development", "All"], "Programming Language")
  ];
  
  // Create Quiz
  var quiz = new Quiz(questions);
  
  // Function to display the quiz
  function displayQuiz() {
    if (quiz.isEnded()) {
      showResults();
    } else {
      // Display the question
      var questionElement = document.getElementById("question");
      questionElement.innerHTML = quiz.getQuestionIndex().text;
  
      // Display the choices
      var choices = quiz.getQuestionIndex().choices;
      for (var i = 0; i < choices.length; i++) {
        var choiceElement = document.getElementById("choice" + i);
        choiceElement.innerHTML = choices[i];
        guessHandler(choiceElement, choices[i]);
      }
  
      // Display current question number
      var progressElement = document.getElementById("progress");
      progressElement.innerHTML = "Question " + (quiz.questionIndex + 1) + " of " + questions.length;
    }
  }
  
  // Function to handle the user's guess
  function guessHandler(element, guess) {
    element.onclick = function() {
      quiz.guess(guess);
      displayQuiz();
    };
  }
  
  // Function to show the final results
  function showResults() {
    var quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = "<h2>Quiz Results</h2>" +
      "<p>Your score: " + quiz.score + "</p>" +
      "<p>Percentage: " + (quiz.score / questions.length) * 100 + "%</p>";
  }
  
  // Initial quiz display
  displayQuiz();
  