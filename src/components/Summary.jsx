import QuizCompImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";
export default function Summary({ userAnswers, onRestart, restartButtonText }) {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswer = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );

  const skippedAnswersShare = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100
  );

  const answeredCorrectShare = Math.round(
    (correctAnswer.length / userAnswers.length) * 100
  );

  const answeredIncorrectShare =
    100 - answeredCorrectShare - skippedAnswersShare;

  let performance;

  if (answeredCorrectShare < 40) {
    performance = "Poor";
  } else if (answeredCorrectShare <= 50) {
    performance = "Below Average";
  } else if (answeredCorrectShare > 50 && answeredCorrectShare < 75) {
    performance = "Average";
  } else {
    performance = "Above Average";
  }

  return (
    <div id="summary">
      <img src={QuizCompImg} alt="trophy icon" />
      <h2>Quiz completed!</h2>
      <p>
        Overall Performance: <strong>{performance}</strong>
      </p>
      <button onClick={onRestart}>{restartButtonText}</button>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersShare}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{answeredCorrectShare}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{answeredIncorrectShare}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = "user-answer";

          if (answer === null) {
            cssClass += " skipped";
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? "skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
