// You are running this on Node.js live server

// Fetch the JSON file and convert it into an array

fetch('http://127.0.0.1:8080/data.json')


    .then(response => response.json())
    .then(data => {
        const questions = data;

// Selecting HTML elements where the quiz content will be displayed
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const quizDiv = document.querySelector(".quiz");
const exitButton = document.createElement("button");

// Variables to track the current question index and the user's score
let currentQuestionIndex = 0;
let score = 0;

// Function to initialize and start the quiz
function startQuiz(){
    currentQuestionIndex = 0;      // Reset question index
    score = 0;                     // Reset score
    nextButton.innerHTML = "Next"; // Set button text to "Next"
    showQuestion();                // Display the first question
}
// Function to display the current question and answers
function showQuestion(){
    resetState(); // Clear any previous question and answers
    let currentQuestion = questions[currentQuestionIndex]; // Get the current question object
    let questionNo = currentQuestionIndex + 1; // Display question number
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // Show question text

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
         button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
       
        if(answer.correct){
            button.dataset.correct = answer.correct;   
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    exitButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
   
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
      //  console.log(button.dataset.correct);
        if(button.dataset.correct === "true")
            {
            button.classList.add("correct");
        }
  
        button.disabled = true;
    });
    nextButton.style.display = "block";

}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    exitButton.classList.add("exit_button");
    exitButton.textContent = 'Exit';
    exitButton.style.display = "block";
    quizDiv.appendChild(exitButton);
    exitButton.addEventListener("click", exitPage);
}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
       showScore(); 
    }
}
function exitPage(){
    window.alert('You have finished the quiz, click X to exit!');
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();
    })
    .catch(error => console.error('Error fetching the JSON:', error));









