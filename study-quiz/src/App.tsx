import React, { useState } from "react";
import QuizSetup from "./components/quizSetup/QuizSetup";
import Quiz from "./components/quiz/Quiz";


const App: React.FC = () => {
  const [topic, setTopic] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const [started, setStarted] = useState(false);

  const handleStart = (selectedTopic: string, count: number) => {
    setTopic(selectedTopic);
    setQuestionCount(count);
    setStarted(true);
  };

  return (
    <div>
      {!started ? (
        <QuizSetup onStart={handleStart} />
      ) : (
        <Quiz topic={topic} questionCount={questionCount} />
      )}
    </div>
  );
};

export default App;
