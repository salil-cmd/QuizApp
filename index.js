const quizDB = [
    {
        question: "Q1: What is the full form of HTML?",
        a: "Hello To My Land",
        b: "Hey Text Markup Language",
        c: "Hypes Making Language",
        d: "HyperText Markup Language",
        ans: "ans4"
    },

    {
        question: "Q2: What is the full form of JS?",
        a: "JavaScript",
        b: "Hey Text Markup Language",
        c: "HyperText Markup Language",
        d: "HyperText Markup Language",
        ans: "ans1"
    },

    {
        question: "Q3: What is the full form of SD?",
        a: "Hello To My Land",
        b: "Hey Text Markup Language",
        c: "Salil Deogade",
        d: "HyperText Markup Language",
        ans: "ans3"
    },
    {
        question: "Q4: What is the full form of OS?",
        a: "Hello To My Land",
        b: "Operating Systems",
        c: "HyperText Markup Language",
        d: "HyperText Markup Language",
        ans: "ans2"
    }

];
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

const markedOption = () => {

    let userMarkedOption;
    let ifattempted = false;

    answers.forEach((curAnsElement) => {
        if (curAnsElement.checked) {
            userMarkedOption = curAnsElement.id;
            ifattempted = true;
        }

        
        
    });

    if(!ifattempted){
        console.log("not attempted")
    }
    
    return userMarkedOption;

};

const deselectAll = () => {
    answers.forEach((curAnsElement) => curAnsElement.checked = false); //
}

let score = 0;
submit.addEventListener('click', () => {
    const checkedAnswer = markedOption();
    console.log(checkedAnswer);
    
    if (checkedAnswer == quizDB[questionCount].ans) {
        score++;
        scoreCount.innerText = score
    };

    questionCount++;

    deselectAll();

    if (questionCount < quizDB.length) {
        loadQuestion();
    } else {
        if (score == quizDB.length) {
            showScore.innerHTML = `

             <h3> <b>Congratulations!!<b> You scored 100%</h3>
             <button class="btn" onclick="location.reload()">Play Again</button> `;

        } else {
            showScore.innerHTML = `

             <h3> You scored ${score}/${quizDB.length}</h3>
             <button class="btn" onclick="location.reload()">Play Again</button> `;

        }



        showScore.classList.remove('scoreArea');
        submit.style.display = "none"
        contentDiv.style.display = "none"
        scoreCountDiv.style.display = 'none'

    }
});