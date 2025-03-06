import { Request, Response } from "express";
import { fal } from "@fal-ai/client";
// import { FAL_AI_API_KEY, FAL_AI_API_URL } from '../config';
fal.config({ credentials:process.env.FAL_KEY });

export const generateVideo  = async (req:Request,res:any) => {
    try {
        const { prompt, webhookUrl } = req.body;
        if (!prompt) return res.status(400).json({ error: "Prompt is required" });

        const { request_id } = await fal.queue.submit("fal-ai/hunyuan-video", {
            input: { prompt },
            webhookUrl: webhookUrl || undefined,
        });

        return res.json({ message: "Video generation started", requestId: request_id });
    } catch (error) {
        console.error("Error generating video:", error);
        return res.status(500).json({ error: "Video generation failed" });
    }
}

export const checkVideo = async (req:Request,res:any) => {
    try {
        const { requestId } = req.params;
        const status = await fal.queue.status("fal-ai/hunyuan-video", { requestId, logs: true });
        return res.json(status);
    } catch (error) {
        console.error("Error fetching video status:", error);
        return res.status(500).json({ error: "Failed to fetch status" });
    }
}

export const getVideo = async (req:Request,res:any) => {
    try {
        const { requestId } = req.params;
        const result = await fal.queue.result("fal-ai/hunyuan-video", { requestId });
        return res.json({ videoUrl: result.data });
    } catch (error) {
        console.error("Error fetching video result:", error);
        return res.status(500).json({ error: "Failed to fetch video" });
    }
}

export default {generateVideo,getVideo,checkVideo};