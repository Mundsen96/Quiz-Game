import { nanoid } from 'nanoid';
import React from 'react';

function Question(props) {
  function removeNonLetters(string) {
    return string.replace(/[^\w\s]/gi, '');
  }

  let buttons = props.answers.map((button) => {
    return (
      <button
        key={nanoid(3)}
        onClick={() => props.onAnswerClick(button.id)}
        id={button.id}
        className={'answers-button'}
        style={
          button.isClicked && !props.checkAnswerClicked
            ? { border: 'none', backgroundColor: '#D6DBF5' }
            : props.checkAnswerClicked &&
              button.isClicked &&
              button.answer === props.correct
            ? { border: 'none', cursor: 'auto', backgroundColor: '#94D7A2' }
            : props.checkAnswerClicked &&
              button.isClicked &&
              button.answer !== props.correct
            ? {
                border: 'none',
                cursor: 'auto',
                backgroundColor: '#F8BCBC',
                opacity: 0.5,
              }
            : props.checkAnswerClicked &&
              !button.isClicked &&
              button.answer === props.correct
            ? { border: 'none', cursor: 'auto', backgroundColor: '#94D7A2' }
            : props.checkAnswerClicked && !button.isClicked
            ? { cursor: 'auto', opacity: 0.5 }
            : {}
        }
      >
        {props.answers.length > 2 ? removeNonLetters(button.answer) : button.answer}
      </button>
    );
  });

  return (
    <div className="question">
      <h3>{removeNonLetters(props.question)}</h3>
      <div className="answers">{buttons}</div>
    </div>
  );
}

export default Question;
