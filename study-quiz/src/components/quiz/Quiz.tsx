import React, { useState } from "react";
import type { GeminiQuestion } from "../../services/gemini";

interface QuizProps {
  topic: string;
  questionCount: number;
  questions: GeminiQuestion[];
  onRestart: () => void; 
}

const Quiz: React.FC<QuizProps> = ({ topic, questionCount, questions, onRestart }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswer = (option: string) => {
    setSelectedAnswer(option);
    const correct = option === questions[currentIndex].correctAnswer;
    setIsCorrect(correct);

    setTimeout(() => {
      if (correct) {
        setScore(score + 1);
      }
      
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        const finalScore = score + (correct ? 1 : 0);
        setScore(finalScore);
        setQuizFinished(true);
      }
    }, 1500);
  };

  const handleRestart = () => {
    onRestart();
  };

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questionCount) * 100;

  if (quizFinished) {
    const percentage = Math.round((score / questionCount) * 100);
    let message = "";
    let emoji = "";
    
    if (percentage >= 90) {
      message = "Excelente! Você é um expert! 🎯";
      emoji = "🏆";
    } else if (percentage >= 70) {
      message = "Muito bom! Você mandou bem! 👍";
      emoji = "⭐";
    } else if (percentage >= 50) {
      message = "Bom trabalho! Continue praticando! 💪";
      emoji = "✅";
    } else {
      message = "Não desanime! Pratique mais um pouco! 📚";
      emoji = "🔥";
    }

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
        <div className="position-absolute top-0 end-0">
          <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
            <circle cx="90" cy="90" r="70" fill="rgba(255,255,255,0.1)" />
            <circle cx="120" cy="60" r="25" fill="rgba(255,255,255,0.05)" />
          </svg>
        </div>
        
        <div className="position-absolute bottom-0 start-0">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <rect x="30" y="30" width="60" height="60" rx="15" fill="rgba(255,255,255,0.08)" />
          </svg>
        </div>

        <div
          className="card shadow-lg border-0 rounded-4 p-4 p-md-5 position-relative text-center"
          style={{
            maxWidth: "500px",
            width: "90%",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            zIndex: 1
          }}
        >
          {/* Botão de voltar no canto superior esquerdo */}
          <button
            onClick={handleRestart}
            className="btn btn-outline-primary border-0 position-absolute top-0 start-0 m-3 rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "50px",
              height: "50px",
              background: "rgba(102, 126, 234, 0.1)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(102, 126, 234, 0.2)";
              e.currentTarget.style.transform = "rotate(180deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(102, 126, 234, 0.1)";
              e.currentTarget.style.transform = "rotate(0deg)";
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>

          {/* Ícone de resultado */}
          <div className="mb-4">
            <div 
              className="mx-auto rounded-circle d-flex align-items-center justify-content-center mb-3"
              style={{
                width: "100px",
                height: "100px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
                fontSize: "2.5rem"
              }}
            >
              {emoji}
            </div>
          </div>

          <h2 className="fw-bold mb-3" style={{ 
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Quiz Finalizado!
          </h2>

          <div className="mb-4">
            <h1 className="display-4 fw-bold text-dark mb-2">{percentage}%</h1>
            <p className="text-muted fs-5">
              Você acertou <strong>{score}</strong> de <strong>{questionCount}</strong> perguntas
            </p>
          </div>

          <div className="alert alert-info border-0 rounded-3 mb-4">
            <div className="fw-semibold fs-5">{message}</div>
          </div>

          <button
            onClick={handleRestart}
            className="btn btn-lg w-100 d-flex align-items-center justify-content-center gap-3 fw-semibold py-3"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              color: "white",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 4L23 10 17 10" stroke="currentColor" strokeWidth="2"/>
              <path d="M1 20L1 14 7 14" stroke="currentColor" strokeWidth="2"/>
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Fazer Novo Quiz
          </button>
        </div>
      </div>
    );
  }

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
      <div className="position-absolute top-0 end-0">
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
          <circle cx="90" cy="90" r="70" fill="rgba(255,255,255,0.1)" />
          <circle cx="120" cy="60" r="25" fill="rgba(255,255,255,0.05)" />
        </svg>
      </div>
      
      <div className="position-absolute bottom-0 start-0">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <rect x="30" y="30" width="60" height="60" rx="15" fill="rgba(255,255,255,0.08)" />
        </svg>
      </div>

      <div
        className="card shadow-lg border-0 rounded-4 p-4 p-md-5 position-relative"
        style={{
          maxWidth: "600px",
          width: "90%",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          zIndex: 1
        }}
      >
        {/* Botão de voltar no canto superior esquerdo */}
        <button
          onClick={handleRestart}
          className="btn btn-outline-primary border-0 position-absolute top-0 start-0 m-3 rounded-circle d-flex align-items-center justify-content-center"
          style={{
            width: "50px",
            height: "50px",
            background: "rgba(102, 126, 234, 0.1)",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(102, 126, 234, 0.2)";
            e.currentTarget.style.transform = "rotate(180deg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(102, 126, 234, 0.1)";
            e.currentTarget.style.transform = "rotate(0deg)";
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>

        {/* Header com progresso */}
        <div className="text-center mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="text-start">
              <span className="badge bg-primary bg-gradient fs-6">
                🎯 {topic}
              </span>
            </div>
            <div className="text-end">
              <span className="badge bg-light text-dark fs-6">
                ✅ {score} acertos
              </span>
            </div>
          </div>

          {/* Barra de progresso */}
          <div className="mb-4">
            <div className="d-flex justify-content-between mb-2">
              <small className="text-muted fw-semibold">
                Pergunta {currentIndex + 1} de {questionCount}
              </small>
              <small className="text-muted fw-semibold">
                {Math.round(progress)}%
              </small>
            </div>
            <div 
              className="progress rounded-pill" 
              style={{ height: "8px", background: "rgba(102, 126, 234, 0.1)" }}
            >
              <div
                className="progress-bar rounded-pill"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  transition: "width 0.5s ease"
                }}
              />
            </div>
          </div>
        </div>

        {/* Área da pergunta */}
        <div 
          className="quiz-question mb-5 p-4 rounded-3 text-center"
          style={{
            background: "rgba(102, 126, 234, 0.05)",
            border: "1px solid rgba(102, 126, 234, 0.1)",
            minHeight: "120px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <h4 className="fw-semibold mb-0 text-dark" style={{ lineHeight: "1.5" }}>
            {currentQuestion.question}
          </h4>
        </div>

        {/* Feedback visual */}
        {selectedAnswer && (
          <div className={`alert ${isCorrect ? 'alert-success' : 'alert-danger'} d-flex align-items-center gap-3 rounded-3 mb-4`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              {isCorrect ? (
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              ) : (
                <path d="M10 14L12 12M12 12L14 10M12 12L10 10M12 12L14 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              )}
            </svg>
            <span className="fw-semibold">
              {isCorrect ? "🎉 Resposta correta!" : "❌ Resposta incorreta"}
            </span>
          </div>
        )}

        {/* Opções de resposta */}
        <div className="quiz-options">
          <div className="d-flex flex-column gap-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isActuallyCorrect = option === questions[currentIndex].correctAnswer;
              
              const buttonStyle = {
                background: "transparent",
                border: "2px solid #e9ecef",
                color: "#495057",
                transition: "all 0.3s ease"
              };

              if (isSelected) {
                buttonStyle.background = isCorrect 
                  ? "linear-gradient(135deg, #28a745 0%, #20c997 100%)"
                  : "linear-gradient(135deg, #dc3545 0%, #fd7e14 100%)";
                buttonStyle.border = "2px solid transparent";
                buttonStyle.color = "white";
              } else if (selectedAnswer && isActuallyCorrect) {
                buttonStyle.background = "linear-gradient(135deg, #28a745 0%, #20c997 100%)";
                buttonStyle.border = "2px solid transparent";
                buttonStyle.color = "white";
              }

              return (
                <button
                  key={idx}
                  type="button"
                  className="btn btn-lg fw-semibold py-3 rounded-3 position-relative"
                  onClick={() => !selectedAnswer && handleAnswer(option)}
                  disabled={!!selectedAnswer}
                  style={buttonStyle}
                  onMouseEnter={(e) => {
                    if (!selectedAnswer) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.3)";
                      e.currentTarget.style.border = "2px solid #667eea";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!selectedAnswer) {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.border = "2px solid #e9ecef";
                    }
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <span>{option}</span>
                    {isSelected && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        {isCorrect ? (
                          <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        ) : (
                          <path d="M6 18L18 6M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        )}
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Indicador de loading entre perguntas */}
        {selectedAnswer && (
          <div className="text-center mt-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando próxima pergunta...</span>
            </div>
            <small className="text-muted d-block mt-2">Preparando próxima pergunta...</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;