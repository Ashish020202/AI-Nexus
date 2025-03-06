import express, { Request, Response } from 'express';
import { fal } from "@fal-ai/client";
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const FAL_KEY = process.env.FAL_KEY;


const FAL_API_URL = "https://queue.fal.run/fal-ai/minimax-music";

export const genMusic = async (req:Request,res:Response) => {

    try {
        const { prompt, reference_audio_url } = req.body;
    
        if (!prompt || !reference_audio_url) {
           res.status(400).json({ error: "Prompt and reference_audio_url are required" });
           return
        }
    
        const response = await axios.post(
          FAL_API_URL,
          { prompt, reference_audio_url },
          {
            headers: {
              Authorization: `Key ${FAL_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );
    
        const requestId = response.data?.request_id;
        if (!requestId) {
           res.status(500).json({ error: "Failed to get request ID" });
           return
        }
    
        res.json({ requestId });
      } catch (error) {
        console.error("Error submitting request:", error);
        res.status(500).json({ error: "Internal server error" });
      }

}


export const checkMusic = async (req:Request,res:Response) => {
    try {
        const { requestId } = req.params;
    
        const response = await axios.get(`${FAL_API_URL}/requests/${requestId}/status`, {
          headers: { Authorization: `Key ${FAL_KEY}` },
        });
    
        res.json(response.data);
      } catch (error) {
        console.error("Error fetching request status:", error);
        res.status(500).json({ error: "Internal server error" });
      }
}

export const getMusic =async (req:Request,res:Response) => {
    try {
        const { requestId } = req.params;
    
        const response = await axios.get(`${FAL_API_URL}/requests/${requestId}`, {
          headers: { Authorization: `Key ${FAL_KEY}` },
        });
    
        res.json(response.data);
      } catch (error) {
        console.error("Error fetching result:", error);
        res.status(500).json({ error: "Internal server error" });
      }
}