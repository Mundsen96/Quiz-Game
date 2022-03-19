import Question from './Components/Question';
import StartGameView from './Components/StartGameView';
import React from 'react';
import { nanoid } from 'nanoid';
import './App.css';

function App() {
  const [startGame, setStartGame] = React.useState(false);
  const [questionsData, setQuestionsData] = React.useState([]);
  const [checkAnswers, setCheckAnswers] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [questions, setQuestions] = React.useState({
    amount: '10',
    category: '',
    difficulty: '',
    type: '',
  });

  React.useEffect(() => {
    fetch(
      createNewURL(questions)
    )
      .then((res) => res.json())
      .then((data) => adjustQuestionsData(data));
  }, [startGame]);

  function adjustQuestionsData(fetchedData) {
    let data = fetchedData.results;
    let adjustedQuestions = [];
    for (let i = 0; i < data.length; i++) {
      let randomAnswers = [
        data[i].correct_answer,
        ...data[i].incorrect_answers,
      ];
      let length = randomAnswers.length;
      if(length>2){
        let index = Math.floor(Math.random() * 4);
        [randomAnswers[0], randomAnswers[index]] = [
          randomAnswers[index],
          randomAnswers[0],
        ];
      }else if(length === 2){
        let index = Math.round(Math.random());
        [randomAnswers[0], randomAnswers[index]] = [
          randomAnswers[index],
          randomAnswers[0],
        ];
      }

      adjustedQuestions.push({
        answers: randomAnswers,
        correct_answer: data[i].correct_answer,
        question: data[i].question,
      });
    }
    let arrayWithIdAnswers = adjustedQuestions.map((question) => {
      return {
        ...question,
        answers: question.answers.map((answer) => {
          return { answer: answer, id: nanoid(3), isClicked: false };
        }),
      };
    });
    setQuestionsData(arrayWithIdAnswers);
  }

  function createNewURL(data){
    let amount = data.amount;
    let baseUrl = `https://opentdb.com/api.php?amount=${amount}`;
    let url;
    for(const key in data){
      if(data[key] !== '' && key !== 'amount'){
        url = baseUrl.concat(`&${key}=${data[key]}`)
      }
    }
    return url ? url : baseUrl;
  }

  function handleFormChange(event){
    const name = event.target.name;
    const value = event.target.value;
    setQuestions(prevQuestions => {
      return {
        ...prevQuestions, [name]: value
      }
    })
  }

  function handleStartGame() {
    setStartGame((prevValue) => !prevValue);
  }

  function handleAnswerClick(id) {
    setQuestionsData((prevValue) =>
      prevValue.map((question) => {
        return !question.answers.some((answer) => answer.isClicked === true)
          ? {
              ...question,
              answers: question.answers.map((answer) =>
                answer.id === id
                  ? { ...answer, isClicked: !answer.isClicked }
                  : answer
              ),
            }
          : {
              ...question,
              answers: question.answers.map((answer) =>
                answer.id === id && answer.isClicked === true
                  ? { ...answer, isClicked: !answer.isClicked }
                  : answer
              ),
            };
      })
    );
  }

  function handleCheckAnswersClick() {
    if(!checkAnswers){
      let score = 0;
      let answeredQuestions = questionsData;
      for (let i = 0; i < answeredQuestions.length; i++) {
        if (answeredQuestions[i].answers.some((answer) => answer.isClicked)) {
          let chosenAnswer = answeredQuestions[i].answers.filter(
            (answer) => answer.isClicked === true
          );
          if (chosenAnswer[0].answer === answeredQuestions[i].correct_answer) {
            score = score + 1;
          }
        } 
      }
      setCheckAnswers((prevValue) => !prevValue);
      setScore(score);
    }else{
      setStartGame((prevValue) => !prevValue);
      setCheckAnswers((prevValue) => !prevValue);
    }
  }

  const mappedQuestions = questionsData.map((data) => {
    return (
      <Question
        key={nanoid(10)}
        id={nanoid(3)}
        question={data.question}
        correct={data.correct_answer}
        answers={data.answers}
        onAnswerClick={handleAnswerClick}
        checkAnswerClicked={checkAnswers}
      />
    );
  });

  return (
    <div className="App">
      {!startGame && <StartGameView onClick={handleStartGame} onChange={handleFormChange} questionsForm={questions}/>}
      {startGame && 
      <div className='questions-container'>
      {mappedQuestions}
      </div>}
      {startGame && <div className='score-button'>
        {checkAnswers && (
          <p className="score">You scored {score}/{questions.amount} correct answers</p>
        )}
          <button
            className="check-answers-button"
            onClick={handleCheckAnswersClick}
          >
            {checkAnswers ? 'Play Again': 'Check Answers' }
          </button>
      </div>}
    </div>
  );
}

export default App;
