import express, { Request, Response } from 'express';
import { fal } from "@fal-ai/client";
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const FAL_KEY = process.env.FAL_KEY;


const FAL_API_URL = "https://queue.fal.run/fal-ai/flux-pro/v1.1-ultra";




export const generateImage = async (req: Request, res: any) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        const response = await axios.post(
            FAL_API_URL,
            { prompt },
            {
                headers: {
                    "Authorization": `Key ${FAL_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const requestId = response.data.request_id;
        res.json({ requestId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error submitting request" });
    }
};

export const getImage = async (req: Request, res: any) => {
    try {
        const { requestId } = req.params;

        const response = await axios.get(
            `https://queue.fal.run/fal-ai/flux-pro/requests/${requestId}`,
            {
                headers: {
                    "Authorization": `Key ${FAL_KEY}`
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching request result" });
    }
};


export default generateImage;
