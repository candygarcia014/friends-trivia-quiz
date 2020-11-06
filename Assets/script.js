// DOM element variables
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
var currentQuestion = document.querySelector("#theQuestion");
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
    thequestion: "Which of these data types IS NOT supported by JavaScript",
    options: ["Null", "Boolean", "Alert", "String"],
    answer: "2",
}, {
    thequestion: "What selector is the # symbol used to specify?",
    options: ["ID", "Class", "<P>", "<Div>"],
    answer: "0",
}, {
    thequestion: "When linking your Javascript page, where do you place the link?",
    options: ["Header", "End of Body", "Somewhere in the middle", "Doesn't Matter"],
    answer: "1",
}, {
    thequestion: "Which of these symbols represents the 'or' function?",
    options: ["&&", "===", "++", "||"],
    answer: "3",
}, {
    thequestion: "Which of these is the outermost feature in the box model?",
    options: ["Padding", "Margin", "Border", "Content"],
    answer: "1",
}];

//For loop cycling through each question.
function askQuestions() {

    //Show quiz
    quiz.style.display = "fancy";

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
            grade.textContent = "Zip Zap Correct Is That"
            score += 10;
            timer += 5;
        } else {
            grade.textContent = "Boom Bammed Shoulda Crammed"
            timer -= 10;
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
        currentQuestion.textContent = questions[thisQuestion].thequestion;

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

        //Render score history
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