import express, { Request, Response } from 'express';
import { fal } from "@fal-ai/client";
// import { FAL_AI_API_KEY, FAL_AI_API_URL } from '../config';
fal.config({ credentials:process.env.FAL_AI_API_KEY });

const router = express.Router();

export const generateImage = async (req: Request, res: any) => {
    try {
        const { 
            prompt, 
            num_images = 1, 
            output_format = "jpeg", 
            aspect_ratio = "16:9",
            finetune_id = "", 
            finetune_strength = 0.5 
        } = req.body;

        if (!prompt) return res.status(400).json({ error: "Prompt is required" });

        const result = await fal.subscribe("fal-ai/flux-pro/v1.1-ultra-finetuned", {
            input: { prompt, num_images, output_format, aspect_ratio, finetune_id, finetune_strength },
            logs: true,
            onQueueUpdate: (update) => {
                if (update.status === "IN_PROGRESS") {
                    update.logs.map((log) => log.message).forEach(console.log);
                }
            },
        });

        return res.json({ imageUrl: result.data });
    } catch (error) {
        console.error("Error generating image:", error);
        return res.status(500).json({ error: "Image generation failed" });
    }
};

export default generateImage;
