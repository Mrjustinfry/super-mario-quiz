'use strict';

let questionNum = 0;
let scoreTotal = 0;

function createQuestion() {
  //generates question by looping through STORE array
  for(STORE.question=0;STORE.question<=STORE.length;STORE.question++) {
  if (questionNum < STORE.length) {
  return `
  <div class="row">
      <section class="col-12 questionForm" role="region">
      <form role="form">
      <fieldset class="col-12" role="radiogroup">
        <legend class="qHead">${STORE[questionNum].question}</legend>
            <label class="answer">
              <input type="radio" role="radio" value="${STORE[questionNum].answerChoice[0]}" class="answerOption" name="answer" required>
                <span class="aChoice">${STORE[questionNum].answerChoice[0]}</span>
              </label>
              <label class="answer">
              <input type="radio" role="radio" value="${STORE[questionNum].answerChoice[1]}" class="answerOption"  name="answer" required>
                <span class="aChoice">${STORE[questionNum].answerChoice[1]}</span>
              </label>
              <label class="answer">
              <input type="radio" role="radio" value="${STORE[questionNum].answerChoice[2]}" class="answerOption"  name="answer" required>
                  <span class="aChoice">${STORE[questionNum].answerChoice[2]}</span>
              </label>
              <label class="answer">
              <input type="radio" role="radio" value="${STORE[questionNum].answerChoice[3]}" class="answerOption"  name="answer" required>
                <span class="aChoice">${STORE[questionNum].answerChoice[3]}</span>
              </label>
              <br>
              <button class="answerBtn" role="button" value="Submit">Submit</button>
            </fieldset>
          </form>
        </section>
    </div>
    `;
        $(`.scoreContainer`).css('display','block');
  } else {
    finalScore();
  }
}};

//removes start page and displayed questionBox
function startQuiz() {
  $('.box').on('click', '.startBtn', function (e) {
    e.preventDefault();
    $('.box').css('display','none');
    $('.questionBox').css('display','block');
    $('.questionNumber').text(1);
  })};

//renders question in the DOM
function displayQuestion() {
  $('.questionBox').html(createQuestion());
}

//next button functionality
function nextQuestion() {
  $('main').on('click', '.nextBtn', function (e) {
    e.stopPropagation();
    displayQuestion();
    answerSubmit();
    $('.questionNumber').text(questionNum+1);
})};


//displays correct answer feeback
function answerCorrect() {
  let correctAnswer = `${STORE[questionNum].correctAnswer}`;
  $('.questionBox').html(`<div class="row">
      <div class="col-12">
        <section class="answerBoxCorrect" role="region">
        <h1 class="response">Wahoo!</h1>
        <img src="mario.jpg" alt="Mario" class="med" />
        <p class="fBack"><span>${STORE[questionNum].correctAnswer}</span> is correct!</p>
        <button class="nextBtn correctButton" role="button">Continue</button>
        </section>
        </div>
      </div>`);
      scoreBoard();
}

//displays incorrect answer feedback
function answerWrong() {
    let correctAnswer = `${STORE[questionNum].correctAnswer}`;
    let choice = $('input:checked');
  $('.questionBox').html(`<div class="row">
      <div class="col-12">
        <section class="answerBoxWrong" role="region">
        <h1 class="response">Oh No!</h1>
        <img src="bowser.png" alt="Bowser" class="med" />
        <p class="fBack"><span>${choice.val()}</span> is incorrect!<br>The correct answer is: <span class="corAns">${STORE[questionNum].correctAnswer}</span></p>
        <button class="nextBtn wrongButton" role="button">Continue</button>
        </section>
        </div>
      </div>`);
}

//increments score
function scoreBoard() {
  $(`.scoreTotal`).text(scoreTotal+1);
  scoreTotal++;
}

//increments question number
function questionTally() {
  questionNum++;
}

//validates answer submission and calls appropriate feedback
function answerSubmit() {
  $(`.questionForm`).on('submit', function (e) {
    e.preventDefault();
    let choice = $('input:checked');
    let userAnswer = choice.val();
    let correctAnswer = `${STORE[questionNum].correctAnswer}`;
    if (userAnswer === correctAnswer) {
      answerCorrect();
    } else {
      answerWrong();
    }
    questionTally();
  });
}

//determines final page based on score
function finalScore() {
if (scoreTotal >= 8){
  $(`.questionBox`).html(resultPageThree());
} else if (scoreTotal > 3 && scoreTotal < 8){
  $(`.questionBox`).html(resultPageTwo());
} else if (scoreTotal <= 3) {
    $(`.questionBox`).html(resultPageOne());
}
  $(`.scoreContainer`).css('display','none');
}

function restartQuiz() {
   $('main').on('click', '.restartBtn', function (e) {
    questionNum = 0;
    scoreTotal = 0;
    e.stopPropagation();
      $(`.scoreContainer`).css('display','block');
      $('.questionNumber').text(0);
      $(`.scoreTotal`).text(0);
      $('.box').css('display','block');
      $('.questionBox').css('display','none');
      startQuiz();
      displayQuestion();
      answerSubmit();
      nextQuestion();
  });
 console.log('`restartQuiz` ran');
}

//final page for low score
function resultPageOne() {
  return `<div class="row">
        <div class="col-12 finalPageOne">
          <section role="region">
            <h1>Bwah Ha Ha!</h1>
            <img src="bowserFinal.png" alt="Toad" class="med" />
            <h3>Better luck next time!</h3><br>
            <p class="bowserScore">You got ${scoreTotal} out of 10 correct!</p><br>
            <button class="restartBtn bowserBtn" role="button">Try again?</button>
          </section>
        </div>
      </div>`
}

//final page for median score
function resultPageTwo() {
  return `<div class="row">
        <div class="col-12 finalPageTwo">
          <section role="region">
            <h1>Thank you Mario!</h1>
            <img src="toad.png" alt="Toad" class="med" />
            <h3>...but our princess is in another castle.</h3><br>
            <p class="toadScore">You got ${scoreTotal} out of 10 correct!</p><br>
            <button class="restartBtn toadBtn" role="button">Try again?</button>
          </section>
        </div>
      </div>`
}

//final page for high score
function resultPageThree() {
  return `<div class="row">
        <div class="col-12 finalPageThree">
          <section role="region">
            <h1><img src="heart.png" alt="heart" class="x-sml" />Oh Mario!<img src="https://cdn.shopify.com/s/files/1/1061/1924/products/Sparkling_Pink_Heart_Emoji_large.png?v=1480481032" alt="heart" class="x-sml" /></h1>
            <img src="peach.png" alt="Toad" class="med" />
            <h3>You're my hero!</h3>
            <p class="peachScore">You got ${scoreTotal} out of 10 correct!</p><br>
            <button class="restartBtn peachBtn" role="button">Try again?</button>
          </section>
        </div>
      </div>`
}

//displays random img from easter egg array
function easterEgg() {
$('.easterEgg').click(function() {
  let randomEgg = easterEggs[Math.floor(Math.random() * easterEggs.length)];
  $('.easterEggBox').html(randomEgg.src);
  easterEgg();
});
}

function marioQuiz() {
startQuiz();
displayQuestion();
answerSubmit();
nextQuestion();
restartQuiz();
easterEgg();
}

$(marioQuiz);
