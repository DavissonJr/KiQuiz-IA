export interface GeminiQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
    finishReason: string;
    index: number;
  }[];
  usageMetadata?: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
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
  ]
  
  Retorne APENAS o JSON, sem nenhum texto adicional.`;

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
    generationConfig: {
      responseMimeType: "application/json",
    },
  };

  try {
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

    // Extrai o texto da resposta - note a estrutura diferente
    const text = data.candidates[0].content.parts[0].text;

    // Limpa o texto removendo markdown code blocks se existirem
    const cleanText = text.replace(/```json\n?|\n?```/g, "").trim();

    try {
      const questions: GeminiQuestion[] = JSON.parse(cleanText);
      return questions;
    } catch (parseError) {
      console.error("Erro ao parsear JSON do Gemini:", cleanText, parseError);
      throw new Error("Formato de resposta inválido do Gemini");
    }
  } catch (error) {
    console.error("Erro na requisição Gemini:", error);
    throw error;
  }
};
