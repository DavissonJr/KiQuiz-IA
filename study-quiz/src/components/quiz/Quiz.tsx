import React from "react";

interface QuizProps {
  topic: string;
  questionCount: number;
}

const Quiz: React.FC<QuizProps> = ({ topic, questionCount }) => {
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div
        className="card shadow-lg border-0 rounded-4 p-4"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <h1 className="fw-bold text-primary">Study Quiz</h1>
          <p className="text-muted mb-0">
            Tema: <span className="fw-semibold">{topic}</span>
          </p>
          <p className="text-muted mb-0">
            Quantidade de perguntas:{" "}
            <span className="fw-semibold">{questionCount}</span>
          </p>
        </div>

        <div className="quiz-question mb-4 text-center">
          <h4 id="question" className="fw-semibold">
            Qual linguagem é usada para estilizar páginas web?
          </h4>
        </div>

        <div className="quiz-options">
          <div className="d-flex flex-column gap-3">
            <button type="button" className="btn btn-outline-primary">
              JavaScript
            </button>
            <button type="button" className="btn btn-outline-primary">
              CSS
            </button>
            <button type="button" className="btn btn-outline-primary">
              HTML
            </button>
            <button type="button" className="btn btn-outline-primary">
              Python
            </button>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-4">
          <button id="nextBtn" className="btn btn-primary px-4">
            Next <i className="bi bi-arrow-right-circle ms-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
