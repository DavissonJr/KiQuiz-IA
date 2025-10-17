import React, { useState } from "react";
import QuizSetup from "./components/quizSetup/QuizSetup";
import Quiz from "./components/quiz/Quiz";
import type { GeminiQuestion } from "./services/gemini";
import { fetchQuizQuestions } from "./services/gemini";

const App: React.FC = () => {
  const [topic, setTopic] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<GeminiQuestion[]>([]);
  const [loading, setLoading] = useState(false);

  const handleStart = async (selectedTopic: string, count: number) => {
    setTopic(selectedTopic);
    setQuestionCount(count);
    setLoading(true);

    try {
      const quizQuestions = await fetchQuizQuestions(selectedTopic, count);
      setQuestions(quizQuestions);
      setStarted(true);
    } catch (error) {
      console.error("Erro ao gerar quiz:", error);
      alert("Ocorreu um erro ao gerar o quiz.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!started ? (
        <QuizSetup onStart={handleStart} />
      ) : loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <h3>Gerando perguntas...</h3>
        </div>
      ) : (
        <Quiz topic={topic} questionCount={questionCount} questions={questions} />
      )}
    </div>
  );
};

export default App;
