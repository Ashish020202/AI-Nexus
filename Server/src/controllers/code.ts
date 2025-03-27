import { Request, Response } from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in environment variables");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  tools: [{ codeExecution: {} }],
});

export const generateCode = async (req: Request, res: Response) => {
  try {
    const { prompt} = req.body;
    if (!prompt) {
      res.status(400).json({ error: "Prompt and language are required" });
      return;
    }

    const formattedPrompt = `Generate code only for the given ${prompt} the code should be optimised and strictily follow users requirement and try to give optimised solution`;
    const result = await model.generateContent(formattedPrompt);
    const response = result.response;

    res.status(200).json({ code: response.text() });
    return;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ error: "Failed to generate code." });
    return;
  }
};

export default generateCode;
