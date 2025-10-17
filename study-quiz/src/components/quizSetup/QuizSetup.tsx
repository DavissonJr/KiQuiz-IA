import React, { useState } from "react";

interface QuizSetupProps {
  onStart: (topic: string, questionCount: number) => void;
}

const QuizSetup: React.FC<QuizSetupProps> = ({ onStart }) => {
  const [topic, setTopic] = useState("");
  const [questionCount, setQuestionCount] = useState(10);

  const handleStart = () => {
    if (!topic.trim()) {
      alert("Por favor, insira um tema para o quiz!");
      return;
    }
    onStart(topic, questionCount);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #007bff 0%, #6610f2 100%)",
      }}
    >
      <div
        className="card shadow-lg border-0 rounded-4 p-5 text-center"
        style={{
          maxWidth: "500px",
          width: "90%",
          background: "white",
        }}
      >
        <h2 className="fw-bold text-primary mb-3">🎓 Configurar Quiz</h2>
        <p className="text-muted mb-4">
          Escolha um tema e a quantidade de perguntas.
        </p>

        {/* Tema */}
        <div className="mb-4 text-start">
          <label className="form-label fw-semibold">
            Tema do Quiz
          </label>
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Ex: JavaScript, História, Biologia..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        {/* Quantidade de perguntas */}
        <div className="mb-4 text-start">
          <label className="form-label fw-semibold">
            Quantidade de Perguntas: {questionCount}
          </label>
          <input
            type="range"
            className="form-range"
            min="1"
            max="50"
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
          />
        </div>

        {/* Botão iniciar */}
        <button
          onClick={handleStart}
          className="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center gap-2"
        >
          <i className="bi bi-play-fill fs-4"></i> Iniciar Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizSetup;
