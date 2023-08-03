
let timeLeft = document.querySelector(".time-left");
let quizbox = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scorebox = document.querySelector(".score-container");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 61;
let countdown;

// Question Set

const quizArray = [
  {
    id: "0",
    question: "What is the range of values that can be stored by int datatype in C??",
    options: ["-(2^31) to (2^31)-1", "-256 to 255", "-(2^63) to (2^63)-1", "0 to (2^31)-1"],
    correct: "-(2^31) to (2^31)-1",
  },
  {
    id: "1",
    question: "What is the 16-bit compiler allowable range for integer constants?",
    options: ["-3.4e38 to 3.4e38", "-32767 to 32768","-32668 to 32667", "-32768 to 32767"],
    correct: "-32768 to 32767",
  },
  {
    id: "2",
    question: "What is required in each C program?",
    options: ["The program must have at least one function.","The program does not require any function.","Input data", "Output data"],
    correct: "The program must have at least one function.",
  },
  {
    id: "3",
    question: "What is a lint?",
    options: ["C compiler", "Interactive debugger", "Analyzing tool", "C interpreter"],
    correct:  "Analyzing tool",
  },
  {
    id: "4",
    question: "In the C language, the constant is defined _.",
    options: ["Before main", "After main", "Anywhere, but starting on a new line.", "None of the these."],
    correct: "Anywhere, but starting on a new line.",
  },
    {
    id: "5",
    question: "What does 'int x : 4;' declaration mean?",
    options: ["X is a four-digit integer.", "X cannot be greater than a four-digit integer.", "X is a four-bit integer.", "None of the these"],
    correct: "X is a four-bit integer.",
  },
    {
    id: "6",
    question: "Why is a macro used in place of a function?",
    options: ["It reduces execution time.", "It reduces code size.", "It increases execution time.", "It increases code size."],
    correct: "It increases code size.",
  },
    {
    id: "7",
    question: "How many times will the for(j = 1; j <= 10; j = j-1) loop execute?",
    options: ["Forever", "Never", "0", "1"],
    correct: "Forever",
  },
    {
    id: "8",
    question: "A pointer is a memory address. Suppose the pointer variable has p address 1000, and that p is declared to have type int*, and an int is 4 bytes long. What address is represented by expression p + 2?",
    options: ["1002", "1004", "1006", "1008"],
    correct: "1008",
  },
    {
    id: "9",
    question: "Which one of the following is a loop construct that will always be executed once?",
    options: ["for", "while", "switch", "do while"],
    correct: "while",
  },
    {
    id: "10",
    question: "How many characters can a string hold when declared as char name[20];",
    options: ["18", "19", "20", "21"],
    correct: "19",
  },
    {
    id: "11",
    question: "Directives are translated by the",
    options: ["Pre-processor", "Compiler", "Linker", "Editor"],
    correct: "Pre-processor",
  }
];



// Next button 
nextBtn.addEventListener("click", () => {
  displayNext = () => {
    questionCount += 1;    // question + 1

    if (questionCount === 10) {
      displayContainer.classList.add("hide");
      scorebox.classList.remove("hide");

      let percentage = (scoreCount / questionCount) * 100;
      let feedback, detailedFeedback;

      if (percentage >= 80) {
        feedback = 'Good';
        detailedFeedback = 'Congratulations on your outstanding performance! Your assessment results indicate that you have excelled beyond expectations.';
      } else if (percentage >= 50 && percentage < 80) {
        feedback = 'Needs Improvement';
        detailedFeedback = 'Great effort! Your assessment results indicate that you are on the right track, but there is room for improvement. Identify areas where you can enhance your skills and knowledge, and keep pushing yourself to reach your full potential.';
      } else {
        feedback = 'Bad';
        detailedFeedback = 'We acknowledge your efforts in taking the assessment, but it appears there is room for improvement. Remember, setbacks are an opportunity for growth. Take this as a chance to reassess your approach and identify areas that need attention.';
      }

      userScore.innerHTML = "Your score is " + percentage.toFixed(2) + "%" + "<br><br>"+ feedback + "<br><br>" + detailedFeedback; // display feedback message
    } else {
      countOfQuestion.innerHTML = questionCount + 1 + " of 10 Questions"; // displays number of questions

      Display(questionCount);
      count = 61;
      clearInterval(countdown);
      timeDisplay();
    }
  };

  displayNext();
});




const timeDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};


const Display = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  
  quizCards[questionCount].classList.remove("hide");
};


function quizlogic() {
 
  quizArray.sort(() => Math.random() - 0.5);  // sort random questions.


  for (let i = 0; i < 10; i++) {
    const question = quizArray[i];


    question.options.sort(() => Math.random() - 0.5); // sort random options

 
    const div = document.createElement("div");
    div.classList.add("container-mid", "hide");

   
    countOfQuestion.innerHTML = i + 1 + " of 10 Questions";


    const question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = question.question;
    div.appendChild(question_DIV);


    for (let j = 0; j < question.options.length; j++) {
      const optionButton = document.createElement("button");
      optionButton.classList.add("option-div");
      optionButton.onclick = () => checker(optionButton);
      optionButton.innerHTML = question.options[j];
      div.appendChild(optionButton);
    }

    quizbox.appendChild(div);
  }
}



function checker(userOption) {
  let userSolution = userOption.innerText;
  let question = document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  console.log("User's answer:", { useranswer:userSolution });
  console.log("Correct answer:", { correct :quizArray[questionCount].correct});
  console.log("Final Score:", { score: scoreCount});


  if (userSolution === quizArray[questionCount].correct) {   // counts score
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
   
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }


  clearInterval(countdown);
 
  options.forEach((element) => {
    element.disabled = true;
  });
}

// starting intial value for quiz
function initial() {
  quizbox.innerHTML = "";
  questionCount = 0;
  scoreCount = 1;
  count = 61;
  clearInterval(countdown);
  timeDisplay();
  quizlogic();
  Display(questionCount);
}


startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});


window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};