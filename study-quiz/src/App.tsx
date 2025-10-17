import React, { useState } from "react";
import QuizSetup from "./components/quizSetup/QuizSetup";
import Quiz from "./components/quiz/Quiz";
import Loading from "./components/loading/Loading";
import type { GeminiQuestion } from "./services/gemini";
import { fetchQuizQuestions } from "./services/gemini";

const App: React.FC = () => {
  const [topic, setTopic] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<GeminiQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStart = async (selectedTopic: string, count: number) => {
    setTopic(selectedTopic);
    setQuestionCount(count);
    setLoading(true);
    setError(null);

    try {
      const quizQuestions = await fetchQuizQuestions(selectedTopic, count);

      if (quizQuestions.length === 0) {
        throw new Error("Nenhuma questão foi gerada");
      }

      setQuestions(quizQuestions);
      setStarted(true);
    } catch (error) {
      console.error("Erro ao gerar quiz:", error);
      setError(error instanceof Error ? error.message : "Erro desconhecido ao gerar quiz");
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setStarted(false);
    setQuestions([]);
    setError(null);
    setTopic("");
    setQuestionCount(0);
  };

  return (
    <div>
      {!started && !loading ? (
        <QuizSetup 
          onStart={handleStart} 
          error={error} 
          loading={loading} 
        />
      ) : loading ? (
        <Loading topic={topic} questionCount={questionCount} />
      ) : (
        <Quiz 
          topic={topic} 
          questionCount={questionCount} 
          questions={questions} 
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default App;
