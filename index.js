const STORE = [
  {
    question: 'How many Super Bowls has Tom Brady won?',
    answers: [
      '7',
      '6',
      '5',
      '4',
    ],
    correctAnswer:
      '6',
    image:
      'images/1_Tom_Brady.jpg',
    alt:
      'quarterback Tom Brady'
  },
  {
    question: 'How many regular-season receiving yards did Jerry Rice accrue throughout his career?',
    answers: [
      '25,928',
      '28,295',
      '29,852',
      '22,895',
    ],
    correctAnswer:
      '22,895',
    image:
      'images/2_Jerry_Rice.png',
    alt:
      'wide receiver Jerry Rice'
  },
  {
    question: 'How many holding penalties did Hall-of-Fame left tackle Walter Jones get called for in his 12-year career?',
    answers: [
      '4',
      '9',
      '15',
      '22',
    ],
    correctAnswer:
      '9',
    image:
      'images/3_Walter_Jones.jpg',
    alt:
      'left tackle Walter Jones'
  },
  {
    question: 'The record for touchdown passes thrown in a single game is 7... how many times has this feat been accomplished?',
    answers: [
      '8',
      '7',
      '6',
      '5',
    ],
    correctAnswer:
      '8',
    image:
      'images/4_Drew_Brees.jpg',
    alt:
      'quarterback Drew Brees'
  },
  {
    question: 'What was the result of the Super Bowl last year?',
    answers: [
      'New England 28, Seattle 24',
      'New England 13, L.A. Rams 3',
      'New England 34, Atlanta 28 (OT)',
      'Philadelphia 41, New England 33',
    ],
    correctAnswer:
      'New England 13, L.A. Rams 3',
    image:
      'images/5_Super_Bowl_LIII_logo.jpg',
    alt:
      'logo for Super Bowl 53'
  },
  {
    question: 'Speaking of Super Bowls, there are 4 NFL franchises that have never made it to the big game... but how many teams have never won a Super Bowl?',
    answers: [
      '8',
      '10',
      '12',
      '14',
    ],
    correctAnswer:
      '12',
    image:
      'images/6_Sad_Browns_Fans.jpg',
    alt:
      'image of ashamed Cleveland Browns fans with paper bags covering their heads'
  },
  {
    question: 'Finally, the 1985 Chicago Bears defense is considered by many to be the greatest of all time... how many sacks and turnovers did they produce?',
    answers: [
      '46 sacks, 29 turnovers',
      '38 sacks, 42 turnovers',
      '64 sacks, 54 turnovers',
      '52 sacks, 27 turnovers',
    ],
    correctAnswer:
      '64 sacks, 54 turnovers',
    image:
      'images/7_85_Bears.jpg',
    alt:
      'image of some Chicago Bears players hoisting Head Coach Mike Ditka up on their shoulders after winning the Super Bowl following the 1985 season'
  }
]

let score = 0;
let questionNumber = 0;

// A template to generate each question.
function generateQuestion() {
  if (questionNumber < STORE.length) {
    return createQuestionForm(questionNumber);
  } else {
    $('.questionBox').hide();
    finalScore();
    $('.questionNumber').text(7);
  }
}

// Increments the number value of the "score" variable by 1 based on correct responses, updates "score" number text in the quiz view.
function updateScore() {
  score++;
  $('.score').text(score);
}

// Increments the number value of the "question number" variable, updates "question number" text in the quiz view.
function updateQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

// Resets the text value of the "question number" and "score" variables and updates their repective text in the quiz view.
function resetStats() {
  score = 0;
  questionNumber = 0;
  $('.score').text(0);
  $('.questionNumber').text(0);
}

// Begins the quiz when the "Yes, I'm ready." button is clicked.
function startQuiz() {
  $('.otherBox').hide();
  $('.startQuiz').on('click', '.startButton', function (event) {
    $('.startQuiz').hide();
    $('.questionNumber').text(1);
    $('.questionBox').show();
    $('.questionBox').prepend(generateQuestion());
  });
}

// Submits a selected answer and checks it against the correct answer, runs answer functions accordingly.
function submitAnswer() {
  $('.footballBox').on('submit', function (event) {
    event.preventDefault();
    $('.otherBox').hide();
    $('.response').show();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = STORE[questionNumber].correctAnswer;
    if (answer === correct) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}

// Creates the HTML for the question form.
function createQuestionForm(questionIndex) {
  // Creates a new form.

  let formMaker = $(`
    <form>
      <div class="questionImage">
			  <img class="imageArea" src="${STORE[questionIndex].image}" alt="${STORE[questionIndex].alt}" />
      </div>
      <fieldset>
        <legend class="questionText">${STORE[questionIndex].question}</legend>
      </fieldset>
    </form>`)

  let fieldSelector = $(formMaker).find('fieldset');
  // Finds the newly created form.

  STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
    $(`<label class="option" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span class="answer">${answerValue}</span><br>
      </label>`).appendTo(fieldSelector);
  }); // Adds radio buttons to the form.
  $(`<button type="submit" class="submitButton button">Submit</button>`).appendTo(fieldSelector);
  return formMaker; // Adds submit button to the form.
}

// When a correct answer is submitted, loads a GIF of a referee making the "first down" signal and gives feedback, increments score by 1.
function correctAnswer() {
  $('.response').html(
      `<div class="responseInterior">
        <h3>That's right!</h3>
        <div>
				    <img class="gifArea" src="gifs/Correct_First_Down.gif" alt="referee signalling a first down" />
        </div>
        <p class="movingOn">Moving on...</p>
        <button type="button" class="nextQuestionButton button">Next</button>
      </div>`
  );
  updateScore();
}

// When an incorrect answer is submitted, loads a GIF of a referee waving the "No Good" signal and gives feedback.
function wrongAnswer() {
  $('.response').html(
    `<div class="responseInterior">
        <h3>Nope. Incorrect...</h3>
        <div>
				  <img class="gifArea" src="gifs/Wrong_Incomplete.gif" alt="referee signalling a incomplete pass" />
        </div>
        <p class="movingOn">The correct answer is:<br>${STORE[questionNumber].correctAnswer}</p>
        <button type="button" class="nextQuestionButton button">Next</button>
        </div>`
  );
}

// Generates the next question.
function nextQuestion() {
  $('.footballBox').on('click', '.nextQuestionButton', function (event) {
    $('.otherBox').hide();
    $('.questionBox').show();
    updateQuestionNumber();
    $('.questionBox form').replaceWith(generateQuestion());
  });
}

// Upon completion of the quiz, determines the final score and gives feedback.
function finalScore() {
  $('.final').show();

  const pass = [
    'gifs/Final_Touchdown.gif',
    'referee counting and then signalling touchdown',
    'You really know your football!'
  ];

  const fail = [
    'gifs/Final_Penalty_Flags.gif',
    'guy throwing lots of penalty flags',
    'You... need to study your football.'
  ];

  if (score >= 5) {
    array = pass;
  } else {
    array = fail;
  }
  return $('.final').html(
    `<div class="finalInterior">
        <h3>We're done with the quiz!</h3>
        <p class="questionsCorrect">You got ${score} questions correct.</p>
        <div>
				  <img class="gifArea" src="${array[0]}" alt="${array[1]}" />
        </div>
        <p class="footballKnowledge">${array[2]}</p>
        <button type="button" class="restartQuizButton button">Restart Quiz</button>
        </div>`
  );
}

// Takes user back to the starting view to restart the quiz. Don't use window.location for refresh. Do a show/hide and then regenerate the questions again.
function restartQuiz() {
  $('.footballBox').on('click', '.restartQuizButton', function (event) {
    event.preventDefault();
    resetStats();
    $('.otherBox').hide();
    $('.startQuiz').show();
  });
}

// Runs the functions.
function makeQuiz() {
  startQuiz();
  generateQuestion();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(makeQuiz);