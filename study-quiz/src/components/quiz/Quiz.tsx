import React, { useState } from "react";
import type { GeminiQuestion } from "../../services/gemini";

interface QuizProps {
  topic: string;
  questionCount: number;
  questions: GeminiQuestion[];
}

const Quiz: React.FC<QuizProps> = ({ topic, questionCount, questions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (option: string) => {
    if (option === questions[currentIndex].correctAnswer) {
      setScore(score + 1);
    }
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert(
        `Quiz finalizado! Você acertou ${
          score + (option === questions[currentIndex].correctAnswer ? 1 : 0)
        } de ${questionCount} perguntas.`
      );
    }
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="text-center mb-4">
          <h1 className="fw-bold text-primary">Study Quiz</h1>
          <p className="text-muted mb-0">
            Tema: <span className="fw-semibold">{topic}</span>
          </p>
          <p className="text-muted mb-0">
            Pergunta {currentIndex + 1} de {questionCount}
          </p>
        </div>

        <div className="quiz-question mb-4 text-center">
          <h4 className="fw-semibold">{currentQuestion.question}</h4>
        </div>

        <div className="quiz-options">
          <div className="d-flex flex-column gap-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                type="button"
                className="btn btn-outline-primary"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
