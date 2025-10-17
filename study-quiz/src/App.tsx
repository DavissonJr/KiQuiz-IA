// App.tsx
import React, { useState } from "react";
import { ClockLoader } from "react-spinners";
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

  // Loading Component
  const LoadingSpinner = () => (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div className="position-absolute top-0 start-0">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" fill="rgba(255,255,255,0.1)" />
        </svg>
      </div>
      
      <div className="position-absolute bottom-0 end-0">
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
          <polygon points="75,0 150,150 0,150" fill="rgba(255,255,255,0.08)" />
        </svg>
      </div>

      <div
        className="card shadow-lg border-0 rounded-4 p-5 text-center position-relative"
        style={{
          maxWidth: "400px",
          width: "90%",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          zIndex: 1
        }}
      >
        <div className="mb-4">
          <div className="d-flex justify-content-center mb-3">
            <ClockLoader 
              color="#667eea" 
              size={60}
              speedMultiplier={1}
            />
          </div>
        </div>

        <h3 className="fw-bold mb-3" style={{ 
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          Criando seu Quiz...
        </h3>
        
        <p className="text-muted mb-4">
          Preparando <strong>{questionCount}</strong> perguntas sobre <strong>"{topic}"</strong>
        </p>

        <div className="progress mb-3" style={{ height: "6px" }}>
          <div 
            className="progress-bar progress-bar-striped progress-bar-animated" 
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            }}
          />
        </div>
        
        <small className="text-muted">
          Gerando conteúdo com IA...
        </small>
      </div>
    </div>
  );

  return (
    <div>
      {!started && !loading ? (
        <QuizSetup 
          onStart={handleStart} 
          error={error} 
          loading={loading} // Passe o loading como prop
        />
      ) : loading ? (
        <LoadingSpinner />
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