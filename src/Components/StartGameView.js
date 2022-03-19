import React from 'react';

function StartGameView(props) {

  return (
    <div className="start-game">
      <h1>Quizzical</h1>
      <h3>Make your own Custom Quiz, by choosing the options below.</h3>
      <form className="form-api">
        <label htmlFor="amount">Number of Questions</label>
        <input type="number" name="amount" id="form-amount" className="form-control" min="1" max="50" onChange={props.onChange} value={props.questionsForm.amount}></input>
        <br></br>
        <label htmlFor="form_category">Select Category: </label>
        <select name="category" className="form-control" value={props.questionsForm.category} onChange={props.onChange}>
          <option value="any">Any Category</option>
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          <option value="12">Entertainment: Music</option>
          <option value="13">Entertainment: Musicals &amp; Theatres</option>
          <option value="14">Entertainment: Television</option>
          <option value="15">Entertainment: Video Games</option>
          <option value="16">Entertainment: Board Games</option>
          <option value="17">Science &amp; Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
          <option value="29">Entertainment: Comics</option>
          <option value="30">Science: Gadgets</option>
          <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
          <option value="32">Entertainment: Cartoon &amp; Animations</option>
        </select>
        <br></br>
        <label htmlFor="difficulty">Select Difficulty: </label>
        <select name="difficulty" className="form-control" value={props.questionsForm.difficulty} onChange={props.onChange}>
          <option value="any">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
		    </select>
        <br></br>
        <label htmlFor="type">Select Type: </label>
        <select name="type" className="form-control" value={props.questionsForm.type} onChange={props.onChange}>&gt;
          <option value="any">Any Type</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True / False</option>
        </select>

      </form>
      <button className="start-game--button" onClick={props.onClick}>
        Start Quiz
      </button>
    </div>
  );
}

export default StartGameView;
