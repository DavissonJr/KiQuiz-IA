export interface GeminiQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface GeminiResponse {
  candidates: {
    content: {
      text: string;
    }[];
  }[];
}

export const fetchQuizQuestions = async (
  topic: string,
  questionCount: number
): Promise<GeminiQuestion[]> => {
  const API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

  const prompt = `Gere ${questionCount} questões sobre ${topic} com 4 alternativas cada e indique a correta no seguinte formato JSON:
  [
    {
      "question": "Pergunta aqui",
      "options": ["opção1", "opção2", "opção3", "opção4"],
      "correctAnswer": "opção correta"
    }
  ]`;

  const payload = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  };

  const response = await fetch(
    `${API_URL}?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erro na API Gemini: ${response.status} ${errText}`);
  }

  const data: GeminiResponse = await response.json();

  // O texto retornado pelo Gemini vem em data.candidates[0].content[0].text
  const text = data.candidates[0].content[0].text;

  try {
    const questions: GeminiQuestion[] = JSON.parse(text);
    return questions;
  } catch (err) {
    console.error("Erro ao parsear JSON do Gemini:", text, err);
    return [];
  }
};
