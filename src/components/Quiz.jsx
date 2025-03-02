import { useState, useCallback } from "react";
import QUESTIONS from "../questions";
import Question from "./Question";
import Summary from "./Summary";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [restartButtonText, setRestartButtonText] = useState("Retry Quiz");
  const [restartButtonCount, setRestartButtonCount] = useState();

  const activeQuestion = userAnswers.length;
  const isOver = activeQuestion === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevAnswer) => {
      return [...prevAnswer, selectedAnswer];
    });
  },
  []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  function handleRestart() {
    let countdown = 5000; // Reset countdown

    const interval = setInterval(() => {
      countdown -= 1000;
      setRestartButtonCount(countdown);
      setRestartButtonText(`Restarting in... ${countdown / 1000}s`);

      if (countdown <= 0) {
        clearInterval(interval);
        setUserAnswers([]);
        setRestartButtonText("Retry Quiz"); // Reset button text after restart
      }
    }, 1000);
  }

  if (isOver) {
    return (
      <Summary
        userAnswers={userAnswers}
        onRestart={handleRestart}
        restartButtonText={restartButtonText}
      />
    );
  }

  return (
    <Question
      key={activeQuestion}
      questionIndex={activeQuestion}
      onSkipAnswer={handleSkipAnswer}
      onSelectAnswer={handleSelectAnswer}
    />
  );
}
