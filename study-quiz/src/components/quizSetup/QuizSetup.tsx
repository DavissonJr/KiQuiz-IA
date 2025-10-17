import React, { useState } from "react";
import { ClockLoader } from "react-spinners"; // Importe o spinner

interface QuizSetupProps {
  onStart: (topic: string, questionCount: number) => void;
  error?: string | null;
  loading?: boolean; // Adicione loading como prop
}

const QuizSetup: React.FC<QuizSetupProps> = ({ onStart, error, loading = false }) => {
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
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Elementos decorativos SVG */}
      <div className="position-absolute top-0 start-0">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" fill="rgba(255,255,255,0.1)" />
          <circle cx="50" cy="50" r="30" fill="rgba(255,255,255,0.05)" />
        </svg>
      </div>
      
      <div className="position-absolute bottom-0 end-0">
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
          <polygon points="75,0 150,150 0,150" fill="rgba(255,255,255,0.08)" />
        </svg>
      </div>

      <div
        className="card shadow-lg border-0 rounded-4 p-4 p-md-5 text-center position-relative"
        style={{
          maxWidth: "500px",
          width: "90%",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          zIndex: 1
        }}
      >
        {/* Ícone decorativo */}
        <div className="mb-4">
          <div 
            className="mx-auto rounded-circle d-flex align-items-center justify-content-center mb-3"
            style={{
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)"
            }}
          >
            {loading ? (
              <ClockLoader color="white" size={30} />
            ) : (
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            )}
          </div>
        </div>

        <h2 className="fw-bold mb-3" style={{ 
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          {loading ? "Gerando Quiz..." : "Configurar Quiz"}
        </h2>
        
        <p className="text-muted mb-4 fs-6">
          {loading ? "Preparando perguntas incríveis..." : "Escolha um tema fascinante e defina o desafio!"}
        </p>

        {/* Mostrar erro se existir */}
        {error && (
          <div className="alert alert-danger d-flex align-items-center" role="alert">
            <svg width="20" height="20" className="me-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <div>
              {error}
            </div>
          </div>
        )}

        {/* Conteúdo normal ou loading */}
        {loading ? (
          <div className="text-center py-4">
            <div className="mb-3">
              <ClockLoader color="#667eea" size={40} />
            </div>
            <p className="text-muted mb-3">
              Gerando <strong>{questionCount}</strong> perguntas sobre <strong>"{topic}"</strong>
            </p>
            <div className="progress" style={{ height: "6px" }}>
              <div 
                className="progress-bar progress-bar-striped progress-bar-animated" 
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                }}
              />
            </div>
          </div>
        ) : (
          <>
            {/* Tema */}
            <div className="mb-4 text-start">
              <label className="form-label fw-semibold text-dark mb-3">
                🎯 Tema do Quiz
              </label>
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-light border-end-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#667eea" stroke="none">
                    <path d="M21.5 21.5L16.5 16.5M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"/>
                  </svg>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-2"
                  placeholder="Ex: JavaScript, História, Biologia..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  style={{ borderLeft: "none" }}
                />
              </div>
            </div>

            {/* Quantidade de perguntas */}
            <div className="mb-5 text-start">
              <label className="form-label fw-semibold text-dark mb-3">
                📊 Quantidade de Perguntas: 
                <span className="ms-2 badge bg-primary fs-6">{questionCount}</span>
              </label>
              <input
                type="range"
                className="form-range"
                min="1"
                max="50"
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                style={{
                  background: `linear-gradient(to right, #667eea 0%, #764ba2 ${(questionCount / 50) * 100}%, #e9ecef ${(questionCount / 50) * 100}%, #e9ecef 100%)`
                }}
              />
              <div className="d-flex justify-content-between text-muted small mt-1">
                <span>1</span>
                <span>25</span>
                <span>50</span>
              </div>
            </div>

            {/* Botão iniciar */}
            <button
              onClick={handleStart}
              disabled={!topic.trim()} // Desabilita se não tiver tema
              className="btn btn-lg w-100 d-flex align-items-center justify-content-center gap-3 fw-semibold py-3"
              style={{
                background: !topic.trim() 
                  ? "#6c757d" 
                  : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                color: "white",
                transition: "all 0.3s ease",
                boxShadow: !topic.trim() ? "none" : "0 4px 15px rgba(102, 126, 234, 0.4)"
              }}
              onMouseEnter={(e) => {
                if (topic.trim()) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.6)";
                }
              }}
              onMouseLeave={(e) => {
                if (topic.trim()) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
                }
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5,3 19,12 5,21" fill="currentColor"/>
              </svg>
              {!topic.trim() ? "Digite um tema" : "Iniciar Quiz"}
            </button>

            {/* Dica */}
            <div className="mt-4">
              <small className="text-muted">
                💡 Dica: Seja específico no tema para perguntas mais relevantes
              </small>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizSetup;