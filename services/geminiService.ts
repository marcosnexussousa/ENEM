
import { GoogleGenAI, Type } from "@google/genai";
import { FeedbackResponse, Theme } from "../types";

const SYSTEM_PROMPT = `Você é o Coordenador de Correção do INEP, a autoridade máxima em redação ENEM.
Sua correção deve ser EXTREMAMENTE RIGOROSA e técnica.

DIRETRIZES CRÍTICAS:
1. FUGA AO TEMA: Se o texto fugir do tema proposto, a nota total deve ser ZERO.
2. TANGENCIAMENTO: Se o aluno abordar apenas o assunto de forma genérica sem focar na proposta específica, penalize severamente a Competência 2 e 3.
3. COMPETÊNCIAS 1-5: Siga estritamente a grade oficial do INEP de 0 a 200 pontos para cada.
4. TOM DE VOZ: Autoritário, técnico, formal.

DIRETRIZ DO "WAZE":
Aponte o caminho exato. O que falta para o 1000? Seja cirúrgico.`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    totalScore: { type: Type.NUMBER },
    competencies: {
      type: Type.OBJECT,
      properties: {
        c1: { type: Type.OBJECT, properties: { score: {type: Type.NUMBER}, label: {type: Type.STRING}, feedback: {type: Type.STRING}, strengths: {type: Type.ARRAY, items: {type: Type.STRING}}, weaknesses: {type: Type.ARRAY, items: {type: Type.STRING}} }, required: ["score", "label", "feedback", "strengths", "weaknesses"] },
        c2: { type: Type.OBJECT, properties: { score: {type: Type.NUMBER}, label: {type: Type.STRING}, feedback: {type: Type.STRING}, strengths: {type: Type.ARRAY, items: {type: Type.STRING}}, weaknesses: {type: Type.ARRAY, items: {type: Type.STRING}} }, required: ["score", "label", "feedback", "strengths", "weaknesses"] },
        c3: { type: Type.OBJECT, properties: { score: {type: Type.NUMBER}, label: {type: Type.STRING}, feedback: {type: Type.STRING}, strengths: {type: Type.ARRAY, items: {type: Type.STRING}}, weaknesses: {type: Type.ARRAY, items: {type: Type.STRING}} }, required: ["score", "label", "feedback", "strengths", "weaknesses"] },
        c4: { type: Type.OBJECT, properties: { score: {type: Type.NUMBER}, label: {type: Type.STRING}, feedback: {type: Type.STRING}, strengths: {type: Type.ARRAY, items: {type: Type.STRING}}, weaknesses: {type: Type.ARRAY, items: {type: Type.STRING}} }, required: ["score", "label", "feedback", "strengths", "weaknesses"] },
        c5: { type: Type.OBJECT, properties: { score: {type: Type.NUMBER}, label: {type: Type.STRING}, feedback: {type: Type.STRING}, strengths: {type: Type.ARRAY, items: {type: Type.STRING}}, weaknesses: {type: Type.ARRAY, items: {type: Type.STRING}} }, required: ["score", "label", "feedback", "strengths", "weaknesses"] },
      },
      required: ["c1", "c2", "c3", "c4", "c5"]
    },
    overallFeedback: { type: Type.STRING },
    suggestedAction: { type: Type.STRING },
    sisuEstimate: {
      type: Type.OBJECT,
      properties: {
        medicine: { type: Type.STRING },
        law: { type: Type.STRING },
        engineering: { type: Type.STRING }
      },
      required: ["medicine", "law", "engineering"]
    }
  },
  required: ["totalScore", "competencies", "overallFeedback", "suggestedAction", "sisuEstimate"]
};

export const correctEssay = async (text: string, theme: Theme): Promise<FeedbackResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `TEMA PROPOSTO: "${theme.title}" (Ano: ${theme.year})\n\nCONTEÚDO DA REDAÇÃO:\n${text}\n\nAnalise com base estrita no tema acima.`,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
      },
    });

    const output = response.text;
    if (!output) throw new Error("A IA não retornou um conteúdo válido.");
    
    return JSON.parse(output.trim()) as FeedbackResponse;
  } catch (error) {
    console.error("Erro na correção via Gemini API:", error);
    throw error;
  }
};
