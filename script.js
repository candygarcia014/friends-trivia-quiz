//Variables
var quiz = document.querySelector("#quiz");
var orderedList = document.querySelector("#orderedList");
var welcome = document.querySelector("#welcome");
var timerSent = document.querySelector("#timer");
var currentScore = document.querySelector("#currentScore");
var startButton = document.querySelector("#startButton");
var grade = document.querySelector("#grade");
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");
var finalScore = document.querySelector("#final-score");
var answers = document.querySelectorAll(".answerClass")
var currentQuestion = document.querySelector("#thisQuestion");
var gameover = document.querySelector("#gameover");
var submitButton = document.querySelector("#submit-button");
var initialsInput = document.querySelector("#initials");
var theLeaderboard = document.querySelector("#theleaderboard");
var scores = document.querySelector("#highscores");



//Gamestate variables
var thisQuestion = 0;
var timer = 20;
var score = 0;
var isGameOver = false

//Array of questions
var questions = [{
    theQuestion: "What year did Friends debut?",
    options: ["1994", "1995", "1998", "1999"],
    answer: "0",
}, {
    theQuestion: "How many sister does Joey have?",
    options: ["2", "5", "7", "10"],
    answer: "2",
}, {
    theQuestion: "What nickname did Monica’s dad give her?",
    options: ["Monique", "Little Harmonica", "Mo Mo", "Moniquita"],
    answer: "1",
}, {
    theQuestion: "What’s Phoebe’s sister’s name?",
    options: ["Ariel", "Blanca", "Sonia", "Ursula"],
    answer: "3",
}, {
    theQuestion: "What did Phoebe legally change her name to?",
    options: ["Smelly Cat", "Princess Consuela Bannana Hammock", "Jasmine Chleopatra", "Sussan"],
    answer: "1",
}];

//For loop cycling through each question.
function askQuestions() {

    //Show quiz
    quiz.style.display = "block";

    startTimer();
    rerender();

    //Start timer
    function startTimer() {
        var timerInterval = setInterval(function() {
            timer--;
            timerSent.textContent = timer + " seconds left";

            if (timer <= 0 || gameover.style.display === "block") {
                clearInterval(timerInterval);
                //End Game (state Game Over, go to results page), but if gameover has already  happened, don't do it
                if (quiz.style.display === "none" || gameover.style.display === "none") {
                    return;
                } else {
                    gameOver();
                }
            }
        }, 1000);
    }

    function gameOver() {
        quiz.style.display = "none";
        gameover.style.display = "block";
        currentScore.textContent = "Your Score: " + score;
        finalScore.textContent = score;
    }

    //Makes questions clickable
    function click(event) {
        event.preventDefault();
        event.stopPropagation();
        var answerIndex = this.dataset.index;
        //Declare right or wrong by comparing answer in question object to clicked choice
        if (answerIndex === questions[thisQuestion].answer) {
            grade.textContent = "Correct!"
            score += 10;
            timer += 5;
        } else {
            grade.textContent = "Nope!"
            timer -= 10;
            //how do I set the floor to 0. 
        }

        //Clear old question 
        answers.forEach(function(answer) {
            answer.textContent = "";
        })
        currentQuestion.textContent = "";
        setTimeout(function() {
            grade.textContent = "";
            thisQuestion++;
            if (thisQuestion === questions.length) {
                gameOver();
            } else {
                rerender();
            }
        }, 1000);
    }

    // Ask questions
    function rerender() {

        //Present Score
        currentScore.textContent = "Your Score: " + score;

        //Present questions
        currentQuestion.textContent = questions[thisQuestion].theQuestion;

        //Present 4 potential answers
        for (let index = 0; index < answers.length; index++) {
            var element = answers[index];
            element.textContent = questions[thisQuestion].options[index]
        }
        for (let index = 0; index < answers.length; index++) {
            var element = answers[index];
            element.addEventListener("click", click);
        }
    }

    //Generate new score.
    submitButton.addEventListener("click", function() {
        var initials = initialsInput.value.trim();
        var scoreSaved = JSON.parse(window.localStorage.getItem("scoreSaved"));
        var nameSaved = JSON.parse(window.localStorage.getItem("nameSaved"));
        if (scoreSaved === null || score > scoreSaved) {
            scoreSaved = score;
            nameSaved = initials;
        }

        saveScore();

        //Score history
        function renderScore() {
            // Show leaderboard
            var displayedHighscore = document.createElement("p");
            displayedHighscore.textContent = nameSaved + " : " + scoreSaved + " points"

            theLeaderboard.append(displayedHighscore);
            gameover.style.display = "none";
            theLeaderboard.style.display = "block";
        }

        //Save score
        function saveScore() {
            window.localStorage.setItem("scoreSaved", JSON.stringify(scoreSaved));
            window.localStorage.setItem("nameSaved", JSON.stringify(nameSaved));
        };

        renderScore();



    })
}

//Start Game
startButton.addEventListener("click", function(event) {
    event.preventDefault();
    event.stopPropagation();
    //Hide welcome message
    welcome.style.display = "none";
    //Begin quiz
    askQuestions();
});