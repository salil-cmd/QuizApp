import { allQuizQuestions } from './questions.js'


// Shuffles our 'all questions array' every time the page is loaded
allQuizQuestions.sort(() => 0.5 - Math.random())

// Makes set of 10 random questions from 'all questions array'
const quizDB = [];
for (let i = 0; i < 10; i++) {
    quizDB.push(allQuizQuestions[i])
}


const question = document.querySelector('.question');
const option1 = document.querySelector('#option1');
const option2 = document.querySelector('#option2');
const option3 = document.querySelector('#option3');
const option4 = document.querySelector('#option4');
const submit = document.querySelector('#submit');

const answers = document.querySelectorAll('.answer')
const showScore = document.querySelector('#showScore')
const contentDiv = document.querySelector(".content-div")
const scoreCountDiv = document.querySelector("#score-div")
const scoreCount = document.querySelector("#score-count")
const statusDiv = document.querySelector('#status-div')

let questionCount = 0;

const loadQuestion = () => {

    const questionList = quizDB[questionCount];  

    question.innerText = questionList.question;

    option1.innerText = questionList.a;
    option2.innerText = questionList.b;
    option3.innerText = questionList.c;
    option4.innerText = questionList.d;

}
loadQuestion();


// This function detects the option which the user has selected and stores in the variable "userMarkedOption"
let attempted = false;
const markedOption = () => {

    let userMarkedOption;

    answers.forEach((curAnsElement) => {
        if (curAnsElement.checked) {
            userMarkedOption = curAnsElement.id;
            attempted = true;
        }

    });

    return userMarkedOption;

};

// This function removes the user response of the question which was selected from the previous question 
const deselectAll = () => {
    answers.forEach((curAnsElement) => curAnsElement.checked = false); //
}

// This function triggers when the user click on submit without selecting any option
let alertDiv = document.querySelector("#alert-div")
const showAlert = () => {
    alertDiv.style.visibility = "visible"
}

// This div shows the status of the questions and it gets updated every time the user jumps to the next question
statusDiv.innerHTML = `Question ${questionCount + 1} of ${quizDB.length}`

let score = 0;
submit.addEventListener('click', () => {
    const checkedAnswer = markedOption();  // the value that markedOption() returned is stored in this variable
    console.log(checkedAnswer);
    console.log(attempted)

    // clicked on submit if no option is selected
    if (!attempted) {
        showAlert();
    }
    // clicked on submit after selecting a option
    else {
        statusDiv.innerHTML = `Question ${questionCount + 2} of ${quizDB.length}`
        alertDiv.style.visibility =  'hidden'
        attempted = false

        // this updates the score
        if (checkedAnswer == quizDB[questionCount].ans) {
            score++;
            scoreCount.innerText = score
        };

        questionCount++;  // moves to the next question

        deselectAll();  // clears the response from the previous question

        if (questionCount < quizDB.length) {
            loadQuestion();
        } 
        
        // at the end of the quiz below code will work OR it is the result section
        else {
            // If every answer is correct
            if (score == quizDB.length) {
                showScore.innerHTML = `
    
                 <h3> <b>Congratulations!!<b> You scored 100%</h3>
                 <button class="btn" onclick="location.reload()">Play Again</button> `;  // this button reloads the page and thereby quiz gets reset and starts from the beginning.

            } else {
                showScore.innerHTML = `
    
                 <h3> You scored ${score}/${quizDB.length}</h3>
                 <button class="btn" onclick="location.reload()">Play Again</button> `;  // this button reloads the page and thereby quiz gets reset and starts from the beginning.

            }


            // this section removes the elements like questions,answers and shows only required elements on the result page
            showScore.classList.remove('scoreArea');
            submit.style.display = "none"
            contentDiv.style.display = "none"
            scoreCountDiv.style.display = 'none'
            statusDiv.style.display = "none"
        }
    }
});