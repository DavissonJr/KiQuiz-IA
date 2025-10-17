export interface GeminiQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export const fetchQuizQuestions = async (
  topic: string,
  questionCount: number
): Promise<GeminiQuestion[]> => {
  const response = await fetch("https://api.gemini.com/v1/quiz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_GEMINI_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: `Gere ${questionCount} questões sobre ${topic} com 4 opções de resposta cada e indique a correta.`,
    }),
  });

  const data = await response.json();
  return data.questions;
};
